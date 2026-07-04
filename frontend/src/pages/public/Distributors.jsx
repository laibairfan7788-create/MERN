// import React from "react";
// import MainLayout from "../../components/layout/MainLayout";

// export default function Distributors() {
//   return (
//     <MainLayout>
//       <div className="container py-4">
//         <h1 className="h3 mb-3">Distributors</h1>
//       </div>
//     </MainLayout>
//   );
// }

import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

const DistributorsWrapper = styled.div`
  padding: 90px 0;
  background: var(--white);
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

  .section-lead {
    color: var(--muted);
    font-size: 1.05rem;
    max-width: 600px;
    line-height: 1.7;
    margin: 0 auto;
    text-align: center;
  }

  .feature-card {
    background: var(--off-white);
    border-radius: 10px;
    padding: 2rem 1.6rem;
    height: 100%;
    border: 1px solid rgba(46, 139, 71, .1);
    transition: transform .25s, box-shadow .25s, border-color .25s;
    text-align: center;
    
    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 48px rgba(46, 139, 71, .14);
      border-color: var(--green-light);
    }
    
    .feature-icon {
      width: 58px;
      height: 58px;
      background: var(--green-pale);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.1rem;
      
      i {
        font-size: 1.45rem;
        color: var(--green-mid);
      }
    }
    
    h5 {
      font-size: 1.02rem;
      font-weight: 700;
      margin-bottom: .55rem;
    }
    
    p {
      font-size: .9rem;
      color: var(--muted);
      line-height: 1.65;
    }
  }

  // CTA Section
  .cta-section {
    background: linear-gradient(135deg, var(--green-dark) 0%, #0f3d1c 100%);
    padding: 80px 0;
    margin-top: 80px;
    border-radius: 12px;
    
    h2 {
      color: #fff;
      font-size: clamp(1.8rem, 3.5vw, 2.8rem);
      font-weight: 900;
      text-align: center;
    }
    
    p {
      color: rgba(255,255,255,.75);
      font-size: 1.05rem;
      max-width: 540px;
      margin: 1.5rem auto;
      text-align: center;
    }

    .btn-gold {
      background: var(--gold);
      color: #111;
      border: none;
      border-radius: 4px;
      padding: .85rem 2.4rem;
      font-family: 'Montserrat', sans-serif;
      font-weight: 700;
      font-size: .95rem;
      letter-spacing: .06em;
      text-transform: uppercase;
      text-decoration: none;
      display: inline-block;
      transition: background .2s, transform .15s;
      cursor: pointer;
      
      &:hover {
        background: #e0951a;
        color: #111;
        transform: translateY(-2px);
      }
    }

    .btn-outline-custom {
      border: 2px solid rgba(255,255,255,.7);
      color: #fff;
      border-radius: 4px;
      padding: .72rem 1.8rem;
      font-family: 'Montserrat', sans-serif;
      font-weight: 700;
      font-size: .9rem;
      letter-spacing: .05em;
      text-transform: uppercase;
      text-decoration: none;
      display: inline-block;
      transition: border-color .2s, background .2s;
      background: transparent;
      cursor: pointer;
      
      &:hover {
        border-color: #fff;
        background: rgba(255,255,255,.12);
        color: #fff;
      }
    }
  }
`

const Distributors = () => {
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

  const cards = [
    {
      icon: 'fa-map-marker-alt',
      title: 'Lahore – Head Office',
      description: '36 KM, Main Multan Rd, Shamkay Bhattian, Lahore, 54000, Pakistan'
    },
    {
      icon: 'fa-handshake',
      title: 'Become a Dealer',
      description: 'Interested in distributing GARS products in your area? Contact us today to discuss dealer partnership opportunities.'
    },
    {
      icon: 'fa-shipping-fast',
      title: 'Nationwide Delivery',
      description: 'We deliver and install across Pakistan. Get in touch with our team to arrange delivery to your city or town.'
    }
  ]

  return (
    <DistributorsWrapper>
      <Container>
        {/* ---- Header ---- */}
        <div className="text-center mb-5 fade-up">
          <div className="section-eyebrow">Our Network</div>
          <h2 className="section-title">Our <span>Distributors &amp; Dealers</span></h2>
          <div className="divider"></div>
          <p className="section-lead">GARS Industries has a growing network of authorized distributors and dealers across Pakistan. Contact us to become a dealer or to find your nearest stockist.</p>
        </div>

        {/* ---- Cards ---- */}
        <Row className="g-4 justify-content-center">
          {cards.map((card, index) => (
            <Col key={index} md={4} className="fade-up">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className={`fas ${card.icon}`}></i>
                </div>
                <h5>{card.title}</h5>
                <p>{card.description}</p>
              </div>
            </Col>
          ))}
        </Row>

        {/* ---- CTA Section ---- */}
        <div className="cta-section fade-up">
          <Container>
            <h2>Let's Bring Nature Into Your Lovely House</h2>
            <p>Request a quote without any delay. Our representative will visit you and advise the best suitable product and installation type that fits your needs.</p>
            <div className="d-flex flex-wrap gap-3 justify-content-center">
              <a href="https://wa.me/923099488890" target="_blank" className="btn-gold">
                <i className="fab fa-whatsapp me-2"></i>Get a Free Quote on WhatsApp
              </a>
              <a href="tel:+923097770664" className="btn-outline-custom">
                <i className="fas fa-phone-alt me-2"></i>Call Us Now
              </a>
            </div>
          </Container>
        </div>
      </Container>
    </DistributorsWrapper>
  )
}

export default Distributors