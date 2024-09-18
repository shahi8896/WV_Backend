import mongoose from "mongoose";
const EventSchema = new mongoose.Schema({
    address: {
        type: String,
        required: [true, "Please provide address"],
    },
    cityOfResidence: {
        type: String,
        required: [true, "Please provide your city"],
    },
    state: {
        type: String,
        required: [true, "Please provide your State"],
    },
    cityOfEvent: {
        type: String,
        required: [true, "Please provide your city"],
    },
    eventType: {
        type: String,
        enum: ["Wedding", "Corporate", "Social", "Other"],
    },
    best_Way_To_Reach_Me: {
        type: String,
        enum: ["Call", "SMS", "Whatsapp", "E-mail"],
    },
    events: {
        type: [{
                event_Date: {
                    type: Date,
                },
                number_Of_Guests: {
                    type: Number,
                },
                locality_Preference: {
                    type: String,
                },
                liquor_To_Be_Served: {
                    type: Boolean,
                },
                food_Preference: {
                    type: Boolean,
                },
                slot: {
                    type: String,
                    enum: ["Morning", "Evening", "Full Day"],
                },
            }],
    },
    servicesNeeded: {
        type: [{
                service: String,
                budget: Number, // Adding budget field for each service
            }],
    },
    room_Needed: {
        number_Of_Rooms: {
            type: Number,
        },
        number_Of_Nights: {
            type: Number,
        },
    },
    notes: {
        type: String,
    },
    total_Budget: {
        type: Number,
    }
}, { timestamps: true });
export const Event = mongoose.model("Event", EventSchema);
