import { Router } from "express";
import { Register, Login, ShowAllUsers, GetUserById, DeleteUserById, UpdateUser, GetAllCities } from "../controllers/user.js";
import { upload } from "../middlewares/multer.js";
const router = Router();
//post
router.route("/register").post(Register);
router.route("/login").post(Login);
//get
router.route("/all").get(ShowAllUsers);
//put
router.route("/:id").put(upload.array('avatar', 1), UpdateUser);
//router.route("/:id").put(upload.array('image' , 3),UpdateVendor);
// GET - Retrieve a user by ID
router.get("/:id", GetUserById);
//delete
router.route("/:id").delete(DeleteUserById);
//get cities
router.route("/all/city").get(GetAllCities);
export default router;
