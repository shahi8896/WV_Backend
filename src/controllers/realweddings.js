import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js";
import { asyncHandler } from "../utils/asynHandler.js";
import RealWeddingsModel from "../models/realweddings.js";
//add a new wedding post
export const addItemToRealWeddingsPost = async (req, res) => {
    try {
        console.log("post request");
        const { title, content, author, eventDate, organizerName } = req.body;
        const givenFiles = req.files;
        if (!givenFiles || givenFiles.length === 0) {
            // No files were uploaded
            const realWeddings = await RealWeddingsModel.create({
                title,
                content,
                author,
                eventDate,
                organizerName,
                images: [], // Set an empty array for images
            });
            return res.status(201).json(new ApiResponse(200, { realWeddings }, "New realWeddings created successfully"));
        }
        // Files were uploaded
        const imageUrls = await uploadOnCloudinary(givenFiles);
        const realWeddings = await RealWeddingsModel.create({
            title,
            content,
            author,
            eventDate,
            organizerName,
            images: imageUrls,
        });
        return res.status(201).json(new ApiResponse(200, { realWeddings }, "New realWeddings created successfully"));
    }
    catch (error) {
        console.error('Error adding item to RealWeddingsList:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
//get wedding Post by ID
export const GetRealWeddingsPostById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const realWeddings = await RealWeddingsModel.findById(id);
    if (!realWeddings) {
        throw new ApiError(404, "No realWeddings Found!!");
    }
    return res.status(200).json(new ApiResponse(200, { realWeddings }, "Here is the realWeddings"));
});
//delete wedding Post by ID
export const DeleteRealWeddingsById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const realWeddings = await RealWeddingsModel.findById(id);
    if (!realWeddings) {
        throw new ApiError(404, "No realWeddings Found!!!");
    }
    const response = await RealWeddingsModel.findByIdAndDelete(id);
    return res.status(200).json(new ApiResponse(200, { response }, "realWeddings Deleted Successfully "));
});
//update details of the weddings Post
export const UpdateRealWeddingsPost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;
    const givenFiles = req.files;
    console.log("file", givenFiles);
    const realWeddings = await RealWeddingsModel.findById(id);
    if (!realWeddings) {
        throw new ApiError(404, "No realWeddings Found!!!");
    }
    if (givenFiles?.length > 0) {
        console.log(givenFiles);
        const imageUrls = await uploadOnCloudinary(givenFiles);
        if (imageUrls)
            realWeddings.images = imageUrls;
    }
    // Update all fields present in req.body
    for (const [key, value] of Object.entries(updateFields)) {
        if (value == undefined)
            continue;
        if (key !== '_id' && key !== '__v' && value != undefined) {
            realWeddings[key] = value;
        }
    }
    await realWeddings.save();
    return res.status(200).json(new ApiResponse(200, "realWeddings Updated Successfully!!"));
});
//get all weddings Post
export const getAllRealWeddings = asyncHandler(async (req, res) => {
    const realWeddings = await RealWeddingsModel.find();
    if (!realWeddings || realWeddings.length === 0) {
        throw new ApiError(404, "No realWeddings in DB");
    }
    return res.status(200).json(new ApiResponse(200, { realWeddings }, "here are the realWeddings."));
});
