import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.victortolbert.com',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  all() {
    return apiClient.get('people')
  },
  getUsers(perPage, page) {
    return apiClient.get(`people?_limit=${perPage}&_page=${page}`)
  },
  getUser(id) {
    return apiClient.get(`people/${id}`)
  },
  postUser(user) {
    return apiClient.post('people', user)
  },
}
