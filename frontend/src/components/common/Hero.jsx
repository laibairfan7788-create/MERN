import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'react-bootstrap'

const HeroWrapper = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(0,0,0,.62) 0%, rgba(26,107,47,.55) 100%),
    url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80') center/cover no-repeat;
  display: flex;
  align-items: center;
  position: relative;
  .hero-badge {
    display: inline-block;
    background: #f5a623;
    color: #111;
    font-size: .72rem;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
    padding: .3rem .9rem;
    border-radius: 2px;
    margin-bottom: 1.2rem;
  }
  .hero-title {
    font-size: clamp(2.6rem, 6vw, 5.2rem);
    font-weight: 900;
    color: #fff;
    line-height: 1.08;
    letter-spacing: -.01em;
    span { color: #4caf50; }
  }
  .hero-sub {
    color: rgba(255,255,255,.82);
    font-size: 1.12rem;
    max-width: 520px;
    margin-top: .9rem;
    line-height: 1.65;
  }
  .hero-phones a {
    color: #fff;
    font-weight: 600;
    font-size: 1rem;
    text-decoration: none;
    margin-right: 1.5rem;
    transition: color .2s;
    &:hover { color: #f5a623; }
    i { color: #4caf50; margin-right: .4rem; }
  }
  .btn-primary-custom {
    background: #2e8b47;
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
    &:hover {
      background: #1a6b2f;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(46,139,71,.35);
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
    }
  }
  .hero-scroll {
    position: absolute;
    bottom: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: rgba(255,255,255,.6);
    font-size: .75rem;
    letter-spacing: .1em;
    text-transform: uppercase;
    i {
      animation: bounce 1.6s infinite;
      margin-top: .4rem;
      font-size: 1.2rem;
    }
  }
  @keyframes bounce {
    0%,100% { transform: translateY(0); }
    50% { transform: translateY(6px); }
  }
`

const Hero = () => {
  return (
    <HeroWrapper>
      <Container>
        <Row>
          <Col lg={7}>
            {/* <div className="hero-badge">First Time in Pakistan – Never Before</div> */}
            <h1 className="hero-title">Artificial<br /><span>Grass</span><br />Revolution</h1>
            <p className="hero-sub">A new concept in Home & Office furnishing rapidly emerging in the European market. ECO Friendly, Termite &amp; Fungus Resistant — crafted for Pakistan's climate.</p>
            <div className="hero-phones mt-3 mb-4">
              <a href="tel:+923097770664"><i className="fas fa-phone-alt"></i>+92 309 7770664</a>
              <a href="tel:+923097770665"><i className="fas fa-phone-alt"></i>+92 309 7770665</a>
            </div>
            <div className="d-flex flex-wrap gap-3">
              <a href="https://wa.me/923097770663" target="_blank" className="btn-primary-custom">Get Free Quote</a>
              <a href="#gallery" className="btn-outline-custom">View Gallery</a>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="hero-scroll">
        <span>Scroll</span>
        <i className="fas fa-chevron-down"></i>
      </div>
    </HeroWrapper>
  )
}

export default Hero