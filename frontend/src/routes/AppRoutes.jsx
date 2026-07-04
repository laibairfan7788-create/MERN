

// import React from 'react'
// import { Routes, Route } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'

// // Layouts
// import MainLayout from '../components/layout/MainLayout'
// import AdminLayout from '../components/layout/AdminLayout'
// import AuthLayout from '../components/layout/AuthLayout'

// // Public pages
// import Home from '../pages/public/Home'
// import About from '../pages/public/About'
// import Services from '../pages/public/Services'
// import Applications from '../pages/public/Applications'
// import Gallery from '../pages/public/Gallery'
// import Distributors from '../pages/public/Distributors'
// import Contact from '../pages/public/Contact'

// // Auth pages
// import Login from '../pages/auth/Login'
// import Register from '../pages/auth/Register'
// import ForgotPassword from '../pages/auth/ForgotPassword'

// // User pages
// import UserDashboard from '../pages/user/Dashboard'
// import Profile from '../pages/user/Profile'
// import Orders from '../pages/user/Orders'
// import QuoteRequest from '../pages/user/QuoteRequest'

// // Admin pages
// import AdminDashboard from '../pages/admin/Dashboard'
// import AdminUsers from '../pages/admin/Users'
// import AdminProducts from '../pages/admin/Products'
// import AdminOrders from '../pages/admin/Orders'
// import AdminGallery from '../pages/admin/GalleryManager'
// import AdminSettings from '../pages/admin/Settings'

// // Route guards
// import PrivateRoute from './PrivateRoute'
// import AdminRoute from './AdminRoute'

// const AppRoutes = () => {
//   const { loading } = useAuth()
//   if (loading) return <div>Loading...</div>

//   return (
//     <Routes>
//       {/* All routes that use MainLayout (public + user private) */}
//       <Route element={<MainLayout />}>
//         {/* Public routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/services" element={<Services />} />
//            <Route path="/applications" element={<Applications />} />
//         <Route path="/gallery" element={<Gallery />} />
//         <Route path="/distributors" element={<Distributors />} />
//         <Route path="/contact" element={<Contact />} />

//         {/* User private routes — nested inside same MainLayout */}
//         <Route element={<PrivateRoute />}>
//           <Route path="/dashboard" element={<UserDashboard />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/orders" element={<Orders />} />
//           <Route path="/quote" element={<QuoteRequest />} />
//         </Route>
//       </Route>

//       {/* Auth routes (no navbar/footer) */}
//       <Route element={<AuthLayout />}>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//       </Route>

//       {/* Admin private routes with AdminLayout */}
//       <Route element={<AdminRoute />}>
//         <Route element={<AdminLayout />}>
//           <Route path="/admin/dashboard" element={<AdminDashboard />} />
//           <Route path="/admin/users" element={<AdminUsers />} />
//           <Route path="/admin/products" element={<AdminProducts />} />
//           <Route path="/admin/orders" element={<AdminOrders />} />
//           <Route path="/admin/gallery" element={<AdminGallery />} />
//           <Route path="/admin/settings" element={<AdminSettings />} />
//         </Route>
//       </Route>
//     </Routes>
//   )
// }

// export default AppRoutes
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Layouts
import MainLayout from '../components/layout/MainLayout'
import AdminLayout from '../components/layout/AdminLayout'
import AuthLayout from '../components/layout/AuthLayout'

// Public pages
import Home from '../pages/public/Home'
import About from '../pages/public/About'
import Services from '../pages/public/Services'
import Applications from '../pages/public/Applications'
import Gallery from '../pages/public/Gallery'
import Distributors from '../pages/public/Distributors'
import Contact from '../pages/public/Contact'
import QuoteRequest from '../pages/user/QuoteRequest'

// ✅ Dashboard is public – use the updated UserDashboard (works for all users)
import UserDashboard from '../pages/user/Dashboard'

// Auth pages
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ForgotPassword from '../pages/auth/ForgotPassword'

// Private user pages
import Profile from '../pages/user/Profile'
import Orders from '../pages/user/Orders'

// Admin pages
import AdminDashboard from '../pages/admin/Dashboard'
import AdminUsers from '../pages/admin/Users'
import AdminProducts from '../pages/admin/Products'
import AdminOrders from '../pages/admin/Orders'
import AdminGallery from '../pages/admin/GalleryManager'
import AdminSettings from '../pages/admin/Settings'

// Route guards
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'

const AppRoutes = () => {
  const { loading } = useAuth()
  if (loading) return <div>Loading...</div>

  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/distributors" element={<Distributors />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quote" element={<QuoteRequest />} />
        <Route path="/dashboard" element={<UserDashboard />} />   {/* ✅ public */}

        {/* Protected routes (login required) */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
      </Route>

      {/* Auth routes (no navbar/footer) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Admin routes */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes