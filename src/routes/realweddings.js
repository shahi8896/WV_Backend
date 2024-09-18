// routes.js
import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { DeleteRealWeddingsById, GetRealWeddingsPostById, UpdateRealWeddingsPost, addItemToRealWeddingsPost, getAllRealWeddings } from "../controllers/realweddings.js";
const router = Router();
//post
router.route("/add").post(upload.array('images', 4), addItemToRealWeddingsPost);
//get
router.route("/:id").get(GetRealWeddingsPostById);
//Delete
router.route("/:id").delete(DeleteRealWeddingsById);
//update
router.route("/:id").patch(upload.array('images', 4), UpdateRealWeddingsPost);
//getAll
router.route("/all/realweddings").get(getAllRealWeddings);
export default router;
