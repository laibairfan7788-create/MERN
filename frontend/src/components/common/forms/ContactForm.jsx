import React, { useState } from 'react'
import { Form, Button, Spinner, Alert, Row, Col } from 'react-bootstrap'
import { useNotification } from '../../../context/NotificationContext'

const ContactForm = ({ onSuccess, onCancel, initialData = null }) => {
  const { notify } = useNotification()
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    subject: initialData?.subject || '',
    message: initialData?.message || ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      setSubmitting(true)
      // Replace with your actual API call
      // await sendContactForm(formData)
      console.log('Contact form submitted:', formData)
      notify('Your message has been sent successfully!', 'success')
      if (onSuccess) onSuccess()
      // Reset form
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      notify(err.response?.data?.message || 'Failed to send message', 'error')
      setErrors({ submit: err.response?.data?.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Your Name *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              disabled={submitting}
              placeholder="John Doe"
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Email Address *</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              disabled={submitting}
              placeholder="you@example.com"
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={submitting}
              placeholder="+92 xxx xxxxxxx"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              disabled={submitting}
              placeholder="How can we help?"
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Message *</Form.Label>
        <Form.Control
          as="textarea"
          rows="4"
          name="message"
          value={formData.message}
          onChange={handleChange}
          isInvalid={!!errors.message}
          disabled={submitting}
          placeholder="Tell us about your project..."
        />
        <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
      </Form.Group>

      <div className="d-flex gap-3 mt-4">
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? (
            <>
              <Spinner size="sm" animation="border" className="me-2" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </Button>
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} disabled={submitting}>
            Cancel
          </Button>
        )}
      </div>
    </Form>
  )
}

export default ContactForm