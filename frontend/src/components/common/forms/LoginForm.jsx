import React, { useState } from 'react'
import { Form, Button, Spinner, Alert } from 'react-bootstrap'
import { useAuth } from '../../../context/AuthContext'
import { useNotification } from '../../../context/NotificationContext'

const LoginForm = ({ onSuccess, onCancel, redirectTo = '/dashboard' }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const { notify } = useNotification()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    try {
      setLoading(true)
      setError('')
      await login(email, password)
      notify('Login successful!', 'success')
      if (onSuccess) {
        onSuccess()
      } else {
        window.location.href = redirectTo
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed'
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
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          placeholder="you@example.com"
          autoFocus
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          placeholder="••••••••"
        />
      </Form.Group>

      <div className="d-flex gap-3 mt-4">
        <Button type="submit" variant="primary" disabled={loading} className="flex-grow-1">
          {loading ? (
            <>
              <Spinner size="sm" animation="border" className="me-2" />
              Logging in...
            </>
          ) : (
            'Login'
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

export default LoginForm