import mongoose, { Schema } from "mongoose";
// FoodPackage schema
const FoodPackageSchema = new Schema({
    vegCategory: {
        name: { type: String, default: "Veg" },
        packagePrice: { type: Number, required: true },
        subCategories: [
            {
                name: { type: String, required: true },
                quantity: { type: Number, required: true }
            }
        ]
    },
    nonVegCategory: {
        name: { type: String, default: "Non-Veg" },
        packagePrice: { type: Number, required: true },
        subCategories: [
            {
                name: { type: String, required: true },
                quantity: { type: Number, required: true }
            }
        ]
    }
}, { timestamps: true });
export const FoodPackage = mongoose.model("FoodPackage", FoodPackageSchema);
