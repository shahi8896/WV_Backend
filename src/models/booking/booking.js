import mongoose, { Schema } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
// Define the Booking Schema
const BookingSchema = new Schema({
    vId: { type: String, required: true },
    uId: { type: String, required: true },
    name: { type: String, required: true },
    contact: { type: Number, required: true },
    location: { type: String, required: true },
    guests: { type: String, required: true },
    date: { type: Date, required: true },
    address: { type: String, required: true },
    message: { type: String, required: true },
    typeOfEvent: { type: String },
    bookingId: { type: String, required: true },
    isVerified: { type: String, enum: ['Approved', 'Rejected', 'Pending'], default: 'Pending' },
    status: { type: String, enum: ['Read', 'Unread'], default: 'Unread' }
}, {
    timestamps: true // Add timestamps to record creation and update times
});
// Create and export the Booking model
export const Booking = mongoose.model("Booking", BookingSchema);
