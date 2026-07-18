
// import React, { createContext, useState, useContext, useEffect } from 'react'
// import { login as apiLogin, register as apiRegister, logout as apiLogout, getMe } from '../api/authApi'

// // 1. Create context
// const AuthContext = createContext()

// // 2. Provider component
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [token, setToken] = useState(localStorage.getItem('token'))

//   useEffect(() => {
//     if (token) {
//       getMe()
//         .then(res => {
//           setUser(res.data)
//           setLoading(false)
//         })
//         .catch(() => {
//           localStorage.removeItem('token')
//           setToken(null)
//           setUser(null)
//           setLoading(false)
//         })
//     } else {
//       setLoading(false)
//     }
//   }, [token])

//   // ✅ LOGIN with debug logs
//   const login = async (email, password) => {
//     console.log('🔐 AuthContext.login - called with:', email)
//     const res = await apiLogin(email, password)
//     console.log('🔐 AuthContext.login - raw response:', res)

//     const { token, user } = res.data
//     console.log('🔐 AuthContext.login - extracted token:', token)
//     console.log('🔐 AuthContext.login - extracted user:', user)

//     localStorage.setItem('token', token)
//     setToken(token)
//     setUser(user)
//     console.log('🔐 AuthContext.login - user state set to:', user)

//     return res
//   }

//   const register = async (userData) => {
//     const res = await apiRegister(userData)
//     return res
//   }

//   const logout = () => {
//     apiLogout()
//     localStorage.removeItem('token')
//     setToken(null)
//     setUser(null)
//   }

//   const value = {
//     user,
//     loading,
//     token,
//     login,
//     register,
//     logout,
//     isAuthenticated: !!user,
//     isAdmin: user?.role === 'admin',
//   }

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }

// // 3. Custom hook – defined OUTSIDE the provider
// // eslint-disable-next-line react-refresh/only-export-components
// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// }
import React, { createContext, useState, useContext, useEffect } from 'react'
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getMe
} from '../api/authApi'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))

  // Load current user when token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const res = await getMe()

        // Backend returns:
        // {
        //   success: true,
        //   user: { id, name, email, role }
        // }

        setUser(res.data.user)
      } catch (error) {
        console.error('GetMe Error:', error)

        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [token])

  // Login
  const login = async (email, password) => {
    const res = await apiLogin(email, password)

    const { token, user } = res.data

    localStorage.setItem('token', token)

    setToken(token)
    setUser(user)

    return res
  }

  // Register
  const register = async (userData) => {
    return await apiRegister(userData)
  }

  // Logout
  const logout = () => {
    apiLogout()

    localStorage.removeItem('token')

    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}