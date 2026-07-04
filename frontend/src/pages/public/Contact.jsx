
// import React, { useState, useEffect } from 'react'
// import { Container, Row, Col, Form, Button } from 'react-bootstrap'
// import { useNotification } from '../../context/NotificationContext'
// import styled from 'styled-components'

// const ContactWrapper = styled.div`
//   padding: 90px 0;
//   background: var(--off-white);
//   margin-top: 60px;

//   .section-eyebrow {
//     font-size: .75rem;
//     font-weight: 700;
//     letter-spacing: .18em;
//     text-transform: uppercase;
//     color: var(--green-mid);
//     margin-bottom: .7rem;
//     text-align: center;
//   }

//   .section-title {
//     font-size: clamp(1.9rem, 3.5vw, 2.8rem);
//     font-weight: 900;
//     color: var(--dark);
//     line-height: 1.15;
//     text-align: center;
    
//     span {
//       color: var(--green-mid);
//     }
//   }

//   .divider {
//     width: 52px;
//     height: 4px;
//     background: var(--gold);
//     border-radius: 2px;
//     margin: 1rem auto 1.5rem;
//   }

//   .contact-card {
//     background: #fff;
//     border-radius: 10px;
//     padding: 2.2rem 2rem;
//     box-shadow: 0 8px 32px rgba(0,0,0,.07);
//     height: 100%;
//   }

//   .contact-info-item {
//     display: flex;
//     gap: 1rem;
//     margin-bottom: 1.5rem;
//     align-items: flex-start;
    
//     .ci-icon {
//       flex-shrink: 0;
//       width: 46px;
//       height: 46px;
//       background: var(--green-pale);
//       border-radius: 8px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
      
//       i {
//         color: var(--green-mid);
//         font-size: 1.2rem;
//       }
//     }
    
//     .ci-text {
//       h6 {
//         font-weight: 700;
//         font-size: .9rem;
//         margin-bottom: .2rem;
//       }
      
//       p, a {
//         font-size: .9rem;
//         color: var(--muted);
//         margin: 0;
//         text-decoration: none;
        
//         &:hover {
//           color: var(--green-mid);
//         }
//       }
//     }
//   }

//   .social-links {
//     a {
//       width: 38px;
//       height: 38px;
//       background: rgba(0,0,0,.06);
//       border-radius: 6px;
//       display: inline-flex;
//       align-items: center;
//       justify-content: center;
//       color: var(--muted);
//       font-size: .95rem;
//       margin-right: .5rem;
//       transition: background .2s, color .2s;
      
//       &:hover {
//         background: var(--green-mid);
//         color: #fff;
//       }
//     }
//   }

//   .form-label {
//     font-size: .88rem;
//     font-weight: 600;
//   }

//   .form-control, .form-select {
//     border: 1.5px solid rgba(46, 139, 71, .2) !important;
//     border-radius: 6px !important;
//     padding: .75rem 1rem !important;
//     font-size: .92rem;
//     transition: border-color .2s, box-shadow .2s;
    
//     &:focus {
//       border-color: var(--green-mid) !important;
//       box-shadow: 0 0 0 3px rgba(46, 139, 71, .12) !important;
//     }
//   }

//   .btn-primary-custom {
//     background: var(--green-mid);
//     color: #fff;
//     border: none;
//     border-radius: 4px;
//     padding: .75rem 2rem;
//     font-family: 'Montserrat', sans-serif;
//     font-weight: 700;
//     font-size: .9rem;
//     letter-spacing: .05em;
//     text-transform: uppercase;
//     text-decoration: none;
//     display: inline-block;
//     transition: background .2s, transform .15s, box-shadow .2s;
//     cursor: pointer;
//     width: 100%;
    
//     &:hover {
//       background: var(--green-dark);
//       color: #fff;
//       transform: translateY(-2px);
//       box-shadow: 0 8px 24px rgba(46, 139, 71, .35);
//     }
    
//     &:disabled {
//       opacity: .7;
//       cursor: not-allowed;
//       transform: none;
//     }
//   }
// `

// const Contact = () => {
//   const { notify } = useNotification()
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     requirement: '',
//     message: ''
//   })
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     const fadeEls = document.querySelectorAll('.fade-up')
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry, i) => {
//         if (entry.isIntersecting) {
//           setTimeout(() => entry.target.classList.add('visible'), i * 80)
//           observer.unobserve(entry.target)
//         }
//       })
//     }, { threshold: 0.1 })
//     fadeEls.forEach(el => observer.observe(el))
//     return () => observer.disconnect()
//   }, [])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const { name, email, message } = formData
//     if (!name || !email || !message) {
//       notify('Please fill in all required fields', 'error')
//       return
//     }
//     try {
//       setLoading(true)
//       // Replace with your actual API call
//       // await sendContactForm(formData)
//       console.log('Contact form data:', formData)
//       notify('Thank you! We will get back to you soon.', 'success')
//       setFormData({ name: '', phone: '', email: '', requirement: '', message: '' })
//     } catch (err) {
//       notify('Failed to send message. Please try again.', 'error')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <ContactWrapper>
//       <Container>
//         <div className="text-center mb-5 fade-up">
//           <div className="section-eyebrow">Reach Out</div>
//           <h2 className="section-title">Get In <span>Touch</span></h2>
//           <div className="divider"></div>
//         </div>

//         <Row className="g-4">
//           {/* LEFT SIDE - Contact Information */}
//           <Col lg={5} className="fade-up">
//             <div className="contact-card">
//               <h5 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, marginBottom: '1.5rem' }}>
//                 Contact Information
//               </h5>

//               <div className="contact-info-item">
//                 <div className="ci-icon"><i className="fas fa-map-marker-alt"></i></div>
//                 <div className="ci-text">
//                   <h6>Address</h6>
//                   <p>36 KM, Main Multan Rd, Shamkay Bhattian, Lahore, 54000, Pakistan</p>
//                 </div>
//               </div>

//               <div className="contact-info-item">
//                 <div className="ci-icon"><i className="fas fa-phone-alt"></i></div>
//                 <div className="ci-text">
//                   <h6>Phone</h6>
//                   <a href="tel:+923097770664">+92 309 7770664</a><br />
//                   <a href="tel:+923097770665">+92 309 7770665</a>
//                 </div>
//               </div>

//               <div className="contact-info-item">
//                 <div className="ci-icon"><i className="fas fa-envelope"></i></div>
//                 <div className="ci-text">
//                   <h6>Email</h6>
//                   <a href="mailto:garspakistan@gmail.com">garspakistan@gmail.com</a>
//                 </div>
//               </div>

//               <div className="contact-info-item">
//                 <div className="ci-icon"><i className="fab fa-whatsapp"></i></div>
//                 <div className="ci-text">
//                   <h6>WhatsApp</h6>
//                   <a href="https://wa.me/923097770663" target="_blank">+92 309 7770663</a>
//                 </div>
//               </div>

//               <hr style={{ borderColor: 'rgba(46,139,71,.15)', margin: '1.5rem 0' }} />

//               <div className="social-links">
//                 <a href="#"><i className="fab fa-facebook-f"></i></a>
//                 <a href="#"><i className="fab fa-instagram"></i></a>
//                 <a href="#"><i className="fab fa-youtube"></i></a>
//                 <a href="https://wa.me/923097770663" target="_blank"><i className="fab fa-whatsapp"></i></a>
//               </div>
//             </div>
//           </Col>

//           {/* RIGHT SIDE - Contact Form */}
//           <Col lg={7} className="fade-up">
//             <div className="contact-card">
//               <h5 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, marginBottom: '1.5rem' }}>
//                 Send Us a Message
//               </h5>

//               <Form onSubmit={handleSubmit}>
//                 <Row className="g-3">
//                   <Col sm={6}>
//                     <Form.Group>
//                       <Form.Label className="form-label">Customer Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                         disabled={loading}
//                         placeholder="Your full name"
//                       />
//                     </Form.Group>
//                   </Col>

//                   <Col sm={6}>
//                     <Form.Group>
//                       <Form.Label className="form-label">Phone Number</Form.Label>
//                       <Form.Control
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         disabled={loading}
//                         placeholder="+92 xxx xxxxxxx"
//                       />
//                     </Form.Group>
//                   </Col>

//                   <Col xs={12}>
//                     <Form.Group>
//                       <Form.Label className="form-label">Email Address</Form.Label>
//                       <Form.Control
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         disabled={loading}
//                         placeholder="your@email.com"
//                       />
//                     </Form.Group>
//                   </Col>

//                   <Col xs={12}>
//                     <Form.Group>
//                       <Form.Label className="form-label">Required for</Form.Label>
//                       <Form.Select
//                         name="requirement"
//                         value={formData.requirement}
//                         onChange={handleChange}
//                         disabled={loading}
//                       >
//                         <option value="">Select your requirement</option>
//                         <option value="roof-top">Roof Top</option>
//                         <option value="play-area">Play Area</option>
//                         <option value="indoor-cricket">Indoor Cricket</option>
//                         <option value="public-venue">Public Venue</option>
//                         <option value="garden">Private Garden</option>
//                         <option value="sports">Sports Court</option>
//                         <option value="office">Office Space</option>
//                       </Form.Select>
//                     </Form.Group>
//                   </Col>

//                   <Col xs={12}>
//                     <Form.Group>
//                       <Form.Label className="form-label">Message</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         rows="4"
//                         name="message"
//                         value={formData.message}
//                         onChange={handleChange}
//                         required
//                         disabled={loading}
//                         placeholder="Tell us about your project..."
//                       />
//                     </Form.Group>
//                   </Col>

//                   <Col xs={12}>
//                     <button
//                       type="submit"
//                       className="btn-primary-custom"
//                       disabled={loading}
//                     >
//                       {loading ? (
//                         <>
//                           <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                           Sending...
//                         </>
//                       ) : (
//                         <>
//                           <i className="fas fa-paper-plane me-2"></i> Send Message
//                         </>
//                       )}
//                     </button>
//                   </Col>
//                 </Row>
//               </Form>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </ContactWrapper>
//   )
// }

// export default Contact
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNotification } from '../../context/NotificationContext'
import { sendContact } from '../../api/contactApi'   // ✅ API function
import styled from 'styled-components'

const ContactWrapper = styled.div`
  padding: 90px 0;
  background: var(--off-white);
  margin-top: 60px;

  .section-eyebrow {
    font-size: .75rem;
    font-weight: 700;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--green-mid);
    margin-bottom: .7rem;
    text-align: center;
  }

  .section-title {
    font-size: clamp(1.9rem, 3.5vw, 2.8rem);
    font-weight: 900;
    color: var(--dark);
    line-height: 1.15;
    text-align: center;
    
    span {
      color: var(--green-mid);
    }
  }

  .divider {
    width: 52px;
    height: 4px;
    background: var(--gold);
    border-radius: 2px;
    margin: 1rem auto 1.5rem;
  }

  .contact-card {
    background: #fff;
    border-radius: 10px;
    padding: 2.2rem 2rem;
    box-shadow: 0 8px 32px rgba(0,0,0,.07);
    height: 100%;
  }

  .contact-info-item {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    align-items: flex-start;
    
    .ci-icon {
      flex-shrink: 0;
      width: 46px;
      height: 46px;
      background: var(--green-pale);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      i {
        color: var(--green-mid);
        font-size: 1.2rem;
      }
    }
    
    .ci-text {
      h6 {
        font-weight: 700;
        font-size: .9rem;
        margin-bottom: .2rem;
      }
      
      p, a {
        font-size: .9rem;
        color: var(--muted);
        margin: 0;
        text-decoration: none;
        
        &:hover {
          color: var(--green-mid);
        }
      }
    }
  }

  .social-links {
    a {
      width: 38px;
      height: 38px;
      background: rgba(0,0,0,.06);
      border-radius: 6px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--muted);
      font-size: .95rem;
      margin-right: .5rem;
      transition: background .2s, color .2s;
      
      &:hover {
        background: var(--green-mid);
        color: #fff;
      }
    }
  }

  .form-label {
    font-size: .88rem;
    font-weight: 600;
  }

  .form-control, .form-select {
    border: 1.5px solid rgba(46, 139, 71, .2) !important;
    border-radius: 6px !important;
    padding: .75rem 1rem !important;
    font-size: .92rem;
    transition: border-color .2s, box-shadow .2s;
    
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
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: .9rem;
    letter-spacing: .05em;
    text-transform: uppercase;
    text-decoration: none;
    display: inline-block;
    transition: background .2s, transform .15s, box-shadow .2s;
    cursor: pointer;
    width: 100%;
    
    &:hover {
      background: var(--green-dark);
      color: #fff;
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

const Contact = () => {
  const { notify } = useNotification()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    requirement: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fadeEls = document.querySelectorAll('.fade-up')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })
    fadeEls.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

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
      // ✅ Send data to backend
      await sendContact(formData)
      notify('Thank you! We will get back to you soon.', 'success')
      // Reset form
      setFormData({ name: '', phone: '', email: '', requirement: '', message: '' })
    } catch (err) {
      console.error('Contact error:', err)
      const errorMsg = err.response?.data?.message || 'Failed to send message. Please try again.'
      notify(errorMsg, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ContactWrapper>
      <Container>
        <div className="text-center mb-5 fade-up">
          <div className="section-eyebrow">Reach Out</div>
          <h2 className="section-title">Get In <span>Touch</span></h2>
          <div className="divider"></div>
        </div>

        <Row className="g-4">
          {/* LEFT SIDE - Contact Information */}
          <Col lg={5} className="fade-up">
            <div className="contact-card">
              <h5 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, marginBottom: '1.5rem' }}>
                Contact Information
              </h5>

              <div className="contact-info-item">
                <div className="ci-icon"><i className="fas fa-map-marker-alt"></i></div>
                <div className="ci-text">
                  <h6>Address</h6>
                  <p>36 KM, Main Multan Rd, Shamkay Bhattian, Lahore, 54000, Pakistan</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="ci-icon"><i className="fas fa-phone-alt"></i></div>
                <div className="ci-text">
                  <h6>Phone</h6>
                  <a href="tel:+923097770664">+92 309 7770664</a><br />
                  <a href="tel:+923097770665">+92 309 7770665</a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="ci-icon"><i className="fas fa-envelope"></i></div>
                <div className="ci-text">
                  <h6>Email</h6>
                  <a href="mailto:garspakistan@gmail.com">garspakistan@gmail.com</a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="ci-icon"><i className="fab fa-whatsapp"></i></div>
                <div className="ci-text">
                  <h6>WhatsApp</h6>
                  <a href="https://wa.me/923097770663" target="_blank">+92 309 7770663</a>
                </div>
              </div>

              <hr style={{ borderColor: 'rgba(46,139,71,.15)', margin: '1.5rem 0' }} />

              <div className="social-links">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
                <a href="https://wa.me/923097770663" target="_blank"><i className="fab fa-whatsapp"></i></a>
              </div>
            </div>
          </Col>

          {/* RIGHT SIDE - Contact Form */}
          <Col lg={7} className="fade-up">
            <div className="contact-card">
              <h5 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, marginBottom: '1.5rem' }}>
                Send Us a Message
              </h5>

              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label className="form-label">Customer Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="Your full name"
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label className="form-label">Phone Number</Form.Label>
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
                      <Form.Label className="form-label">Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="your@email.com"
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label className="form-label">Required for</Form.Label>
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
                      <Form.Label className="form-label">Message</Form.Label>
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
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane me-2"></i> Send Message
                        </>
                      )}
                    </button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </ContactWrapper>
  )
}

export default Contact