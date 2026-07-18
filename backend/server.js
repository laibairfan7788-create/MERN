// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const morgan = require('morgan');
// const rateLimit = require('express-rate-limit');
// const path = require('path');
// require('dotenv').config();

// // Database
// const connectDB = require('./config/db');

// // Routes
// const authRoutes = require('./routes/authRoutes');
// const adminRoutes = require('./routes/adminRoutes');
// const userRoutes = require('./routes/userRoutes');
// const contactRoutes = require('./routes/contactRoutes');
// const galleryRoutes = require('./routes/galleryRoutes');
// const productRoutes = require('./routes/productRoutes');

// // Create App
// const app = express();

// // Connect to MongoDB at startup (not lazily per-request)
// connectDB().catch((err) => {
//   console.error('Failed to connect to MongoDB:', err.message);
//   process.exit(1);
// });

// // Security Middleware
// app.use(helmet());

// // CORS
// // Set CORS_ORIGIN in your environment to a comma-separated list of
// // allowed frontend origins, e.g.:
// //   CORS_ORIGIN=https://your-frontend.vercel.app,http://localhost:3000
// const allowedOrigins = process.env.CORS_ORIGIN
//   ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
//   : true; // fall back to reflecting the request origin in development

// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true
//   })
// );

// // Body Parser
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Logger
// app.use(morgan('dev'));

// // Rate Limiter
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: {
//     success: false,
//     message: 'Too many requests, please try again later.'
//   }
// });
// app.use('/api', limiter);

// // Static Files (for uploaded images)
// // Maps requests like:
// //   http://localhost:5000/uploads/gallery/<file>
// // to the local folder:
// //   backend/uploads/gallery/<file>
// //
// // This is required so gallery images stored by multer can be fetched by the browser.
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// // Health Check
// app.get('/', (req, res) => {
//   res.json({ success: true, message: 'Server is running' });
// });
// app.get('/health', (req, res) => {
//   res.json({ success: true, status: 'OK', timestamp: new Date() });
// });

// // Mount all route modules
// app.use('/api/auth', authRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/contacts', contactRoutes);
// app.use('/api/gallery', galleryRoutes);
// app.use('/api/product', productRoutes);

// // Global Error Handler
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || 'Internal Server Error'
//   });
// });

// // 404 Handler
// app.use((req, res) => {
//   res.status(404).json({ success: false, message: 'Route not found' });
// });

// // Only start a local listener outside of Vercel's serverless environment.
// // On Vercel, the exported `app` is wrapped in a serverless handler instead.
// if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }

// module.exports = app;
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

// Database
const connectDB = require('./config/db');

// Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const productRoutes = require('./routes/productRoutes');

// Create App
const app = express();

// Connect to MongoDB at startup (not lazily per-request)
connectDB().catch((err) => {
  console.error('Failed to connect to MongoDB:', err.message);
  process.exit(1);
});

// =============================================
// ✅ GLOBAL CORS MIDDLEWARE (MUST BE FIRST)
// =============================================
app.use((req, res, next) => {
  // Allow all origins
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// =============================================
// OTHER MIDDLEWARE
// =============================================

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: false, // ✅ Disable cross-origin policy
}));

// CORS (additional)
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
  : true;

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use(morgan('dev'));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests, please try again later.'
  }
});
app.use('/api', limiter);

// ✅ Static Files (for uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
}));

// Health Check
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});
app.get('/health', (req, res) => {
  res.json({ success: true, status: 'OK', timestamp: new Date() });
});

// Mount all route modules
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/product', productRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Only start a local listener outside of Vercel's serverless environment.
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📁 Uploads served from: ${path.join(__dirname, 'uploads')}`);
  });
}

module.exports = app;