import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const FooterWrapper = styled.footer`
  background: var(--dark);
  color: rgba(255,255,255,.7);
  padding: 60px 0 0;
  .footer-brand img {
    height: 42px;
    margin-bottom: 1rem;
  }
  .footer-brand p {
    font-size: .88rem;
    line-height: 1.7;
    max-width: 280px;
  }
  h6 {
    color: pink;
    font-weight: 700;
    font-size: .85rem;
    letter-spacing: .1em;
    text-transform: uppercase;
    margin-bottom: 1.2rem;
  }
  .footer-links {
    list-style: none;
    padding: 0;
    li {
      margin-bottom: .55rem;
      a {
        color: rgba(255,255,255,.65);
        font-size: .88rem;
        text-decoration: none;
        transition: color .2s;
        &:hover {
          color: #f5a623;
        }
      }
    }
  }
  .social-links a {
    width: 38px;
    height: 38px;
    background: rgba(255,255,255,.08);
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: rgba(255,255,255,.7);
    font-size: .95rem;
    margin-right: .5rem;
    transition: background .2s, color .2s;
    text-decoration: none;
    &:hover {
      background: var(--green-mid);
      color: #fff;
    }
  }
  .footer-bottom {
    border-top: 1px solid rgba(255,255,255,.08);
    margin-top: 2.5rem;
    padding: 1.4rem 0;
    font-size: .82rem;
    color: rgba(255,255,255,.4);
  }
`

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <Row>
          <Col lg={4} md={6}>
            <div className="footer-brand">
              <img src="/logo.png" alt="GARS Industries" />
              <span style={{ color: '#fff', fontWeight: 900, fontSize: '1.2rem', marginLeft: '4px' }}>INDUSTRIES</span>
              <p>GARS utilizes the most thoroughly researched and proven synthetic grass production methods in the industry. GARS is the #1 artificial grass company in Pakistan.</p>
              <div className="social-links mt-3">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
                <a href="https://wa.me/923097770663" target="_blank"><i className="fab fa-whatsapp"></i></a>
              </div>
            </div>
          </Col>
          <Col lg={2} md={6} sm={6}>
            <h6>Navigation</h6>
            <ul className="footer-links">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/applications">Applications</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/distributors">Distributors</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </Col>
          <Col lg={3} md={6} sm={6}>
            <h6>Services</h6>
            <ul className="footer-links">
              <li><a href="#">Professional Installation</a></li>
              <li><a href="#">3 Years Warranty</a></li>
              <li><a href="#">Customise Your Mats</a></li>
              <li><a href="#">After-Care Service</a></li>
              <li><a href="#">Dealer Partnership</a></li>
            </ul>
          </Col>
          <Col lg={3} md={6}>
            <h6>Contact Info</h6>
            <ul className="footer-links">
              <li><i className="fas fa-map-marker-alt me-2" style={{ color: '#4caf50' }}></i>36 KM, Main Multan Rd, Shamkay Bhattian, Lahore, 54000, Pakistan</li>
              <li><a href="tel:+923097770664"><i className="fas fa-phone-alt me-2" style={{ color: '#4caf50' }}></i>+92 309 7770664</a></li>
              <li><a href="tel:+923097770665"><i className="fas fa-phone-alt me-2" style={{ color: '#4caf50' }}></i>+92 309 7770665</a></li>
              <li><a href="mailto:garspakistan@gmail.com"><i className="fas fa-envelope me-2" style={{ color: '#4caf50' }}></i>garspakistan@gmail.com</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="footer-bottom">
        <Container className="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <span style={{ color: '#fff' }}>© 2026 GARS INDUSTRIES (Pvt) Ltd. All rights reserved.</span>
          <span style={{ color: '#fff' }}>Made with <i className="fas fa-heart" style={{ color: '#e74c3c' }}></i> in Lahore, Pakistan</span>
        </Container>
      </div>
    </FooterWrapper>
  )
}

export default Footer