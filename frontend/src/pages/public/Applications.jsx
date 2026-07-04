import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

const ApplicationsWrapper = styled.div`
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

  .section-lead {
    color: var(--muted);
    font-size: 1.05rem;
    max-width: 600px;
    line-height: 1.7;
    margin: 0 auto;
    text-align: center;
  }

  .app-card {
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(0,0,0,.08);
    transition: transform .3s, box-shadow .3s;
    
    img {
      width: 100%;
      display: block;
      aspect-ratio: 4/3;
      object-fit: cover;
      transition: transform .4s;
    }
    
    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 40px rgba(46, 139, 71, .2);
      
      img {
        transform: scale(1.06);
      }
      
      .app-overlay {
        opacity: 1;
      }
    }
    
    .app-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(10, 42, 16, .85) 0%, transparent 50%);
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding: 1.8rem 1.2rem 1.5rem;
      opacity: 0;
      transition: opacity .3s;
      
      span {
        color: #fff;
        font-weight: 700;
        font-size: 1.1rem;
        font-family: 'Montserrat', sans-serif;
        letter-spacing: .04em;
        text-align: center;
      }
    }
    
    // Always show overlay on mobile
    @media(max-width:576px) {
      .app-overlay {
        opacity: 1;
        background: linear-gradient(to top, rgba(10, 42, 16, .75) 0%, transparent 40%);
        
        span {
          font-size: .95rem;
        }
      }
    }
  }
`

const Applications = () => {
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

  const applications = [
    { image: '/image1.jpg', title: 'Private Gardens' },
    { image: '/image2.jfif', title: 'Rooftop Gardens' },
    { image: '/image3.jfif', title: 'Sports Courts' },
    { image: '/image4.jfif', title: 'Playgrounds' },
    { image: '/image5.jfif', title: 'Office Spaces' },
    { image: '/image6.jfif', title: 'Public Venues' }
  ]

  return (
    <ApplicationsWrapper>
      <Container>
        {/* ---- HEADER ---- */}
        <div className="text-center mb-5 fade-up">
          <div className="section-eyebrow">Where It's Used</div>
          <h2 className="section-title">Versatile <span>Applications</span></h2>
          <div className="divider"></div>
          <p className="section-lead">From playgrounds to private gardens — GARS artificial grass transforms any space into a lush, green paradise.</p>
        </div>

        {/* ---- APPLICATION CARDS ---- */}
        <Row className="g-4">
          {applications.map((app, index) => (
            <Col key={index} sm={6} lg={4} className="fade-up">
              <div className="app-card">
                <img src={app.image} alt={app.title} />
                <div className="app-overlay">
                  <span>{app.title}</span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </ApplicationsWrapper>
  )
}

export default Applications