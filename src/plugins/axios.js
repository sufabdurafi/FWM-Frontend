import axios from 'axios'

const api = axios.create({
  baseURL: 'https://fwm-backend-production-14fa.up.railway.app/api', // Sesuaikan dengan URL backend
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Tambahkan token ke header setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Tangani error 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default api
