import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Spinner, Modal } from 'react-bootstrap'
import { useNotification } from '../../context/NotificationContext'
import { getPublicGallery } from '../../api/galleryApi'
import styled from 'styled-components'

const GalleryWrapper = styled.div`
  padding: 90px 0;
  margin-top: 60px;

  .section-title {
    font-size: clamp(1.9rem, 3.5vw, 2.8rem);
    font-weight: 900;
    text-align: center;
    span { color: var(--green-mid); }
  }

  .divider {
    width: 52px;
    height: 4px;
    background: var(--gold);
    border-radius: 2px;
    margin: 1rem auto 1.5rem;
  }

  .gallery-card {
    border: none;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    transition: transform 0.3s;
    cursor: pointer;
    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 8px 24px rgba(46,139,71,0.12);
    }
    .card-img-top {
      height: 200px;
      object-fit: cover;
    }
    .card-title {
      font-weight: 700;
    }
    .card-text {
      color: var(--muted);
      font-size: .9rem;
    }
  }
`

const UserGallery = ({ onSelectImage }) => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const { notify } = useNotification()

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true)
        const res = await getPublicGallery()
        setImages(Array.isArray(res.data) ? res.data : [])
      } catch {
        notify('Failed to load gallery', 'error')
      } finally {
        setLoading(false)
      }
    }
    fetchImages()
  }, [notify])

  const handleImageClick = (image) => {
    setSelectedImage(image)
    setShowModal(true)
  }

  const handleSelectAndOrder = () => {
    if (selectedImage && onSelectImage) {
      onSelectImage(selectedImage)
      setShowModal(false)
      notify('Image selected for order', 'success')
    }
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-2 text-muted">Loading gallery...</p>
      </div>
    )
  }

  return (
    <GalleryWrapper>
      <Container>
        <h1 className="section-title">Our <span>Gallery</span></h1>
        <div className="divider"></div>
        <p className="text-center text-muted">Browse our collection and select a design for your project.</p>

        <Row className="g-4 mt-3">
          {images.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No images available</p>
            </div>
          ) : (
            images.map((img) => (
              <Col key={img.id} md={4} sm={6}>
                <Card className="gallery-card" onClick={() => handleImageClick(img)}>
                  <Card.Img variant="top" src={img.url} />
                  <Card.Body>
                    <Card.Title>{img.title}</Card.Title>
                    <Card.Text>{img.description}</Card.Text>
                    <small className="text-muted">{img.category || 'Uncategorized'}</small>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>

      {/* Modal for selecting image */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Select Design</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedImage && (
            <>
              <img src={selectedImage.url} alt={selectedImage.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
              <h5 className="mt-3">{selectedImage.title}</h5>
              <p>{selectedImage.description}</p>
              <p><strong>Category:</strong> {selectedImage.category || 'Uncategorized'}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="success" onClick={handleSelectAndOrder}>
            <i className="fas fa-shopping-cart me-2"></i> Select & Place Order
          </Button>
        </Modal.Footer>
      </Modal>
    </GalleryWrapper>
  )
}

export default UserGallery