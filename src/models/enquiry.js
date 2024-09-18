import mongoose from "mongoose";
const enquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    guests: {
        type: String,
    },
    date: {
        type: String,
    },
    address: {
        type: String,
    },
    message: {
        type: String,
    },
    typeOfEvent: {
        type: String,
    },
    isRead: {
        type: Boolean,
        default: false
    },
});
export const Enquiry = mongoose.model("Enquiry", enquirySchema);
