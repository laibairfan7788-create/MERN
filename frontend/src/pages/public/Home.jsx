// import React from "react";

// import MainLayout from "../../components/layout/MainLayout";

// export default function Home() {
//   return (
//     <MainLayout>
//       <div className="container py-4">
//         <h1 className="h3 mb-3">Home</h1>
//         <p className="text-muted">Public landing page scaffold.</p>
//       </div>
//     </MainLayout>
//   );
// }

import React, { useEffect } from 'react'
import Hero from '../../components/common/Hero'
import Stats from '../../components/common/Stats'
import { Container, Row, Col } from 'react-bootstrap'
import FeatureCard from '../../components/common/FeatureCard'
import AppCard from '../../components/common/AppCard'
import GalleryGrid from '../../components/common/GalleryGrid'
import FAQAccordion from '../../components/common/FAQAccordion'

const Home = () => {
  // Scroll animation observer
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

  const features = [
    { icon: 'fa-palette', title: 'Décor Purpose', description: 'Soft, lush and natural-looking patterns perfect for all indoor and outdoor projects — from living rooms to rooftop gardens.' },
    { icon: 'fa-tools', title: 'Easy Installation', description: 'No need for a professional crew. It can be installed by you at home with no extra help necessary — saving time and cost.' },
    { icon: 'fa-scissors', title: 'Zero Lawn Costs', description: 'No mowing, no watering, no spraying, no fertilizing. Just enjoy a perfect show-garden all year round, every year.' },
    { icon: 'fa-clock', title: 'Long Lasting', description: 'Whether you have an extravagant roof garden, modest backyard or a tiny balcony — this is the perfect grass for every space.' },
    { icon: 'fa-leaf', title: 'Maintenance Free', description: 'Our artificial grass needs zero maintenance and looks perfectly fresh and green throughout every season of the year.' },
    { icon: 'fa-tint-slash', title: 'Water Saving', description: 'Artificial turf can potentially save thousands of gallons of water over the lifetime of your lawn — great for Pakistan\'s climate.' },
  ]

  const applications = [
    { image: '/image1.jpg', title: 'Private Gardens' },
    { image: '/image2.jfif', title: 'Rooftop Gardens' },
    { image: '/image3.jfif', title: 'Sports Courts' },
    { image: '/image4.jfif', title: 'Playgrounds' },
    { image: '/image5.jfif', title: 'Office Spaces' },
    { image: '/image6.jfif', title: 'Public Venues' },
  ]

  const galleryImages = [
    '/gallery1.jfif', '/gallery2.jfif', '/gallery3.jfif',
    '/gallery4.jfif', '/gallery5.jfif', '/gallery6.jfif'
  ]

  const faqItems = [
    { question: 'Why should I choose GARS Industries?', answer: 'GARS Industries is Pakistan\'s #1 artificial grass company backed by years of experience, high-quality materials, and a proven installation process. We provide a 3-year warranty, professional after-care, and the fastest installation in the industry — making us the most trusted choice for homeowners and businesses alike.' },
    { question: 'What kind of maintenance does artificial grass need?', answer: 'Our artificial grass is virtually maintenance-free. No mowing, watering, spraying, or fertilizing is needed. A regular light brushing and occasional rinse with water is all that\'s required to keep it looking fresh and green all year round.' },
    { question: 'Are your workers certified and experienced?', answer: 'Yes! Our installation team is highly trained, experienced and professional. They handle every project with the same level of precision and care, whether it\'s a small balcony or a large commercial venue. We take pride in delivering clean, accurate, and long-lasting installations.' },
    { question: 'How long does artificial grass last?', answer: 'With proper care, GARS artificial grass can last 10–15 years or more. Our products are UV stable, termite resistant, fungus resistant, and designed to withstand Pakistan\'s climate conditions — making them a long-term, cost-effective investment.' },
    { question: 'Can I get a customized grass solution?', answer: 'Absolutely! We offer customized artificial grass mats and solutions tailored to your specific space, design preference, and budget. Contact our team to discuss your requirements and we\'ll provide a free consultation and quotation.' },
  ]

  return (
    <>
      <Hero />
      <Stats />

      {/* Features */}
      <section id="features" style={{ padding: '90px 0', background: '#fff' }}>
        <Container>
          <div className="text-center mb-5 fade-up">
            <div className="section-eyebrow">What We Offer</div>
            <h2 className="section-title">Let's Make Your Garden <span>Beautiful &amp; Green</span></h2>
            <div className="divider divider-center"></div>
            <p className="section-lead mx-auto">Every product and service we offer is designed with one goal — to give you a stunning, maintenance-free green space for life.</p>
          </div>
          <Row className="g-4">
            {features.map((f, i) => (
              <Col key={i} sm={6} lg={4} className="fade-up">
                <FeatureCard {...f} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Characteristics */}
      <section id="characteristics" style={{ padding: '90px 0', background: 'var(--green-dark)' }}>
        <Container>
          <div className="text-center mb-5 fade-up">
            <div className="section-eyebrow" style={{ color: '#f5a623' }}>Product Quality</div>
            <h2 className="section-title" style={{ color: '#fff' }}>Key <span style={{ color: '#f5a623' }}>Characteristics</span></h2>
            <div className="divider divider-center" style={{ background: '#fff', opacity: '.3' }}></div>
          </div>
          <Row className="g-3 justify-content-center">
            {['UV Stability','Eco-Friendly','Low Maintenance','Cost-Effective','Superior Performance','Termite Resistant'].map((char, i) => (
              <Col key={i} xs={6} md={4} lg={2} className="fade-up">
                <div className="text-center p-3" style={{ color: '#fff' }}>
                  <div style={{ width: '70px', height: '70px', background: 'rgba(255,255,255,.1)', border: '2px solid rgba(255,255,255,.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <i className={`fas ${['fa-sun','fa-seedling','fa-wrench','fa-coins','fa-trophy','fa-shield-alt'][i]}`} style={{ fontSize: '1.7rem', color: '#fff' }}></i>
                  </div>
                  <h6 style={{ fontWeight: 700, fontSize: '.95rem' }}>{char}</h6>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Applications */}
      <section id="applications" style={{ padding: '90px 0', background: 'var(--off-white)' }}>
        <Container>
          <div className="text-center mb-5 fade-up">
            <div className="section-eyebrow">Where It's Used</div>
            <h2 className="section-title">Versatile <span>Applications</span></h2>
            <div className="divider divider-center"></div>
            <p className="section-lead mx-auto">From playgrounds to private gardens — GARS artificial grass transforms any space into a lush, green paradise.</p>
          </div>
          <Row className="g-3">
            {applications.map((app, i) => (
              <Col key={i} sm={6} lg={4} className="fade-up">
                <AppCard {...app} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Why GARS */}
      <section id="why-gars" style={{ padding: '90px 0', background: '#fff' }}>
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={5} className="fade-up">
              <div style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,.12)' }}>
                <img src="/banner1.jpg" alt="GARS Installation" style={{ width: '100%', display: 'block', aspectRatio: '5/4', objectFit: 'cover' }} />
              </div>
            </Col>
            <Col lg={7} className="fade-up">
              <div className="section-eyebrow">Why Choose Us</div>
              <h2 className="section-title">Why <span>GARS</span> Industries?</h2>
              <div className="divider"></div>
              <p className="section-lead mb-4">We think you’ll find GARS artificial grass to more than just synthetic turf, the much more to it. GARS synthetic grass is lifestyle which not only saves money and precious resources. Also allows more free time for customers the essential things in life. Instead of fussing around mowing the lawn on weekend our synthetic landscape turf is virtually maintenance free. No more watering! No more mowing! Not only have lower water and power bills, but you have more free time to whatever you enjoy doing. It easy seen why GARS synthetic grass is perfect landscaping solution.

Toping equipment’s, raw materials, technology and management create high quality artificial turf grass and yarn. We have been in front rank of artificial turf manufacturers in Pakistan.

</p>
              {[
                { num: '01', title: 'Fastest Work Completion', desc: 'As experts with years of installation experience, we are the team with the fastest task handling in the industry.' },
                { num: '02', title: 'Highly Skilled Professionals', desc: 'Our highly skilled, friendly professionals are ready to transform your home or business with precision craftsmanship.' },
                { num: '03', title: 'Clean & Precise Work', desc: 'A regular maintenance program ensures maximum life of your installation. We maintain the highest cleanliness standards.' },
                { num: '04', title: 'Proper After-Care Service', desc: 'Our professionals are available for proper care of the grass installed at your home or business, long after installation.' },
              ].map((item, idx) => (
                <div key={idx} className="d-flex gap-3 mb-4" style={{ alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: '42px', height: '42px', background: 'var(--green-pale)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '1rem', color: 'var(--green-dark)' }}>{item.num}</div>
                  <div>
                    <h6 style={{ fontWeight: 700, fontSize: '.97rem', marginBottom: '.3rem' }}>{item.title}</h6>
                    <p style={{ fontSize: '.88rem', color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>

      {/* Gallery */}
      <section id="gallery" style={{ padding: '90px 0', background: 'var(--off-white)' }}>
        <Container>
          <div className="text-center mb-5 fade-up">
            <div className="section-eyebrow">Our Portfolio</div>
            <h2 className="section-title">Project <span>Gallery</span></h2>
            <div className="divider divider-center"></div>
          </div>
          <div className="fade-up">
            <GalleryGrid images={galleryImages} />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: '90px 0', background: 'var(--off-white)' }}>
        <Container>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5 fade-up">
                <div className="section-eyebrow">Have Questions?</div>
                <h2 className="section-title">Questions &amp; <span>Answers</span></h2>
                <div className="divider divider-center"></div>
              </div>
              <div className="fade-up">
                <FAQAccordion items={faqItems} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Distributors */}
      <section id="distributors" style={{ padding: '90px 0', background: '#fff' }}>
        <Container>
          <div className="text-center mb-5 fade-up">
            <div className="section-eyebrow">Our Network</div>
            <h2 className="section-title">Our <span>Distributors &amp; Dealers</span></h2>
            <div className="divider divider-center"></div>
            <p className="section-lead mx-auto">GARS Industries has a growing network of authorized distributors and dealers across Pakistan. Contact us to become a dealer or to find your nearest stockist.</p>
          </div>
          <Row className="g-4 justify-content-center fade-up">
            <Col md={4}>
              <div className="text-center p-4" style={{ background: 'var(--off-white)', borderRadius: '10px', border: '1px solid rgba(46,139,71,.1)', height: '100%' }}>
                <div style={{ width: '58px', height: '58px', background: 'var(--green-pale)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.1rem' }}><i className="fas fa-map-marker-alt" style={{ fontSize: '1.45rem', color: 'var(--green-mid)' }}></i></div>
                <h5 style={{ fontSize: '1.02rem', fontWeight: 700 }}>Lahore – Head Office</h5>
                <p style={{ fontSize: '.9rem', color: 'var(--muted)', lineHeight: 1.65 }}>36 KM, Main Multan Rd, Shamkay Bhattian, Lahore, 54000, Pakistan</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center p-4" style={{ background: 'var(--off-white)', borderRadius: '10px', border: '1px solid rgba(46,139,71,.1)', height: '100%' }}>
                <div style={{ width: '58px', height: '58px', background: 'var(--green-pale)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.1rem' }}><i className="fas fa-handshake" style={{ fontSize: '1.45rem', color: 'var(--green-mid)' }}></i></div>
                <h5 style={{ fontSize: '1.02rem', fontWeight: 700 }}>Become a Dealer</h5>
                <p style={{ fontSize: '.9rem', color: 'var(--muted)', lineHeight: 1.65 }}>Interested in distributing GARS products in your area? Contact us today to discuss dealer partnership opportunities.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center p-4" style={{ background: 'var(--off-white)', borderRadius: '10px', border: '1px solid rgba(46,139,71,.1)', height: '100%' }}>
                <div style={{ width: '58px', height: '58px', background: 'var(--green-pale)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.1rem' }}><i className="fas fa-shipping-fast" style={{ fontSize: '1.45rem', color: 'var(--green-mid)' }}></i></div>
                <h5 style={{ fontSize: '1.02rem', fontWeight: 700 }}>Nationwide Delivery</h5>
                <p style={{ fontSize: '.9rem', color: 'var(--muted)', lineHeight: 1.65 }}>We deliver and install across Pakistan. Get in touch with our team to arrange delivery to your city or town.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section id="cta" style={{ padding: '80px 0', background: 'linear-gradient(135deg, var(--green-dark) 0%, #0f3d1c 100%)' }}>
        <Container className="text-center fade-up">
          <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>Let's Bring Nature Into Your Lovely House</h2>
          <p style={{ color: 'rgba(255,255,255,.75)', fontSize: '1.05rem', maxWidth: '540px', margin: '0 auto 2rem' }}>Request a quote without any delay. Our representative will visit you and advise the best suitable product and installation type that fits your needs.</p>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <a href="https://wa.me/923099488890" target="_blank" className="btn-gold" style={{ background: '#f5a623', color: '#111', border: 'none', borderRadius: '4px', padding: '.85rem 2.4rem', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '.95rem', letterSpacing: '.06em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block', transition: 'background .2s, transform .15s' }}>
              <i className="fab fa-whatsapp me-2"></i>Get a Free Quote on WhatsApp
            </a>
            <a href="tel:+923097770664" className="btn-outline-custom" style={{ border: '2px solid rgba(255,255,255,.7)', color: '#fff', borderRadius: '4px', padding: '.72rem 1.8rem', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '.9rem', letterSpacing: '.05em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block', transition: 'border-color .2s, background .2s', background: 'transparent' }}>
              <i className="fas fa-phone-alt me-2"></i>Call Us Now
            </a>
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: '90px 0', background: 'var(--off-white)' }}>
        <Container>
          <div className="text-center mb-5 fade-up">
            <div className="section-eyebrow">Reach Out</div>
            <h2 className="section-title">Get In <span>Touch</span></h2>
            <div className="divider divider-center"></div>
          </div>
          <Row className="g-4">
            <Col lg={5} className="fade-up">
              <div className="p-4" style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 8px 32px rgba(0,0,0,.07)', height: '100%' }}>
                <h5 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, marginBottom: '1.5rem' }}>Contact Information</h5>
                <div className="d-flex gap-3 mb-4" style={{ alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: '46px', height: '46px', background: 'var(--green-pale)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fas fa-map-marker-alt" style={{ color: 'var(--green-mid)', fontSize: '1.2rem' }}></i></div>
                  <div><h6 style={{ fontWeight: 700, fontSize: '.9rem', marginBottom: '.2rem' }}>Address</h6><p style={{ fontSize: '.9rem', color: 'var(--muted)', margin: 0 }}>36 KM, Main Multan Rd, Shamkay Bhattian, Lahore, 54000, Pakistan</p></div>
                </div>
                <div className="d-flex gap-3 mb-4" style={{ alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: '46px', height: '46px', background: 'var(--green-pale)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fas fa-phone-alt" style={{ color: 'var(--green-mid)', fontSize: '1.2rem' }}></i></div>
                  <div><h6 style={{ fontWeight: 700, fontSize: '.9rem', marginBottom: '.2rem' }}>Phone</h6><a href="tel:+923097770664" style={{ fontSize: '.9rem', color: 'var(--muted)', textDecoration: 'none' }}>+92 309 7770664</a><br /><a href="tel:+923097770665" style={{ fontSize: '.9rem', color: 'var(--muted)', textDecoration: 'none' }}>+92 309 7770665</a></div>
                </div>
                <div className="d-flex gap-3 mb-4" style={{ alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: '46px', height: '46px', background: 'var(--green-pale)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fas fa-envelope" style={{ color: 'var(--green-mid)', fontSize: '1.2rem' }}></i></div>
                  <div><h6 style={{ fontWeight: 700, fontSize: '.9rem', marginBottom: '.2rem' }}>Email</h6><a href="mailto:garspakistan@gmail.com" style={{ fontSize: '.9rem', color: 'var(--muted)', textDecoration: 'none' }}>garspakistan@gmail.com</a></div>
                </div>
                <div className="d-flex gap-3 mb-4" style={{ alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: '46px', height: '46px', background: 'var(--green-pale)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fab fa-whatsapp" style={{ color: 'var(--green-mid)', fontSize: '1.2rem' }}></i></div>
                  <div><h6 style={{ fontWeight: 700, fontSize: '.9rem', marginBottom: '.2rem' }}>WhatsApp</h6><a href="https://wa.me/923097770663" target="_blank" style={{ fontSize: '.9rem', color: 'var(--muted)', textDecoration: 'none' }}>+92 309 7770663</a></div>
                </div>
                <hr style={{ borderColor: 'rgba(46,139,71,.15)' }} />
                <div className="social-links">
                  <a href="#" style={{ width: '38px', height: '38px', background: 'rgba(0,0,0,.06)', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: '.95rem', marginRight: '.5rem' }}><i className="fab fa-facebook-f"></i></a>
                  <a href="#" style={{ width: '38px', height: '38px', background: 'rgba(0,0,0,.06)', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: '.95rem', marginRight: '.5rem' }}><i className="fab fa-instagram"></i></a>
                  <a href="#" style={{ width: '38px', height: '38px', background: 'rgba(0,0,0,.06)', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: '.95rem', marginRight: '.5rem' }}><i className="fab fa-youtube"></i></a>
                  <a href="https://wa.me/923097770663" target="_blank" style={{ width: '38px', height: '38px', background: 'rgba(0,0,0,.06)', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: '.95rem', marginRight: '.5rem' }}><i className="fab fa-whatsapp"></i></a>
                </div>
              </div>
            </Col>
            <Col lg={7} className="fade-up">
              <div className="p-4" style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 8px 32px rgba(0,0,0,.07)', height: '100%' }}>
                <h5 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, marginBottom: '1.5rem' }}>Send Us a Message</h5>
                <form>
                  <Row className="g-3">
                    <Col sm={6}>
                      <label className="form-label" style={{ fontSize: '.88rem', fontWeight: 600 }}>Customer Name</label>
                      <input type="text" className="form-control" placeholder="Your full name" />
                    </Col>
                    <Col sm={6}>
                      <label className="form-label" style={{ fontSize: '.88rem', fontWeight: 600 }}>Phone Number</label>
                      <input type="tel" className="form-control" placeholder="+92 xxx xxxxxxx" />
                    </Col>
                    <Col xs={12}>
                      <label className="form-label" style={{ fontSize: '.88rem', fontWeight: 600 }}>Email Address</label>
                      <input type="email" className="form-control" placeholder="your@email.com" />
                    </Col>
                    <Col xs={12}>
                      <label className="form-label" style={{ fontSize: '.88rem', fontWeight: 600 }}>Required for</label>
                      <select className="form-select">
                        <option value="">Select your requirement</option>
                        <option>Roof Top</option>
                        <option>Play Area</option>
                        <option>Indoor Cricket</option>
                        <option>Public Venue</option>
                      </select>
                    </Col>
                    <Col xs={12}>
                      <label className="form-label" style={{ fontSize: '.88rem', fontWeight: 600 }}>Message</label>
                      <textarea className="form-control" rows="4" placeholder="Tell us about your project..."></textarea>
                    </Col>
                    <Col xs={12}>
                      <button type="button" className="btn-primary-custom w-100" onClick={() => alert('Thank you! We will contact you shortly.')}>
                        <i className="fas fa-paper-plane me-2"></i>Send Message
                      </button>
                    </Col>
                  </Row>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Home