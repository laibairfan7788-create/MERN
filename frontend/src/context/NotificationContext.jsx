
// import React, { createContext, useContext } from 'react'
// import { toast, ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// const NotificationContext = createContext()

// export const NotificationProvider = ({ children }) => {
//   const notify = (message, type = 'info') => {
//     toast[type](message, {
//       position: 'top-right',
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//     })
//   }

//   return (
//     <NotificationContext.Provider value={{ notify }}>
//       {children}
//       <ToastContainer />
//     </NotificationContext.Provider>
//   )
// }

// // ✅ IMPORTANT: export with lowercase 'useNotification'
// // eslint-disable-next-line react-refresh/only-export-components
// export const useNotification = () => {
//   const context = useContext(NotificationContext)
//   if (!context) throw new Error('useNotification must be used within a NotificationProvider')
//   return context
// }
import React, { createContext, useContext } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const notify = (message, type = 'info') => {
    // ✅ Ensure toast[type] exists – fallback to 'info'
    const method = toast[type] || toast.info
    method(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <ToastContainer />
    </NotificationContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) throw new Error('useNotification must be used within a NotificationProvider')
  return context
}