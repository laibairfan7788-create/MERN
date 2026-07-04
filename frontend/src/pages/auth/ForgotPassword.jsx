// import React from "react";
// import AuthLayout from "../../components/layout/AuthLayout";

// export default function ForgotPassword() {
//   return (
//     <AuthLayout>
//       <h1 className="h4 mb-3">Forgot Password</h1>
//       <div className="text-muted">Scaffold forgot password page.</div>
//     </AuthLayout>
//   );
// }

import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const ForgotPassword = () => (
  <div className="auth-wrapper" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1a6b2f 0%, #0f3d1c 100%)', padding: '2rem' }}>
    <Container><Row className="justify-content-center"><Col md={6} lg={5}>
      <div className="p-4 p-md-5" style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,.3)' }}>
        <h4 className="text-center mb-4">Reset Password</h4>
        <Form>
          <Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" /></Form.Group>
          <Button type="submit" className="w-100" style={{ background: '#2e8b47', border: 'none' }}>Send Reset Link</Button>
        </Form>
        <div className="mt-3 text-center"><Link to="/login" style={{ color: '#2e8b47' }}>Back to Login</Link></div>
      </div>
    </Col></Row></Container>
  </div>
)
export default ForgotPassword