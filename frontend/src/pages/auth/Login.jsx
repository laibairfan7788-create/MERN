// import React, { useState } from 'react'
// import { Container, Row, Col, Form, Button } from 'react-bootstrap'
// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../../context/AuthContext'
// import { useNotification } from '../../context/NotificationContext'

// const Login = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const { login } = useAuth()
//   const { notify } = useNotification()
//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       await login(email, password)
//       notify('Login successful!', 'success')
//       navigate('/dashboard')
//     } catch (err) {
//       notify(err.response?.data?.message || 'Login failed', 'error')
//     }
//   }

//   return (
//     <div className="auth-wrapper" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1a6b2f 0%, #0f3d1c 100%)', padding: '2rem' }}>
//       <Container>
//         <Row className="justify-content-center">
//           <Col md={6} lg={5}>
//             <div className="p-4 p-md-5" style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,.3)' }}>
//               <div className="text-center mb-4">
//                 <img src="/logo 1.png" alt="GARS Industries" style={{ height: '50px' }} />
//                 <h4 style={{ fontWeight: 900, color: '#1a6b2f', marginTop: '.4rem' }}>Welcome Back</h4>
//               </div>
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Email Address</Form.Label>
//                   <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                 </Form.Group>
//                 <Button type="submit" className="w-100" style={{ background: '#2e8b47', border: 'none', padding: '.75rem', fontWeight: 700 }}>Login</Button>
//               </Form>
//               <div className="mt-3 text-center">
//                 <Link to="/register" style={{ color: '#2e8b47', fontWeight: 600, textDecoration: 'none' }}>Don't have an account? Register</Link>
//                 <br />
//                 <Link to="/forgot-password" style={{ color: '#6b7c6d', fontSize: '.85rem' }}>Forgot password?</Link>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   )
// }

// export default Login



// import React, { useState, useEffect } from 'react'
// import { Container, Row, Col, Form, Button } from 'react-bootstrap'
// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../../context/AuthContext'
// import { useNotification } from '../../context/NotificationContext'

// const Login = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)
//   const { login, user } = useAuth()
//   const { notify } = useNotification()
//   const navigate = useNavigate()

//   // ✅ Redirect to dashboard when user becomes available (state-based navigation)
//   useEffect(() => {
//     if (user) {
//       console.log('✅ User detected in useEffect, redirecting to /dashboard')
//       navigate('/dashboard')
//     }
//   }, [user, navigate])

//   const handleSubmit = async (e) => {
//     e.preventDefault()
    
//     if (!email || !password) {
//       notify('Please fill in all fields', 'error')
//       return
//     }

//     try {
//       setLoading(true)
//       console.log('🔐 Attempting login for:', email)
      
//       await login(email, password)
      
//       console.log('✅ Login successful!')
//       notify('Login successful!', 'success')
      
//       // 💡 The useEffect above will handle navigation when `user` updates.
//       // But we also keep the direct navigate as a fallback.
//       console.log('🔄 About to navigate to /dashboard (fallback)')
//       navigate('/dashboard')
      
//     } catch (err) {
//       console.error('❌ Login error:', err)
//       console.error('Response data:', err.response?.data)
//       notify(err.response?.data?.message || 'Login failed', 'error')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="auth-wrapper" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1a6b2f 0%, #0f3d1c 100%)', padding: '2rem' }}>
//       <Container>
//         <Row className="justify-content-center">
//           <Col md={6} lg={5}>
//             <div className="p-4 p-md-5" style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,.3)' }}>
//               <div className="text-center mb-4">
//                 <img src="/logo 1.png" alt="GARS Industries" style={{ height: '50px' }} />
//                 <h4 style={{ fontWeight: 900, color: '#1a6b2f', marginTop: '.4rem' }}>Welcome Back</h4>
//               </div>
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Email Address</Form.Label>
//                   <Form.Control
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     disabled={loading}
//                     placeholder="you@example.com"
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     disabled={loading}
//                     placeholder="••••••••"
//                   />
//                 </Form.Group>
//                 <Button
//                   type="submit"
//                   className="w-100"
//                   style={{ background: '#2e8b47', border: 'none', padding: '.75rem', fontWeight: 700 }}
//                   disabled={loading}
//                 >
//                   {loading ? 'Logging in...' : 'Login'}
//                 </Button>
//               </Form>
//               <div className="mt-3 text-center">
//                 <Link to="/register" style={{ color: '#2e8b47', fontWeight: 600, textDecoration: 'none' }}>
//                   Don't have an account? Register
//                 </Link>
//                 <br />
//                 <Link to="/forgot-password" style={{ color: '#6b7c6d', fontSize: '.85rem' }}>
//                   Forgot password?
//                 </Link>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   )
// }

// export default Login
// src/pages/auth/Login.jsx
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useNotification } from '../../context/NotificationContext'
import { GiWhiteBook } from 'react-icons/gi'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, user } = useAuth()
  const { notify } = useNotification()
  const navigate = useNavigate()

  // ✅ Redirect when user becomes available (state-based, most reliable)
  useEffect(() => {
    if (user) {
      console.log('👤 User detected, redirecting to /dashboard')
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      notify('Please fill in all fields', 'error')
      return
    }
    try {
      setLoading(true)
      console.log('🔐 Attempting login for:', email)

      const response = await login(email, password)
      console.log('✅ Login response:', response)
      console.log('👤 User object:', response.data?.user)

      notify('Login successful!', 'success')
      console.log('🔄 Navigating to /dashboard...')

      // Primary redirect – will be overridden by useEffect if user updates
      navigate('/dashboard')
    } catch (err) {
      console.error('❌ Login error:', err)
      console.error('Response data:', err.response?.data)
      notify(err.response?.data?.message || 'Login failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-wrapper" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, white, #0f3d1c 100%)', padding: '2rem' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <div className="p-4 p-md-5" style={{ background: 'light green', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,.3)' }}>
              <div className="text-center mb-4">
                <img src="/logo.png" alt="GARS Industries" style={{ height: '50px' }} />
                <h4 style={{ fontWeight: 900, color: 'white', marginTop: '.4rem' }}>Welcome Back</h4>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label> <font color="white">Email Address</font> </Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    // placeholder="you@example.com"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label><font color="white">Password</font></Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    // placeholder="••••••••"
                  />
                </Form.Group>
                <Button
                  type="submit"
                  className="w-100"
                  style={{ background: '#2e8b47', border: 'none', padding: '.75rem', fontWeight: 700 }}
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </Form>
              <div className="mt-3 text-center">
                <Link to="/register" style={{ color: 'white', fontWeight: 600, textDecoration: 'none' }}>
                  Don't have an account? Register
                </Link>
                <br />
                <Link to="/forgot-password" style={{ color: 'white', fontSize: '.85rem' }}>
                  Forgot password?
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login