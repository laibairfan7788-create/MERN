

// import React from 'react'
// import { Row, Col, Card } from 'react-bootstrap'
// import { useAuth } from '../../context/AuthContext'
// import styled from 'styled-components'

// const DashboardWrapper = styled.div`
//   padding: 2rem 0;

//   h4 {
//     font-weight: 700;
//     color: var(--dark);
//   }

//   .dash-card {
//     border: none;
//     border-radius: 12px;
//     box-shadow: 0 2px 12px rgba(0,0,0,0.06);
//     transition: transform 0.2s;
//     &:hover {
//       transform: translateY(-4px);
//       box-shadow: 0 8px 24px rgba(46,139,71,0.12);
//     }
//     .card-icon {
//       font-size: 2rem;
//       color: var(--green-mid);
//       opacity: 0.6;
//     }
//   }
// `

// const UserDashboard = () => {
//   const { user } = useAuth()

//   const quickLinks = [
//     { icon: 'fa-user', title: 'My Profile', desc: 'View and edit your profile', link: '/profile' },
//     { icon: 'fa-shopping-bag', title: 'My Orders', desc: 'Track your order history', link: '/orders' },
//     { icon: 'fa-file-invoice', title: 'Request Quote', desc: 'Get a free quote for your project', link: '/quote' },
//     { icon: 'fa-headset', title: 'Support', desc: 'Contact our support team', link: '/contact' },
//   ]

//   return (
//     <DashboardWrapper>
//       <h4 className="mb-4">Welcome back, {user?.name}!</h4>
//       <p className="text-muted">Manage your account and orders.</p>

//       <Row className="g-4">
//         {quickLinks.map((item, idx) => (
//           <Col key={idx} md={3} sm={6}>
//             <a href={item.link} className="text-decoration-none">
//               <Card className="dash-card">
//                 <Card.Body>
//                   <div className="d-flex align-items-center gap-3">
//                     <i className={`fas ${item.icon} card-icon`}></i>
//                     <div>
//                       <h6 className="fw-bold mb-0">{item.title}</h6>
//                       <small className="text-muted">{item.desc}</small>
//                     </div>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </a>
//           </Col>
//         ))}
//       </Row>
//     </DashboardWrapper>
//   )
// }

// export default UserDashboard

import React, { useState } from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { useNotification } from '../../context/NotificationContext'
import { sendContact } from '../../api/contactApi'
import styled from 'styled-components'

const DashboardWrapper = styled.div`
  padding: 2rem 0;

  h4 {
    font-weight: 700;
    color: var(--dark);
  }

  .dash-card {
    border: none;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    transition: transform 0.2s;
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(46,139,71,0.12);
    }
    .card-icon {
      font-size: 2rem;
      color: var(--green-mid);
      opacity: 0.6;
    }
  }

  .quote-card {
    border: none;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    padding: 1.5rem;
    margin-top: 2rem;
  }

  .form-control, .form-select {
    border: 1.5px solid rgba(46, 139, 71, .2) !important;
    border-radius: 6px !important;
    padding: .75rem 1rem !important;
    font-size: .92rem;
    &:focus {
      border-color: var(--green-mid) !important;
      box-shadow: 0 0 0 3px rgba(46, 139, 71, .12) !important;
    }
  }

  .btn-primary-custom {
    background: var(--green-mid);
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: .75rem 2rem;
    font-weight: 700;
    font-size: .9rem;
    text-transform: uppercase;
    transition: background .2s, transform .15s, box-shadow .2s;
    cursor: pointer;
    width: 100%;
    &:hover {
      background: var(--green-dark);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(46, 139, 71, .35);
    }
    &:disabled {
      opacity: .7;
      cursor: not-allowed;
      transform: none;
    }
  }
`

const UserDashboard = () => {
  const { user, isAuthenticated } = useAuth()
  const { notify } = useNotification()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    requirement: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, message } = formData
    if (!name || !email || !message) {
      notify('Please fill in all required fields', 'error')
      return
    }
    try {
      setLoading(true)
      await sendContact(formData)
      notify('Thank you! We will get back to you soon.', 'success')
      setFormData({ name: '', phone: '', email: '', requirement: '', message: '' })
    } catch (err) {
      notify(err.response?.data?.message || 'Failed to send. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const quickLinks = [
    { icon: 'fa-user', title: 'My Profile', desc: 'View and edit your profile', link: '/profile' },
    { icon: 'fa-shopping-bag', title: 'My Orders', desc: 'Track your order history', link: '/orders' },
    { icon: 'fa-file-invoice', title: 'Request Quote', desc: 'Get a free quote for your project', link: '/quote' },
    { icon: 'fa-headset', title: 'Support', desc: 'Contact our support team', link: '/contact' },
  ]

  return (
    <DashboardWrapper>
      <h4 className="mb-4">
        {isAuthenticated ? `Welcome back, ${user?.name}!` : 'Welcome to GARS Industries'}
      </h4>
      <p className="text-muted">
        {isAuthenticated
          ? 'Manage your account and orders.'
          : 'Get a free quote for your artificial grass project.'}
      </p>

      {/* Quick Links */}
      <Row className="g-4">
        {quickLinks.map((item, idx) => (
          <Col key={idx} md={3} sm={6}>
            <a href={item.link} className="text-decoration-none">
              <Card className="dash-card">
                <Card.Body>
                  <div className="d-flex align-items-center gap-3">
                    <i className={`fas ${item.icon} card-icon`}></i>
                    <div>
                      <h6 className="fw-bold mb-0">{item.title}</h6>
                      <small className="text-muted">{item.desc}</small>
                      {!isAuthenticated && (item.link === '/profile' || item.link === '/orders') && (
                        <div className="mt-1">
                          <small className="text-danger">
                            <i className="fas fa-lock me-1"></i>Login required
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </a>
          </Col>
        ))}
      </Row>

      {/* Quote Form */}
      <Card className="quote-card">
        <Card.Body>
          <h5 className="text-center mb-3">Request a Free Quote</h5>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Your Name *</Form.Label>
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
              </Col>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="+92 xxx xxxxxxx"
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
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
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Project Type</Form.Label>
                  <Form.Select
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="">Select your requirement</option>
                    <option value="roof-top">Roof Top</option>
                    <option value="play-area">Play Area</option>
                    <option value="indoor-cricket">Indoor Cricket</option>
                    <option value="public-venue">Public Venue</option>
                    <option value="garden">Private Garden</option>
                    <option value="sports">Sports Court</option>
                    <option value="office">Office Space</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Message *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="Tell us about your project..."
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <button
                  type="submit"
                  className="btn-primary-custom"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Get a Free Quote'}
                </button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </DashboardWrapper>
  )
}

export default UserDashboard