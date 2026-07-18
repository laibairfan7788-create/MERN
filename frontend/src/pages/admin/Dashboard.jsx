
// import React, { useState, useEffect, useCallback } from 'react'
// import { Row, Col, Card, Spinner, Button, Modal, Form, Image } from 'react-bootstrap'
// import { useAuth } from '../../context/AuthContext'
// import { useNotification } from '../../context/NotificationContext'
// import { getGallery, uploadGalleryImage, deleteGalleryImage } from '../../api/galleryApi'
// import styled from 'styled-components'
// import DataTable from 'react-data-table-component'

// const StatCard = styled(Card)`
//   border: none;
//   border-radius: 12px;
//   box-shadow: 0 2px 12px rgba(0,0,0,0.06);
//   transition: transform 0.2s;
//   &:hover {
//     transform: translateY(-4px);
//     box-shadow: 0 8px 24px rgba(46,139,71,0.12);
//   }
//   .stat-icon {
//     font-size: 2.2rem;
//     color: ${props => props.$iconColor || 'var(--green-mid)'};
//     opacity: 0.6;
//   }
//   .stat-number {
//     font-size: 1.8rem;
//     font-weight: 700;
//     color: var(--dark);
//   }
//   .stat-label {
//     font-size: 0.85rem;
//     color: var(--muted);
//     text-transform: uppercase;
//     letter-spacing: 0.04em;
//   }
// `

// const AdminDashboard = () => {
//   const { user } = useAuth()
//   const { notify } = useNotification()
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalOrders: 0,
//     totalRevenue: 0,
//     pendingOrders: 0,
//   })
//   const [loading, setLoading] = useState(true)
//   const [images, setImages] = useState([])
//   const [showModal, setShowModal] = useState(false)
//   const [formData, setFormData] = useState({ title: '', description: '', category: '' })
//   const [selectedFile, setSelectedFile] = useState(null)
//   const [preview, setPreview] = useState(null)
//   const [submitting, setSubmitting] = useState(false)
//   const [galleryLoading, setGalleryLoading] = useState(false)

//   useEffect(() => {
//     setTimeout(() => {
//       setStats({
//         totalUsers: 128,
//         totalOrders: 56,
//         totalRevenue: 12400,
//         pendingOrders: 8,
//       })
//       setLoading(false)
//     }, 500)
//   }, [])

//   const fetchImages = useCallback(async () => {
//     try {
//       setGalleryLoading(true)
//       const res = await getGallery()
//       setImages(Array.isArray(res.data) ? res.data : [])
//     } catch {
//       setImages([])
//     } finally {
//       setGalleryLoading(false)
//     }
//   }, [])

//   useEffect(() => {
//     fetchImages()
//   }, [fetchImages])

//   const handleFileSelect = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       setSelectedFile(file)
//       setPreview(URL.createObjectURL(file))
//     }
//   }

//   const resetForm = () => {
//     setFormData({ title: '', description: '', category: '' })
//     setSelectedFile(null)
//     setPreview(null)
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const formDataToSend = new FormData()
//     formDataToSend.append('title', formData.title)
//     formDataToSend.append('description', formData.description || '')
//     formDataToSend.append('category', formData.category || '')
//     if (selectedFile) formDataToSend.append('image', selectedFile)

//     try {
//       setSubmitting(true)
//       await uploadGalleryImage(formDataToSend)
//       notify('Image uploaded successfully', 'success')
//       setShowModal(false)
//       resetForm()
//       fetchImages()
//     } catch (err) {
//       notify(err.response?.data?.message || 'Upload failed', 'error')
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete this image?')) return
//     try {
//       await deleteGalleryImage(id)
//       notify('Image deleted successfully', 'success')
//       fetchImages()
//     } catch {
//       notify('Failed to delete image', 'error')
//     }
//   }

//   const columns = [
//     {
//       name: 'Image',
//       cell: row => (
//         <Image
//           src={row.url}
//           thumbnail
//           style={{ width: '60px', height: '60px', objectFit: 'cover' }}
//           onError={(e) => { e.target.src = 'https://placehold.co/400x300/eee/999?text=No+Image' }}
//         />
//       ),
//       width: '100px',
//     },
//     { name: 'Title', selector: row => row.title, sortable: true },
//     { name: 'Category', selector: row => row.category || 'Uncategorized', sortable: true },
//     {
//       name: 'Actions',
//       cell: row => (
//         <div className="d-flex gap-2">
//           <Button variant="danger" size="sm" onClick={() => handleDelete(row.id)}>
//             <i className="fas fa-trash"></i>
//           </Button>
//         </div>
//       ),
//       width: '100px',
//     },
//   ]

//   const statItems = [
//     { label: 'Total Users', value: stats.totalUsers, icon: 'fa-users', color: 'var(--green-mid)' },
//     { label: 'Total Orders', value: stats.totalOrders, icon: 'fa-shopping-cart', color: '#f5a623' },
//     { label: 'Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: 'fa-dollar-sign', color: '#28a745' },
//     { label: 'Images', value: images.length, icon: 'fa-images', color: '#17a2b8' },
//   ]

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <Spinner animation="border" variant="success" />
//         <p className="mt-2 text-muted">Loading dashboard...</p>
//       </div>
//     )
//   }

//   return (
//     <>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h4 className="fw-bold mb-1">Welcome back, {user?.name}!</h4>
//           <p className="text-muted">Here's what's happening with your store today.</p>
//         </div>
//         <Button variant="primary" onClick={() => setShowModal(true)}>
//           <i className="fas fa-plus me-2"></i> Add Image
//         </Button>
//       </div>

//       <Row className="g-4 mb-4">
//         {statItems.map((item, idx) => (
//           <Col key={idx} md={3} sm={6}>
//             <StatCard $iconColor={item.color}>
//               <Card.Body>
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <div className="stat-number">{item.value}</div>
//                     <div className="stat-label">{item.label}</div>
//                   </div>
//                   <i className={`fas ${item.icon} stat-icon`}></i>
//                 </div>
//               </Card.Body>
//             </StatCard>
//           </Col>
//         ))}
//       </Row>

//       <Row className="g-4">
//         <Col md={12}>
//           <Card>
//             <Card.Header className="fw-bold d-flex justify-content-between align-items-center">
//               <span><i className="fas fa-images me-2"></i> Gallery Images</span>
//               <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
//                 <i className="fas fa-plus me-1"></i> Add Image
//               </Button>
//             </Card.Header>
//             <Card.Body>
//               <DataTable
//                 columns={columns}
//                 data={images}
//                 progressPending={galleryLoading}
//                 pagination
//                 paginationPerPage={5}
//                 noDataComponent={
//                   <div className="text-center py-4">
//                     <i className="fas fa-images fa-2x text-muted mb-2" style={{ opacity: 0.3 }}></i>
//                     <p className="text-muted">No images uploaded yet. Click "Add Image" to upload.</p>
//                   </div>
//                 }
//               />
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Image</Modal.Title>
//         </Modal.Header>
//         <Form onSubmit={handleSubmit}>
//           <Modal.Body>
//             <Form.Group className="mb-3">
//               <Form.Label>Title *</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={formData.title}
//                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows="2"
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Category</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={formData.category}
//                 onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                 placeholder="e.g., Garden, Sports, Office"
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Image *</Form.Label>
//               <Form.Control type="file" accept="image/*" onChange={handleFileSelect} required />
//             </Form.Group>
//             {preview && (
//               <div className="mt-2">
//                 <Image src={preview} thumbnail style={{ maxHeight: '200px' }} />
//               </div>
//             )}
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
//             <Button type="submit" variant="primary" disabled={submitting}>
//               {submitting ? 'Uploading...' : 'Upload'}
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </>
//   )
// }

// export default AdminDashboard







import React, { useState, useEffect, useCallback } from 'react'
import { Row, Col, Card, Spinner, Button, Modal, Form, Image } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { useNotification } from '../../context/NotificationContext'
import { getGallery, uploadGalleryImage, deleteGalleryImage } from '../../api/galleryApi'
import styled from 'styled-components'
import DataTable from 'react-data-table-component'

const StatCard = styled(Card)`
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(46,139,71,0.12);
  }
  .stat-icon {
    font-size: 2.2rem;
    color: ${props => props.$iconColor || 'var(--green-mid)'};
    opacity: 0.6;
  }
  .stat-number {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--dark);
  }
  .stat-label {
    font-size: 0.85rem;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
`

const AdminDashboard = () => {
  const { user } = useAuth()
  const { notify } = useNotification()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  })
  const [loading, setLoading] = useState(true)
  const [images, setImages] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ title: '', description: '', category: '' })
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [galleryLoading, setGalleryLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalUsers: 128,
        totalOrders: 56,
        totalRevenue: 12400,
        pendingOrders: 8,
      })
      setLoading(false)
    }, 500)
  }, [])

  // ✅ FIX: Correctly handle nested data structure
  const fetchImages = useCallback(async () => {
    try {
      setGalleryLoading(true)
      console.log('📸 Fetching gallery images...')
      const res = await getGallery()
      console.log('📸 API Response:', res.data)

      // ✅ Backend returns: { success: true, data: [...] }
      // So we need to access res.data.data
      const imageData = res.data?.data || []
      setImages(Array.isArray(imageData) ? imageData : [])
      console.log('📸 Images loaded:', imageData.length)
    } catch (error) {
      console.error('❌ Fetch error:', error)
      setImages([])
    } finally {
      setGalleryLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchImages()
  }, [fetchImages])

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setPreview(URL.createObjectURL(file))
      console.log('📸 File selected:', file.name)
    }
  }

  const resetForm = () => {
    setFormData({ title: '', description: '', category: '' })
    setSelectedFile(null)
    setPreview(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formDataToSend = new FormData()
    formDataToSend.append('title', formData.title)
    formDataToSend.append('description', formData.description || '')
    formDataToSend.append('category', formData.category || '')
    if (selectedFile) formDataToSend.append('image', selectedFile)

    try {
      setSubmitting(true)
      console.log('📸 Uploading image...')
      const response = await uploadGalleryImage(formDataToSend)
      console.log('📸 Upload response:', response)
      notify('Image uploaded successfully', 'success')
      setShowModal(false)
      resetForm()
      fetchImages()
    } catch (err) {
      console.error('❌ Upload error:', err)
      notify(err.response?.data?.message || 'Upload failed', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  // ✅ FIX: Use row._id (MongoDB uses _id)
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this image?')) return
    try {
      console.log('🗑️ Deleting image with ID:', id)
      await deleteGalleryImage(id)
      notify('Image deleted successfully', 'success')
      fetchImages()
    } catch (error) {
      console.error('❌ Delete error:', error)
      notify('Failed to delete image', 'error')
    }
  }

  // ✅ FIX: Columns use _id for delete
  const columns = [
    {
      name: 'Image',
      cell: row => (
        <Image
          src={row.url}
          thumbnail
          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
          onError={(e) => {
            console.error('❌ Image load error for:', row.url)
            e.target.src = 'https://placehold.co/400x300/eee/999?text=No+Image'
          }}
        />
      ),
      width: '100px',
    },
    { name: 'Title', selector: row => row.title, sortable: true },
    { name: 'Category', selector: row => row.category || 'Uncategorized', sortable: true },
    {
      name: 'Actions',
      cell: row => (
        <div className="d-flex gap-2">
          <Button 
            variant="danger" 
            size="sm" 
            onClick={() => handleDelete(row._id)}  // ✅ FIX: Use _id
          >
            <i className="fas fa-trash"></i>
          </Button>
        </div>
      ),
      width: '100px',
    },
  ]

  const statItems = [
    { label: 'Total Users', value: stats.totalUsers, icon: 'fa-users', color: 'var(--green-mid)' },
    { label: 'Total Orders', value: stats.totalOrders, icon: 'fa-shopping-cart', color: '#f5a623' },
    { label: 'Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: 'fa-dollar-sign', color: '#28a745' },
    { label: 'Images', value: images.length, icon: 'fa-images', color: '#17a2b8' },
  ]

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-2 text-muted">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Welcome back, {user?.name}!</h4>
          <p className="text-muted">Here's what's happening with your store today.</p>
        </div>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <i className="fas fa-plus me-2"></i> Add Image
        </Button>
      </div>

      <Row className="g-4 mb-4">
        {statItems.map((item, idx) => (
          <Col key={idx} md={3} sm={6}>
            <StatCard $iconColor={item.color}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="stat-number">{item.value}</div>
                    <div className="stat-label">{item.label}</div>
                  </div>
                  <i className={`fas ${item.icon} stat-icon`}></i>
                </div>
              </Card.Body>
            </StatCard>
          </Col>
        ))}
      </Row>

      <Row className="g-4">
        <Col md={12}>
          <Card>
            <Card.Header className="fw-bold d-flex justify-content-between align-items-center">
              <span><i className="fas fa-images me-2"></i> Gallery Images</span>
              <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
                <i className="fas fa-plus me-1"></i> Add Image
              </Button>
            </Card.Header>
            <Card.Body>
              <DataTable
                columns={columns}
                data={images}
                progressPending={galleryLoading}
                pagination
                paginationPerPage={5}
                noDataComponent={
                  <div className="text-center py-4">
                    <i className="fas fa-images fa-2x text-muted mb-2" style={{ opacity: 0.3 }}></i>
                    <p className="text-muted">No images uploaded yet. Click "Add Image" to upload.</p>
                  </div>
                }
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Image</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="2"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Garden, Sports, Office"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image *</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFileSelect} required />
            </Form.Group>
            {preview && (
              <div className="mt-2">
                <Image src={preview} thumbnail style={{ maxHeight: '200px' }} />
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? 'Uploading...' : 'Upload'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default AdminDashboard