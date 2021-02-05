import axios from 'axios'

const apiClient = axios.create({
  baseURL:
    process.env.VUE_APP_API_URL ||
    'https://my-json-server.typicode.com/tolbertdesign/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getEvents(perPage, page) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  },
}
