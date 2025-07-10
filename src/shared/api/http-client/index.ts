import axios, { AxiosError } from 'axios'
import {cookies} from "next/headers"

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
})

httpClient.interceptors.request.use(
  async (config) => {
    const cookieStore = await cookies()
    config.headers.Authorization = `Bearer ${cookieStore.get('authToken')?.value}`
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