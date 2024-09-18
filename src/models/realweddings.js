import mongoose, { Schema } from "mongoose";
const RealWeddingsSchema = new Schema({
    title: {
        type: String,
        requried: [true, "Title is Required"],
    },
    images: {
        type: [String]
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        // required:true
    },
    organizerName: {
        type: String,
        // required: true
    },
    eventDate: {
        type: Date
    }
}, {
    timestamps: true,
});
const RealWeddingsModel = mongoose.model("RealWeddings", RealWeddingsSchema);
export default RealWeddingsModel;
