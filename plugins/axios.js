import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'

axios.defaults.transformResponse = [
  (data, headers) => {
    if (data && headers['content-type'].includes('application/json')) {
      return camelcaseKeys(JSON.parse(data), {deep: true})
    }
  },
]

axios.defaults.transformRequest = [
  (data, headers) => {
    if (data && headers['content-type'].includes('application/json')) {
      return JSON.stringify(snakecaseKeys(data, {deep: true}))
    }
  },
]

export default axios.create({
  baseURL: process.env.apiUrl,
})
// import axios from '~/plugins/axios'
