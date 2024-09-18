import { Router } from "express";
import { submitEnquiryForm, allEnquiries, updateReadStatus } from "../controllers/enquiry.js";
const router = Router();
router.route("/submit").post(submitEnquiryForm);
router.get('/all/enquiry', allEnquiries);
router.patch('/:id', updateReadStatus);
export default router;
