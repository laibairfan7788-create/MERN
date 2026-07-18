

// const mongoose = require('mongoose');

// const gallerySchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       trim: true,
//       default: 'Untitled',
//     },
//     imageUrl: {
//       type: String,
//       required: true,
//     },
//     publicId: {
//       type: String,
//       default: null,
//     },
//     size: {
//       type: Number,
//       default: 0,
//     },
//     uploadedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model('Gallery', gallerySchema);
const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: 'Uncategorized',
  },
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    default: null,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Gallery', GallerySchema);