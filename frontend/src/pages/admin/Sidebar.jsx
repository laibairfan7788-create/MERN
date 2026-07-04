import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const SidebarWrapper = styled.div`
  width: 250px;
  background: #111b13;
  min-height: 100vh;
  padding: 1.5rem 0;
  .nav-link {
    color: rgba(255,255,255,.7) !important;
    padding: .7rem 1.5rem;
    border-radius: 6px;
    transition: background .2s, color .2s;
    &:hover, &.active {
      background: #2e8b47;
      color: #fff !important;
    }
    i {
      margin-right: .6rem;
      width: 20px;
      text-align: center;
    }
  }
`

const Sidebar = () => {
  const location = useLocation()
  const links = [
    { to: '/admin/dashboard', icon: 'fa-chart-pie', label: 'Dashboard' },
    { to: '/admin/users', icon: 'fa-users', label: 'Users' },
    { to: '/admin/products', icon: 'fa-box', label: 'Products' },
    { to: '/admin/orders', icon: 'fa-shopping-cart', label: 'Orders' },
    { to: '/admin/gallery', icon: 'fa-images', label: 'Gallery' },
    { to: '/admin/settings', icon: 'fa-cog', label: 'Settings' },
  ]
  return (
    <SidebarWrapper>
      <div className="text-center mb-4">
        <img src="/logo 1.png" alt="GARS" style={{ height: '40px' }} />
        <span style={{ color: '#fff', fontWeight: 700, display: 'block' }}>Admin</span>
      </div>
      <Nav className="flex-column">
        {links.map(link => (
          <Nav.Link key={link.to} as={Link} to={link.to} className={location.pathname === link.to ? 'active' : ''}>
            <i className={`fas ${link.icon}`}></i> {link.label}
          </Nav.Link>
        ))}
      </Nav>
    </SidebarWrapper>
  )
}
export default Sidebar