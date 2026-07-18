

// const Gallery = require('../models/Gallery');
// const fs = require('fs');
// const path = require('path');

// // ─── PUBLIC: Get all active images ───────────────────────────────
// exports.getPublicGallery = async (req, res) => {
//   try {
//     const images = await Gallery.find({ isActive: true })
//       .sort({ createdAt: -1 })
//       .select('title description category url createdAt');
    
//     res.json({ success: true, data: images });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ─── ADMIN: Get all images ────────────────────────────────────────
// exports.getGallery = async (req, res) => {
//   try {
//     const images = await Gallery.find({})
//       .sort({ createdAt: -1 })
//       .populate('uploadedBy', 'name email');
    
//     res.json({ success: true, data: images });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ─── ADMIN: Upload image ──────────────────────────────────────────
// exports.uploadImage = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: 'No image file provided' });
//     }

//     const { title, description, category } = req.body;
//     const baseUrl = `${req.protocol}://${req.get('host')}`;
//     const imageUrl = `${baseUrl}/uploads/gallery/${req.file.filename}`;

//     const image = new Gallery({
//       title: title || req.file.originalname,
//       description: description || '',
//       category: category || 'Uncategorized',
//       url: imageUrl,
//       uploadedBy: req.user.id,
//       isActive: true,
//     });

//     await image.save();

//     res.status(201).json({
//       success: true,
//       message: 'Image uploaded successfully',
//       data: image,
//     });
//   } catch (error) {
//     // Delete uploaded file if save fails
//     if (req.file) {
//       fs.unlink(req.file.path, (err) => {
//         if (err) console.error('Error deleting file:', err);
//       });
//     }
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ─── ADMIN: Update image ──────────────────────────────────────────
// exports.updateImage = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, category, isActive } = req.body;

//     const image = await Gallery.findById(id);
//     if (!image) {
//       return res.status(404).json({ success: false, message: 'Image not found' });
//     }

//     // Update fields
//     if (title) image.title = title;
//     if (description !== undefined) image.description = description;
//     if (category) image.category = category;
//     if (isActive !== undefined) image.isActive = isActive;

//     await image.save();

//     res.json({ success: true, message: 'Image updated successfully', data: image });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ─── ADMIN: Delete image ──────────────────────────────────────────
// exports.deleteImage = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const image = await Gallery.findById(id);
//     if (!image) {
//       return res.status(404).json({ success: false, message: 'Image not found' });
//     }

//     // Delete file from filesystem
//     const filename = path.basename(image.url);
//     const filePath = path.join(__dirname, '../uploads/gallery', filename);
//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//     }

//     await image.deleteOne();

//     res.json({ success: true, message: 'Image deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };




// const Gallery = require('../models/Gallery');
// const fs = require('fs');
// const path = require('path');

// // ─── PUBLIC: Get all active images ───────────────────────────────
// exports.getPublicGallery = async (req, res) => {
//   try {
//     const images = await Gallery.find({ isActive: true })
//       .sort({ createdAt: -1 })
//       .select('title description category url createdAt');
    
//     res.json({ success: true, data: images });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ─── ADMIN: Get all images ────────────────────────────────────────
// exports.getGallery = async (req, res) => {
//   try {
//     const images = await Gallery.find({})
//       .sort({ createdAt: -1 })
//       .populate('uploadedBy', 'name email');
    
//     res.json({ success: true, data: images });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ─── ADMIN: Upload image ──────────────────────────────────────────
// exports.uploadImage = async (req, res) => {
//   try {
//     console.log('📸 Upload request received');
//     console.log('📸 File:', req.file);
    
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: 'No image file provided' });
//     }

//     const { title, description, category } = req.body;
    
//     // ✅ Store the FULL filename with extension
//     const filename = req.file.filename;
//     const imageUrl = `/uploads/gallery/${filename}`;
//     console.log('📸 Image URL saved:', imageUrl);

//     const image = new Gallery({
//       title: title || req.file.originalname,
//       description: description || '',
//       category: category || 'Uncategorized',
//       url: imageUrl,   // ✅ This must be /uploads/gallery/filename.jpg
//       uploadedBy: req.user.id,
//       isActive: true,
//     });

//     await image.save();
//     console.log('✅ Image saved to database with URL:', imageUrl);

//     res.status(201).json({
//       success: true,
//       message: 'Image uploaded successfully',
//       data: image,
//     });
//   } catch (error) {
//     console.error('❌ Upload error:', error);
//     if (req.file) {
//       fs.unlink(req.file.path, (err) => {
//         if (err) console.error('Error deleting file:', err);
//       });
//     }
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ─── ADMIN: Update image ──────────────────────────────────────────
// exports.updateImage = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, category, isActive } = req.body;

//     const image = await Gallery.findById(id);
//     if (!image) {
//       return res.status(404).json({ success: false, message: 'Image not found' });
//     }

//     if (title) image.title = title;
//     if (description !== undefined) image.description = description;
//     if (category) image.category = category;
//     if (isActive !== undefined) image.isActive = isActive;

//     await image.save();

//     res.json({ success: true, message: 'Image updated successfully', data: image });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ─── ADMIN: Delete image ──────────────────────────────────────────
// exports.deleteImage = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const image = await Gallery.findById(id);
//     if (!image) {
//       return res.status(404).json({ success: false, message: 'Image not found' });
//     }

//     // Delete file from filesystem
//     const filename = path.basename(image.url);
//     const filePath = path.join(__dirname, '../uploads/gallery', filename);
//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//     }

//     await image.deleteOne();

//     res.json({ success: true, message: 'Image deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
const Gallery = require('../models/Gallery');
const fs = require('fs');
const path = require('path');

// ─── PUBLIC: Get all active images ───────────────────────────────
exports.getPublicGallery = async (req, res) => {
  try {
    const images = await Gallery.find({ isActive: true })
      .sort({ createdAt: -1 })
      .select('title description category url createdAt');
    
    res.json({ success: true, data: images });
  } catch (error) {
    console.error('❌ GetPublicGallery error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── ADMIN: Get all images ────────────────────────────────────────
exports.getGallery = async (req, res) => {
  try {
    const images = await Gallery.find({})
      .sort({ createdAt: -1 })
      .populate('uploadedBy', 'name email');
    
    res.json({ success: true, data: images });
  } catch (error) {
    console.error('❌ GetGallery error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── ADMIN: Upload image ──────────────────────────────────────────
exports.uploadImage = async (req, res) => {
  try {
    console.log('📸 Upload request received');
    console.log('📸 File:', req.file);
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    const { title, description, category } = req.body;
    
    // ✅ Get the full URL with filename
    const protocol = req.protocol;
    const host = req.get('host');
    const filename = req.file.filename;
    const imageUrl = `${protocol}://${host}/uploads/gallery/${filename}`;
    
    console.log('📸 Generated URL:', imageUrl);

    const image = new Gallery({
      title: title || req.file.originalname,
      description: description || '',
      category: category || 'Uncategorized',
      url: imageUrl,
      uploadedBy: req.user.id,
      isActive: true,
    });

    await image.save();
    console.log('✅ Image saved with URL:', imageUrl);

    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      data: image,
    });
  } catch (error) {
    console.error('❌ Upload error:', error);
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── ADMIN: Update image ──────────────────────────────────────────
exports.updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, isActive } = req.body;

    const image = await Gallery.findById(id);
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    if (title) image.title = title;
    if (description !== undefined) image.description = description;
    if (category) image.category = category;
    if (isActive !== undefined) image.isActive = isActive;

    await image.save();

    res.json({ success: true, message: 'Image updated successfully', data: image });
  } catch (error) {
    console.error('❌ Update error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── ADMIN: Delete image ──────────────────────────────────────────
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Gallery.findById(id);
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    // Delete file from filesystem
    const filename = path.basename(image.url);
    const filePath = path.join(__dirname, '../uploads/gallery', filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await image.deleteOne();

    res.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error('❌ Delete error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};