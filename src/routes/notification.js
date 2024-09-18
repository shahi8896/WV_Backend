import { Router } from "express";
import { 
// getNotificationAdmin,
// getNotificationUser,
// getNotificationVendor,
// getNotificationVenue,
// postNotificationAdmin,
// postNotificationUser,
// postNotificationVendor,
// postNotificationVenue,
// updateAdminNotification,
// updateUserNotification,
// updateVendorNotification,
// updateVenueNotification,
postNotification, updateNotification, getNotification, getNotificationByIdStatus, getAllNotificationsByVendorId } from "../controllers/notification.js";
const router = Router();
//notification
// //vendor
// router.route("/notificationvendor").post(postNotificationVendor);
// router.route("/getnotificationvendor/:id").get(getNotificationVendor);
// router.route("/getnotificationvenue/:id").put(updateVendorNotification);
// //venue
// router.route("/notificationvenue").post(postNotificationVenue);
// router.route("/getnotificationvenue/:id").get(getNotificationVenue);
// router.route("/getnotificationvenue/:id").put(updateVenueNotification);
// //user
// router.route("/notificationvenue").post(postNotificationUser);
// router.route("/getnotificationvenue/:id").get(getNotificationUser);
// router.route("/getnotificationvenue/:id").put(updateUserNotification);
// //venue
// router.route("/notificationvenue").post(postNotificationAdmin);
// router.route("/getnotificationvenue/:id").get(getNotificationAdmin);
// router.route("/getnotificationvenue/:id").put(updateAdminNotification);
//all vendor
router.route("/city").post(postNotification);
router.route("/:vId").get(getNotification);
router.route("/update").patch(updateNotification);
router.route("/notif/:nId").get(getNotificationByIdStatus);
router.route("/notification/:vId").get(getAllNotificationsByVendorId);
export default router;
