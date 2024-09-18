// import mongoose, { Document, Model, Schema } from "mongoose";
// export interface INotification extends Document {
//     vendorIds?: string[]; // Changed to vendorIds for clarity
//     venueIds?: string[];
//     message?: string;
//     status?: string;
//     userId: string;
//     city: string[];
//     createdAt: Date; // Added createdAt field
//     updatedAt: Date; // Added updatedAt field
// }
// const NotificationSchema = new Schema<INotification>(
//     {
//         vendorIds: [{ // Changed to array type
//             type: String,
//         }],
//         venueIds: [{ // Changed to array type
//             type: String,
//         }],
//         message: {
//             type: String,
//         },
//         status: {
//             type: String,
//             required: true,
//             default: "unread"
//         },
//         userId: {
//             type: String,
//             required: true
//         },
//         city:[ {
//             type: String,
//             required: true
//         }],
//     },
//     { timestamps: true }
// );
// export const NotificationModel: Model<INotification> = mongoose.model("Notification", NotificationSchema);
// export default NotificationModel;
import mongoose, { Schema } from "mongoose";
const NotificationSchema = new Schema({
    vendors: [{
            vendorId: { type: String },
            status: { type: String, default: "unread" } // Default status is unread
        }],
    venues: [{
            venueId: { type: String },
            status: { type: String, default: "unread" }
        }],
    message: {
        type: String,
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
    city: [{
            type: String,
            required: true
        }],
}, { timestamps: true });
export const NotificationModel = mongoose.model("Notification", NotificationSchema);
export default NotificationModel;
