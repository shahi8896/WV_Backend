// admin.model.ts
import { Schema, model } from 'mongoose';
import validator from "validator"; // Import isEmail function from validator
import bcrypt from "bcrypt";
const profileSchema = new Schema({
    name: { type: String, required: true },
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
    password: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    avatar: { type: String }
});
const adminSchema = new Schema({
    profile: { type: profileSchema, required: true },
    venue: {
        approve: { type: Boolean, default: false },
        view: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
    },
    vendor: {
        approve: { type: Boolean, default: false },
        view: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
    },
    user: {
        view: { type: Boolean, default: false },
        reschedule: {
            vendor: { type: Boolean, default: false },
            venue: { type: Boolean, default: false },
            user: { type: Boolean, default: false },
        },
        delete: { type: Boolean, default: false },
    },
    booking: {
        view: { type: Boolean, default: false },
        cancel: { type: Boolean, default: false },
    },
});
// Password encryption// Password encryption
profileSchema.pre('save', async function (next) {
    const profile = this; // Cast 'this' to 'any' temporarily
    if (!profile.isModified('password'))
        return next();
    try {
        const hashedPassword = await bcrypt.hash(profile.password, 10);
        profile.password = hashedPassword;
        next();
    }
    catch (error) {
        next(error);
    }
});
// Compare the password
profileSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};
const AdminModel = model('Admin', adminSchema);
export default AdminModel;
