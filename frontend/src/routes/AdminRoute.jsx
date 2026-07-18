


// import React from 'react'
// import { Navigate, Outlet } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'

// const AdminRoute = () => {
//   const { isAuthenticated, isAdmin } = useAuth()
//   if (!isAuthenticated) return <Navigate to="/login" />
//   if (!isAdmin) return <Navigate to="/dashboard" />
//   return <Outlet />
// }

// export default AdminRoute
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AdminRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth()

  console.log('🔒 AdminRoute - isAuthenticated:', isAuthenticated)
  console.log('🔒 AdminRoute - isAdmin:', isAdmin)

  if (loading) {
    return <div className="text-center py-5">Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default AdminRoute