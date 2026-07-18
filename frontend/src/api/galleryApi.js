// import api from './axiosConfig'

// // ─── Public ──────────────────────────────────
// export const getPublicGallery = () => api.get('/gallery')

// // ─── Admin (protected) ──────────────────────
// export const getGallery = () => api.get('/admin/gallery')
// export const uploadGalleryImage = (formData) => api.post('/admin/gallery', formData)
// export const updateGalleryImage = (id, data) => api.put(`/admin/gallery/${id}`, data)
// export const deleteGalleryImage = (id) => api.delete(`/admin/gallery/${id}`)
import api from './axiosConfig';

// ─── PUBLIC ────────────────────────────────────────────────────────
export const getPublicGallery = () => api.get('/gallery');

// ─── ADMIN ────────────────────────────────────────────────────────
export const getGallery = () => api.get('/gallery/admin');
export const uploadGalleryImage = (formData) => {
  return api.post('/gallery/admin', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
export const updateGalleryImage = (id, data) => api.put(`/gallery/admin/${id}`, data);
export const deleteGalleryImage = (id) => api.delete(`/gallery/admin/${id}`);