import {ServerMiddleware} from '@nuxt/types'

const myServerMiddleware: ServerMiddleware = function(req, res, next) {
  // Use req, res, next
  // console.log(res.getHeaders())
  next()
}

export default myServerMiddleware
