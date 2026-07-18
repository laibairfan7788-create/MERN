const express = require('express');
const router = express.Router();
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { auth, admin } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getProducts);
router.post('/', auth, admin, upload.single('image'), createProduct);
router.put('/:id', auth, admin, updateProduct);
router.delete('/:id', auth, admin, deleteProduct);

module.exports = router;