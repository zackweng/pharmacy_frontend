import axios from 'axios'

export function clientInstance () {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
  return axiosInstance
}
