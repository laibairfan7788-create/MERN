// import React from "react";
// import AuthLayout from "../../components/layout/AuthLayout";

// export default function Register() {
//   return (
//     <AuthLayout>
//       <h1 className="h4 mb-3">Register</h1>
//       <div className="text-muted">Scaffold register page.</div>
//     </AuthLayout>
//   );
// }

import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useNotification } from '../../context/NotificationContext'

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' })
  const { register } = useAuth()
  const { notify } = useNotification()
  const navigate = useNavigate()

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(formData)
      notify('Registration successful! Please login.', 'success')
      navigate('/login')
    } catch (err) {
      notify(err.response?.data?.message || 'Registration failed', 'error')
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
                <h4 style={{ fontWeight: 900, color: '#1a6b2f', marginTop: '.4rem' }}>Create Account</h4>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select name="role" value={formData.role} onChange={handleChange}>
                    {/* <option value="user">User</option> */}
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Form.Group>
                <Button type="submit" className="w-100" style={{ background: '#2e8b47', border: 'none', padding: '.75rem', fontWeight: 700 }}>Register</Button>
              </Form>
              <div className="mt-3 text-center">
                <Link to="/login" style={{ color: 'black', fontWeight: 600, textDecoration: 'none' }}>Already have an account? Login</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Register
