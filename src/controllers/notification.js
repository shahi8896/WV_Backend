import { Vendor } from "../models/vendor.js";
import { asyncHandler } from "../utils/asynHandler.js";
import { User } from "../models/user.js";
import NotificationModel from "../models/notification/notification.js";
import { Venue } from "../models/venue.js";
export const postNotification = asyncHandler(async (req, res, next) => {
    try {
        const { userId, city, flag } = req.body;
        let vendorIds = [];
        let venueIds = [];
        if (flag === "vendor") {
            const vendors = await Vendor.find({ city });
            if (!vendors.length) {
                return res.status(404).json({ error: "No vendors found" });
            }
            vendorIds = vendors.map((vendor) => vendor._id);
        }
        else if (flag === "venue") {
            const venues = await Venue.find({ city });
            if (!venues.length) {
                return res.status(404).json({ error: "No venues found" });
            }
            venueIds = venues.map((venue) => venue._id);
        }
        else {
            return res.status(400).json({ error: "Invalid flag value" });
        }
        // Find or create the notification for the user
        let existingNotification = await NotificationModel.findOne({ userId });
        if (!existingNotification) {
            // If notification doesn't exist, create a new one
            existingNotification = new NotificationModel({
                vendors: flag === "vendor" ? vendorIds.map((vendorId) => ({ vendorId, status: "unread" })) : [],
                venues: flag === "venue" ? venueIds.map((venueId) => ({ venueId, status: "unread" })) : [],
                userId,
                city: [city],
            });
        }
        else {
            // Add the new city to the existing notification if it doesn't already exist
            if (!existingNotification.city.includes(city)) {
                existingNotification.city.push(city);
                // Add vendors or venues according to the flag and available city
                if (flag === "vendor") {
                    vendorIds.forEach((vendorId) => {
                        if (!existingNotification?.vendors?.some((vendor) => vendor.vendorId === String(vendorId))) {
                            existingNotification.vendors.push({ vendorId, status: "unread" });
                        }
                    });
                }
                else if (flag === "venue") {
                    venueIds.forEach((venueId) => {
                        if (!existingNotification?.venues?.some((venue) => String(venue.venueId) === String(venueId))) {
                            existingNotification.venues.push({ venueId, status: "unread" });
                        }
                    });
                }
            }
            // Check if all vendors/venues are available for existing cities
            const existingCities = existingNotification.city;
            for (const existingCity of existingCities) {
                if (flag === "vendor") {
                    const vendorsForCity = await Vendor.find({ city: existingCity });
                    vendorsForCity.forEach((vendor) => {
                        if (!existingNotification?.vendors?.some((v) => String(v.vendorId) === String(vendor._id))) {
                            existingNotification.vendors.push({ vendorId: vendor._id, status: "unread" });
                        }
                    });
                }
                else if (flag === "venue") {
                    const venuesForCity = await Venue.find({ city: existingCity });
                    venuesForCity.forEach((venue) => {
                        if (!existingNotification?.venues?.some((v) => String(v.venueId) === String(venue._id))) {
                            existingNotification.venues.push({ venueId: venue._id, status: "unread" });
                        }
                    });
                }
            }
        }
        // Save the notification to the database
        existingNotification = await existingNotification.save();
        // Send a success response
        res.status(201).json({ notification: existingNotification });
    }
    catch (error) {
        next(error);
    }
});
//get
export const getNotification = asyncHandler(async (req, res, next) => {
    try {
        const { vId } = req.params;
        console.log("vendor id", vId);
        // Find notifications related to vendors
        const vendorNotifications = await NotificationModel.find({
            "vendors.vendorId": vId,
        });
        // Find notifications related to venues
        const venueNotifications = await NotificationModel.find({
            "venues.venueId": vId,
        });
        // Combine vendor and venue notifications
        const notifications = [...vendorNotifications, ...venueNotifications];
        // Fetch users based on the notifications
        const users = await Promise.all(notifications.map(notification => User.findById(notification.userId)));
        // Create an array of objects containing user details and associated notification ID
        const usersWithNotification = users.map((user, index) => ({
            user,
            notificationId: notifications[index]._id
        }));
        console.log(usersWithNotification);
        // Return the array of users with their associated notification IDs
        res.json({ users: usersWithNotification });
    }
    catch (error) {
        next(error);
    }
});
//update
export const updateNotification = asyncHandler(async (req, res, next) => {
    try {
        // const { nId } = req.params;
        const { vId, nId } = req.body;
        let notification = await NotificationModel.findById(nId);
        if (!notification) {
            return next("Notification not found");
        }
        else {
            console.log("Notification Title:", notification.status);
            // Find the vendor with the specified vendorId
            const vendorToUpdate = notification?.vendors?.find((vendor) => vendor.vendorId === vId);
            const venueToUpdate = notification?.venues?.find((venue) => venue.venueId === vId);
            console.log("VendorToUpdate:", vendorToUpdate);
            if (vendorToUpdate) {
                // Update the status of the found vendor
                vendorToUpdate.status = "read";
                const updatedNotification = await notification.save(); // Save the updated notification to MongoDB
                console.log("updatedNotification", updatedNotification);
                res.status(200).json({
                    success: true,
                    status: updatedNotification, // Return the updated status in the response
                });
            }
            else if (venueToUpdate) {
                // Update the status of the found venue
                venueToUpdate.status = "read";
                const updatedNotification = await notification.save(); // Save the updated notification to MongoDB
                console.log("updatedNotification", updatedNotification);
                res.status(200).json({
                    success: true,
                    status: updatedNotification, // Return the updated status in the response
                });
            }
            else {
                return next("Vendor not found in the notification");
            }
        }
    }
    catch (error) {
        next(error);
    }
});
export const getNotificationByIdStatus = asyncHandler(async (req, res, next) => {
    try {
        const { nId } = req.params;
        // const { vId } = req.body; // Extract vId from request body
        const vId = req.query.vId; // Extract vId from query parameters
        console.log(vId);
        const notification = await NotificationModel.findById(nId);
        console.log("hello bete");
        // Check if the notification exists
        if (!notification) {
            return res.status(404).json({ success: false, message: 'Notification not found' });
        }
        // Find the status based on the provided vId
        let status;
        if (notification.vendors && notification.vendors.some(vendor => vendor.vendorId === vId)) {
            // Vendor exists, find its status
            const vendor = notification.vendors.find(vendor => vendor.vendorId === vId);
            status = vendor?.status;
        }
        else if (notification.venues && notification.venues.some(venue => venue.venueId === vId)) {
            // Venue exists, find its status
            const venue = notification.venues.find(venue => venue.venueId === vId);
            status = venue?.status;
        }
        else {
            // Vendor or Venue not found
            return res.status(404).json({ success: false, message: 'Vendor or Venue not found in the notification' });
        }
        // Return the status
        res.status(200).json({ success: true, status });
    }
    catch (error) {
        next(error);
    }
});
export const getAllNotificationsByVendorId = asyncHandler(async (req, res, next) => {
    try {
        const { vId } = req.params;
        // Find notifications related to vendors
        const vendorNotifications = await NotificationModel.find({
            "vendors.vendorId": vId,
        });
        // Find notifications related to venues
        const venueNotifications = await NotificationModel.find({
            "venues.venueId": vId,
        });
        const notifications = [...vendorNotifications, ...venueNotifications];
        // console.log("notification", vendorNotifications)
        res.status(200).json({
            success: true,
            status: notifications, // Return the updated status in the response
        });
    }
    catch (error) {
        next(error);
    }
});
