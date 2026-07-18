// const express = require('express');
// const router = express.Router();
// const { getGallery, createGallery, deleteGallery } = require('../controllers/galleryController');
// const { auth, admin } = require('../middleware/auth');
// const upload = require('../middleware/upload');

// router.get('/', getGallery);
// router.post('/', auth, admin, upload.single('image'), createGallery);
// router.delete('/:id', auth, admin, deleteGallery);

// module.exports = router;
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { auth } = require('../middleware/auth');
const {
  getPublicGallery,
  getGallery,
  uploadImage,
  updateImage,
  deleteImage,
} = require('../controllers/galleryController');

// ─── Public routes (no auth) ──────────────────────────────────────
router.get('/', getPublicGallery);

// ─── Admin routes (auth required) ────────────────────────────────
router.get('/admin', auth, getGallery);
router.post('/admin', auth, upload.single('image'), uploadImage);
router.put('/admin/:id', auth, updateImage);
router.delete('/admin/:id', auth, deleteImage);

module.exports = router;