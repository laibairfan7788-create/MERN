// const express = require('express');
// const router = express.Router();
// const { auth, admin } = require('../middleware/auth');

// // // Dashboard stats
// // router.get('/stats', auth, admin, async (req, res) => {
// //   try {
// //     const Project = require('../models/Project');
// //     const Contact = require('../models/Contact');
// //     const Gallery = require('../models/Gallery');
    
// //     const [projects, contacts, gallery] = await Promise.all([
// //       Project.countDocuments(),
// //       Contact.countDocuments(),
// //       Gallery.countDocuments()
// //     ]);
    
// //     res.json({
// //       success: true,
// //       data: { projects, contacts, gallery }
// //     });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // });

// // module.exports = router;


// router.get('/stats', auth, admin, getDashboardStats);

// // Users
// router.get('/users', auth, admin, getUsers);
// router.put('/users/:id', auth, admin, updateUser);
// router.delete('/users/:id', auth, admin, deleteUser);

// // Products
// router.get('/products', auth, admin, getProducts);
// router.post('/products', auth, admin, createProduct);
// router.put('/products/:id', auth, admin, updateProduct);
// router.delete('/products/:id', auth, admin, deleteProduct);

// // Orders
// router.get('/orders', auth, admin, getOrders);
// router.put('/orders/:id', auth, admin, updateOrderStatus);

// // Gallery
// router.get('/gallery', auth, admin, getGallery);
// router.post('/gallery', auth, admin, upload.single('image'), uploadGallery);
// router.delete('/gallery/:id', auth, admin, deleteGallery);
const express = require('express');
const router = express.Router();

const { auth, admin } = require('../middleware/auth');
const adminController = require('../controllers/adminController');


// adminController exports do not match these names exactly (e.g. adminController has
// getAllUsers, not getUsers). Map route handlers to the actual exported functions.
const {
  getDashboardStats,
  // Users
  getAllUsers: getUsers,
  updateUser,
  deleteUser
} = adminController;




// ================= Dashboard =================
router.get('/stats', auth, admin, getDashboardStats);


// ================= Users =================
router.get('/users', auth, admin, getUsers);
router.put('/users/:id', auth, admin, updateUser);
router.delete('/users/:id', auth, admin, deleteUser);


// ================= Products =================
// Use dedicated productRoutes controller but mounted under /api/admin for UI compatibility.
// Product routes are already implemented in backend/routes/productRoutes.js, but that file is mounted at /api/product.
// This file re-exposes the same handlers under /api/admin.
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const upload = require('../middleware/upload');
router.get('/products', auth, admin, getProducts);
router.post('/products', auth, admin, upload.single('image'), createProduct);
router.put('/products/:id', auth, admin, updateProduct);
router.delete('/products/:id', auth, admin, deleteProduct);


// ================= Orders =================
const { getOrders } = require('../controllers/userController');
// admin status update is not currently implemented as a controller export; block for now to avoid 500s.
router.get('/orders', auth, admin, getOrders);


// ================= Gallery =================
// Gallery admin routes exist in backend/routes/galleryRoutes.js but mounted under /api/gallery.
// Re-expose them here.
const {
  getGallery: getAdminGallery,
  uploadImage,
  updateImage,
  deleteImage,
} = require('../controllers/galleryController');
router.get('/gallery', auth, admin, getAdminGallery);
router.post('/gallery', auth, admin, upload.single('image'), uploadImage);
router.put('/gallery/:id', auth, admin, updateImage);
router.delete('/gallery/:id', auth, admin, deleteImage);

module.exports = router;
