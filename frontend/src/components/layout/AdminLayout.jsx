

// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import Sidebar from '../admin/Sidebar'
// import AdminHeader from '../admin/AdminHeader'
// import { Container, Row, Col } from 'react-bootstrap'
// import { GlobalStyle } from '../../assets/styles/globals'
// import { ThemeProvider } from 'styled-components'
// import { theme } from '../../assets/styles/theme'

// const AdminLayout = () => {
//   return (
//     <ThemeProvider theme={theme}>
//       <GlobalStyle />
//       <div style={{ display: 'flex', minHeight: '100vh' }}>
//         <Sidebar />
//         <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//           <AdminHeader />
//           <Container fluid style={{ padding: '1.5rem', backgroundColor: '#f8f9fa', flex: 1 }}>
//             <Outlet />
//           </Container>
//         </div>
//       </div>
//     </ThemeProvider>
//   )
// }

// export default AdminLayout
import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../admin/Sidebar'
import AdminHeader from '../admin/AdminHeader'
import styled from 'styled-components'
import { GlobalStyle } from '../../assets/styles/globals'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../assets/styles/theme'

const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f4f6f9;

  .content-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 250px;
  }

  .page-content {
    padding: 1.5rem;
    flex: 1;
  }

  @media (max-width: 768px) {
    .content-wrapper {
      margin-left: 0;
    }
  }
`

const AdminLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <LayoutWrapper>
        <Sidebar />
        <div className="content-wrapper">
          <AdminHeader />
          <div className="page-content">
            <Outlet />
          </div>
        </div>
      </LayoutWrapper>
    </ThemeProvider>
  )
}

export default AdminLayout