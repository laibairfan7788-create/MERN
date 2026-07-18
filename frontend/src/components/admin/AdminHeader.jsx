// import React from 'react'
// import { Navbar, Container, Button } from 'react-bootstrap'
// import { useAuth } from '../../context/AuthContext'
// import { useNavigate } from 'react-router-dom'

// const AdminHeader = () => {
//   const { user, logout } = useAuth()
//   const navigate = useNavigate()

//   const handleLogout = () => {
//     logout()
//     navigate('/')
//   }

//   return (
//     <Navbar bg="light" expand="lg" style={{ boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
//       <Container fluid>
//         <Navbar.Brand>Admin Panel</Navbar.Brand>
//         <div className="d-flex align-items-center gap-3">
//           <span>{user?.name}</span>
//           <Button variant="outline-danger" size="sm" onClick={handleLogout}>
//             Logout
//           </Button>
//         </div>
//       </Container>
//     </Navbar>
//   )
// }

// // ✅ THIS IS THE CRUCIAL LINE – add it if missing
// export default AdminHeader
import React from 'react'
import { Navbar, Container, Button, Dropdown } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const HeaderWrapper = styled(Navbar)`
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 0.5rem 0;
  margin-left: 250px;
  width: calc(100% - 250px);
  
  .navbar-brand {
    font-weight: 700;
    color: var(--dark);
  }
  
  .user-name {
    font-weight: 600;
    color: var(--dark);
    margin-right: 0.5rem;
  }
  
  .user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--green-pale);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--green-mid);
    font-weight: 700;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`

const AdminHeader = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <HeaderWrapper expand="lg">
      <Container fluid>
        <Navbar.Brand>Dashboard</Navbar.Brand>
        <div className="d-flex align-items-center">
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" className="border-0 d-flex align-items-center gap-2">
              <span className="user-name">{user?.name || 'Admin'}</span>
              <div className="user-avatar">
                {user?.name?.charAt(0) || 'A'}
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate('/profile')}>
                <i className="fas fa-user me-2"></i> Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout} className="text-danger">
                <i className="fas fa-sign-out-alt me-2"></i> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </HeaderWrapper>
  )
}

export default AdminHeader