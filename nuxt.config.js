import path from 'path'
// eslint-disable-next-line import/named
import {utils} from './config'
// const isDev = process.env.NODE_ENV !== "production"

export default {
  // modern: !utils.isDev && 'client',
  env: {
    nodeEnv: process.env.NODE_ENV,
    baseUrl: process.env.BASE_URL || 'https://app.vticonsulting.com/',
    apiUrl: process.env.API_URL || 'https://api.vticonsulting.com/',
    assetsUrl: process.env.ASSETS_URL || 'https://app.vticonsulting.com/',
    stripePublicKey: utils.isDev
      ? 'pk_test_HHvO5elQXBUhbNuZWt0ngNLx'
      : process.env.STRIPE_PUBLIC_KEY || '',
    githubToken:
      process.env.GITHUB_TOKEN || '87f7875f1b84f0ac61310280b14496c8864f2e8f',
  },

  components: true,
  // loading: false,
  target: 'static',
  ssr: false,

  watch: ['~/config/*'],

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
    // '~/assets/css/bulma.scss',
    '~/assets/css/content.css',
    '~/assets/css/transitions.css',
    '~/assets/css/select.scss',
  ],
  layoutTransition: {
    name: 'layout',
    mode: 'out-in',
  },
  modules: [
    '@nuxt/content',
    '@nuxtjs/axios',
    // '@nuxtjs/auth',
    '@nuxtjs/sentry',
    // '@oruga-ui/oruga/nuxt',
    'nuxt-i18n',
    'nuxt-basic-auth-module',
    'nuxt-buefy',
    'nuxt-use-sound',
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
    '@/plugins/buefy',
    '@/plugins/data-api',
    '@/plugins/dynamic-marquee.client',
    '@/plugins/i18n.client',
    '@/plugins/init',
    '@/plugins/maps.client',
    '@/plugins/markdown',
    '@/plugins/menu.client',
    '@/plugins/polyfills.client',
    '@/plugins/portal-vue',
    '@/plugins/slick.client.js',
    '@/plugins/socketio.client.js',
    '@/plugins/to-title-case',
    '@/plugins/vue-chartkick.client',
    '@/plugins/vue-content-placeholders',
    '@/plugins/vue-good-table.client',
    '@/plugins/vue-select',
    '@/plugins/vue-scroll-reveal.client',
    '@/plugins/vue-scrollactive',
    '@/plugins/vue-trix.client',
    '@/plugins/vue-tables-2.client',
    '@/plugins/vuelidate',
    '@/plugins/v-tooltip',

    // '@/plugins/vue-feather-icons',
  ],

  server: {
    host: '0.0.0.0',
    // port: process.env.PORT || 8000,
  },

  serverMiddleware: ['@/server'],

  router: {
    // prefetchLinks: false,
    middleware: [
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
    baseURL: process.env.apiUrl || 'https://api.vticonsulting.com/',
    credentials: true,
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

  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID || 'UA-76464598-5',
    disabled: () => document.cookie.includes('ga_optout=true'),
    debug: {
      sendHitTask: !utils.isDev,
    },
    set: [{field: 'anonymizeIp', value: true}],
  },

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
  sounds: {
    back: {
      src: '/sound/back.wav',
      options: {
        volume: 1,
      },
    },
    button: {
      src: '/sound/button.wav',
      options: {
        volume: 1,
      },
    },
    error: {
      src: '/sound/error.wav',
      options: {
        volume: 1,
      },
    },
    fanfare: {
      src: '/sound/fanfare.mp3',
      options: {
        volume: 1,
      },
    },
    pop_down: {
      src: '/sound/pop_down.mp3',
      options: {
        volume: 1,
      },
    },
    pop_up_off: {
      src: '/sound/pop_up_off.mp3',
      options: {
        volume: 1,
      },
    },
    pop_up_on: {
      src: '/sound/pop_up_on.mp3',
      options: {
        volume: 1,
      },
    },
    success: {
      src: '/sound/success.wav',
      options: {
        volume: 1,
      },
    },
    times_up: {
      src: '/sound/times_up.wav',
      options: {
        volume: 1,
      },
    },
    warning: {
      src: '/sound/warning.wav',
      options: {
        volume: 1,
      },
    },
    vue: {
      src: '/sound/vue.mp3',
      options: {
        volume: 1,
      },
    },
    you_have_a_mail_message: {
      src: '/sound/you_have_a_mail_message.wav',
      options: {
        volume: 1,
      },
    },
  },

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
    // cssPath: '@/assets/styles/app.pcss',
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
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      })
    },
    babel: {
      plugins: ['@babel/plugin-syntax-jsx'],
    },
    postcss: {
      plugins: {
        'postcss-import': {},
        tailwindcss: path.resolve(__dirname, './tailwind.config.js'),
        'postcss-preset-env': {},
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
