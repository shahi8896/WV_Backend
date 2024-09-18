import jwt from 'jsonwebtoken';
import AdminModel from '../models/admin/admin.model.js';
import { asyncHandler } from "../utils/asynHandler.js";
import { Vendor } from '../models/vendor.js';
import { Venue } from '../models/venue.js';
import { User } from '../models/user.js';
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js";
// Function to create a new admin
export const createAdmin = async (req, res) => {
    try {
        const newAdmin = new AdminModel(req.body);
        console.log("data", req.body);
        const savedAdmin = await newAdmin.save();
        res.status(201).json(savedAdmin);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//to login
export const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "Email or Password is missing!!");
    }
    // Finding vendor from database using email
    const admin = await AdminModel.findOne({ 'profile.email': email });
    if (!admin) {
        throw new ApiError(404, "Email/admin doesn't exist!!");
    }
    // Check password
    const isPasswordValid = await admin.profile.isPasswordCorrect(password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid admin credentials");
    }
    // Generate access token
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default_secret_key';
    const accessToken = jwt.sign({ id: admin._id }, accessTokenSecret, { expiresIn: '1h' });
    // Fetch logged-in vendor details excluding password
    const loggedInAdmin = await AdminModel.findById(admin._id).select("-password");
    // Return response with logged-in vendor details and access token
    return res.status(200)
        .cookie("accessToken", accessToken, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent only over HTTPS in production
        sameSite: 'strict', // Ensures the cookie is sent only to the same site
        maxAge: 3600000 // 1 hour in milliseconds
    })
        .json(new ApiResponse(200, { loggedInAdmin, accessToken }, "Here is the admin"));
});
// Function to get all admins
export const getAllAdmins = async (req, res) => {
    try {
        const admins = await AdminModel.find();
        res.status(200).json(admins);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Function to get admin by ID
export const getAdminById = async (req, res) => {
    try {
        const admin = await AdminModel.findById(req.params.id);
        if (admin) {
            res.status(200).json(admin);
        }
        else {
            res.status(404).json({ message: 'Admin not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Function to update admin by ID
export const updateAdminProfile = async (req, res) => {
    try {
        // Extract admin ID from request parameters
        const { id } = req.params;
        const givenFiles = req.files;
        // Find the admin by ID
        const admin = await AdminModel.findById(id);
        // If admin not found, return 404 Not Found
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        if (givenFiles?.length > 0) {
            console.log(givenFiles);
            const imageUrls = await uploadOnCloudinary(givenFiles);
            console.log("cloud", imageUrls);
            if (imageUrls)
                admin.profile.avatar = imageUrls[0];
        }
        if (givenFiles?.length > 0) {
            console.log(givenFiles);
            const imageUrls = await uploadOnCloudinary(givenFiles);
            console.log("cloud", imageUrls);
            if (imageUrls)
                admin.profile.avatar = imageUrls[0];
        }
        // Extract profile data from request body
        const { name, email, password, contact, address, city } = req.body;
        // If provided, update profile fields
        if (name)
            admin.profile.name = name;
        if (email)
            admin.profile.email = email;
        if (password)
            admin.profile.password = password;
        if (contact)
            admin.profile.contact = contact;
        if (address)
            admin.profile.address = address;
        if (city)
            admin.profile.city = city;
        // Save the updated admin document
        await admin.save();
        // Return success response
        return res.status(200).json({ message: "Admin profile updated successfully", admin });
    }
    catch (error) {
        // Return error response if any error occurs
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
// Function to delete admin by ID
export const deleteAdminById = async (req, res) => {
    try {
        const deletedAdmin = await AdminModel.findByIdAndDelete(req.params.id);
        if (deletedAdmin) {
            res.status(200).json({ message: 'Admin deleted successfully' });
        }
        else {
            console.log("id recieved", deletedAdmin);
            res.status(404).json({ message: 'Admin not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Function to update admin profile by admin ID
// export const updateAdminProfileById = async (req: Request, res: Response) => {
//   try {
//     const updatedProfile = await AdminModel.findOneAndUpdate(
//       { _id: req.params.id },
//       { $set: { 'profile': req.body } },
//       { new: true }
//     );
//     if (updatedProfile) {
//       res.status(200).json(updatedProfile);
//     } else {
//       res.status(404).json({ message: 'Admin not found' });
//     }
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };
// Function to get all vendors
export const getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.status(200).json(vendors);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Function to delete vendor by ID
export const deleteVendorById = async (req, res) => {
    try {
        const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
        if (deletedVendor) {
            res.status(200).json({ message: 'Vendor deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Vendor not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Function to get all venue
export const getAllVenues = async (req, res) => {
    try {
        const vendors = await Venue.find();
        res.status(200).json(vendors);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Function to delete venue by ID
export const deleteVenueById = async (req, res) => {
    try {
        const deletedVendor = await Venue.findByIdAndDelete(req.params.id);
        if (deletedVendor) {
            res.status(200).json({ message: 'Vendor deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Vendor not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Function to get all Users
export const getAllUsers = async (req, res) => {
    try {
        const vendors = await User.find();
        res.status(200).json(vendors);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Function to delete User by ID
export const deleteUserById = async (req, res) => {
    try {
        const deletedVendor = await User.findByIdAndDelete(req.params.id);
        if (deletedVendor) {
            res.status(200).json({ message: 'Vendor deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Vendor not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Function to get all Bookings
// export const getAllBookings = async (req: Request, res: Response) => {
//   try {
//     const vendors = await VenueBooking.find();
//     res.status(200).json(vendors);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };
// Function to delete vendor by ID
export const deleteBookingById = async (req, res) => {
    try {
        const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
        if (deletedVendor) {
            res.status(200).json({ message: 'Vendor deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Vendor not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
