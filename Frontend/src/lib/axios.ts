import axios, { type AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'
import { env } from '@config/env'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: env.API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed in the future
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status

      switch (status) {
        case 401:
          // Handle unauthorized - could redirect to login in the future
          console.error('Unauthorized request')
          break
        case 403:
          console.error('Forbidden request')
          break
        case 404:
          console.error('Resource not found')
          break
        case 500:
          console.error('Server error')
          break
        default:
          console.error(`HTTP Error: ${status}`)
      }
    } else if (error.request) {
      console.error('No response received from server')
    } else {
      console.error('Request configuration error:', error.message)
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
