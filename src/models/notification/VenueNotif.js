import mongoose, { Schema } from "mongoose";
const VenueNotificationSchema = new Schema({
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
    venueId: {
        type: String,
        required: true
    },
}, { timestamps: true });
export const VenueNotificationModel = mongoose.model("VenueNotification", VenueNotificationSchema);
export default VenueNotificationModel;
