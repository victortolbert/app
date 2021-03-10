export default (req, res, next) => {
  if (req.url === '/oldpage') {
    res.statusCode = 302
    res.setHeader('Location', '/newpage')
    res.end()
    return
  }
  next()
}
