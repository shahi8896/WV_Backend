import mongoose, { Schema } from "mongoose";
const AdminNotificationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "unread"
    },
    userId: {
        type: String,
        required: true
    },
    vendorId: {
        type: String,
        required: true
    },
}, { timestamps: true });
export const AdminNotificationModel = mongoose.model("AdminNotification", AdminNotificationSchema);
export default AdminNotificationModel;
