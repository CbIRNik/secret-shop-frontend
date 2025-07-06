import axios, { AxiosError } from 'axios'
import cookie from 'js-cookie'

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
})

httpClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${cookie.get('authToken')}`
    return config
  },
)
httpClient.interceptors.response.use(
  (config) => config,
  (error: AxiosError) => {
    return Promise.reject(error.response?.data)
  }
)
export { httpClient }