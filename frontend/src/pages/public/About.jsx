
// import React from 'react'
// import { Container } from 'react-bootstrap'
// const About = () => (
//   <Container className="py-5" style={{ marginTop: '80px' }}>
//     <h1>About Us</h1>
//     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...</p>
//   </Container>
// )
// export default About
import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

const AboutWrapper = styled.div`
  padding: 90px 0;
  background: var(--off-white);
  margin-top: 60px;

  .about-img-wrap {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,.13);
    
    img {
      width: 100%;
      display: block;
      aspect-ratio: 4/3;
      object-fit: cover;
    }
    
    .about-badge {
      position: absolute;
      bottom: -1.2rem;
      right: -1.2rem;
      background: var(--green-dark);
      color: #fff;
      border-radius: 8px;
      padding: 1.2rem 1.6rem;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,.2);
      
      .big {
        font-size: 2.2rem;
        font-weight: 900;
        color: var(--gold);
        font-family: 'Montserrat', sans-serif;
        line-height: 1;
      }
      
      .small {
        font-size: .75rem;
        text-transform: uppercase;
        letter-spacing: .1em;
        opacity: .85;
      }
    }
  }

  .section-eyebrow {
    font-size: .75rem;
    font-weight: 700;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--green-mid);
    margin-bottom: .7rem;
  }

  .section-title {
    font-size: clamp(1.9rem, 3.5vw, 2.8rem);
    font-weight: 900;
    color: var(--dark);
    line-height: 1.15;
    
    span {
      color: var(--green-mid);
    }
  }

  .divider {
    width: 52px;
    height: 4px;
    background: var(--gold);
    border-radius: 2px;
    margin: 1rem 0 1.5rem;
  }

  .check-list {
    list-style: none;
    padding: 0;
    
    li {
      padding: .45rem 0;
      color: var(--text);
      font-size: .97rem;
      
      i {
        color: var(--green-mid);
        margin-right: .6rem;
      }
    }
  }

  @media(max-width:768px) {
    .about-img-wrap .about-badge {
      position: relative;
      right: 0;
      bottom: 0;
      margin-top: 1.5rem;
      display: inline-block;
    }
  }
`

const About = () => {
  // Scroll animation
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

  return (
    <AboutWrapper>
      <Container>
        <Row className="align-items-center g-5">
          {/* ✅ Image on LEFT side */}
          <Col lg={5} className="fade-up">
            <div className="about-img-wrap">
              <img src="/banner1.jpg" alt="Artificial Grass Garden" />
              <div className="about-badge">
                <div className="big">10+</div>
                <div className="small">Years of Excellence</div>
              </div>
            </div>
          </Col>

          {/* ✅ Text on RIGHT side */}
          <Col lg={7} className="fade-up">
            <div className="section-eyebrow">Who We Are</div>
            <h2 className="section-title">Pakistan's <span>Premier</span> Artificial Grass Company</h2>
            <div className="divider"></div>

            <p style={{ color: 'var(--muted)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
              GARS Industries utilizes the most thoroughly researched, tested and proven synthetic grass production methods within the industry. GARS is the #1 artificial grass company in Pakistan — delivering high-quality grass made from innovative materials designed to last.
            </p>

            <p style={{ color: 'var(--muted)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
              Our synthetic grass is a lifestyle choice — it not only saves money and precious resources, but allows more free time for the essential things in life. No more mowing, no more watering, lower utility bills, and a perfectly green lawn all year round.
            </p>

            <ul className="check-list">
              <li><i className="fas fa-check-circle"></i> High-quality Pakistani-made grass with innovative materials</li>
              <li><i className="fas fa-check-circle"></i> ECO friendly &amp; termite / fungus resistant</li>
              <li><i className="fas fa-check-circle"></i> Indoor and outdoor — home, office &amp; commercial</li>
              <li><i className="fas fa-check-circle"></i> 3-year product &amp; installation warranty</li>
              <li><i className="fas fa-check-circle"></i> Front-rank manufacturer &amp; installer in Pakistan</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </AboutWrapper>
  )
}

export default About