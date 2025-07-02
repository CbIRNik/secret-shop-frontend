import axios from 'axios'
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
export { httpClient }