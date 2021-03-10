import cookie from 'cookie'

export default function () {
  const authConfig = this.options.publicRuntimeConfig.auth

  this.nuxt.hook('render:setupMiddleware', app => {
    app.use('/api', handler)
  })

  function handler(req, res, next) {
    const idToken = cookie.parse(req.headers.cookie)[authConfig.cookieName]
    console.log(req.originalUrl)
    console.log(idToken)
    next()
  }
}
