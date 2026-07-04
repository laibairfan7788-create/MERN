import React, { useState } from 'react'
import { Form, Button, Spinner, Alert, Row, Col } from 'react-bootstrap'
import { useAuth } from '../../../context/AuthContext'
import { useNotification } from '../../../context/NotificationContext'

const RegisterForm = ({ onSuccess, onCancel, redirectTo = '/login' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { register } = useAuth()
  const { notify } = useNotification()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const validate = () => {
    if (!formData.name.trim()) {
      setError('Name is required')
      return false
    }
    if (!formData.email.trim()) {
      setError('Email is required')
      return false
    }
    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role
    }

    try {
      setLoading(true)
      setError('')
      await register(payload)
      notify('Registration successful! Please login.', 'success')
      if (onSuccess) {
        onSuccess()
      } else {
        window.location.href = redirectTo
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed'
      setError(msg)
      notify(msg, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Full Name *</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={loading}
          placeholder="John Doe"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email Address *</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
          placeholder="you@example.com"
        />
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Password *</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Min 6 characters"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password *</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Re-enter password"
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Role</Form.Label>
        <Form.Select
          name="role"
          value={formData.role}
          onChange={handleChange}
          disabled={loading}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="editor">Editor</option>
        </Form.Select>
      </Form.Group>

      <div className="d-flex gap-3 mt-4">
        <Button type="submit" variant="primary" disabled={loading} className="flex-grow-1">
          {loading ? (
            <>
              <Spinner size="sm" animation="border" className="me-2" />
              Creating Account...
            </>
          ) : (
            'Register'
          )}
        </Button>
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
        )}
      </div>
    </Form>
  )
}

export default RegisterForm