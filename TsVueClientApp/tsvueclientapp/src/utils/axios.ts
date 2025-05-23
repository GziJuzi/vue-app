// src/utils/api.ts
import axios from 'axios'
import {
  clearUserData,
  getToken
} from './user'

export const api = axios.create()

export async function initAxiosFromConfig(): Promise<void> {
  try {
    const response = await fetch('/config.json')
    const config = await response.json()
    api.defaults.baseURL = config.apiBaseUrl || ''
  } catch (e) {
    console.warn('Failed to load config.json. Using fallback baseURL.')
    api.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || ''
  }
}

api.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      clearUserData()
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)
