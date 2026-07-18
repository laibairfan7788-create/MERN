



import React, { useState, useEffect, useCallback } from 'react'
import { Button, Card, Form, Modal, Spinner } from 'react-bootstrap'
import { useNotification } from '../../context/NotificationContext'
import { getGallery, uploadGalleryImage, updateGalleryImage, deleteGalleryImage } from '../../api/galleryApi'
import DataTable from 'react-data-table-component'

const GalleryManager = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingImage, setEditingImage] = useState(null)
  const [formData, setFormData] = useState({ title: '', description: '', category: '' })
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const { notify } = useNotification()

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true)
      console.log('📸 Fetching gallery images...')
      const res = await getGallery()
      console.log('📸 Full Response:', res)
      console.log('📸 res.data:', res.data)
      
      // ✅ CORRECT: Backend returns { success: true, data: [...] }
      const imageData = res.data?.data || []
      setImages(Array.isArray(imageData) ? imageData : [])
      console.log('📸 Images loaded:', imageData.length)
      
      if (imageData.length > 0) {
        console.log('📸 First image URL:', imageData[0].url)
      }
    } catch (error) {
      console.error('❌ Fetch error:', error)
      notify('Failed to load gallery', 'error')
      setImages([])
    } finally {
      setLoading(false)
    }
  }, [notify])

  useEffect(() => {
    fetchImages()
  }, [fetchImages])

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setPreview(URL.createObjectURL(file))
      console.log('📸 File selected:', file.name, file.size)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedFile && !editingImage) {
      notify('Please select an image', 'error')
      return
    }

    const formDataToSend = new FormData()
    formDataToSend.append('title', formData.title)
    formDataToSend.append('description', formData.description || '')
    formDataToSend.append('category', formData.category || '')
    if (selectedFile) {
      formDataToSend.append('image', selectedFile)
      console.log('📸 Uploading file:', selectedFile.name)
    }

    try {
      setSubmitting(true)
      let response
      if (editingImage) {
        response = await updateGalleryImage(editingImage.id, formDataToSend)
        console.log('📸 Update response:', response)
        notify('Image updated successfully', 'success')
      } else {
        response = await uploadGalleryImage(formDataToSend)
        console.log('📸 Upload response:', response)
        notify('Image uploaded successfully', 'success')
      }
      setShowModal(false)
      resetForm()
      await fetchImages()
    } catch (err) {
      console.error('❌ Upload error:', err)
      notify(err.response?.data?.message || 'Operation failed', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this image?')) return
    try {
      await deleteGalleryImage(id)
      notify('Image deleted', 'success')
      fetchImages()
    } catch (error) {
      console.error('❌ Delete error:', error)
      notify('Failed to delete', 'error')
    }
  }

  const resetForm = () => {
    setFormData({ title: '', description: '', category: '' })
    setSelectedFile(null)
    setPreview(null)
    setEditingImage(null)
  }

  const openAddModal = () => {
    resetForm()
    setShowModal(true)
  }

  const openEditModal = (image) => {
    setEditingImage(image)
    setFormData({
      title: image.title || '',
      description: image.description || '',
      category: image.category || '',
    })
    setPreview(image.url)
    setShowModal(true)
  }

  // ✅ SIMPLIFIED ImageCell – just use the URL directly
  const ImageCell = ({ url }) => {
    const [imgError, setImgError] = useState(false)
    
    // ✅ Log the URL to see what we're getting
    console.log('🖼️ Rendering image with URL:', url)
    
    if (imgError || !url) {
      return (
        <div style={{ 
          width: '70px', 
          height: '70px', 
          background: '#f0f0f0', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderRadius: '4px',
          color: '#999',
          fontSize: '12px'
        }}>
          No Image
        </div>
      )
    }

    return (
      <img
        src={url}
        alt="Gallery"
        width={70}
        height={70}
        style={{ 
          objectFit: 'cover', 
          borderRadius: '4px',
          border: '1px solid #ddd'
        }}
        onError={() => {
          console.error('❌ Image load error for:', url)
          setImgError(true)
        }}
        onLoad={() => console.log('✅ Image loaded successfully:', url)}
      />
    )
  }

  const columns = [
    {
      name: 'Image',
      cell: row => <ImageCell url={row.url} />,
      width: '100px',
    },
    { name: 'Title', selector: row => row.title, sortable: true },
    { name: 'Category', selector: row => row.category || 'Uncategorized' },
    { 
      name: 'Uploaded', 
      selector: row => new Date(row.createdAt).toLocaleDateString(), 
      sortable: true 
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          <Button variant="warning" size="sm" className="me-2" onClick={() => openEditModal(row)}>
            <i className="fas fa-edit"></i>
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleDelete(row._id || row.id)}>
            <i className="fas fa-trash"></i>
          </Button>
        </>
      ),
    },
  ]

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Gallery Manager</h4>
        <Button variant="primary" onClick={openAddModal}>
          <i className="fas fa-plus me-2"></i> Add Image
        </Button>
      </div>

      <Card>
        <Card.Body>
          <DataTable
            columns={columns}
            data={images}
            progressPending={loading}
            pagination
            title=""
            noDataComponent={
              <div className="text-center py-4">
                <i className="fas fa-images fa-2x text-muted mb-2" style={{ opacity: 0.3 }}></i>
                <p className="text-muted">No images uploaded yet. Click "Add Image" to upload.</p>
              </div>
            }
          />
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingImage ? 'Edit Image' : 'Add New Image'}</Modal.Title>
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
              <Form.Label>Image {!editingImage && '*'}</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFileSelect} />
            </Form.Group>
            {preview && (
              <div className="mt-2">
                <img src={preview} alt="Preview" style={{ maxHeight: '200px', borderRadius: '4px' }} />
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? 'Saving...' : editingImage ? 'Update' : 'Upload'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default GalleryManager