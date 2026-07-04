
// import React, { useState, useEffect, useCallback } from 'react'
// import { Button, Card, Row, Col, Form, Spinner, Modal } from 'react-bootstrap'
// import { getGallery, uploadGalleryImage, deleteGalleryImage } from '../../api/adminApi'
// import { useNotification } from '../../context/NotificationContext'
// import DataTable from 'react-data-table-component'

// const GalleryManager = () => {
//   const [images, setImages] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [uploading, setUploading] = useState(false)
//   const [selectedFile, setSelectedFile] = useState(null)
//   const [preview, setPreview] = useState(null)
//   const [showModal, setShowModal] = useState(false)
//   const { notify } = useNotification()

//   const fetchGallery = useCallback(async () => {
//     try {
//       setLoading(true)
//       const res = await getGallery()
//       setImages(Array.isArray(res.data) ? res.data : [])
//     } catch (err) {
//       notify('Failed to load gallery', 'error')
//     } finally {
//       setLoading(false)
//     }
//   }, [notify])

//   useEffect(() => {
//     fetchGallery()
//   }, [fetchGallery])

//   const handleFileSelect = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       setSelectedFile(file)
//       setPreview(URL.createObjectURL(file))
//       setShowModal(true)
//     }
//   }

//   const handleUpload = async () => {
//     if (!selectedFile) return
//     const formData = new FormData()
//     formData.append('image', selectedFile)

//     try {
//       setUploading(true)
//       const res = await uploadGalleryImage(formData)
//       setImages(prev => [...prev, res.data])
//       notify('Image uploaded successfully', 'success')
//       setShowModal(false)
//       setSelectedFile(null)
//       setPreview(null)
//     } catch (err) {
//       notify(err.response?.data?.message || 'Upload failed', 'error')
//     } finally {
//       setUploading(false)
//     }
//   }

//   const handleDelete = useCallback(async (id) => {
//     if (!window.confirm('Delete this image?')) return
//     try {
//       await deleteGalleryImage(id)
//       setImages(prev => prev.filter(img => img.id !== id))
//       notify('Image deleted', 'success')
//     } catch (err) {
//       notify('Failed to delete image', 'error')
//     }
//   }, [notify])

//   const columns = [
//     {
//       name: 'Preview',
//       cell: row => (
//         <img
//           src={row.url || row.imageUrl}
//           alt={row.title || 'Gallery'}
//           style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
//         />
//       ),
//       width: '120px'
//     },
//     {
//       name: 'Title',
//       selector: row => row.title || 'Untitled',
//       sortable: true
//     },
//     {
//       name: 'Uploaded',
//       selector: row => new Date(row.createdAt).toLocaleDateString(),
//       sortable: true
//     },
//     {
//       name: 'Actions',
//       cell: row => (
//         <Button variant="danger" size="sm" onClick={() => handleDelete(row.id)}>
//           Delete
//         </Button>
//       )
//     }
//   ]

//   return (
//     <>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h4>Gallery Manager</h4>
//         <div>
//           <Button variant="primary" onClick={() => document.getElementById('fileInput').click()}>
//             <i className="fas fa-upload me-2"></i> Upload Image
//           </Button>
//           <input
//             id="fileInput"
//             type="file"
//             accept="image/*"
//             onChange={handleFileSelect}
//             style={{ display: 'none' }}
//           />
//         </div>
//       </div>

//       <Card>
//         <Card.Body>
//           <DataTable
//             columns={columns}
//             data={images}
//             pagination
//             progressPending={loading}
//             progressComponent={<Spinner animation="border" variant="success" />}
//             noDataComponent="No images uploaded yet"
//             responsive
//           />
//         </Card.Body>
//       </Card>

//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Upload</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {preview && (
//             <div className="text-center">
//               <img
//                 src={preview}
//                 alt="Preview"
//                 style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }}
//               />
//             </div>
//           )}
//           <Form.Group className="mt-3">
//             <Form.Label>Image Title (optional)</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter a title for this image"
//               value={selectedFile?.title || ''}
//               onChange={(e) => setSelectedFile(prev => ({ ...prev, title: e.target.value }))}
//             />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleUpload} disabled={uploading}>
//             {uploading ? 'Uploading...' : 'Confirm Upload'}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   )
// }

// export default GalleryManager  // ✅ MUST HAVE
import React, { useState, useEffect, useCallback } from 'react'
import { Button, Card, Form, Spinner, Modal, ProgressBar, Alert } from 'react-bootstrap'
import { getGallery, uploadGalleryImage, deleteGalleryImage } from '../../api/adminApi'
import { useNotification } from '../../context/NotificationContext'
import DataTable from 'react-data-table-component'
import styled from 'styled-components'

const StyledCard = styled(Card)`
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,.05);
  
  .rdt_Table {
    border-radius: 8px;
    overflow: hidden;
  }
  .rdt_TableHeadRow {
    background-color: #f8f9fa;
    font-weight: 700;
  }
`

const GalleryManager = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [imageTitle, setImageTitle] = useState('')
  const [error, setError] = useState(null)
  const { notify } = useNotification()

  // 🔄 Fetch gallery images from backend
  const fetchGallery = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await getGallery()
      // Handle different response structures
      const data = res.data?.data || res.data || []
      setImages(Array.isArray(data) ? data : [])
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to load gallery'
      setError(msg)
      notify(msg, 'error')
      setImages([])
    } finally {
      setLoading(false)
    }
  }, [notify])

  useEffect(() => {
    fetchGallery()
  }, [fetchGallery])

  // 📁 Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      notify('Please select an image file', 'error')
      e.target.value = ''
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      notify('Image size must be less than 5MB', 'error')
      e.target.value = ''
      return
    }

    setSelectedFile(file)
    setPreview(URL.createObjectURL(file))
    setImageTitle(file.name.split('.')[0]) // Default title from filename
    setShowModal(true)
    e.target.value = '' // Reset input
  }

  // 📤 Upload image to backend with progress
  const handleUpload = async () => {
    if (!selectedFile) return

    const formData = new FormData()
    formData.append('image', selectedFile)
    if (imageTitle.trim()) {
      formData.append('title', imageTitle.trim())
    }

    try {
      setUploading(true)
      setUploadProgress(0)
      setError(null)

      // Upload with progress tracking
      const res = await uploadGalleryImage(formData, (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setUploadProgress(progress)
      })

      // Add new image to list
      const newImage = res.data?.data || res.data
      setImages(prev => [newImage, ...prev])
      
      notify('Image uploaded successfully!', 'success')
      setShowModal(false)
      resetUploadState()
      
      // Refresh gallery after a moment to get latest data
      setTimeout(fetchGallery, 1000)
    } catch (err) {
      const msg = err.response?.data?.message || 'Upload failed'
      setError(msg)
      notify(msg, 'error')
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  // 🗑️ Delete image
  const handleDelete = useCallback(async (id) => {
    if (!window.confirm('Delete this image? This action cannot be undone.')) return
    
    try {
      await deleteGalleryImage(id)
      setImages(prev => prev.filter(img => img.id !== id))
      notify('Image deleted successfully', 'success')
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to delete image'
      notify(msg, 'error')
    }
  }, [notify])

  // 🔄 Reset upload state
  const resetUploadState = () => {
    setSelectedFile(null)
    setPreview(null)
    setImageTitle('')
    setUploadProgress(0)
  }

  // 📊 Table columns
  const columns = [
    {
      name: 'Preview',
      cell: row => (
        <img
          src={row.url || row.imageUrl || row.path}
          alt={row.title || 'Gallery'}
          style={{
            width: '80px',
            height: '60px',
            objectFit: 'cover',
            borderRadius: '6px',
            border: '1px solid #eee'
          }}
          onError={(e) => {
            e.target.src = 'https://placehold.co/400x300/eee/999?text=No+Image'
          }}
        />
      ),
      width: '120px'
    },
    {
      name: 'Title',
      selector: row => row.title || 'Untitled',
      sortable: true
    },
    {
      name: 'Uploaded',
      selector: row => {
        if (!row.createdAt) return '-'
        return new Date(row.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      },
      sortable: true,
      width: '180px'
    },
    {
      name: 'Size',
      selector: row => {
        if (!row.size) return '-'
        if (row.size < 1024) return `${row.size} B`
        if (row.size < 1024 * 1024) return `${(row.size / 1024).toFixed(1)} KB`
        return `${(row.size / (1024 * 1024)).toFixed(1)} MB`
      },
      width: '100px'
    },
    {
      name: 'Actions',
      cell: row => (
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleDelete(row.id)}
        >
          <i className="fas fa-trash me-1"></i> Delete
        </Button>
      ),
      width: '120px'
    }
  ]

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h4 className="mb-1">Gallery Manager</h4>
          <p className="text-muted mb-0">Manage your uploaded images</p>
        </div>
        <div>
          <Button
            variant="primary"
            onClick={() => document.getElementById('fileInput').click()}
            disabled={uploading}
          >
            <i className="fas fa-upload me-2"></i>
            Upload Image
          </Button>
          <input
            id="fileInput"
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {error && (
        <Alert variant="danger" className="mb-3" dismissible onClose={() => setError(null)}>
          <i className="fas fa-exclamation-circle me-2"></i>
          {error}
        </Alert>
      )}

      <StyledCard>
        <Card.Body>
          <DataTable
            columns={columns}
            data={images}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 10, 25, 50]}
            progressPending={loading}
            progressComponent={
              <div className="text-center py-4">
                <Spinner animation="border" variant="success" />
                <p className="mt-2 text-muted">Loading gallery...</p>
              </div>
            }
            noDataComponent={
              <div className="text-center py-5">
                <i className="fas fa-images fa-3x mb-3" style={{ color: '#ccc' }}></i>
                <h6 className="text-muted">No images uploaded yet</h6>
                <p className="text-muted small">Click the "Upload Image" button to add your first image.</p>
              </div>
            }
            subHeader
            subHeaderComponent={
              <div className="d-flex justify-content-between w-100">
                <span className="text-muted small">
                  {images.length} {images.length === 1 ? 'image' : 'images'} in gallery
                </span>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={fetchGallery}
                  disabled={loading}
                >
                  <i className="fas fa-sync me-1"></i> Refresh
                </Button>
              </div>
            }
            striped
            highlightOnHover
            responsive
          />
        </Card.Body>
      </StyledCard>

      {/* Upload Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-cloud-upload-alt me-2" style={{ color: '#2e8b47' }}></i>
            Upload Image
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {preview && (
            <div className="text-center mb-4">
              <img
                src={preview}
                alt="Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '350px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  objectFit: 'contain'
                }}
              />
              <p className="text-muted small mt-2">
                <strong>File:</strong> {selectedFile?.name} ({Math.round(selectedFile?.size / 1024)} KB)
              </p>
            </div>
          )}

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Image Title</Form.Label>
              <Form.Control
                type="text"
                value={imageTitle}
                onChange={(e) => setImageTitle(e.target.value)}
                placeholder="Enter a title for this image"
                disabled={uploading}
              />
              <Form.Text className="text-muted">
                This will be displayed as the image caption.
              </Form.Text>
            </Form.Group>

            {uploading && (
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span className="small">Uploading...</span>
                  <span className="small">{uploadProgress}%</span>
                </div>
                <ProgressBar
                  now={uploadProgress}
                  variant="success"
                  animated={uploadProgress < 100}
                  style={{ height: '8px' }}
                />
              </div>
            )}

            {error && (
              <Alert variant="danger" className="mt-2">
                <i className="fas fa-exclamation-circle me-2"></i>
                {error}
              </Alert>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false)
              resetUploadState()
            }}
            disabled={uploading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpload}
            disabled={uploading || !selectedFile}
          >
            {uploading ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                Uploading...
              </>
            ) : (
              <>
                <i className="fas fa-check me-2"></i>
                Confirm Upload
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default GalleryManager