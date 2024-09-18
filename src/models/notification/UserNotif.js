import mongoose, { Schema } from "mongoose";
const UserNotificationSchema = new Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, required: true, default: "unread" },
    userId: { type: String, required: true },
    vendorId: { type: String },
    venueId: { type: String }
});
const UserNotificationModel = mongoose.model('UserNotification', UserNotificationSchema);
export default UserNotificationModel;
