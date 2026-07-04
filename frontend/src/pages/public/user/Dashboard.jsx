import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'

const UserDashboard = () => {
  const { user } = useAuth()
  return (
    <Container className="py-5" style={{ marginTop: '80px' }}>
      <h1>User Dashboard</h1>
      <p>Welcome, {user?.name}!</p>
      <Row>
        <Col md={4}><Card><Card.Body><h5>My Profile</h5><p>View and edit your profile</p></Card.Body></Card></Col>
        <Col md={4}><Card><Card.Body><h5>My Orders</h5><p>View your order history</p></Card.Body></Card></Col>
        <Col md={4}><Card><Card.Body><h5>Request Quote</h5><p>Request a new quote</p></Card.Body></Card></Col>
      </Row>
    </Container>
  )
}
export default UserDashboard