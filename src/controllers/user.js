import { asyncHandler } from "../utils/asynHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.js";
import jwt from 'jsonwebtoken';
import { Vendor } from "../models/vendor.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js";
import { Venue } from "../models/venue.js";
//Register vendor 
export const Register = asyncHandler(async (req, res, next) => {
    const { fullName, email, password, phone, city } = req.body;
    const user = await User.create({
        fullName,
        email,
        password,
        phone,
        city,
    });
    if (!user) {
        throw new ApiError(500, "something went wrong while registering the user!!");
    }
    return res.status(201).json(new ApiResponse(200, { user }, "user regiested successfully"));
});
// Login vendor
export const Login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "Email or Password is missing!!");
    }
    // Finding vendor from database using email
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "Email/User doesn't exist!!");
    }
    // // Check password
    const isPasswordValid = await user.isPasswordCorrect(password);
    // const  isPasswordValid = user.password === password
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }
    // Generate access token
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default_secret_key';
    const accessToken = jwt.sign({ id: user._id }, accessTokenSecret, { expiresIn: '1h' });
    // Fetch logged-in vendor details excluding password
    const loggedInUser = await User.findById(user._id).select("-password");
    // Return response with logged-in vendor details and access token
    return res.status(200)
        .cookie("accesToken", accessToken) //put tokens in cookies
        .json(new ApiResponse(200, { loggedInUser, accessToken }, "Here is the vendor"));
});
//Get user By ID
export const GetUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(404, "No user Found!!!");
    }
    return res.status(200).json(new ApiResponse(200, { user }, "Here is the user"));
});
//Delete User bY ID
export const DeleteUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log("user id", id);
    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(404, "No user Found!!!");
    }
    const respose = await User.findByIdAndDelete(id);
    return res.status(200).json(new ApiResponse(200, { respose }, "User Deleted Successfully "));
});
//getall users
export const ShowAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    if (!users || users.length === 0) {
        throw new ApiError(404, "No users in DB");
    }
    return res.status(200).json(new ApiResponse(200, { users }, "here are all vendors."));
});
//update details of the user...
export const UpdateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    //  console.log("hello",id);
    const updateFields = req.body;
    const givenFiles = req.files;
    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(404, "No User Found!!!");
    }
    if (givenFiles?.length > 0) {
        const imageUrls = await uploadOnCloudinary(givenFiles);
        if (imageUrls)
            user.avatar = imageUrls[0];
    }
    // Update all fields present in req.body
    for (const [key, value] of Object.entries(updateFields)) {
        if (value == undefined)
            continue;
        if (key !== '_id' && key !== '__v' && value != undefined) {
            user[key] = value;
        }
    }
    await user.save();
    return res.status(200).json(new ApiResponse(200, "User Updated Successfully!!"));
});
//all cities
// all cities
export const GetAllCities = asyncHandler(async (req, res) => {
    const p = await Vendor.find();
    const c = await Venue.find();
    const cities = [...new Set([
            ...p.map(v => v.city.toLowerCase()),
            ...c.map(v => v.city.toLowerCase())
        ])];
    // Capitalize the first letter of each city for better readability
    const capitalizedCities = cities.map(city => city.charAt(0).toUpperCase() + city.slice(1));
    return res.status(200).json({ cities: capitalizedCities });
});
