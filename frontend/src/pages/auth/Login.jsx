
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

//   // ✅ Redirect based on user role
//   useEffect(() => {
//     if (user) {
//       console.log('👤 User detected:', user)
//       console.log('🔑 User role:', user.role)
      
//       if (user.role === 'admin') {
//         console.log('🔄 Redirecting to Admin Dashboard...')
//         navigate('/admin/dashboard')
//       } else {
//         console.log('🔄 Redirecting to User Dashboard...')
//         navigate('/dashboard')
//       }
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

//       const response = await login(email, password)
//       console.log('✅ Login response:', response)
//       console.log('👤 User object:', response.data?.user)
//       console.log('🔑 User role:', response.data?.user?.role)

//       notify('Login successful!', 'success')
      
//       // ✅ Redirect based on role
//       if (response.data?.user?.role === 'admin') {
//         console.log('🔄 Navigating to Admin Dashboard...')
//         navigate('/admin/dashboard')
//       } else {
//         console.log('🔄 Navigating to User Dashboard...')
//         navigate('/dashboard')
//       }
//     } catch (err) {
//       console.error('❌ Login error:', err)
//       console.error('Response data:', err.response?.data)
//       notify(err.response?.data?.message || 'Login failed', 'error')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div 
//       className="auth-wrapper" 
//       style={{ 
//         minHeight: '100vh', 
//         display: 'flex', 
//         alignItems: 'center', 
//         justifyContent: 'center', 
//         background: 'linear-gradient(135deg, #ffffff, #0f3d1c 100%)', 
//         padding: '2rem' 
//       }}
//     >
//       <Container>
//         <Row className="justify-content-center">
//           <Col md={6} lg={5}>
//             <div 
//               className="p-4 p-md-5" 
//               style={{ 
//                 background: '#e8f5e9', 
//                 borderRadius: '16px', 
//                 boxShadow: '0 20px 60px rgba(0,0,0,.3)' 
//               }}
//             >
//               <div className="text-center mb-4">
//                 <img src="/logo.png" alt="GARS Industries" style={{ height: '50px' }} />
//                 <h4 style={{ fontWeight: 900, color: '#1a6b2f', marginTop: '.4rem' }}>Welcome Back</h4>
//               </div>
              
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3">
//                   <Form.Label style={{ fontWeight: 600 }}>Email Address</Form.Label>
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
//                   <Form.Label style={{ fontWeight: 600 }}>Password</Form.Label>
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
//                   style={{ 
//                     background: '#2e8b47', 
//                     border: 'none', 
//                     padding: '.75rem', 
//                     fontWeight: 700 
//                   }}
//                   disabled={loading}
//                 >
//                   {loading ? 'Logging in...' : 'Login'}
//                 </Button>
//               </Form>
              
//               <div className="mt-3 text-center">
//                 <Link to="/register" style={{ color: '#1a6b2f', fontWeight: 600, textDecoration: 'none' }}>
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





import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useNotification } from '../../context/NotificationContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, user } = useAuth()
  const { notify } = useNotification()
  const navigate = useNavigate()

  useEffect(() => {
  if (!user) return;

  console.log("Current User:", user);

  if (user.role === "admin") {
    navigate("/admin/dashboard", { replace: true });
  } else {
    navigate("/dashboard", { replace: true });
  }
}, [user, navigate]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   if (!email || !password) {
  //     notify('Please fill in all fields', 'error')
  //     return
  //   }
  //   try {
  //     setLoading(true)
  //     console.log('🔐 Attempting login for:', email)

  //     const response = await login(email, password)
  //     console.log('✅ Login response:', response)
  //     console.log('👤 User object:', response.data?.user)
  //     console.log('🔑 User role:', response.data?.user?.role)

  //     notify('Login successful!', 'success')
      
  //     // ✅ Redirect based on role
  //     if (response.data?.user?.role === 'admin') {
  //       console.log('🔄 Navigating to Admin Dashboard...')
  //       navigate('/admin/dashboard')
  //     } else {
  //       console.log('🔄 Navigating to User Dashboard...')
  //       navigate('/dashboard')
  //     }
  //   } catch (err) {
  //     console.error('❌ Login error:', err)
  //     console.error('Response data:', err.response?.data)
  //     notify(err.response?.data?.message || 'Login failed', 'error')
  //   } finally {
  //     setLoading(false)
  //   }
  // }
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    notify("Please fill in all fields", "error");
    return;
  }

  try {
    setLoading(true);

    await login(email, password);

    notify("Login successful!", "success");

    // Don't navigate here.
    // useEffect will redirect after user state updates.
  } catch (err) {
    notify(err.response?.data?.message || "Login failed", "error");
  } finally {
    setLoading(false);
  }
};
  return (
    <div 
      className="auth-wrapper" 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: 'linear-gradient(135deg, #ffffff, #0f3d1c 100%)', 
        padding: '2rem' 
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <div 
              className="p-4 p-md-5" 
              style={{ 
                background: '#e8f5e9', 
                borderRadius: '16px', 
                boxShadow: '0 20px 60px rgba(0,0,0,.3)' 
              }}
            >
              <div className="text-center mb-4">
                <img src="/logo.png" alt="GARS Industries" style={{ height: '50px' }} />
                <h4 style={{ fontWeight: 900, color: '#1a6b2f', marginTop: '.4rem' }}>Welcome Back</h4>
              </div>
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: 600 }}>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    placeholder="you@example.com"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: 600 }}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    placeholder="••••••••"
                  />
                </Form.Group>
                
                <Button
                  type="submit"
                  className="w-100"
                  style={{ 
                    background: '#2e8b47', 
                    border: 'none', 
                    padding: '.75rem', 
                    fontWeight: 700 
                  }}
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </Form>
              
              <div className="mt-3 text-center">
                <Link to="/register" style={{ color: '#1a6b2f', fontWeight: 600, textDecoration: 'none' }}>
                  Don't have an account? Register
                </Link>
                <br />
                <Link to="/forgot-password" style={{ color: '#6b7c6d', fontSize: '.85rem' }}>
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