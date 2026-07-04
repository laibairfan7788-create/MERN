// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// import { useAuth } from "../hooks/useAuth";

// export default function AdminRoute() {
//   const { user, loading } = useAuth();

//   if (loading) return <div />;
//   if (!user) return <Navigate to="/login" replace />;

//   const role = user?.role;
//   const isAdmin = role === "admin" || role === "ADMIN";

//   if (!isAdmin) return <Navigate to="/" replace />;

//   return <Outlet />;
// }

import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AdminRoute = () => {
  const { isAuthenticated, isAdmin } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" />
  if (!isAdmin) return <Navigate to="/dashboard" />
  return <Outlet />
}

export default AdminRoute