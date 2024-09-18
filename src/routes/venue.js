import { Router } from "express";
import { DeleteVenueById, GetVenueById, Login, Register, filterVenues, UpdateVenue, searchvenuesByCity, topVenues } from "../controllers/venue.js";
import { upload } from "../middlewares/multer.js";
import { checkAdmin } from "../middlewares/Admin.js";
const router = Router();
//post
router.route("/register").post(Register);
router.route("/login").post(Login);
//get
router.route("/all").get(filterVenues);
// GET - Retrieve a vendor by ID
router.get("/:id", GetVenueById);
//PUT - Update venue data
router.route("/:id").put(upload.array('images', 20), UpdateVenue);
// GET - Search vendors by city
router.get("search_venues/:city", searchvenuesByCity);
//delete
router.route("/:id").delete(checkAdmin, DeleteVenueById);
//ranked venues
router.route("/ranked/venues").get(topVenues);
export default router;
