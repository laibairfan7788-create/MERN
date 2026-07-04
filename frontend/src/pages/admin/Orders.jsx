





// import React, { useState, useEffect } from 'react'
// import { Card, Table, Spinner, Badge } from 'react-bootstrap'
// import { getOrders } from '../../api/adminApi'
// import { useNotification } from '../../context/NotificationContext'

// const Orders = () => {
//   const [orders, setOrders] = useState([])
//   const [loading, setLoading] = useState(true)
//   const { notify } = useNotification()

//   useEffect(() => {
//     getOrders()
//       .then(res => setOrders(Array.isArray(res.data) ? res.data : []))
//       .catch(() => notify('Failed to load orders', 'error'))
//       .finally(() => setLoading(false))
//   }, [notify])

//   if (loading) return <Spinner animation="border" variant="success" />

//   return (
//     <>
//       <h4 className="mb-4">Orders</h4>
//       <Card>
//         <Card.Body>
//           <Table striped bordered hover responsive>
//             <thead><tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
//             <tbody>
//               {orders.map(o => (
//                 <tr key={o.id}>
//                   <td>#{o.id}</td>
//                   <td>{o.customerName}</td>
//                   <td>${o.total}</td>
//                   <td><Badge bg={o.status === 'completed' ? 'success' : 'warning'}>{o.status}</Badge></td>
//                 </tr>
//               ))}
//               {orders.length === 0 && <tr><td colSpan="4" className="text-center">No orders</td></tr>}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>
//     </>
//   )
// }

// export default Orders  // ✅ MUST HAVE
import React, { useState, useEffect, useCallback } from 'react'
import { Card, Table, Spinner, Badge, Row, Col, Button, Container, Form } from 'react-bootstrap'
import { getOrders } from '../../api/adminApi'
import { useNotification } from '../../context/NotificationContext'
import styled from 'styled-components'

// ─── Styled Components ──────────────────────────────────────────────
const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;

  h4 {
    font-weight: 700;
    color: var(--dark);
    margin: 0;
  }
`

const StatsRow = styled.div`
  margin-bottom: 1.5rem;
`

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
    opacity: 0.6;
    color: ${props => props.color || 'var(--green-mid)'};
  }

  .stat-number {
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 1.2;
    color: var(--dark);
  }

  .stat-label {
    font-size: 0.85rem;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
`

const StyledTable = styled(Table)`
  margin-bottom: 0;

  thead th {
    background-color: #f8f9fa;
    border-bottom: 2px solid var(--green-mid);
    font-weight: 600;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--dark);
    padding: 0.9rem 0.75rem;
  }

  tbody td {
    padding: 0.9rem 0.75rem;
    vertical-align: middle;
  }

  .order-id {
    font-weight: 600;
    color: var(--green-mid);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const StatusBadge = styled(Badge)`
  padding: 0.4rem 0.8rem;
  font-weight: 600;
  font-size: 0.75rem;
  border-radius: 20px;
  text-transform: capitalize;
`

const ActionButton = styled(Button)`
  padding: 0.25rem 0.6rem;
  font-size: 0.8rem;
`

// ─── Component ─────────────────────────────────────────────────────
const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const { notify } = useNotification()

  // ── Fetch orders ──
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true)
      const res = await getOrders()
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

  // ── Compute stats ──
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)
  const pendingOrders = orders.filter(o => o.status?.toLowerCase() === 'pending').length
  const completedOrders = orders.filter(o => o.status?.toLowerCase() === 'completed').length

  // ── Filter orders by search ──
  const filteredOrders = orders.filter(o => {
    const q = searchTerm.toLowerCase()
    return (
      o.id?.toString().includes(q) ||
      o.customerName?.toLowerCase().includes(q) ||
      o.customerEmail?.toLowerCase().includes(q)
    )
  })

  // ── Format currency ──
  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return '$0.00'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  // ── Format date ──
  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // ── Get status badge variant ──
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

  // ── Loading state ──
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-2 text-muted">Loading orders…</p>
      </div>
    )
  }

  // ── Render ──
  return (
    <Container fluid>
      {/* ── Header ── */}
      <PageHeader>
        <h4>Orders</h4>
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" size="sm" onClick={fetchOrders}>
            <i className="fas fa-sync me-1"></i> Refresh
          </Button>
          <Button variant="primary" size="sm">
            <i className="fas fa-plus me-1"></i> New Order
          </Button>
        </div>
      </PageHeader>

      {/* ── Stats Cards ── */}
      <StatsRow>
        <Row>
          <Col md={3} sm={6} className="mb-3">
            <StatCard color="var(--green-mid)">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="stat-number">{totalOrders}</div>
                    <div className="stat-label">Total Orders</div>
                  </div>
                  <i className="fas fa-shopping-cart stat-icon"></i>
                </div>
              </Card.Body>
            </StatCard>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <StatCard color="#f5a623">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="stat-number">{formatCurrency(totalRevenue)}</div>
                    <div className="stat-label">Revenue</div>
                  </div>
                  <i className="fas fa-dollar-sign stat-icon"></i>
                </div>
              </Card.Body>
            </StatCard>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <StatCard color="#ffc107">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="stat-number">{pendingOrders}</div>
                    <div className="stat-label">Pending</div>
                  </div>
                  <i className="fas fa-clock stat-icon"></i>
                </div>
              </Card.Body>
            </StatCard>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <StatCard color="#28a745">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="stat-number">{completedOrders}</div>
                    <div className="stat-label">Completed</div>
                  </div>
                  <i className="fas fa-check-circle stat-icon"></i>
                </div>
              </Card.Body>
            </StatCard>
          </Col>
        </Row>
      </StatsRow>

      {/* ── Search Bar ── */}
      <Row className="mb-3">
        <Col md={6} lg={4}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search by ID, customer, email…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6} lg={8} className="text-end">
          <span className="text-muted small">
            {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
          </span>
        </Col>
      </Row>

      {/* ── Table ── */}
      <Card>
        <Card.Body className="p-0">
          <StyledTable striped hover responsive>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">
                    {searchTerm ? 'No orders match your search' : 'No orders found'}
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => (
                  <tr key={o.id}>
                    <td>
                      <a href={`/admin/orders/${o.id}`} className="order-id">
                        #{o.id}
                      </a>
                    </td>
                    <td>{o.customerName || '—'}</td>
                    <td>{o.customerEmail || '—'}</td>
                    <td>{formatCurrency(o.total)}</td>
                    <td>
                      <StatusBadge bg={getStatusVariant(o.status)}>
                        {o.status || 'Pending'}
                      </StatusBadge>
                    </td>
                    <td>{formatDate(o.createdAt)}</td>
                    <td className="text-center">
                      <ActionButton
                        variant="outline-primary"
                        size="sm"
                        onClick={() => window.location.href = `/admin/orders/${o.id}`}
                      >
                        <i className="fas fa-eye"></i>
                      </ActionButton>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </StyledTable>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Orders