// import React from "react";
// import MainLayout from "../../components/layout/MainLayout";

// export default function QuoteRequest() {
//   return (
//     <MainLayout>
//       <div className="container py-4">
//         <h1 className="h3 mb-3">Quote Request</h1>
//       </div>
//     </MainLayout>
//   );
// }

import React, { useState } from 'react'
import { Card, Form, Button, Row, Col, Spinner } from 'react-bootstrap'
import { useNotification } from '../../context/NotificationContext'
import { createQuote } from '../../api/userApi'
import styled from 'styled-components'

const QuoteWrapper = styled.div`
  padding: 2rem 0;

  h4 {
    font-weight: 700;
    color: var(--dark);
  }

  .quote-card {
    border: none;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }
`

const QuoteRequest = () => {
  const { notify } = useNotification()
  const [formData, setFormData] = useState({
    projectType: '',
    areaSize: '',
    location: '',
    budget: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.projectType || !formData.areaSize) {
      notify('Please fill in all required fields', 'error')
      return
    }
    try {
      setLoading(true)
      await createQuote(formData)
      notify('Quote request submitted! We will contact you soon.', 'success')
      setFormData({ projectType: '', areaSize: '', location: '', budget: '', message: '' })
    } catch {
      notify('Failed to submit request', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <QuoteWrapper>
      <h4 className="mb-4">Request a Quote</h4>
      <p className="text-muted">Tell us about your project, and we'll get back to you with the best solution.</p>

      <Card className="quote-card">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Project Type <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select type…</option>
                    <option value="roof-top">Roof Top Garden</option>
                    <option value="private-garden">Private Garden</option>
                    <option value="playground">Playground</option>
                    <option value="sports">Sports Court</option>
                    <option value="office">Office Space</option>
                    <option value="public">Public Venue</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Area Size (sq ft) <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="number"
                    name="areaSize"
                    value={formData.areaSize}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 500"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City / Area"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Budget Range</Form.Label>
              <Form.Select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
              >
                <option value="">Select budget…</option>
                <option value="under-5000">Under $5,000</option>
                <option value="5000-15000">$5,000 – $15,000</option>
                <option value="15000-30000">$15,000 – $30,000</option>
                <option value="over-30000">Over $30,000</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Additional Details</Form.Label>
              <Form.Control
                as="textarea"
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project…"
              />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Submitting…' : 'Submit Request'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </QuoteWrapper>
  )
}

export default QuoteRequest