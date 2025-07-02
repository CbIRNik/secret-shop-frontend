import axios from 'axios'
import cookies from 'js-cookie'

const httpClient = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: false,
})

httpClient.interceptors.response.use(
  (response) => {
    response.config.headers.Authorization = `Bearer ${cookies.get('authToken')}`
    return response
  },
  (error) => Promise.reject(error.response),
)
export { httpClient }