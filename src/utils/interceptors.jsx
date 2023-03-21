import axios from 'axios'
import { getToken } from './token'
//const token = document.head.querySelector('meta[name="csrf-token"]').content

//axios.defaults.headers.common['X-CSRF-TOKEN'] = token
const axiosInstance = axios.create({
  //baseURL: 'https://app.spiritx.co.nz/api/',
  baseURL: 'http://localhost:8000/api/',
  timeout: 5000,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      //config.headers.token = `${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return error
  }
)

export { axiosInstance }
