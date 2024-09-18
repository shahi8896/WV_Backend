import mongoose, { Schema } from "mongoose";
import validator from "validator"; // Import isEmail function from validator
import bcrypt from "bcrypt";
const UserSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Please provide name"],
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    phone: {
        type: String,
        required: [true, "Please provide contact number"],
    },
    city: {
        type: String,
        //  required: [true, "Please provide city"],
    },
    address: {
        type: String,
    },
    avatar: {
        type: String,
    },
    events: [{
            type: mongoose.Types.ObjectId,
            ref: "Event",
        }]
}, {
    timestamps: true,
});
// Password encryption
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
// Compare the password
UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};
export const User = mongoose.model("User", UserSchema);
