import mongoose, { Schema } from "mongoose";
const blogSchema = new Schema({
    title: {
        type: String,
        requried: [true, "Title is Required"],
    },
    images: {
        type: [String]
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        // required:true
    },
    category: {
        type: String,
        // required: true
    }
}, {
    timestamps: true,
});
const BlogModel = mongoose.model("Blog", blogSchema);
export default BlogModel;
