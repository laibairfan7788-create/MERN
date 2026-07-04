import React from 'react'
import { Navbar, Container, Button } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const AdminHeader = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <Navbar bg="light" expand="lg" style={{ boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
      <Container fluid>
        <Navbar.Brand>Admin Panel</Navbar.Brand>
        <div className="d-flex align-items-center gap-3">
          <span>{user?.name}</span>
          <Button variant="outline-danger" size="sm" onClick={handleLogout}>Logout</Button>
        </div>
      </Container>
    </Navbar>
  )
}
export default AdminHeader