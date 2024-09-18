import { Router } from "express";
import { DeleteblogById, GetBlogById, UpdateBlog, addItemToBloglist, getAllBlogs } from "../controllers/blog.js";
import { upload } from "../middlewares/multer.js";
const router = Router();
//post
router.route("/add").post(upload.array('image', 3), addItemToBloglist);
//get
router.route("/:id").get(GetBlogById);
//Delete
router.route("/:id").delete(DeleteblogById);
//update
router.route("/:id").patch(upload.array('image', 3), UpdateBlog);
//getAll
router.route("/all/blog").get(getAllBlogs);
export default router;
