import axios from 'axios'

export default axios.create({
  baseURL: process.env.baseUrl,
})
// import axios from '~/plugins/axios'
