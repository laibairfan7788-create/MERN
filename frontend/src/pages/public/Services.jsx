
// // import React, { useEffect } from 'react'
// // import { Container, Row, Col } from 'react-bootstrap'
// // import styled from 'styled-components'

// // const ServicesWrapper = styled.div`
// //   padding: 90px 0;
// //   background: var(--white);
// //   margin-top: 60px;

// //   .section-eyebrow {
// //     font-size: .75rem;
// //     font-weight: 700;
// //     letter-spacing: .18em;
// //     text-transform: uppercase;
// //     color: var(--green-mid);
// //     margin-bottom: .7rem;
// //   }

// //   .section-title {
// //     font-size: clamp(1.9rem, 3.5vw, 2.8rem);
// //     font-weight: 900;
// //     color: var(--dark);
// //     line-height: 1.15;
    
// //     span {
// //       color: var(--green-mid);
// //     }
// //   }

// //   .divider {
// //     width: 52px;
// //     height: 4px;
// //     background: var(--gold);
// //     border-radius: 2px;
// //     margin: 1rem auto 1.5rem;
// //   }

// //   .section-lead {
// //     color: var(--muted);
// //     font-size: 1.05rem;
// //     max-width: 600px;
// //     line-height: 1.7;
// //     margin: 0 auto;
// //   }

// //   .feature-card {
// //     background: var(--off-white);
// //     border-radius: 10px;
// //     padding: 2rem 1.6rem;
// //     height: 100%;
// //     border: 1px solid rgba(46, 139, 71, .1);
// //     transition: transform .25s, box-shadow .25s, border-color .25s;
// //     text-align: center;
    
// //     &:hover {
// //       transform: translateY(-6px);
// //       box-shadow: 0 16px 48px rgba(46, 139, 71, .14);
// //       border-color: var(--green-light);
// //     }
    
// //     .feature-icon {
// //       width: 70px;
// //       height: 70px;
// //       background: var(--green-pale);
// //       border-radius: 50%;
// //       display: flex;
// //       align-items: center;
// //       justify-content: center;
// //       margin: 0 auto 1.1rem;
      
// //       i {
// //         font-size: 1.8rem;
// //         color: var(--green-mid);
// //       }
// //     }
    
// //     h5 {
// //       font-size: 1.02rem;
// //       font-weight: 700;
// //       margin-bottom: .55rem;
// //     }
    
// //     p {
// //       font-size: .9rem;
// //       color: var(--muted);
// //       line-height: 1.65;
// //     }
// //   }

// //   .characteristics-section {
// //     background: var(--green-dark);
// //     padding: 80px 0;
// //     margin-top: 80px;
// //     border-radius: 12px;
    
// //     .char-title {
// //       color: #fff;
// //       font-size: clamp(1.9rem, 3.5vw, 2.8rem);
// //       font-weight: 900;
// //       text-align: center;
      
// //       span {
// //         color: var(--gold);
// //       }
// //     }
    
// //     .char-eyebrow {
// //       color: var(--gold);
// //       font-size: .75rem;
// //       font-weight: 700;
// //       letter-spacing: .18em;
// //       text-transform: uppercase;
// //       text-align: center;
// //       margin-bottom: .7rem;
// //     }
    
// //     .char-divider {
// //       width: 52px;
// //       height: 4px;
// //       background: red;
// //       opacity: .3;
// //       border-radius: 2px;
// //       margin: 1rem auto 1.5rem;
// //     }

// //     .char-item {
// //       text-align: center;
// //       padding: 1.6rem 1rem;
      
// //       .char-icon {
// //         width: 80px;
// //         height: 80px;
// //         background: rgba(255, 255, 255, .1);
// //         border: 2px solid rgba(255, 255, 255, .2);
// //         border-radius: 50%;
// //         display: flex;
// //         align-items: center;
// //         justify-content: center;
// //         margin: 0 auto 1rem;
// //         transition: background .2s, border-color .2s;
        
// //         i {
// //           font-size: 2rem;
// //           color: #fff;
// //         }
// //       }
      
// //       &:hover .char-icon {
// //         background: var(--green-mid);
// //         border-color: var(--green-mid);
// //       }
      
// //       h6 {
// //         color: #fff;
// //         font-weight: 700;
// //         font-size: .95rem;
// //         letter-spacing: .04em;
// //       }
// //     }
// //   }
// // `

// // const Services = () => {
// //   useEffect(() => {
// //     const fadeEls = document.querySelectorAll('.fade-up')
// //     const observer = new IntersectionObserver((entries) => {
// //       entries.forEach((entry, i) => {
// //         if (entry.isIntersecting) {
// //           setTimeout(() => entry.target.classList.add('visible'), i * 80)
// //           observer.unobserve(entry.target)
// //         }
// //       })
// //     }, { threshold: 0.1 })
// //     fadeEls.forEach(el => observer.observe(el))
// //     return () => observer.disconnect()
// //   }, [])

// //   // ✅ Services with their respective icons
// //   const services = [
// //     {
// //       icon: 'fa-palette',
// //       title: 'Décor Purpose',
// //       description: 'Soft, lush and natural-looking patterns perfect for all indoor and outdoor projects — from living rooms to rooftop gardens.'
// //     },
// //     {
// //       icon: 'fa-tools',
// //       title: 'Easy Installation',
// //       description: 'No need for a professional crew. It can be installed by you at home with no extra help necessary — saving time and cost.'
// //     },
// //     {
// //       icon: 'fa-scissors',
// //       title: 'Zero Lawn Costs',
// //       description: 'No mowing, no watering, no spraying, no fertilizing. Just enjoy a perfect show-garden all year round, every year.'
// //     },
// //     {
// //       icon: 'fa-clock',
// //       title: 'Long Lasting',
// //       description: 'Whether you have an extravagant roof garden, modest backyard or a tiny balcony — this is the perfect grass for every space.'
// //     },
// //     {
// //       icon: 'fa-leaf',
// //       title: 'Maintenance Free',
// //       description: 'Our artificial grass needs zero maintenance and looks perfectly fresh and green throughout every season of the year.'
// //     },
// //     {
// //       icon: 'fa-tint-slash',
// //       title: 'Water Saving',
// //       description: 'Artificial turf can potentially save thousands of gallons of water over the lifetime of your lawn — great for Pakistan\'s climate.'
// //     }
// //   ]

// //   // ✅ Characteristics with their respective icons
// //   const characteristics = [
// //     { icon: 'fa-sun', label: 'UV Stability' },
// //     { icon: 'fa-seedling', label: 'Eco-Friendly' },
// //     { icon: 'fa-wrench', label: 'Low Maintenance' },
// //     { icon: 'fa-coins', label: 'Cost-Effective' },
// //     { icon: 'fa-trophy', label: 'Superior Performance' },
// //     { icon: 'fa-shield-alt', label: 'Termite Resistant' }
// //   ]

// //   return (
// //     <ServicesWrapper>
// //       <Container>
// //         {/* ---- Services Cards ---- */}
// //         <div className="text-center mb-5 fade-up">
// //           <div className="section-eyebrow">What We Offer</div>
// //           <h2 className="section-title">Let's Make Your Garden <span>Beautiful &amp; Green</span></h2>
// //           <div className="divider"></div>
// //           <p className="section-lead">Every product and service we offer is designed with one goal — to give you a stunning, maintenance-free green space for life.</p>
// //         </div>

// //         <Row className="g-4">
// //           {services.map((service, index) => (
// //             <Col key={index} sm={6} lg={4} className="fade-up">
// //               <div className="feature-card">
// //                 <div className="feature-icon">
// //                   <i className={`fas ${service.icon}`}></i>
// //                 </div>
// //                 <h5>{service.title}</h5>
// //                 <p>{service.description}</p>
// //               </div>
// //             </Col>
// //           ))}
// //         </Row>

// //         {/* ---- Characteristics Section ---- */}
// //         <div className="characteristics-section fade-up">
// //           <Container>
// //             <div className="char-eyebrow">Product Quality</div>
// //             <h2 className="char-title">Key <span>Characteristics</span></h2>
// //             <div className="char-divider"></div>

// //             <Row className="g-3 justify-content-center">
// //               {characteristics.map((char, index) => (
// //                 <Col key={index} xs={6} md={4} lg={2} className="fade-up">
// //                   <div className="char-item">
// //                     <div className="char-icon">
// //                       <i className={`fas ${char.icon}`}></i>
// //                     </div>
// //                     <h6>{char.label}</h6>
// //                   </div>
// //                 </Col>
// //               ))}
// //             </Row>
// //           </Container>
// //         </div>
// //       </Container>
// //     </ServicesWrapper>
// //   )
// // }

// // export default Services
// import React, { useEffect } from 'react'
// import { Container, Row, Col, Card, Carousel } from 'react-bootstrap'
// import styled from 'styled-components'

// // ─── Styled Components ──────────────────────────────────────────────

// const ServicesWrapper = styled.div`
//   padding: 90px 0;
//   background: var(--white);
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

//   .section-lead {
//     color: var(--muted);
//     font-size: 1.05rem;
//     max-width: 800px;
//     line-height: 1.7;
//     margin: 0 auto;
//     text-align: center;
//   }

//   .banner-img {
//     width: 100%;
//     border-radius: 12px;
//     margin: 2rem 0;
//     box-shadow: 0 4px 20px rgba(0,0,0,0.08);
//   }

//   .service-card {
//     background: var(--off-white);
//     border-radius: 12px;
//     padding: 2rem 1.5rem;
//     height: 100%;
//     border: 1px solid rgba(46, 139, 71, .1);
//     transition: transform .25s, box-shadow .25s;
//     text-align: center;
//     &:hover {
//       transform: translateY(-6px);
//       box-shadow: 0 12px 40px rgba(46,139,71,0.12);
//     }
//     .card-icon {
//       font-size: 2.5rem;
//       color: var(--green-mid);
//       margin-bottom: 1rem;
//     }
//     h5 {
//       font-weight: 700;
//       margin-bottom: .5rem;
//     }
//     p {
//       color: var(--muted);
//       font-size: .95rem;
//       line-height: 1.6;
//     }
//   }

//   .testimonial-card {
//     background: var(--off-white);
//     border-radius: 12px;
//     padding: 2rem;
//     text-align: center;
//     border: 1px solid rgba(46, 139, 71, .1);
//     .testimonial-text {
//       font-style: italic;
//       color: var(--dark);
//       font-size: 1.05rem;
//       line-height: 1.6;
//     }
//     .testimonial-author {
//       font-weight: 700;
//       color: var(--green-mid);
//       margin-top: 1rem;
//     }
//     .testimonial-role {
//       color: var(--muted);
//       font-size: .85rem;
//     }
//   }

//   .cta-section {
//     background: linear-gradient(135deg, var(--green-dark) 0%, #0f3d1c 100%);
//     padding: 60px 0;
//     margin-top: 60px;
//     border-radius: 12px;
//     text-align: center;
//     h2 {
//       color: #fff;
//       font-weight: 900;
//       font-size: clamp(1.8rem, 3.5vw, 2.5rem);
//     }
//     p {
//       color: rgba(255,255,255,.8);
//       max-width: 600px;
//       margin: 1.5rem auto;
//       font-size: 1.05rem;
//     }
//     .btn-gold {
//       background: var(--gold);
//       color: #111;
//       border: none;
//       padding: .85rem 2.4rem;
//       font-weight: 700;
//       font-size: .95rem;
//       text-transform: uppercase;
//       border-radius: 4px;
//       text-decoration: none;
//       display: inline-block;
//       transition: background .2s, transform .15s;
//       &:hover {
//         background: #e0951a;
//         transform: translateY(-2px);
//         color: #111;
//       }
//     }
//   }

//   .section-title-left {
//     font-size: clamp(1.6rem, 2.5vw, 2.2rem);
//     font-weight: 700;
//     color: var(--dark);
//     margin-bottom: 1.2rem;
//     span {
//       color: var(--green-mid);
//     }
//   }

//   .advantage-list {
//     list-style: none;
//     padding: 0;
//     li {
//       padding: .5rem 0;
//       font-size: .98rem;
//       color: var(--text);
//       i {
//         color: var(--green-mid);
//         margin-right: .6rem;
//       }
//     }
//   }
// `

// // ─── Component ──────────────────────────────────────────────────────

// const Services = () => {
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

//   // ─── Data ────────────────────────────────────────────────────────
//   const advantages = [
//     'Feast your eyes looks of natural lawn with the replacement of artificial grass which gives beautiful and marvelous look.',
//     'Reduced environmental impact to water savings, 100% recyclable artificial lawns and ecological production processes.',
//     'Get rid of hustles to maintain your grass like trimming, watering or mowing and enjoy your time in comfort zone.',
//     'GARS Grass is high-quality Pakistani grass made from innovative materials.',
//     'Contrary to natural grass, artificial grass costs less in long run.',
//   ]

//   const servicesList = [
//     {
//       icon: 'fa-handshake',
//       title: 'Consulting',
//       desc: 'Our professional consulting services ensure provide, with products best appropriate to your needs. The GARS experienced sales team, is fortified, with expert knowledge, on wide range of synthetic turf product meet variety, of bids. Our in-house engineers provide methodological advice on base system ensuring meet it required standards.',
//     },
//     {
//       icon: 'fa-tools',
//       title: 'Installation',
//       desc: 'Professional installers will make sure that layers are completely hidden, perimeters and edges are perfectly finished and water can easily soak through. For superlative results recommend professional installation the experienced installers of trusted network.',
//     },
//     {
//       icon: 'fa-palette',
//       title: 'Décor Purpose',
//       desc: 'Artificial Grass Decor – unless thoroughly reviewed, it is very hard to tell the difference between real grass and fake grass. Originally developed for outdoor use, most especially in lawns, gardens and fake grass has come a long way now that it is also being used indoor to add décor and design.',
//     },
//     {
//       icon: 'fa-truck',
//       title: 'Logistic',
//       desc: 'As a professional synthetic turf factory, our far-reaching logistics network certifies that our artificial grass products are delivered to our clients at the appointed time and economically. We keep a close eye on shipping times and assist in updating customers with news on their orders.',
//     },
//     {
//       icon: 'fa-bullhorn',
//       title: 'Marketing',
//       desc: 'Our highly experienced marketing team provides high superiority sales tools such as brochures, samples, technical specifications, as well as personal and individual marketing support. Through hands-on social media engagement, the GARS brand is becoming more and more recognizable, assisting clients in winning more projects.',
//     },
//    {
//   icon: 'fa-shield-alt',
//   title: 'Quality Assurance',
//   desc: 'Every GARS product undergoes rigorous quality control from raw material selection to final production. Our in-house testing lab ensures that each batch meets international safety and durability standards. With a commitment to excellence, we guarantee that our artificial grass is UV-stable, lead-free, and built to withstand Pakistan\'s diverse climate conditions – giving you peace of mind with every installation.',
// }
//   ]

//   // const testimonials = [
//   //   {
//   //     name: 'Qurat ul Ain',
//   //     role: 'Customer',
//   //     text: 'Great experience with GARS Industries. Quality of Product is Perfect. Team of GARS are very cooperative.',
//   //   },
//   //   {
//   //     name: 'Kaleem Hafeez',
//   //     role: 'Customer',
//   //     text: 'Excellent Quality of Artificial Grass. Our Home looking beautiful due to decoration by Artificial Grass.',
//   //   },
//   //  ]

//   return (
//     <ServicesWrapper>
//       <Container>
//         {/* ─── Header ─── */}
//         <div className="text-center fade-up">
//           <div className="section-eyebrow">Our Services</div>
//           <h1 className="section-title">Professional <span>Artificial Grass Solutions</span></h1>
//           <div className="divider"></div>
//           <p className="section-lead">
//             GARS Pvt. Ltd. always adheres to business philosophy of “customer first, integrity management”.
//             The company’s products have undergone countless processes and repeated tests from materials design to production
//             to ensure are delivered to every customer. All products meet the requirements of safety and environmental protection.
//             GARS product is ready to export product. GARS artificial grass is export quality product.
//           </p>
//         </div>

//         {/* ─── Banner Image ─── */}
//         <img
//           src="/S1.jpg"
//           alt="GARS Artificial Grass"
//           className="banner-img fade-up"
//         />

//         {/* ─── Advantages ─── */}
//         <Row className="align-items-center g-5 fade-up">
//           <Col lg={6}>
//             <h2 className="section-title-left">Advantages!</h2>
//             <ul className="advantage-list">
//               {advantages.map((item, idx) => (
//                 <li key={idx}><i className="fas fa-check-circle"></i> {item}</li>
//               ))}
//             </ul>
//           </Col>
//           <Col lg={6}>
//             <img src="S2.jpg" alt="Advantages" className="img-fluid rounded-3 shadow-sm" />
//           </Col>
//         </Row>

//         <hr className="my-5" />

//         {/* ─── Services Cards ─── */}
//         <div className="fade-up">
//           <h2 className="section-title-left text-center mb-4">What We Offer</h2>
//           <Row className="g-4">
//             {servicesList.map((s, idx) => (
//               <Col key={idx} md={6} lg={4}>
//                 <div className="service-card">
//                   <div className="card-icon"><i className={`fas ${s.icon}`}></i></div>
//                   <h5>{s.title}</h5>
//                   <p>{s.desc}</p>
//                 </div>
//               </Col>
//             ))}
//           </Row>
//         </div>

//         {/* ─── Field Design ─── */}
//         <Row className="align-items-center g-5 mt-4 fade-up">
//           <Col lg={6}>
//             <img src="S5.jpg" alt="Field Design" className="img-fluid rounded-3 shadow-sm" />
//           </Col>
//           <Col lg={6}>
//             <h2 className="section-title-left">Field Design</h2>
//             <p className="text-muted">
//               In order to ensure our clients a straight forward project, we offer free expert field design and installation advice.
//               Each artificial grass field or landscape area is spot-on in our factory. We struggle for accurate designs to facilitate
//               easy transportation, installation and waste minimization for all new and resurfacing artificial turf projects.
//             </p>
//           </Col>
//         </Row>

//         <hr className="my-5" />

//         {/* ─── How to Maintain ─── */}
//         <div className="fade-up">
//           <h2 className="section-title-left text-center mb-4">How to Maintain Artificial Grass</h2>
//           <Row className="g-3">
//             <Col md={6} lg={4}>
//               <Card className="h-100 border-0 shadow-sm">
//                 <Card.Body>
//                   <i className="fas fa-car text-success me-2"></i> Heavy Vehicles are not allowed
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={6} lg={4}>
//               <Card className="h-100 border-0 shadow-sm">
//                 <Card.Body>
//                   <i className="fas fa-brush text-success me-2"></i> Use special brush to comb the grass twice a week
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={6} lg={4}>
//               <Card className="h-100 border-0 shadow-sm">
//                 <Card.Body>
//                   <i className="fas fa-soap text-success me-2"></i> Scrub with soap water, use dried towel to absorb stains
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={6} lg={4}>
//               <Card className="h-100 border-0 shadow-sm">
//                 <Card.Body>
//                   <i className="fas fa-tint-slash text-success me-2"></i> Use sponge to sop tetrachloroethylene for oil/paraffin stains
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={6} lg={4}>
//               <Card className="h-100 border-0 shadow-sm">
//                 <Card.Body>
//                   <i className="fas fa-paint-roller text-success me-2"></i> Scrub with turpentine or paint stripper for paints/coatings
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={6} lg={4}>
//               <Card className="h-100 border-0 shadow-sm">
//                 <Card.Body>
//                   <i className="fas fa-tools text-success me-2"></i> We Provide The Best Service From 10 Years
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </div>

//         <hr className="my-5" />

//         {/* ─── Testimonials ─── */}
//         <div className="fade-up">
//           <h2 className="section-title-left text-center mb-4">What Our Clients Say</h2>
//           <Row className="g-4">
//             {testimonials.map((t, idx) => (
//               <Col key={idx} md={6}>
//                 <div className="testimonial-card">
//                   <div className="testimonial-text">“{t.text}”</div>
//                   <div className="testimonial-author">{t.name}</div>
//                   <div className="testimonial-role">{t.role}</div>
//                 </div>
//               </Col>
//             ))}
//           </Row>
//         </div>

//         {/* ─── CTA Section ─── */}
//         <div className="cta-section fade-up">
//           <h2>Let's Bring Nature Into Your Lovely House</h2>
//           <p>
//             Request a quote without any delay. Feel free to contact us today and we will put you in touch with one of our best installers.
//             Our representative will visit you and advise you on the best suitable product and installation type to fit your needs.
//           </p>
//           <a href="/contact" className="btn-gold">Get a Free Quote</a>
//         </div>
//       </Container>
//     </ServicesWrapper>
//   )
// }

// export default Services
import React, { useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import styled from 'styled-components'

// ─── Styled Components ──────────────────────────────────────────────

const ServicesWrapper = styled.div`
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
    max-width: 800px;
    line-height: 1.7;
    margin: 0 auto;
    text-align: center;
  }

  .banner-img {
    width: 100%;
    border-radius: 12px;
    margin: 2rem 0;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  }

  .service-card {
    background: var(--off-white);
    border-radius: 12px;
    padding: 2rem 1.5rem;
    height: 100%;
    border: 1px solid rgba(46, 139, 71, .1);
    transition: transform .25s, box-shadow .25s;
    text-align: center;
    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 40px rgba(46,139,71,0.12);
    }
    .card-icon {
      font-size: 2.5rem;
      color: var(--green-mid);
      margin-bottom: 1rem;
    }
    h5 {
      font-weight: 700;
      margin-bottom: .5rem;
    }
    p {
      color: var(--muted);
      font-size: .95rem;
      line-height: 1.6;
    }
  }

  .testimonial-card {
    background: var(--off-white);
    border-radius: 12px;
    padding: 2rem;
    text-align: center;
    border: 1px solid rgba(46, 139, 71, .1);
    transition: transform .25s, box-shadow .25s;
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 30px rgba(46,139,71,0.08);
    }
    .avatar {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      object-fit: cover;
      margin: 0 auto 1rem;
      border: 3px solid var(--green-mid);
      display: block;
    }
    .testimonial-text {
      font-style: italic;
      color: var(--dark);
      font-size: 1.05rem;
      line-height: 1.6;
    }
    .testimonial-author {
      font-weight: 700;
      color: var(--green-mid);
      margin-top: 1rem;
    }
    .testimonial-role {
      color: var(--muted);
      font-size: .85rem;
    }
  }

  .cta-section {
    background: linear-gradient(135deg, var(--green-dark) 0%, #0f3d1c 100%);
    padding: 60px 0;
    margin-top: 60px;
    border-radius: 12px;
    text-align: center;
    h2 {
      color: #fff;
      font-weight: 900;
      font-size: clamp(1.8rem, 3.5vw, 2.5rem);
    }
    p {
      color: rgba(255,255,255,.8);
      max-width: 600px;
      margin: 1.5rem auto;
      font-size: 1.05rem;
    }
    .btn-gold {
      background: var(--gold);
      color: #111;
      border: none;
      padding: .85rem 2.4rem;
      font-weight: 700;
      font-size: .95rem;
      text-transform: uppercase;
      border-radius: 4px;
      text-decoration: none;
      display: inline-block;
      transition: background .2s, transform .15s;
      &:hover {
        background: #e0951a;
        transform: translateY(-2px);
        color: #111;
      }
    }
  }

  .section-title-left {
    font-size: clamp(1.6rem, 2.5vw, 2.2rem);
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 1.2rem;
    span {
      color: var(--green-mid);
    }
  }

  .advantage-list {
    list-style: none;
    padding: 0;
    li {
      padding: .5rem 0;
      font-size: .98rem;
      color: var(--text);
      i {
        color: var(--green-mid);
        margin-right: .6rem;
      }
    }
  }
`

// ─── Component ──────────────────────────────────────────────────────

const Services = () => {
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

  // ─── Data ────────────────────────────────────────────────────────
  const advantages = [
    'Feast your eyes looks of natural lawn with the replacement of artificial grass which gives beautiful and marvelous look.',
    'Reduced environmental impact to water savings, 100% recyclable artificial lawns and ecological production processes.',
    'Get rid of hustles to maintain your grass like trimming, watering or mowing and enjoy your time in comfort zone.',
    'GARS Grass is high-quality Pakistani grass made from innovative materials.',
    'Contrary to natural grass, artificial grass costs less in long run.',
  ]

  const servicesList = [
    {
      icon: 'fa-handshake',
      title: 'Consulting',
      desc: 'Our professional consulting services ensure provide, with products best appropriate to your needs. The GARS experienced sales team, is fortified, with expert knowledge, on wide range of synthetic turf product meet variety, of bids. Our in-house engineers provide methodological advice on base system ensuring meet it required standards.',
    },
    {
      icon: 'fa-tools',
      title: 'Installation',
      desc: 'Professional installers will make sure that layers are completely hidden, perimeters and edges are perfectly finished and water can easily soak through. For superlative results recommend professional installation the experienced installers of trusted network.',
    },
    {
      icon: 'fa-palette',
      title: 'Décor Purpose',
      desc: 'Artificial Grass Decor – unless thoroughly reviewed, it is very hard to tell the difference between real grass and fake grass. Originally developed for outdoor use, most especially in lawns, gardens and fake grass has come a long way now that it is also being used indoor to add décor and design.',
    },
    {
      icon: 'fa-truck',
      title: 'Logistic',
      desc: 'As a professional synthetic turf factory, our far-reaching logistics network certifies that our artificial grass products are delivered to our clients at the appointed time and economically. We keep a close eye on shipping times and assist in updating customers with news on their orders.',
    },
    {
      icon: 'fa-bullhorn',
      title: 'Marketing',
      desc: 'Our highly experienced marketing team provides high superiority sales tools such as brochures, samples, technical specifications, as well as personal and individual marketing support. Through hands-on social media engagement, the GARS brand is becoming more and more recognizable, assisting clients in winning more projects.',
    },
    {
      icon: 'fa-shield-alt',
      title: 'Quality Assurance',
      desc: 'Every GARS product undergoes rigorous quality control from raw material selection to final production. Our in-house testing lab ensures that each batch meets international safety and durability standards. With a commitment to excellence, we guarantee that our artificial grass is UV-stable, lead-free, and built to withstand Pakistan\'s diverse climate conditions – giving you peace of mind with every installation.',
    }
  ]

  // ─── NEW: Testimonials with images ──────────────────────────────
  const testimonials = [
    {
      name: 'Qurat ul Ain',
      role: 'Customer',
      text: 'Great experience with GARS Industries. Quality of Product is Perfect. Team of GARS are very cooperative.',
      image: '/client1.jpg', // place this image in public/
    },
    {
      name: 'Kaleem Hafeez',
      role: 'Customer',
      text: 'Excellent Quality of Artificial Grass. Our Home looking beautiful due to decoration by Artificial Grass.',
      image: '/client2.jpg', // place this image in public/
    },
  ]

  return (
    <ServicesWrapper>
      <Container>
        {/* ─── Header ─── */}
        <div className="text-center fade-up">
          <div className="section-eyebrow">Our Services</div>
          <h1 className="section-title">Professional <span>Artificial Grass Solutions</span></h1>
          <div className="divider"></div>
          <p className="section-lead">
            GARS Pvt. Ltd. always adheres to business philosophy of “customer first, integrity management”.
            The company’s products have undergone countless processes and repeated tests from materials design to production
            to ensure are delivered to every customer. All products meet the requirements of safety and environmental protection.
            GARS product is ready to export product. GARS artificial grass is export quality product.
          </p>
        </div>

        {/* ─── Banner Image ─── */}
        <img
          src="/S1.jpg"
          alt="GARS Artificial Grass"
          className="banner-img fade-up"
        />

        {/* ─── Advantages ─── */}
        <Row className="align-items-center g-5 fade-up">
          <Col lg={6}>
            <h2 className="section-title-left">Advantages!</h2>
            <ul className="advantage-list">
              {advantages.map((item, idx) => (
                <li key={idx}><i className="fas fa-check-circle"></i> {item}</li>
              ))}
            </ul>
          </Col>
          <Col lg={6}>
            <img src="S2.jpg" alt="Advantages" className="img-fluid rounded-3 shadow-sm" />
          </Col>
        </Row>

        <hr className="my-5" />

        {/* ─── Services Cards ─── */}
        <div className="fade-up">
          <h2 className="section-title-left text-center mb-4">What We Offer</h2>
          <Row className="g-4">
            {servicesList.map((s, idx) => (
              <Col key={idx} md={6} lg={4}>
                <div className="service-card">
                  <div className="card-icon"><i className={`fas ${s.icon}`}></i></div>
                  <h5>{s.title}</h5>
                  <p>{s.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* ─── Field Design ─── */}
        <Row className="align-items-center g-5 mt-4 fade-up">
          <Col lg={6}>
            <img src="S5.jpg" alt="Field Design" className="img-fluid rounded-3 shadow-sm" />
          </Col>
          <Col lg={6}>
            <h2 className="section-title-left">Field Design</h2>
            <p className="text-muted">
              In order to ensure our clients a straight forward project, we offer free expert field design and installation advice.
              Each artificial grass field or landscape area is spot-on in our factory. We struggle for accurate designs to facilitate
              easy transportation, installation and waste minimization for all new and resurfacing artificial turf projects.
            </p>
          </Col>
        </Row>

        <hr className="my-5" />

        {/* ─── How to Maintain ─── */}
        <div className="fade-up">
          <h2 className="section-title-left text-center mb-4">How to Maintain Artificial Grass</h2>
          <Row className="g-3">
            <Col md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <i className="fas fa-car text-success me-2"></i> Heavy Vehicles are not allowed
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <i className="fas fa-brush text-success me-2"></i> Use special brush to comb the grass twice a week
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <i className="fas fa-soap text-success me-2"></i> Scrub with soap water, use dried towel to absorb stains
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <i className="fas fa-tint-slash text-success me-2"></i> Use sponge to sop tetrachloroethylene for oil/paraffin stains
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <i className="fas fa-paint-roller text-success me-2"></i> Scrub with turpentine or paint stripper for paints/coatings
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <i className="fas fa-tools text-success me-2"></i> We Provide The Best Service From 10 Years
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        <hr className="my-5" />

        {/* ─── NEW: Testimonials with Images ─── */}
        <div className="fade-up">
          <div className="section-eyebrow">Client Feedback</div>
          <h2 className="section-title">What Our <span>Clients Say</span></h2>
          <div className="divider"></div>

          <Row className="g-4 justify-content-center">
            {testimonials.map((t, idx) => (
              <Col key={idx} md={6} lg={5}>
                <div className="testimonial-card">
                  <img src={t.image} alt={t.name} className="avatar" />
                  <div className="testimonial-text">“{t.text}”</div>
                  <div className="testimonial-author">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* ─── CTA Section ─── */}
        <div className="cta-section fade-up">
          <h2>Let's Bring Nature Into Your Lovely House</h2>
          <p>
            Request a quote without any delay. Feel free to contact us today and we will put you in touch with one of our best installers.
            Our representative will visit you and advise you on the best suitable product and installation type to fit your needs.
          </p>
          <a href="/contact" className="btn-gold">Get a Free Quote</a>
        </div>
      </Container>
    </ServicesWrapper>
  )
}

export default Services