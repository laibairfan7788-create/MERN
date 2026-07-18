

import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
import WhatsAppFloat from '../common/WhatsAppFloat'
import { GlobalStyle } from '../../assets/styles/globals'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../assets/styles/theme'

const MainLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar />
      <Outlet />
      <Footer />
      <WhatsAppFloat />
    </ThemeProvider>
  )
}

export default MainLayout