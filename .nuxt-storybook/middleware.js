const middleware = {}

middleware['authenticated'] = require('../middleware/authenticated.js')
middleware['authenticated'] =
  middleware['authenticated'].default || middleware['authenticated']

middleware['index'] = require('../middleware/index.js')
middleware['index'] = middleware['index'].default || middleware['index']

middleware['user-agent'] = require('../middleware/user-agent.js')
middleware['user-agent'] =
  middleware['user-agent'].default || middleware['user-agent']

middleware['visits'] = require('../middleware/visits.js')
middleware['visits'] = middleware['visits'].default || middleware['visits']

export default middleware
