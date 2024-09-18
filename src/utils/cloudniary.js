import { v2 as cloudinary } from 'cloudinary';
import { ApiError } from './apiError.js';
// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// Define the uploadOnCloudinary function
export const uploadOnCloudinary = async (files) => {
    try {
        const imageUrls = [];
        // Check if files is iterable (an array or an iterable object) 
        if (!Array.isArray(files) && typeof files[Symbol.iterator] !== 'function') {
            throw new TypeError('Files parameter is not iterable');
        }
        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path);
            imageUrls.push(result.secure_url);
        }
        return imageUrls;
    }
    catch (error) {
        console.error('Error uploading files to Cloudinary:', error);
        throw new ApiError(500, 'Error uploading files to Cloudinary');
    }
};
