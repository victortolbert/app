import Middleware from './middleware'
import { Auth, authMiddleware, ExpiredAuthSessionError } from '~auth/runtime'

// Active schemes
import { LocalScheme } from '~auth/runtime'
import { CookieScheme } from '~auth/runtime'
import { Oauth2Scheme } from '~auth/runtime'

Middleware.auth = authMiddleware

export default function (ctx, inject) {
  // Options
  const options = {
  "resetOnError": false,
  "ignoreExceptions": false,
  "scopeKey": "scope",
  "rewriteRedirects": true,
  "fullPathRedirect": false,
  "watchLoggedIn": true,
  "redirect": {
    "login": "/login/",
    "logout": "/",
    "home": "/",
    "callback": "/login/"
  },
  "vuex": {
    "namespace": "auth"
  },
  "cookie": {
    "prefix": "auth.",
    "options": {
      "path": "/"
    }
  },
  "localStorage": {
    "prefix": "auth."
  },
  "defaultStrategy": "local"
}

  // Create a new Auth instance
  const $auth = new Auth(ctx, options)

  // Register strategies
  // local
  $auth.registerStrategy('local', new LocalScheme($auth, {
  "token": {
    "property": "token"
  },
  "user": {
    "property": "user"
  },
  "endpoints": {
    "login": {
      "url": "/api/auth/login",
      "method": "post"
    },
    "logout": {
      "url": "/api/auth/logout",
      "method": "post"
    },
    "user": {
      "url": "/api/auth/user",
      "method": "get"
    }
  },
  "name": "local"
}))

  // cookie
  $auth.registerStrategy('cookie', new CookieScheme($auth, {
  "cookie": {
    "name": "XSRF-TOKEN"
  },
  "endpoints": {
    "csrf": {
      "url": ""
    }
  },
  "name": "cookie"
}))

  // github
  $auth.registerStrategy('github', new Oauth2Scheme($auth, {
  "name": "github",
  "endpoints": {
    "authorization": "https://github.com/login/oauth/authorize",
    "token": "/_auth/oauth/github/authorize",
    "userInfo": "https://api.github.com/user"
  },
  "scope": [
    "user",
    "email"
  ],
  "responseType": "code"
}))

  // google
  $auth.registerStrategy('google', new Oauth2Scheme($auth, {
  "name": "google",
  "endpoints": {
    "authorization": "https://accounts.google.com/o/oauth2/auth",
    "userInfo": "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  "scope": [
    "openid",
    "profile",
    "email"
  ]
}))

  // laravelSanctum
  $auth.registerStrategy('laravelSanctum', new CookieScheme($auth, {
  "url": "<laravel url>",
  "name": "laravelSanctum",
  "cookie": {
    "name": "XSRF-TOKEN"
  },
  "endpoints": {
    "csrf": {
      "withCredentials": true,
      "headers": {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      "url": "<laravel url>/sanctum/csrf-cookie"
    },
    "login": {
      "withCredentials": true,
      "headers": {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      "url": "<laravel url>/login"
    },
    "logout": {
      "withCredentials": true,
      "headers": {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      "url": "<laravel url>/logout"
    },
    "user": {
      "withCredentials": true,
      "headers": {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      "url": "<laravel url>/api/user"
    }
  },
  "user": {
    "property": false
  }
}))

  // Inject it to nuxt context as $auth
  inject('auth', $auth)
  ctx.$auth = $auth

  // Initialize auth
  return $auth.init().catch(error => {
    if (process.client) {
      // Don't console log expired auth session errors. This error is common, and expected to happen.
      // The error happens whenever the user does an ssr request (reload/initial navigation) with an expired refresh
      // token. We don't want to log this as an error.
      if (error instanceof ExpiredAuthSessionError) {
        return
      }

      console.error('[ERROR] [AUTH]', error)
    }
  })
}
