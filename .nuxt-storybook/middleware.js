const middleware = {}

middleware['auth-admin'] = require('../middleware/auth-admin.js')
middleware['auth-admin'] = middleware['auth-admin'].default || middleware['auth-admin']

middleware['authenticated'] = require('../middleware/authenticated.js')
middleware['authenticated'] = middleware['authenticated'].default || middleware['authenticated']

middleware['check-auth'] = require('../middleware/check-auth.js')
middleware['check-auth'] = middleware['check-auth'].default || middleware['check-auth']

middleware['index'] = require('../middleware/index.js')
middleware['index'] = middleware['index'].default || middleware['index']

middleware['pages'] = require('../middleware/pages.js')
middleware['pages'] = middleware['pages'].default || middleware['pages']

middleware['user-agent'] = require('../middleware/user-agent.js')
middleware['user-agent'] = middleware['user-agent'].default || middleware['user-agent']

middleware['visits'] = require('../middleware/visits.js')
middleware['visits'] = middleware['visits'].default || middleware['visits']

export default middleware
