import React, { useState, useCallback } from 'react'
import { Button, Modal, Form, Spinner, Badge } from 'react-bootstrap'
import DataTable from './DataTable'
import { useNotification } from '../../context/NotificationContext'
import { createProduct, updateProduct, deleteProduct } from '../../api/adminApi'

const ProductTable = ({ products = [], loading = false, onRefresh }) => {
  const { notify } = useNotification()
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imageUrl: ''
  })
  const [submitting, setSubmitting] = useState(false)

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      imageUrl: ''
    })
    setEditingProduct(null)
  }

  // Open modal for add/edit
  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || '',
        stock: product.stock || '',
        imageUrl: product.imageUrl || ''
      })
    } else {
      resetForm()
    }
    setShowModal(true)
  }

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle form submit (add or update)
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.price) {
      notify('Name and price are required', 'error')
      return
    }

    try {
      setSubmitting(true)
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0
      }

      if (editingProduct) {
        await updateProduct(editingProduct.id, payload)
        notify('Product updated successfully', 'success')
      } else {
        await createProduct(payload)
        notify('Product added successfully', 'success')
      }

      setShowModal(false)
      resetForm()
      if (onRefresh) onRefresh()
    } catch (err) {
      notify(err.response?.data?.message || 'Failed to save product', 'error')
    } finally {
      setSubmitting(false)
    }
  }, [formData, editingProduct, notify, onRefresh])

  // Handle delete
  const handleDelete = useCallback(async (product) => {
    if (!window.confirm(`Delete product "${product.name}"? This action cannot be undone.`)) return
    
    try {
      await deleteProduct(product.id)
      notify('Product deleted successfully', 'success')
      if (onRefresh) onRefresh()
    } catch (err) {
      notify(err.response?.data?.message || 'Failed to delete product', 'error')
    }
  }, [notify, onRefresh])

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return '$0.00'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  // Status badge for stock
  const getStockBadge = (stock) => {
    if (stock === undefined || stock === null) return <Badge bg="secondary">N/A</Badge>
    if (stock === 0) return <Badge bg="danger">Out of Stock</Badge>
    if (stock < 10) return <Badge bg="warning">Low Stock</Badge>
    if (stock < 50) return <Badge bg="info">In Stock</Badge>
    return <Badge bg="success">Available</Badge>
  }

  // Define columns for data table
  const columns = [
    {
      name: 'Image',
      cell: row => (
        <img
          src={row.imageUrl || '/placeholder-product.png'}
          alt={row.name}
          style={{
            width: '50px',
            height: '50px',
            objectFit: 'cover',
            borderRadius: '6px',
            border: '1px solid #eee'
          }}
          onError={(e) => e.target.src = '/placeholder-product.png'}
        />
      ),
      width: '80px'
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Category',
      selector: row => row.category || 'Uncategorized',
      sortable: true
    },
    {
      name: 'Price',
      selector: row => formatCurrency(row.price),
      sortable: true,
      width: '120px'
    },
    {
      name: 'Stock',
      cell: row => getStockBadge(row.stock),
      sortable: true,
      width: '120px'
    },
    {
      name: 'Created',
      selector: row => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
      width: '120px'
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="d-flex gap-2">
          <Button variant="outline-primary" size="sm" onClick={() => openModal(row)}>
            <i className="fas fa-edit"></i>
          </Button>
          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(row)}>
            <i className="fas fa-trash"></i>
          </Button>
        </div>
      ),
      width: '120px'
    }
  ]

  return (
    <>
      <DataTable
        columns={columns}
        data={products}
        title="Products"
        pagination
        progressPending={loading}
        noDataComponent={
          <div className="text-center py-4 text-muted">
            <i className="fas fa-box fa-2x mb-2" style={{ opacity: 0.3 }}></i>
            <p>No products found</p>
          </div>
        }
        subHeader
        subHeaderComponent={
          <div className="d-flex gap-2">
            <Button variant="primary" onClick={() => openModal()}>
              <i className="fas fa-plus me-1"></i> Add Product
            </Button>
            <Button variant="outline-secondary" size="sm" onClick={onRefresh}>
              <i className="fas fa-sync me-1"></i> Refresh
            </Button>
            <span className="text-muted small align-self-center">
              {products.length} product(s)
            </span>
          </div>
        }
      />

      {/* Add/Edit Product Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Product Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
              />
            </Form.Group>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Price *</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Stock Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Garden, Sports, Indoor"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
              {formData.imageUrl && (
                <div className="mt-2">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '150px',
                      objectFit: 'contain',
                      borderRadius: '4px',
                      border: '1px solid #ddd'
                    }}
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </div>
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? (
                <>
                  <Spinner size="sm" animation="border" className="me-2" />
                  {editingProduct ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                editingProduct ? 'Update Product' : 'Add Product'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

// ✅ default export – essential
export default ProductTable