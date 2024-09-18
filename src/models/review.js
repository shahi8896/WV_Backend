import mongoose from "mongoose";
const ReviewSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        //ref: "User",
    },
    prodcuct_id: {
        //TODO
        type: mongoose.Types.ObjectId,
        ref: "Vendor",
    },
    rating: {
        type: Number
    },
    reviewText: {
        type: String
    },
    city: {
        type: String
    }
}, { timestamps: true });
export const Review = mongoose.model("Review", ReviewSchema);
