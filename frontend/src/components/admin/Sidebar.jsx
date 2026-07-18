// import React from 'react'
// import { Nav } from 'react-bootstrap'
// import { Link, useLocation } from 'react-router-dom'
// import styled from 'styled-components'

// const SidebarWrapper = styled.div`
//   width: 250px;
//   background: #111b13;
//   min-height: 100vh;
//   padding: 1.5rem 0;
//   position: sticky;
//   top: 0;
//   height: 100vh;
//   overflow-y: auto;

//   .brand {
//     text-align: center;
//     margin-bottom: 2rem;
//     padding: 0 1rem;
    
//     img {
//       height: 40px;
//       margin-bottom: 0.3rem;
//     }
    
//     span {
//       color: #fff;
//       font-weight: 700;
//       font-size: 0.9rem;
//       display: block;
//       letter-spacing: 0.05em;
//     }
//   }

//   .nav-link {
//     color: rgba(255, 255, 255, 0.7) !important;
//     padding: 0.7rem 1.5rem;
//     border-radius: 6px;
//     transition: background 0.2s, color 0.2s;
//     margin: 0.1rem 0.8rem;
//     font-size: 0.9rem;
//     font-weight: 500;
//     display: flex;
//     align-items: center;
//     gap: 0.6rem;

//     &:hover {
//       background: rgba(46, 139, 71, 0.2);
//       color: #fff !important;
//     }

//     &.active {
//       background: #2e8b47;
//       color: #fff !important;
//       box-shadow: 0 2px 8px rgba(46, 139, 71, 0.3);
//     }

//     i {
//       width: 20px;
//       text-align: center;
//       font-size: 1rem;
//     }
//   }

//   .divider {
//     border-top: 1px solid rgba(255, 255, 255, 0.06);
//     margin: 0.8rem 1.2rem;
//   }

//   .footer-text {
//     color: rgba(255, 255, 255, 0.2);
//     font-size: 0.7rem;
//     text-align: center;
//     padding: 1rem;
//     margin-top: 1rem;
//     border-top: 1px solid rgba(255, 255, 255, 0.04);
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//     min-height: auto;
//     height: auto;
//     position: relative;
//     padding: 1rem 0;
//   }
// `

// const Sidebar = () => {
//   const location = useLocation()

//   const navLinks = [
//     { to: '/admin/dashboard', icon: 'fa-chart-pie', label: 'Dashboard' },
//     { to: '/admin/users', icon: 'fa-users', label: 'Users' },
//     { to: '/admin/products', icon: 'fa-box', label: 'Products' },
//     { to: '/admin/orders', icon: 'fa-shopping-cart', label: 'Orders' },
//     { to: '/admin/gallery', icon: 'fa-images', label: 'Gallery' },
//     { to: '/admin/settings', icon: 'fa-cog', label: 'Settings' },
//   ]

//   return (
//     <SidebarWrapper>
//       <div className="brand">
//         <img src="/logo 1.png" alt="GARS Industries" />
//         <span>Admin Panel</span>
//       </div>

//       <Nav className="flex-column">
//         {navLinks.map((link) => (
//           <Nav.Link
//             key={link.to}
//             as={Link}
//             to={link.to}
//             className={location.pathname === link.to ? 'active' : ''}
//           >
//             <i className={`fas ${link.icon}`}></i>
//             {link.label}
//           </Nav.Link>
//         ))}
//       </Nav>

//       <div className="divider"></div>

//       <Nav className="flex-column">
//         <Nav.Link
//           as={Link}
//           to="/"
//           className={location.pathname === '/' ? 'active' : ''}
//         >
//           <i className="fas fa-globe"></i>
//           Visit Website
//         </Nav.Link>
//       </Nav>

//       <div className="footer-text">
//         GARS Industries v1.0
//       </div>
//     </SidebarWrapper>
//   )
// }

// // ✅ IMPORTANT – default export
// export default Sidebar
import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const SidebarWrapper = styled.div`
  width: 250px;
  background: #111b13;
  min-height: 100vh;
  padding: 1.5rem 0;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow-y: auto;
  z-index: 1000;

  .brand {
    text-align: center;
    margin-bottom: 2rem;
    padding: 0 1rem;
    
    img {
      height: 40px;
      margin-bottom: 0.3rem;
    }
    
    .brand-text {
      color: #fff;
      font-weight: 700;
      font-size: 1rem;
      display: block;
      letter-spacing: 0.05em;
    }
    
    .brand-sub {
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.7rem;
      display: block;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
  }

  .nav-link {
    color: rgba(255, 255, 255, 0.7) !important;
    padding: 0.7rem 1.5rem;
    border-radius: 6px;
    transition: background 0.2s, color 0.2s;
    margin: 0.1rem 0.8rem;
    font-size: 0.9rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.6rem;

    &:hover {
      background: rgba(46, 139, 71, 0.2);
      color: #fff !important;
    }

    &.active {
      background: #2e8b47;
      color: #fff !important;
      box-shadow: 0 2px 8px rgba(46, 139, 71, 0.3);
    }

    i {
      width: 20px;
      text-align: center;
      font-size: 1rem;
    }
  }

  .divider {
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    margin: 0.8rem 1.2rem;
  }

  .footer-text {
    color: rgba(255, 255, 255, 0.2);
    font-size: 0.7rem;
    text-align: center;
    padding: 1rem;
    margin-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.04);
  }

  @media (max-width: 768px) {
    width: 100%;
    position: relative;
    height: auto;
    min-height: auto;
    
    .content-wrapper {
      margin-left: 0;
    }
  }
`

const Sidebar = () => {
  const location = useLocation()

  const navLinks = [
    { to: '/admin/dashboard', icon: 'fa-chart-pie', label: 'Dashboard' },
    { to: '/admin/users', icon: 'fa-users', label: 'Users' },
    { to: '/admin/products', icon: 'fa-box', label: 'Products' },
    { to: '/admin/orders', icon: 'fa-shopping-cart', label: 'Orders' },
    { to: '/admin/gallery', icon: 'fa-images', label: 'Gallery' },
    { to: '/admin/settings', icon: 'fa-cog', label: 'Settings' },
  ]

  return (
    <SidebarWrapper>
      <div className="brand">
        <img src="/logo.png" alt="GARS Industries" />
        <span className="brand-text">GARS INDUSTRIES</span>
        <span className="brand-sub">Admin Panel</span>
      </div>

      <Nav className="flex-column">
        {navLinks.map((link) => (
          <Nav.Link
            key={link.to}
            as={Link}
            to={link.to}
            className={location.pathname === link.to ? 'active' : ''}
          >
            <i className={`fas ${link.icon}`}></i>
            {link.label}
          </Nav.Link>
        ))}
      </Nav>

      <div className="divider"></div>

      <Nav className="flex-column">
        <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'active' : ''}>
          <i className="fas fa-globe"></i>
          Visit Website
        </Nav.Link>
      </Nav>

      <div className="footer-text">GARS Industries v1.0</div>
    </SidebarWrapper>
  )
}

export default Sidebar