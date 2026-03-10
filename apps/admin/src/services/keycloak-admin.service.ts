import axios, { AxiosError } from 'axios'
import { getToken, keycloak } from '@/lib/keycloak'

const api = axios.create({
  baseURL: import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - add auth token
api.interceptors.request.use(
  async (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired, redirect to login
      keycloak.login()
    }
    return Promise.reject(error)
  }
)

export default api
