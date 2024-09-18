import { Router } from "express";
import { Register, UpdateVendor, GetVendorById, DeleteVendorById, ShowAllVendors, searchVendorsByCity, Login, GetVendorByType } from "../controllers/vendor.js";
import { upload } from "../middlewares/multer.js";
const router = Router();
//post
router.route("/register").post(Register);
router.route("/login").post(Login);
//put
router.route("/:id").put(upload.array('portfolio', 20), UpdateVendor);
//get
router.route("/all").get(ShowAllVendors);
// GET - Retrieve a vendor by ID
router.get("/:id", GetVendorById);
// GET - Search vendors by city
router.get(":city", searchVendorsByCity);
//delete
router.route("/:id").delete(DeleteVendorById);
//Get -  vendors by type
router.get("/category/:type_Of_Business", GetVendorByType);
//Get-ranked vendors
// router.get("/rankedvendors")
export default router;
