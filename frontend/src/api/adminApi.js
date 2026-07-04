import api from './axiosConfig'

export const getUsers = () => api.get('/admin/users')
export const updateUser = (id, data) => api.put(`/admin/users/${id}`, data)
export const deleteUser = (id) => api.delete(`/admin/users/${id}`)

export const getProducts = () => api.get('/admin/products')
export const createProduct = (data) => api.post('/admin/products', data)
export const updateProduct = (id, data) => api.put(`/admin/products/${id}`, data)
export const deleteProduct = (id) => api.delete(`/admin/products/${id}`)

export const getOrders = () => api.get('/admin/orders')
export const updateOrderStatus = (id, status) => api.put(`/admin/orders/${id}`, { status })

export const getGallery = () => api.get('/admin/gallery')
export const uploadGalleryImage = (formData) => api.post('/admin/gallery', formData)
export const deleteGalleryImage = (id) => api.delete(`/admin/gallery/${id}`)
// import api from './axiosConfig'

// // ... other API functions ...

// // ============ GALLERY API ============

// /**
//  * Get all gallery images
//  * @returns {Promise} Array of images
//  */
// export const getGallery = () => {
//   return api.get('/admin/gallery')
// }

// /**
//  * Upload a new image
//  * @param {FormData} formData - Contains 'image' file and optional 'title'
//  * @param {Function} onUploadProgress - Progress callback
//  * @returns {Promise} Uploaded image data
//  */
// export const uploadGalleryImage = (formData, onUploadProgress) => {
//   return api.post('/admin/gallery', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//     onUploadProgress: onUploadProgress,
//   })
// }

// /**
//  * Delete an image by ID
//  * @param {number|string} id - Image ID
//  * @returns {Promise} Deletion confirmation
//  */
// export const deleteGalleryImage = (id) => {
//   return api.delete(`/admin/gallery/${id}`)
// }

// export default api