
// import React, { useState, useEffect } from 'react'
// import { Form, Button, Row, Col, Table, Spinner, Alert } from 'react-bootstrap'
// import { useNotification } from '../../../context/NotificationContext'
// import { createOrder, updateOrder } from '../../../api/adminApi'

// let itemIdCounter = 0

// const OrderForm = ({ initialData = null, onSuccess, onCancel, customers = [], products = [] }) => {
//   const { notify } = useNotification()
//   const [formData, setFormData] = useState({
//     customerId: '',
//     status: 'pending',
//     notes: '',
//     items: [],
//   })
//   const [submitting, setSubmitting] = useState(false)
//   const [errors, setErrors] = useState({})
//   const [selectedProductId, setSelectedProductId] = useState('')
//   const [selectedQuantity, setSelectedQuantity] = useState(1)

//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         customerId: initialData.customerId || '',
//         status: initialData.status || 'pending',
//         notes: initialData.notes || '',
//         items: (initialData.items || []).map(item => ({
//           id: ++itemIdCounter,
//           productId: item.productId || item.product?.id || '',
//           productName: item.productName || item.product?.name || '',
//           quantity: item.quantity || 1,
//           price: item.price || 0,
//         })),
//       })
//     }
//   }, [initialData])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
//   }

//   const addItem = () => {
//     if (!selectedProductId) {
//       notify('Please select a product', 'error')
//       return
//     }
//     if (selectedQuantity < 1) {
//       notify('Quantity must be at least 1', 'error')
//       return
//     }
//     const product = products.find(p => p.id === parseInt(selectedProductId))
//     if (!product) {
//       notify('Product not found', 'error')
//       return
//     }
//     const existing = formData.items.find(item => item.productId === product.id)
//     if (existing) {
//       setFormData(prev => ({
//         ...prev,
//         items: prev.items.map(item =>
//           item.productId === product.id
//             ? { ...item, quantity: item.quantity + selectedQuantity }
//             : item
//         )
//       }))
//     } else {
//       const newItem = {
//         id: ++itemIdCounter,
//         productId: product.id,
//         productName: product.name,
//         quantity: selectedQuantity,
//         price: product.price,
//       }
//       setFormData(prev => ({ ...prev, items: [...prev.items, newItem] }))
//     }
//     setSelectedProductId('')
//     setSelectedQuantity(1)
//   }

//   const removeItem = (id) => {
//     setFormData(prev => ({ ...prev, items: prev.items.filter(item => item.id !== id) }))
//   }

//   const updateQuantity = (id, newQty) => {
//     if (newQty < 1) return
//     setFormData(prev => ({
//       ...prev,
//       items: prev.items.map(item =>
//         item.id === id ? { ...item, quantity: newQty } : item
//       )
//     }))
//   }

//   const getOrderTotal = () => {
//     return formData.items.reduce((sum, item) => sum + item.quantity * item.price, 0)
//   }

//   const validate = () => {
//     const newErrors = {}
//     if (!formData.customerId) newErrors.customerId = 'Please select a customer'
//     if (formData.items.length === 0) newErrors.items = 'Order must have at least one item'
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!validate()) return

//     const payload = {
//       customerId: parseInt(formData.customerId),
//       status: formData.status,
//       notes: formData.notes,
//       items: formData.items.map(item => ({
//         productId: item.productId,
//         quantity: item.quantity,
//         price: item.price,
//       })),
//       total: getOrderTotal(),
//     }

//     try {
//       setSubmitting(true)
//       if (initialData?.id) {
//         await updateOrder(initialData.id, payload)
//         notify('Order updated successfully', 'success')
//       } else {
//         await createOrder(payload)
//         notify('Order created successfully', 'success')
//       }
//       if (onSuccess) onSuccess()
//     } catch (err) {
//       notify(err.response?.data?.message || 'Failed to save order', 'error')
//       setErrors({ submit: err.response?.data?.message })
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   return (
//     <Form onSubmit={handleSubmit}>
//       {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}

//       <Row>
//         <Col md={6}>
//           <Form.Group className="mb-3">
//             <Form.Label>Customer *</Form.Label>
//             <Form.Select
//               name="customerId"
//               value={formData.customerId}
//               onChange={handleChange}
//               isInvalid={!!errors.customerId}
//               disabled={submitting}
//             >
//               <option value="">Select customer</option>
//               {customers.map(c => (
//                 <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
//               ))}
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">{errors.customerId}</Form.Control.Feedback>
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group className="mb-3">
//             <Form.Label>Status</Form.Label>
//             <Form.Select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               disabled={submitting}
//             >
//               <option value="pending">Pending</option>
//               <option value="processing">Processing</option>
//               <option value="shipped">Shipped</option>
//               <option value="completed">Completed</option>
//               <option value="cancelled">Cancelled</option>
//             </Form.Select>
//           </Form.Group>
//         </Col>
//       </Row>

//       <Form.Group className="mb-3">
//         <Form.Label>Notes</Form.Label>
//         <Form.Control
//           as="textarea"
//           rows="2"
//           name="notes"
//           value={formData.notes}
//           onChange={handleChange}
//           disabled={submitting}
//         />
//       </Form.Group>

//       <hr />
//       <h5>Order Items</h5>
//       {errors.items && <Alert variant="danger">{errors.items}</Alert>}

//       <Row className="align-items-end mb-3">
//         <Col md={5}>
//           <Form.Group>
//             <Form.Label>Product</Form.Label>
//             <Form.Select
//               value={selectedProductId}
//               onChange={(e) => setSelectedProductId(e.target.value)}
//               disabled={submitting}
//             >
//               <option value="">Select product</option>
//               {products.map(p => (
//                 <option key={p.id} value={p.id}>{p.name} (${p.price})</option>
//               ))}
//             </Form.Select>
//           </Form.Group>
//         </Col>
//         <Col md={3}>
//           <Form.Group>
//             <Form.Label>Quantity</Form.Label>
//             <Form.Control
//               type="number"
//               min="1"
//               value={selectedQuantity}
//               onChange={(e) => setSelectedQuantity(parseInt(e.target.value) || 1)}
//               disabled={submitting}
//             />
//           </Form.Group>
//         </Col>
//         <Col md={2}>
//           <Button variant="primary" onClick={addItem} disabled={submitting}>
//             <i className="fas fa-plus me-1"></i> Add
//           </Button>
//         </Col>
//       </Row>

//       <Table striped bordered hover responsive>
//         <thead>
//           <tr><th>#</th><th>Product</th><th>Qty</th><th>Price</th><th>Total</th><th>Action</th></tr>
//         </thead>
//         <tbody>
//           {formData.items.length === 0 ? (
//             <tr><td colSpan="6" className="text-center text-muted">No items</td></tr>
//           ) : (
//             formData.items.map((item, idx) => (
//               <tr key={item.id}>
//                 <td>{idx + 1}</td>
//                 <td>{item.productName}</td>
//                 <td>
//                   <Form.Control
//                     type="number"
//                     min="1"
//                     value={item.quantity}
//                     onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
//                     style={{ width: '70px' }}
//                     disabled={submitting}
//                   />
//                 </td>
//                 <td>${item.price}</td>
//                 <td>${(item.quantity * item.price).toFixed(2)}</td>
//                 <td>
//                   <Button variant="danger" size="sm" onClick={() => removeItem(item.id)} disabled={submitting}>
//                     <i className="fas fa-trash"></i>
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//         <tfoot>
//           <tr><td colSpan="4" className="text-end"><strong>Total:</strong></td><td colSpan="2"><strong>${getOrderTotal().toFixed(2)}</strong></td></tr>
//         </tfoot>
//       </Table>

//       <div className="d-flex gap-3 mt-4">
//         <Button type="submit" variant="primary" disabled={submitting}>
//           {submitting ? (
//             <>
//               <Spinner size="sm" animation="border" className="me-2" />
//               {initialData ? 'Updating...' : 'Creating...'}
//             </>
//           ) : (
//             initialData ? 'Update Order' : 'Create Order'
//           )}
//         </Button>
//         <Button variant="secondary" onClick={onCancel} disabled={submitting}>
//           Cancel
//         </Button>
//       </div>
//     </Form>
//   )
// }

// export default OrderForm
import React, { useState } from 'react'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { useNotification } from '../../context/NotificationContext'
import { createOrder } from '../../api/userApi'
import styled from 'styled-components'

const OrderFormWrapper = styled.div`
  .order-card {
    border: none;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    padding: 1.5rem;
  }
  .btn-primary-custom {
    background: var(--green-mid);
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: .75rem 2rem;
    font-weight: 700;
    transition: background .2s;
    &:hover {
      background: var(--green-dark);
      color: #fff;
    }
  }
`

const OrderForm = ({ onSuccess }) => {
  const { user } = useAuth()
  const { notify } = useNotification()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    customerName: user?.name || '',
    customerEmail: user?.email || '',
    total: '',
    items: [{ productName: '', quantity: 1, price: '' }],
    status: 'pending',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleItemChange = (index, field, value) => {
    const items = [...formData.items]
    items[index][field] = value
    setFormData(prev => ({ ...prev, items }))
  }

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { productName: '', quantity: 1, price: '' }]
    }))
  }

  const removeItem = (index) => {
    const items = formData.items.filter((_, i) => i !== index)
    setFormData(prev => ({ ...prev, items }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.customerName || !formData.total) {
      notify('Customer name and total are required', 'error')
      return
    }

    try {
      setLoading(true)
      const payload = {
        ...formData,
        total: parseFloat(formData.total),
        items: formData.items.map(item => ({
          productName: item.productName || 'Product',
          quantity: parseInt(item.quantity) || 1,
          price: parseFloat(item.price) || 0,
        })),
      }
      await createOrder(payload)
      notify('Order placed successfully!', 'success')
      setFormData({
        customerName: '',
        customerEmail: '',
        total: '',
        items: [{ productName: '', quantity: 1, price: '' }],
        status: 'pending',
      })
      if (onSuccess) onSuccess()
    } catch (err) {
      notify(err.response?.data?.message || 'Failed to place order', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <OrderFormWrapper>
      <Card className="order-card">
        <Card.Body>
          <h4 className="mb-3">Place New Order</h4>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Customer Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="John Doe"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Customer Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="john@example.com"
                  />
                </Form.Group>
              </Col>
            </Row>

            <h6 className="mt-2">Order Items</h6>
            {formData.items.map((item, index) => (
              <Row key={index} className="mb-2">
                <Col md={4}>
                  <Form.Control
                    placeholder="Product name"
                    value={item.productName}
                    onChange={(e) => handleItemChange(index, 'productName', e.target.value)}
                    disabled={loading}
                  />
                </Col>
                <Col md={3}>
                  <Form.Control
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    disabled={loading}
                    min="1"
                  />
                </Col>
                <Col md={3}>
                  <Form.Control
                    type="number"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                    disabled={loading}
                    step="0.01"
                  />
                </Col>
                <Col md={2}>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeItem(index)}
                    disabled={loading || formData.items.length === 1}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            ))}
            <Button variant="outline-secondary" size="sm" onClick={addItem} disabled={loading}>
              <i className="fas fa-plus me-1"></i> Add Item
            </Button>

            <Row className="mt-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Total Amount ($) *</Form.Label>
                  <Form.Control
                    type="number"
                    name="total"
                    value={formData.total}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="0.00"
                    step="0.01"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Button type="submit" className="btn-primary-custom w-100 mt-3" disabled={loading}>
              {loading ? 'Placing order...' : 'Place Order'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </OrderFormWrapper>
  )
}

export default OrderForm