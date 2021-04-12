export default {
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    apiURL: process.env.API_URL || 'https://api.vticonsulting.com',
    assetsURL: process.env.ASSETS_URL || 'https://cominex.net/assets',
    algolia: {
      appId: 'WTEU7RU64C',
      key: '0bdd840be2d7d4377e10b238bc731901',
    },
    googleMapsApiKey:
      process.env.GOOGLE_MAPS_API_KEY ||
      'AIzaSyAC93FnPRqmvipFZZUenONKIbKHqPlbu6s',
    gtm: {
      id: process.env.GOOGLE_TAG_MANAGER_ID
    }
  },

  privateRuntimeConfig: {
    algolia: {
      appId: 'WTEU7RU64C',
      key: 'd1fe567d10edb4ffe8e470d61dc84616',
    },
  },

  ssr: false,

  target: 'static',

  head: {
    title: 'testing',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }],
    script: [{
      src: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js',
      defer: true,
    }],
    bodyAttrs: {
      class: 'bg-gray-100 dark:bg-gray-900'
    }
  },

  components: true,

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/css/global.scss',
    '~/assets/css/components/cookie_consent.css',
  ],

  layoutTransition: {
    name: 'layout',
    mode: 'out-in',
  },

  modules: [
    '@oruga-ui/oruga/nuxt',
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/sentry',
    '@nuxt/content',
    'nuxt-i18n',
    // '@nuxtjs/gtm'
    // '@nuxtjs/emotion,
    // '@nuxtjs/feed',
    // '@nuxtjs/pwa',
    // '@nuxtjs/sitemap',
    // '@nuxtjs/style-resources',
    // 'vue-toastification/nuxt',
    // 'yamlful-nuxt',
  ],

  plugins: [
    '~/plugins/api',
    '~/plugins/data-api',
    '~/plugins/fontawesome',
    '~/plugins/maps.client',
    '~/plugins/markdown',
    '~/plugins/menu.client',
    '~/plugins/particles.client',
    '~/plugins/portal-vue',
    '~/plugins/repository',
    '~/plugins/vue-aos.client',
    '~/plugins/vue-api-query',
    '~/plugins/vue-awesome-swiper.client',
    '~/plugins/vue-chartkick.client',
    '~/plugins/vue-content-placeholders',
    '~/plugins/vue-infinite-loading.client',
    '~/plugins/vue-instantsearch.client',
    '~/plugins/vue-masonry-css.client',
    '~/plugins/vue-observe-visibility.client',
    '~/plugins/vue-notifications.client',
    '~/plugins/vue-ray.client',
    '~/plugins/vue-scrollactive',
    '~/plugins/vue-select',
    '~/plugins/vue-shortkey.client',
    '~/plugins/vue-textarea-autosize',
    '~/plugins/vue-toastification.client',

    // '~/plugins/demo',
    // '~/plugins/filters',
    // '~/plugins/jam',
    // '~/plugins/vee-validate',
    // '~/plugins/vue-advanced-cropper.client',
    // '~/plugins/vue-awesome',
    // '~/plugins/vue-drag-zone',
    // '~/plugins/vue-float-label.client',
    // '~/plugins/vue-print-nb',
    // '~/plugins/vue-touch-ripple',
    // '~/plugins/vue-video-player.client',
  ],

  build: {
    postcss: {
      plugins: {

      }
    },
    extend(config, context) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      })
    },
  },

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/color-mode',
    '@nuxtjs/composition-api',
    '@nuxtjs/tailwindcss',
    'nuxt-use-sound',
    // "@nuxtjs/google-fonts",
    // '@nuxt/http',
    // '@nuxtjs/ackee',
    // '@nuxtjs/google-analytics',
    // '@nuxtjs/moment',
    // '@nuxtjs/netlify-files',
    // '@nuxtjs/pwa',
    // '@nuxtjs/router',
    // '@nuxtjs/sitemap'
    // '@nuxtjs/style-resources',
    // '@nuxtjs/stylelint-module',
    // '@nuxtjs/svg',
    // '@nuxtjs/tailwindcss',
    // '@nuxtjs/vuetify',
    // 'nuxt-svg-loader',
    // 'nuxt-windicss',
  ],

  auth: {
    fullPathRedirect: true,
    redirect: {
      callback: '/login/',
      home: '/',
      login: '/login/',
      logout: '/login/',
    },
    rewriteRedirects: true,
    strategies: {
      // the cookie scheme is based on `local` but modified for cookie based APIs.
      // instead of using a token, depends on cookie set by auth provider.
      // All local scheme options are also supported.
      cookie: {
        cookie: {
          // (optional) If set we check this cookie exsistence for loggedIn check
          name: 'XSRF-TOKEN',
        },
        endpoints: {
          // (optional) If set, we send a get request to this endpoint before login
          csrf: {
            url: '',
          },
        },
      },
      // this.$auth.loginWith('facebook')
      facebook: {
        endpoints: {
          userInfo:
            'https://graph.facebook.com/v6.0/me?fields=id,name,picture{url}',
        },
        clientId: '...',
        scope: ['public_profile', 'email'],
      },
      // this.$auth.loginWith('github')
      github: {
        clientId: '...',
        clientSecret: '...',
      },
      // this.$auth.loginWith('google')
      google: {
        clientId: '...',
      },
      // the default, credentials/token based scheme for flows like JWT
      local: {
        token: {
          // used to specify which field of the response JSON to be
          // used for value. It can be false to directly use API
          // response or being more complicated like `auth.token`
          property: 'token',
          // Useful for Cookie only flows
          // can be used to disable all token handling
          // required: true,
          required: false,
          // Authorization header name to be used in axios requests
          name: 'Authorization',
          // the expiration time of the token, in seconds
          // default is set to 30 minutes
          // used if for some reason the token couldn't be decoded to get the expiration date
          maxAge: 1800,
          // Authorization header type to be used in axios requests
          // type: 'Bearer'
          type: false,
        },
        user: {
          //  can be used to specify which field of the response JSON to
          // be used for value.It can be false to directly use API
          // response or being more complicated like auth.user.
          property: 'user',
          // autoFetch: true
        },
        clientId: false,
        grantType: false,
        scope: false,
        // Each endpoint is used to make requests using axios.
        // They are basically extending Axios Request Config.
        // https://github.com/axios/axios#request-config
        // To disable an endpoint, set its value to `false`
        endpoints: {
          login: {url: '/api/auth/login', method: 'post'},
          logout: {url: '/api/auth/logout', method: 'post'},
          user: {url: '/api/auth/user', method: 'get'},
        },
      },

      // this.$auth.loginWith('laravelSanctum', {data: {email: '', password: ''}})
      // based on cookie scheme and supports all scheme options.
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url:
          process.env.NODE_ENV === 'production'
            ? 'https://vticonsulting.com'
            : 'http://vticonsulting.test',
      },
    },
  },

  axios: {
    baseURL: process.env.API_URL || 'https://api.victortolbert.com/',
    credentials: true,
    // proxy: true,
  },

  colorMode: {
    classSuffix: '',
  },

  content: {},

  // googleFonts: {
  //   families: {
  //     Roboto: true,
  //     "Roboto+Condensed": true,
  //   },
  // },

  // gtm: {
  //   id: 'GTM-XXXXXXX', // Used as fallback if no runtime config is provided
  // },

  i18n: {
    locales: [
      {
        code: 'es',
        file: 'es.json',
        iso: 'en-ES',
        name: 'Español',
      },
      {
        code: 'en',
        file: 'en.json',
        iso: 'en-US',
        name: 'English',
      },
    ],
    defaultLocale: 'en',
    parsePages: false,
    strategy: 'prefix_except_default',
    lazy: true,
    seo: false,
    langDir: 'locales/',
  },

  oruga: {
    includeCss: 'vars',
    // iconPack: 'mdi',
    iconPack: 'fas',
    iconComponent: 'FontAwesomeIcon',
    button: {
      override: true,
      rootClass: 'border rounded-md py-1 px-4 hover:bg-gray-100',
      variantClass: 'is-',
    },
  },

  proxy: {
    '/laravel': {
      pathRewrite: {'^/laravel': '/'},
      target:
        process.env.NODE_ENV === 'production'
          ? 'https://vticonsulting.com'
          : 'http://vticonsulting.test',
    },
  },

  pwa: { manifest: { lang: 'en' } },

  // sentry: {
  //   dsn: process.env.SENTRY_DSN,
  //   config: {},
  // },

  sound: {
    back: {
      src: '/assets/sound/back.wav',
      options: {
        volume: 0.25,
      },
    },
    button: {
      src: '/assets/sound/button.wav',
      options: {
        volume: 0.25,
      },
    },
    error: {
      src: '/assets/sound/error.wav',
      options: {
        volume: 0.25,
      },
    },
  },

  tailwindcss: {
    exposeConfig: true,
    jit: true
  },

  typescript: {
    // ignoreNotFoundWarnings: true,
    // typeCheck: false,
  }
}
