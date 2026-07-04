// import React from "react";

// // Intentionally minimal. Sidebar/Header can be added later.
// export default function AdminLayout({ children }) {
//   return (
//     <div className="min-vh-100 bg-light">
//       <div className="container py-4">{children}</div>
//     </div>
//   );
// }

import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../admin/Sidebar'
import AdminHeader from '../admin/AdminHeader'
import { Container, Row, Col } from 'react-bootstrap'
import { GlobalStyle } from '../../assets/styles/globals'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../assets/styles/theme'

const AdminLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <AdminHeader />
          <Container fluid style={{ padding: '1.5rem', backgroundColor: '#f8f9fa', flex: 1 }}>
            <Outlet />
          </Container>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default AdminLayout