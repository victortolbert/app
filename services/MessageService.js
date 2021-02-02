import axios from '~/plugins/axios'

// const apiClient = axios.create({
//   baseURL: process.env.apiUrl || 'http://localhost:3000',
//   withCredentials: false, // This is the default
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   timeout: 60000,
// })

export default {
  getMessages(perPage, page) {
    return axios.get('/messages?_limit=' + perPage + '&_page=' + page)
  },
  getMessage(id) {
    return axios.get('/messages/' + id)
  },
  postMessage(message) {
    return axios.post('/messages', message)
  },
  getMessageCount(query) {
    return axios.get(`/messages?q=${query}`)
    // return payload
  },
}
