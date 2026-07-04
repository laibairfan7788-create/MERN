import api from './axiosConfig'

export const login = (email, password) => api.post('/auth/login', { email, password })
export const register = (userData) => api.post('/auth/register', userData)
export const logout = () => api.post('/auth/logout')
export const getMe = () => api.get('/auth/me')