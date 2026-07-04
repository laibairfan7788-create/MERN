// import React from "react";
// import MainLayout from "../../components/layout/MainLayout";

// export default function Gallery() {
//   return (
//     <MainLayout>
//       <div className="container py-4">
//         <h1 className="h3 mb-3">Gallery</h1>
//       </div>
//     </MainLayout>
//   );
// }

import React, { useEffect } from 'react'
import { Container, Row, Col, Accordion } from 'react-bootstrap'
import styled from 'styled-components'

const GalleryWrapper = styled.div`
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

  // ===== GALLERY GRID =====
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    
    .gallery-item {
      border-radius: 10px;
      overflow: hidden;
      cursor: pointer;
      position: relative;
      
      img {
        width: 100%;
        display: block;
        aspect-ratio: 4/3;
        object-fit: cover;
        transition: transform .4s, filter .3s;
      }
      
      &:hover img {
        transform: scale(1.07);
        filter: brightness(1.08);
      }
      
      .gallery-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, rgba(0,0,0,.7), transparent);
        padding: 1.5rem 1rem .8rem;
        opacity: 0;
        transition: opacity .3s;
        
        span {
          color: #fff;
          font-weight: 600;
          font-size: .9rem;
        }
      }
      
      &:hover .gallery-overlay {
        opacity: 1;
      }
    }
  }

  @media(max-width:768px) {
    .gallery-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
  }

  @media(max-width:480px) {
    .gallery-grid {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  // ===== FAQ SECTION =====
  .faq-section {
    margin-top: 80px;
    padding-top: 60px;
    border-top: 2px solid rgba(46, 139, 71, .1);
  }

  .accordion-item {
    border: 1px solid rgba(46, 139, 71, .15) !important;
    border-radius: 8px !important;
    margin-bottom: .75rem;
    overflow: hidden;
  }

  .accordion-button {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: .97rem;
    color: var(--dark) !important;
    background: #fff !important;
    
    &:not(.collapsed) {
      color: var(--green-dark) !important;
      box-shadow: none !important;
    }
    
    &::after {
      filter: hue-rotate(100deg);
    }
  }

  .accordion-body {
    font-size: .92rem;
    color: var(--muted);
    line-height: 1.7;
  }
`

const Gallery = () => {
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

  const galleryImages = [
    { src: '/gallery1.jfif', title: 'Private Garden' },
    { src: '/gallery2.jfif', title: 'Rooftop Garden' },
    { src: '/gallery3.jfif', title: 'Sports Court' },
    { src: '/gallery4.jfif', title: 'Playground' },
    { src: '/gallery5.jfif', title: 'Office Space' },
     { src: '/G1.jpg', title: 'Office Space' },
      { src: '/G2.jpg', title: 'Office Space' },
       { src: '/G3.jpg', title: 'Office Space' },
        { src: '/G4.jpg', title: 'Office Space' },
         { src: '/G5.jpg', title: 'Office Space' },
          { src: '/G6.jpg', title: 'Office Space' },
           { src: '/G7.jpg', title: 'Office Space' },
            { src: '/G8.jpg', title: 'Office Space' },
             { src: '/G9.jpg', title: 'Office Space' },
              { src: '/G10.jpg', title: 'Office Space' },
               { src: '/G11.jpg', title: 'Office Space' },
                { src: '/G12.jpg', title: 'Office Space' },
    { src: '/gallery6.jfif', title: 'Public Venue' }
  ]

  const faqItems = [
    {
      question: 'Why should I choose GARS Industries?',
      answer: 'GARS Industries is Pakistan\'s #1 artificial grass company backed by years of experience, high-quality materials, and a proven installation process. We provide a 3-year warranty, professional after-care, and the fastest installation in the industry — making us the most trusted choice for homeowners and businesses alike.'
    },
    {
      question: 'What kind of maintenance does artificial grass need?',
      answer: 'Our artificial grass is virtually maintenance-free. No mowing, watering, spraying, or fertilizing is needed. A regular light brushing and occasional rinse with water is all that\'s required to keep it looking fresh and green all year round.'
    },
    {
      question: 'Are your workers certified and experienced?',
      answer: 'Yes! Our installation team is highly trained, experienced and professional. They handle every project with the same level of precision and care, whether it\'s a small balcony or a large commercial venue. We take pride in delivering clean, accurate, and long-lasting installations.'
    },
    {
      question: 'How long does artificial grass last?',
      answer: 'With proper care, GARS artificial grass can last 10–15 years or more. Our products are UV stable, termite resistant, fungus resistant, and designed to withstand Pakistan\'s climate conditions — making them a long-term, cost-effective investment.'
    },
    {
      question: 'Can I get a customized grass solution?',
      answer: 'Absolutely! We offer customized artificial grass mats and solutions tailored to your specific space, design preference, and budget. Contact our team to discuss your requirements and we\'ll provide a free consultation and quotation.'
    }
  ]

  return (
    <GalleryWrapper>
      <Container>
        {/* ---- HEADER ---- */}
        <div className="text-center mb-5 fade-up">
          <div className="section-eyebrow">Our Portfolio</div>
          <h2 className="section-title">Project <span>Gallery</span></h2>
          <div className="divider"></div>
        </div>

        {/* ---- GALLERY GRID ---- */}
        <div className="gallery-grid fade-up">
          {galleryImages.map((item, index) => (
            <div key={index} className="gallery-item">
              <img src={item.src} alt={item.title} />
              <div className="gallery-overlay">
                <span>{item.title}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ---- FAQ SECTION ---- */}
        <div className="faq-section fade-up">
          <div className="text-center mb-5">
            <div className="section-eyebrow">Have Questions?</div>
            <h2 className="section-title">Questions &amp; <span>Answers</span></h2>
            <div className="divider"></div>
          </div>

          <Row className="justify-content-center">
            <Col lg={8}>
              <Accordion defaultActiveKey="0">
                {faqItems.map((item, index) => (
                  <Accordion.Item key={index} eventKey={String(index)}>
                    <Accordion.Header>{item.question}</Accordion.Header>
                    <Accordion.Body>{item.answer}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
          </Row>
        </div>
      </Container>
    </GalleryWrapper>
  )
}

export default Gallery