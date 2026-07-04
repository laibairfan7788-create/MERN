import React, { useState, useEffect } from 'react'
import { Form, Button, Spinner, Alert } from 'react-bootstrap'
import { useNotification } from '../../../context/NotificationContext'
import { createProduct, updateProduct } from '../../../api/adminApi'

const ProductForm = ({ initialData = null, onSuccess, onCancel }) => {
  const { notify } = useNotification()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imageUrl: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || '',
        category: initialData.category || '',
        stock: initialData.stock || '',
        imageUrl: initialData.imageUrl || ''
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Product name is required'
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) < 0) {
      newErrors.price = 'Valid price is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock) || 0
    }

    try {
      setSubmitting(true)
      if (initialData?.id) {
        await updateProduct(initialData.id, payload)
        notify('Product updated successfully', 'success')
      } else {
        await createProduct(payload)
        notify('Product created successfully', 'success')
      }
      if (onSuccess) onSuccess()
    } catch (err) {
      notify(err.response?.data?.message || 'Failed to save product', 'error')
      setErrors({ submit: err.response?.data?.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Product Name *</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          isInvalid={!!errors.name}
          disabled={submitting}
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={submitting}
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
              isInvalid={!!errors.price}
              disabled={submitting}
            />
            <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
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
              disabled={submitting}
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
          disabled={submitting}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          disabled={submitting}
        />
        {formData.imageUrl && (
          <div className="mt-2">
            <img
              src={formData.imageUrl}
              alt="Preview"
              style={{ maxHeight: '100px', maxWidth: '100%', borderRadius: '4px', border: '1px solid #ddd' }}
              onError={(e) => e.target.style.display = 'none'}
            />
          </div>
        )}
      </Form.Group>

      <div className="d-flex gap-3 mt-4">
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? (
            <>
              <Spinner size="sm" animation="border" className="me-2" />
              {initialData ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            initialData ? 'Update Product' : 'Create Product'
          )}
        </Button>
        <Button variant="secondary" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
      </div>
    </Form>
  )
}

export default ProductForm