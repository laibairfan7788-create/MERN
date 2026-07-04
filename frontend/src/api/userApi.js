// import api from './axiosConfig'

// export const getUserProfile = () => api.get('/user/profile')
// export const updateUserProfile = (data) => api.put('/user/profile', data)
// export const getUserOrders = () => api.get('/user/orders')
// export const createQuote = (data) => api.post('/user/quote', data)
import api from './axiosConfig'

export const getUserProfile = () => api.get('/user/profile')
export const updateUserProfile = (data) => api.put('/user/profile', data)
export const getUserOrders = () => api.get('/user/orders')
export const createOrder = (data) => api.post('/user/orders', data)   // ✅ ADD THIS
export const createQuote = (data) => api.post('/user/quote', data)