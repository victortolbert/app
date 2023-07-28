import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.victortolbert.com/',
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getProjects(perPage, page) {
    return apiClient.get(`/projects?_limit=${perPage}&_page=${page}`)
  },
  getProject(id) {
    return apiClient.get(`/projects/${id}`)
  },
  postProject(event) {
    return apiClient.post('/projects', event)
  },
}
