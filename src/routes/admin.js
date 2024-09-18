// admin.routes.ts
import express from 'express';
import * as adminController from '../controllers/admin.js';
import { upload } from '../middlewares/multer.js';
const router = express.Router();
// Route to create a new admin
router.post('/register', adminController.createAdmin);
// Route to get all admins
router.post('/login', adminController.loginAdmin);
// Route to get all admin
router.get('/all', adminController.getAllAdmins);
// Route to update admin by ID
router.get('/:id', adminController.getAdminById);
// Route to update admin by ID
router.route('/:id').patch(upload.array('image', 1), adminController.updateAdminProfile);
// Route to delete admin by ID
router.delete('/:id', adminController.deleteAdminById);
// // Route to update admin profile by admin ID
// router.put('/:id/profile', adminController.updateAdminProfileById);
// // Route to update admin venue permissions by admin ID
// router.put('/:id/venue', adminController.updateAdminVenuePermissionsById);
// Route to get all vendors
router.route('/vendor/all').get(adminController.getAllVendors);
//Route to delete vendor
router.route('/vendor/:id').delete(adminController.deleteVendorById);
//VENUE
//Route to get all venues
router.route('/venue/all').get(adminController.getAllVenues);
//Route to delete venue
router.route('/venue/:id').delete(adminController.deleteVenueById);
//User
//Route to get all users
router.route('/user/all').get(adminController.getAllUsers);
//Route to delete user
router.route('/user/:id').delete(adminController.deleteUserById);
export default router;
