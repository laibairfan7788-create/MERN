

import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import styled from 'styled-components'
import { useAuth } from '../../context/AuthContext'
import DashboardStats from '../../components/admin/DashboardStats'

const StatCard = styled(Card)`
  border-left: 4px solid #2e8b47;
  box-shadow: 0 2px 10px rgba(0,0,0,.05);
  .stat-icon {
    font-size: 2rem;
    color: #2e8b47;
  }
`

const AdminDashboard = () => {
  const { user } = useAuth()

  const statsData = [
    { label: 'Total Users', value: '128', icon: 'fa-users', borderColor: '#2e8b47', iconColor: '#2e8b47', change: 12 },
    { label: 'Products', value: '24', icon: 'fa-box', borderColor: '#f5a623', iconColor: '#f5a623' },
    { label: 'Orders', value: '56', icon: 'fa-shopping-cart', borderColor: '#2196f3', iconColor: '#2196f3', change: -3 },
    { label: 'Revenue', value: '$12.4k', icon: 'fa-dollar-sign', borderColor: '#9c27b0', iconColor: '#9c27b0', change: 8 },
  ]

  return (
    <>
      <h4 className="mb-4">Admin Dashboard</h4>
      <p className="text-muted">Welcome back, {user?.name}</p>
      <DashboardStats stats={statsData} />
      <Row className="mt-4">
        <Col md={6}>
          <StatCard>
            <Card.Body>
              <h5>Recent Activity</h5>
              <p className="text-muted">No recent activity to show.</p>
            </Card.Body>
          </StatCard>
        </Col>
        <Col md={6}>
          <StatCard>
            <Card.Body>
              <h5>Quick Actions</h5>
              <ul>
                <li><a href="/admin/users">Manage Users</a></li>
                <li><a href="/admin/products">Manage Products</a></li>
                <li><a href="/admin/orders">View Orders</a></li>
              </ul>
            </Card.Body>
          </StatCard>
        </Col>
      </Row>
    </>
  )
}

export default AdminDashboard  // ✅ MUST HAVE