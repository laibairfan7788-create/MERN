// import React from 'react'
// import { Navigate, Outlet } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'

// const PrivateRoute = () => {
//   const { isAuthenticated } = useAuth()
//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
// }

// export default PrivateRoute
// src/routes/PrivateRoute.jsx



import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = () => {
  const { isAuthenticated, loading, user } = useAuth()

  console.log('🔒 PrivateRoute - isAuthenticated:', isAuthenticated, 'user:', user, 'loading:', loading)

  if (loading) {
    return <div className="text-center py-5">Loading...</div>
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute