// import React from "react";

// export default function AuthLayout({ children }) {
//   return (
//     <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
//       <div style={{ width: "100%", maxWidth: 520 }}>{children}</div>
//     </div>
//   );
// }

import React from 'react'
import { Outlet } from 'react-router-dom'
import { GlobalStyle } from '../../assets/styles/globals'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../assets/styles/theme'

const AuthLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Outlet />
    </ThemeProvider>
  )
}

export default AuthLayout