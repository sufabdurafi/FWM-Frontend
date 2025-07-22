import axios from 'axios'

const api = axios.create({
  baseURL: 'https://fwm-backend-production-14fa.up.railway.app/api',
})

// Interceptor untuk menyisipkan token JWT jika ada
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
