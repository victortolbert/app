const path = require('path')
// eslint-disable-next-line import/named
// import {utils} from './config'
// const isDev = process.env.NODE_ENV !== "production"

module.exports = {
  // should hold all env variables that are public as these will be exposed on the frontend. This could include a reference to your public URL for example.
  publicRuntimeConfig: {
    // baseUrl: process.env.BASE_URL || 'https://app.vticonsulting.com',
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://app.vticonsulting.com'
        : 'https://app.vticonsulting.com',
    assetUrl:
      process.env.ASSETS_URL ||
      'https://td-aws-bucket.s3.amazonaws.com/album2/',
    apiUrl: process.env.API_URL || 'https://victortolbert-api.herokuapp.com',
    algoliaApiKey:
      process.env.ALGOLIA_API_KEY || 'AIzaSyBvOoQe7xFg-XaWj9w_l7ODbMqb4BK0B9E',

    awsS3DefaultRegion: process.env.AWS_S3_DEFAULT_REGION || 'us-east-1',
    awsS3AccessKey: process.env.AWS_S3_ACCESS_KEY || 'AKIAXGYXHSXXHYBR5HOE',
    awsS3AccessSecret:
      process.env.AWS_S3_ACCESS_SECRET ||
      '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',
    awsS3Bucket: process.env.AWS_S3_BUCKET || 'victortolbert',
    awsS3Url: process.env.AWS_S3_URL || 'https://the_url.s3.amazonaws.co',

    ackeeDomainId:
      process.env.ACKEE_DOMAIN_ID || '601bbeb1-8a0a-4d5d-ba1f-a75ce1cefda3',

    calendlyApiKey:
      process.env.CALENDLY_API_KEY || 'LCCHKGMJC2UDJQM6TXZQF4IZUDOB7QO3',
    contentApiUrl:
      process.env.CONTENT_API_URL || 'http://localhost:3000/_content',

    githubCallbackUrl:
      process.env.GITHUB_CALLBACK_URL ||
      'http://laravel-7.test/login/github/callback',
    githubClientId: process.env.GITHUB_CLIENT_ID || 'e95268cd14d26f7628e7',
    githubClientSecret:
      process.env.GITHUB_CLIENT_SECRET ||
      '3f4f1c158f84198da82bff5087227fc7417a2293',
    githubToken:
      process.env.GITHUB_TOKEN || '87f7875f1b84f0ac61310280b14496c8864f2e8f',
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || 'UA-76464598-5',
    googleApiKey:
      process.env.GOOGLE_API_KEY || 'AIzaSyBiqWapJFvSp4uetA7QROuWbs3L3hDWOVI',
    googleCallbackUrl:
      process.env.GOOGLE_CALLBACK_URL ||
      'https://local-dashboard.boosterthon.com/v3/oauth/google',
    googleClientId:
      process.env.GOOGLE_CLIENT_ID ||
      '10606724298-0cc8ggrgapoihqshq6gfj7nc7je23q88.apps.googleusercontent.com',
    googleClientSecret:
      process.env.GOOGLE_CLIENT_SECRET || 'w5XyFEiwXO1yr6kTVrWpiSqy',
    googleMapsApiKey:
      process.env.GOOGLE_MAPS_API_KEY ||
      'AIzaSyAC93FnPRqmvipFZZUenONKIbKHqPlbu6s',
    sentryDsn:
      process.env.SENTRY_DSN ||
      'https://c30dc69c78434050aed6f64b97cbd645@o244691.ingest.sentry.io/1422222',
    stripePublicKey:
      process.env.STRIPE_PUBLIC_KEY || 'pk_test_HHvO5elQXBUhbNuZWt0ngNLx',
    stripePublishableKey:
      process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_HHvO5elQXBUhbNuZWt0ngNLx',
    vueAppApiUrl:
      process.env.VUE_APP_API_URL || 'https://victortolbert-api.herokuapp.com',
  },

  // should hold all env variables that are private and that should not be exposed on the frontend. This could include a reference to your API secret tokens for example.
  privateRuntimeConfig: {
    apiSecret: process.env.API_SECRET,
    dbDatabase: process.env.DB_DATABASE,
    dbHost: process.env.DB_HOST,
    dbPassword: process.env.DB_PASSWORD,
    dbUser: process.env.DB_USER,
  },
  //  privateRuntimeConfig always overrides publicRuntimeConfig on server-side. $config in server mode is { ...public, ...private } but for client mode only { ...public }

  // modern: !utils.isDev && 'client',
  env: {
    WS_URL: process.env.WS_URL || 'http://localhost:8686',
  },
  components: true,
  // loading: false,
  target: 'static',
  ssr: false,

  watch: ['@/config/*'],

  head: {
    // title: 'Lab',
    titleTemplate: 'Lab: %s',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Lab'},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.svg'},
      // {
      //   rel: 'stylesheet',
      //   href:
      //     'https://fonts.googleapis.com/css?family=Inter:400,500,600&display=swap',
      // },
      // {
      //   rel: 'stylesheet',
      //   href:
      //     'https://fonts.googleapis.com/css2?family=Caveat:wght@400;430&family=Markazi+Text&display=swap',
      // },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Josefin+Sans|Playfair+Display',
      },
    ],
    // script: [
    //   {
    //     src:
    //       'https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js',
    //     defer: true,
    //   },
    // ],
    bodyAttrs: {
      // class: ['antialiased font-sans bg-gray-200'],
    },
  },
  css: [
    // '@/assets/css/bulma.scss',
    '@/assets/css/app.scss',
    '@/assets/css/content.css',
    '@/assets/css/transitions.css',
    '@/assets/css/select.scss',
    '@/assets/styles/oruga_tailwind.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
  layoutTransition: {
    name: 'layout',
    mode: 'out-in',
  },
  modules: [
    '@nuxt/content',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    // '@nuxtjs/auth',
    // '@nuxtjs/sentry',
    // '@oruga-ui/oruga/nuxt',
    'nuxt-i18n',
    // 'nuxt-basic-auth-module',
    // 'nuxt-buefy',
    // 'nuxt-use-sound',
    // [
    //   'nuxt-lazy-load',
    //   {
    //     // These are the default values
    //     images: true,
    //     videos: true,
    //     audios: true,
    //     iframes: true,
    //     native: false,
    //     polyfill: true,
    //     directiveOnly: false,

    //     // Default image must be in the static folder
    //     // defaultImage: '/images/default-image.jpg',

    //     // To remove class set value to false
    //     loadingClass: 'isLoading',
    //     loadedClass: 'isLoaded',
    //     appendClass: 'lazyLoad',

    //     observerConfig: {
    //       // See IntersectionObserver documentation
    //     },
    //   },
    // ],
    '@nuxtjs/sitemap',
    // '@/modules/test',
    ['@/modules/module', {message: 'my module!!!!!!!!!!!!!!'}],
    '@/modules/io',
  ],

  buildModules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/composition-api',
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-analytics',
    '@nuxtjs/svg',
    '@nuxtjs/tailwindcss',
    // '@nuxtjs/vuetify',
    // 'nuxt-ackee',
    [
      '@nuxt/typescript-build',
      {
        ignoreNotFoundWarnings: true,
      },
    ],
    // '@nuxtjs/netlify-files',
    // 'nuxt-svg-loader',
    // '@nuxtjs/pwa',
    // '@nuxt/http',
    // '@nuxtjs/sitemap'

    // Doc: https://github.com/nuxt-community/moment-module
    '@nuxtjs/moment',
  ],

  plugins: [
    '@/plugins/cookies',
    '@/plugins/data-api',
    '@/plugins/dynamic-marquee.client',
    '@/plugins/fontawesome',
    '@/plugins/i18n.client',
    '@/plugins/init',
    // '@/plugins/inject-ww.client',
    '@/plugins/maps.client',
    '@/plugins/markdown',
    '@/plugins/menu.client',
    '@/plugins/oruga',
    '@/plugins/polyfills.client',
    '@/plugins/portal-vue',
    '@/plugins/slick.client.js',
    // '@/plugins/socketio.client.js',
    '@/plugins/to-title-case',
    '@/plugins/v-tooltip',
    '@/plugins/vue-chartkick.client',
    // '@/plugins/vue-cocomaterial-image',
    '@/plugins/vue-content-placeholders',
    // '@/plugins/vue-feather-icons',
    '@/plugins/vue-good-table.client',
    '@/plugins/vue-notifications',
    '@/plugins/vue-scroll-reveal.client',
    '@/plugins/vue-scrollactive',
    '@/plugins/vue-select',
    '@/plugins/vue-tables-2.client',
    '@/plugins/vue-trix.client',
    '@/plugins/vuebars',
    '@/plugins/vuelidate',
  ],

  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 8686,
  },

  serverMiddleware: ['@/server'],

  router: {
    // prefetchLinks: false,
    middleware: [
      // 'auth',
      'pages',
      // 'user-agent',
      'visits',
    ],
    trailingSlash: true,
    linkActiveClass: 'is-active',
    linkExactActiveClass: 'is-exact-active',
  },

  // ackee: {
  //   server: 'https://cranky-borg.herokuapp.com',
  //   domainId: '601bbeb1-8a0a-4d5d-ba1f-a75ce1cefda3',
  //   ignoreLocalhost: true,
  //   detailed: true,
  // },

  axios: {
    baseURL: process.env.apiUrl || 'https://victortolbert-api.herokuapp.com/',
    credentials: true,
    // proxy: true,
  },

  // proxy: {
  //   '/laravel': {
  //     target: 'https://laravel-auth.nuxtjs.app',
  //     pathRewrite: {'^/laravel': '/'},
  //   },
  // },

  auth: {
    redirect: {
      login: '/login/',
      logout: '/',
      callback: '/login/',
      home: '/',
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: {url: '/api/auth/login', method: 'post'},
          logout: {url: '/api/auth/logout', method: 'post'},
          user: {url: '/api/auth/user', method: 'get'},
        },
      },
      cookie: {
        cookie: {
          // (optional) If set we check this cookie existence for loggedIn check
          name: 'XSRF-TOKEN',
        },
        endpoints: {
          // (optional) If set, we send a get request to this endpoint before login
          csrf: {
            url: '',
          },
        },
      },
      github: {
        clientId: process.env.githubClientId,
        clientSecret: process.env.githubClientSecret,
      },
      google: {
        clientId: process.env.googleClientId,
      },
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: '<laravel url>',
      },
    },
  },

  // auth: {
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: { url: '/sessions', method: 'post', propertyName: 'token' },
  //         logout: { url: '/sessions', method: 'delete' },
  //         user: { url: '/sessions/user', method: 'get', propertyName: 'data.attributes' }
  //       },
  //       // tokenRequired: true,
  //       tokenType: ''
  //     }
  //   }
  // },

  //   basic: {
  //     name: 'demo',
  //     pass: 'password',
  //     message: 'Please enter username and password',
  //     enabled: process.env.BASIC_ENABLED === 'true', // require boolean value(nullable)
  //   },

  buefy: {
    css: false,
    materialDesignIcons: true,
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
  },

  content: {
    markdown: {
      remarkPlugins: [['remark-emoji', {emoticon: true}]],
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css',
      },
    },
    nestedProperties: ['author.name', 'categories.slug'],
    extendParser: {
      '.custom': file => ({body: file.split('\n').map(line => line.trim())}),
    },
    // googleAnalytics: {
    //   id: process.env.GOOGLE_ANALYTICS_ID || 'UA-76464598-4',
    // },
  },

  feed: [
    // A default feed configuration object
    {
      path: '/feed.xml', // The route to your feed.
      async create(feed) {}, // The create function (see below)
      cacheTime: 1000 * 60 * 15, // How long should the feed be cached
      type: 'rss2', // Can be: rss2, atom1, json1
      data: ['Some additional data'], // Will be passed as 2nd argument to `create` function
    },
  ],

  // fetch: {
  //   client: false,
  //   server: false,
  // },

  // features: {
  //   store: false,
  //   middleware: false,
  //   deprecations: false,
  //   validate: false,
  //   asyncData: false,
  //   fetch: false,
  //   componentAliases: false,
  // },

  // googleAnalytics: {
  //   id: process.env.GOOGLE_ANALYTICS_ID,
  // },

  // googleAnalytics: {
  //   id: process.env.GOOGLE_ANALYTICS_ID || 'UA-76464598-5',
  //   disabled: () => document.cookie.includes('ga_optout=true'),
  //   debug: {
  //     sendHitTask: !utils.isDev,
  //   },
  //   set: [{field: 'anonymizeIp', value: true}],
  // },

  i18n: {
    // locales: [
    //   {code: 'en', iso: 'en-US', file: 'en.js'},
    //   {code: 'fr', iso: 'fr-FR', file: 'fr.js'},
    //   {code: 'es', iso: 'es-ES', file: 'es.js'},
    // ],
    locales: [
      {
        code: 'es',
        file: 'es-ES.js',
        iso: 'en-ES',
        name: 'Español',
      },
      {
        code: 'en',
        file: 'en-US.js',
        iso: 'en-US',
        name: 'English',
      },
    ],
    defaultLocale: 'en',
    parsePages: false,
    strategy: 'prefix_except_default',
    lazy: true,
    seo: false,
    langDir: 'i18n/',
  },

  // oruga: {
  //   includeCss: true,
  // },

  sentry: {
    dsn:
      'https://c30dc69c78434050aed6f64b97cbd645@o244691.ingest.sentry.io/1422222',
    config: {
      maxBreadcrumbs: 50,
      debug: false,
    },
  },

  sitemap: {
    hostname: process.env.baseUrl || 'https://app.vticonsulting.com/',
  },

  // sitemap: {
  //   hostname: utils.baseUrl,
  //   trailingSlash: true,
  //   exclude: ['/privacy', '/legal'],
  //   defaults: {
  //     changefreq: 'daily',
  //     priority: 1,
  //     lastmodrealtime: true,
  //   },
  // },

  // pwa: {
  //   icon: {
  //     source: 'static/img/me@2x.jpg'
  //   }
  // },
  // sounds: {
  //   back: {
  //     src: '/sound/back.wav',
  //     options: {
  //       volume: 1,
  //     },
  //   },
  //   button: {
  //     src: '/sound/button.wav',
  //     options: {
  //       volume: 1,
  //     },
  //   },
  //   error: {
  //     src: '/sound/error.wav',
  //     options: {
  //       volume: 1,
  //     },
  //   },
  //   fanfare: {
  //     src: '/sound/fanfare.mp3',
  //     options: {
  //       volume: 1,
  //     },
  //   },
  //   pop_down: {
  //     src: '/sound/pop_down.mp3',
  //     options: {
  //       volume: 1,
  //     },
  //   },
  //   pop_up_off: {
  //     src: '/sound/pop_up_off.mp3',
  //     options: {
  //       volume: 1,
  //     },
  //   },
  //   pop_up_on: {
  //     src: '/sound/pop_up_on.mp3',
  //     options: {
  //       volume: 1,
  //     },
  //   },
  //   success: {
  //     src: '/sound/success.wav',
  //     options: {
  //       volume: 1,
  //     },
  //   },
  //   times_up: {
  //     src: '/sound/times_up.wav',
  //     options: {
  //       volume: 1,
  //     },
  //   },
  //   warning: {
  //     src: '/sound/warning.wav',
  //     options: {
  //       volume: 1,
  //     },
  //   },
  //   vue: {
  //     src: '/sound/vue.mp3',
  //     options: {
  //       volume: 1,
  //     },
  //   },
  //   you_have_a_mail_message: {
  //     src: '/sound/you_have_a_mail_message.wav',
  //     options: {
  //       volume: 1,
  //     },
  //   },
  // },

  storybook: {
    stories: [
      '~/components/**/*.stories.mdx',
      '~/components/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    parameters: {
      viewMode: 'docs',
      actions: {argTypesRegex: '^on[A-Z].*'},
    },
    addons: ['@storybook/addon-docs', '@storybook/addon-controls'],
    webpackFinal(config) {
      return config
    },
  },

  tailwindcss: {
    // configPath: '@/config/tailwind.config.js',
    cssPath: '@/assets/styles/tailwind.css',
    exposeConfig: true,
  },

  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}',
      },
    },
  },

  netlifyFiles: {
    existingFilesDirectory: './netlify',
  },

  // http: {
  //   https: !utils.isDev,
  //   prefix: '/.netlify/functions/',
  //   proxy: utils.isDev
  // },

  // proxy: {
  //   '/.netlify/functions/': {
  //     target: 'http://localhost:9000'
  //   }
  // },

  build: {
    extend(config, context) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      })

      // @see https://github.com/nuxt/nuxt.js/pull/3480#issuecomment-404150387
      config.output.globalObject = 'this'

      if (context.isClient) {
        // web workers are only available client-side
        config.module.rules.push({
          test: /\.worker\.js$/, // this will pick up all .js files that ends with ".worker.js"
          loader: 'worker-loader',
          exclude: /(node_modules)/,
        })
      }
    },
    babel: {
      plugins: ['@babel/plugin-syntax-jsx'],
    },
    postcss: {
      plugins: {
        'postcss-import': {},
        tailwindcss: path.resolve(__dirname, './tailwind.config.js'),
        'postcss-preset-env': {},
        'postcss-100vh-fix': {},
      },
    },
    preset: {
      stage: 1,
    },
  },
  eslint: {
    cache: false,
  },
  purgeCSS: {
    whitelist: ['dark-mode'],
    whitelistPatterns: [/svg.*/, /fa.*/],
    whitelistPatternsChildren: [/^token/, /^pre/, /^code/, /^nuxt-content/],
  },

  generate: {
    interval: 2000,
    // fallback: true,

    fallback: '404.html', // for Netlify
    routes: ['/'], // give the first url to start crawling

    // async routes() {
    //   const {$content} = require('@nuxt/content')
    //   const files = await $content('blog').fetch()

    //   return files.map(file => (file.path === '/index' ? '/' : file.path))
    // },
  },
}
