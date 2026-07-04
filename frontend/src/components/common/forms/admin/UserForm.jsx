import React, { useState, useEffect } from 'react'
import { Form, Button, Spinner, Alert } from 'react-bootstrap'
import { useNotification } from '../../../context/NotificationContext'
import { createUser, updateUser } from '../../../api/adminApi'

const UserForm = ({ initialData = null, onSuccess, onCancel }) => {
  const { notify } = useNotification()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    status: 'active'
  })
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        password: '', // password is not prefilled for security
        role: initialData.role || 'user',
        status: initialData.status || 'active'
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!initialData && !formData.password) newErrors.password = 'Password is required for new user'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    const payload = { ...formData }
    if (!payload.password) delete payload.password // don't send empty password

    try {
      setSubmitting(true)
      if (initialData?.id) {
        await updateUser(initialData.id, payload)
        notify('User updated successfully', 'success')
      } else {
        await createUser(payload)
        notify('User created successfully', 'success')
      }
      if (onSuccess) onSuccess()
    } catch (err) {
      notify(err.response?.data?.message || 'Failed to save user', 'error')
      setErrors({ submit: err.response?.data?.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Name *</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          isInvalid={!!errors.name}
          disabled={submitting}
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email *</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
          disabled={submitting}
        />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{initialData ? 'New Password (optional)' : 'Password *'}</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          isInvalid={!!errors.password}
          disabled={submitting}
          placeholder={initialData ? 'Leave blank to keep current' : ''}
        />
        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Role</Form.Label>
        <Form.Select
          name="role"
          value={formData.role}
          onChange={handleChange}
          disabled={submitting}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="editor">Editor</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Select
          name="status"
          value={formData.status}
          onChange={handleChange}
          disabled={submitting}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
          <option value="banned">Banned</option>
        </Form.Select>
      </Form.Group>

      <div className="d-flex gap-3 mt-4">
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? (
            <>
              <Spinner size="sm" animation="border" className="me-2" />
              {initialData ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            initialData ? 'Update User' : 'Create User'
          )}
        </Button>
        <Button variant="secondary" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
      </div>
    </Form>
  )
}

export default UserForm