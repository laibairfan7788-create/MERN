
// import React, { useState, useEffect } from 'react'
// import { Navbar, Nav, Container, Button } from 'react-bootstrap'
// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../../context/AuthContext'
// import styled from 'styled-components'

// const StyledNavbar = styled(Navbar)`
//   position: fixed;
//   top: 0;
//   width: 100%;
//   z-index: 1000;
//   transition: background .35s, box-shadow .35s;
//   background: black;
//   &.scrolled {
//     background: rgba(10, 42, 16, .96);
//     box-shadow: 0 2px 20px rgba(0,0,0,.4);
//   }
//   .navbar-brand {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     img {
//       height: 44px;
//     }
//     .brand-text {
//       color: #fff;
//       font-weight: 900;
//       font-size: 1.2rem;
//       font-family: 'Montserrat', sans-serif;
//       letter-spacing: 0.05em;
//     }
//   }
//   .nav-link {
//     color: rgba(255,255,255,.88) !important;
//     font-weight: 600;
//     font-size: .88rem;
//     letter-spacing: .06em;
//     text-transform: uppercase;
//     // &:hover {
//       color: #f5a623 !important;
//     // }
//   }
//   .btn-quote {
//     background: #f5a623;
//     color: #111 !important;
//     border-radius: 4px;
//     padding: .45rem 1.4rem !important;
//     font-weight: 700;
//     font-size: .82rem;
//     letter-spacing: .06em;
//     transition: background .2s, transform .15s;
//     border: none;
//     text-decoration: none;
//     &:hover {
//       background: #e0951a;
//       transform: translateY(-1px);
//       color: #111 !important;
//     }
//   }
// `

// const NavbarComponent = () => {
//   const [scrolled, setScrolled] = useState(false)
//   const { isAuthenticated, isAdmin, logout } = useAuth()
//   const navigate = useNavigate()

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 60)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   const handleLogout = () => {
//     logout()
//     navigate('/')
//   }

//   return (
//     <StyledNavbar expand="lg" className={scrolled ? 'scrolled' : ''}>
//       <Container>
//         <Navbar.Brand as={Link} to="/">
//           <img src="/logo.png" alt="GARS Industries" />
//           <span className="brand-text">INDUSTRIES</span>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="mx-auto">
          
//             <Nav.Link as={Link} to="/about">About</Nav.Link>
//             <Nav.Link as={Link} to="/services">Services</Nav.Link>
//             <Nav.Link as={Link} to="/applications">Applictions</Nav.Link>
//             <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
//             <Nav.Link as={Link} to="/distributors">Distributors</Nav.Link>
//             <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
//             {isAuthenticated && (
//               <>
//                 <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
//                 {isAdmin && <Nav.Link as={Link} to="/admin/dashboard">Admin</Nav.Link>}
//               </>
//             )}
//           </Nav>
//           <div className="d-flex gap-2">
//             {!isAuthenticated ? (
//               <>
//                 <Link to="/login" className="btn-outline-custom" style={{ padding: '.4rem 1.2rem', fontSize: '.78rem', border: '2px solid rgba(255,255,255,.7)', color: '#fff', borderRadius: '4px', textDecoration: 'none' }}>Login</Link>
//                 <Link to="/register" className="btn-quote" style={{ padding: '.4rem 1.2rem', fontSize: '.78rem' }}>Register</Link>
//               </>
//             ) : (
//               <Button variant="outline-light" onClick={handleLogout} size="sm">Logout</Button>
//             )}
//           </div>
//         </Navbar.Collapse>
//       </Container>
//     </StyledNavbar>
//   )
// }

// export default NavbarComponent



import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styled from 'styled-components'

const StyledNavbar = styled(Navbar)`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  transition: background .35s, box-shadow .35s;
  background: black;
  &.scrolled {
    background: rgba(10, 42, 16, .96);
    box-shadow: 0 2px 20px rgba(0,0,0,.4);
  }
  .navbar-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    img {
      height: 44px;
    }
    .brand-text {
      color: #fff;
      font-weight: 900;
      font-size: 1.2rem;
      font-family: 'Montserrat', sans-serif;
      letter-spacing: 0.05em;
    }
  }
  .nav-link {
    color: rgba(255,255,255,.88) !important;
    font-weight: 600;
    font-size: .88rem;
    letter-spacing: .06em;
    text-transform: uppercase;
    transition: color 0.2s;
    &:hover {
      color: #f5a623 !important;
    }
  }
  .btn-quote {
    background: #f5a623;
    color: #111 !important;
    border-radius: 4px;
    padding: .45rem 1.4rem !important;
    font-weight: 700;
    font-size: .82rem;
    letter-spacing: .06em;
    transition: background .2s, transform .15s;
    border: none;
    text-decoration: none;
    &:hover {
      background: #e0951a;
      transform: translateY(-1px);
      color: #111 !important;
    }
  }
`

const NavbarComponent = () => {
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <StyledNavbar expand="lg" className={scrolled ? 'scrolled' : ''}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src="/logo.png" alt="GARS Industries" />
          <span className="brand-text">INDUSTRIES</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/services">Services</Nav.Link>
            <Nav.Link as={Link} to="/applications">Applications</Nav.Link>
            <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
            <Nav.Link as={Link} to="/distributors">Distributors</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            {/* Dashboard link visible to everyone */}
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            {/* Admin link only for admins */}
            {isAuthenticated && isAdmin && (
              <Nav.Link as={Link} to="/admin/dashboard">Admin</Nav.Link>
            )}
          </Nav>
          <div className="d-flex gap-2">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="btn-outline-custom" style={{ padding: '.4rem 1.2rem', fontSize: '.78rem', border: '2px solid rgba(255,255,255,.7)', color: '#fff', borderRadius: '4px', textDecoration: 'none' }}>Login</Link>
                <Link to="/register" className="btn-quote" style={{ padding: '.4rem 1.2rem', fontSize: '.78rem' }}>Register</Link>
              </>
            ) : (
              <Button variant="outline-light" onClick={handleLogout} size="sm">Logout</Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  )
}

export default NavbarComponent