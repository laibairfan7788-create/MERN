// import React from "react";
// import MainLayout from "../../components/layout/MainLayout";

// export default function Orders() {
//   return (
//     <MainLayout>
//       <div className="container py-4">
//         <h1 className="h3 mb-3">User Orders</h1>
//       </div>
//     </MainLayout>
//   );
// }

import React, { useState, useEffect, useCallback } from 'react'
import { Card, Table, Spinner, Badge, Row, Col, Button, Form } from 'react-bootstrap'
import { getUserOrders } from '../../api/userApi'
import { useNotification } from '../../context/NotificationContext'
import styled from 'styled-components'

const OrdersWrapper = styled.div`
  padding: 2rem 0;

  h4 {
    font-weight: 700;
    color: var(--dark);
  }

  .order-card {
    border: none;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }

  .order-id {
    font-weight: 600;
    color: var(--green-mid);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  .status-badge {
    padding: 0.3rem 0.8rem;
    font-weight: 600;
    font-size: 0.75rem;
    border-radius: 20px;
    text-transform: capitalize;
  }
`

const getStatusVariant = (status) => {
  const map = {
    pending: 'warning',
    processing: 'info',
    shipped: 'primary',
    completed: 'success',
    cancelled: 'danger',
    refunded: 'secondary',
  }
  return map[status?.toLowerCase()] || 'secondary'
}

const formatCurrency = (amount) => {
  if (!amount) return '$0.00'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const { notify } = useNotification()

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true)
      const res = await getUserOrders()
      setOrders(Array.isArray(res.data) ? res.data : [])
    } catch {
      notify('Failed to load orders', 'error')
    } finally {
      setLoading(false)
    }
  }, [notify])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const filteredOrders = orders.filter(o =>
    o.id?.toString().includes(searchTerm) ||
    o.status?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-2 text-muted">Loading orders…</p>
      </div>
    )
  }

  return (
    <OrdersWrapper>
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <h4>My Orders</h4>
        <div className="d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Search orders…"
            size="sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '200px' }}
          />
          <Button variant="outline-secondary" size="sm" onClick={fetchOrders}>
            <i className="fas fa-sync"></i>
          </Button>
        </div>
      </div>

      <Card className="order-card">
        <Card.Body className="p-0">
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    {searchTerm ? 'No orders match your search' : 'No orders found'}
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => (
                  <tr key={o.id}>
                    <td><span className="order-id">#{o.id}</span></td>
                    <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td>{o.items?.length || 0} items</td>
                    <td>{formatCurrency(o.total)}</td>
                    <td>
                      <Badge bg={getStatusVariant(o.status)} className="status-badge">
                        {o.status || 'Pending'}
                      </Badge>
                    </td>
                    <td>
                      <Button variant="outline-primary" size="sm" href={`/orders/${o.id}`}>
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </OrdersWrapper>
  )
}

export default Orders