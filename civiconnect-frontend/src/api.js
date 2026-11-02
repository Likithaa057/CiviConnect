import axios from 'axios'

const apiBaseURL = import.meta.env.VITE_API_URL || '/api/'

const api = axios.create({
  baseURL: apiBaseURL.endsWith('/') ? apiBaseURL : `${apiBaseURL}/`
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access')
  if (token) config.headers.Authorization = 'Bearer ' + token
  return config
})

export default api