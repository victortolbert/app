import path from 'path'
// eslint-disable-next-line import/named
import {utils} from './config'

export default {
  // modern: !utils.isDev && 'client',
  env: {
    baseUrl: process.env.BASE_URL || 'https://app.vticonsulting.com/',
    apiUrl: process.env.API_URL || 'https://api.vticonsulting.com/',
    assetsUrl: process.env.ASSETS_URL || 'https://app.vticonsulting.com/',
    stripePublicKey: utils.isDev
      ? 'pk_test_9hUFtiNMcseCbvLBySY7D8P6'
      : process.env.STRIPE_PUBLIC_KEY || '',
  },

  components: true,
  loading: false,
  target: 'static',
  ssr: false,

  watch: ['~/config/*'],

  head: {
    title: 'Lab',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Lab'},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.svg'},
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Inter:400,500,600&display=swap',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Lato&display=swap',
      },
    ],
    script: [
      {
        src:
          'https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js',
        defer: true,
      },
    ],
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/axios',
    '@nuxtjs/sentry',
    'nuxt-i18n',
    '@nuxtjs/sitemap',
  ],

  buildModules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/composition-api',
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-analytics',
    '@nuxtjs/svg',
    '@nuxtjs/tailwindcss',
    // 'nuxt-ackee',
    '@nuxt/typescript-build',
    // '@nuxtjs/netlify-files',
    // 'nuxt-svg-loader',
    // '@nuxtjs/pwa',
    // '@nuxt/http',
    // '@nuxtjs/sitemap'

    // Doc: https://github.com/nuxt-community/moment-module
    '@nuxtjs/moment',
  ],

  plugins: [
    '@/plugins/i18n.client',
    '@/plugins/polyfills.client',
    '@/plugins/portal-vue',
    '@/plugins/vue-content-placeholders',
    '@/plugins/vue-scroll-reveal.client',

    '@/plugins/markdown',
    '@/plugins/init',
    '@/plugins/vue-scrollactive',
    '@/plugins/menu.client',

    // '@/plugins/vue-feather-icons',
  ],

  serverMiddleware: ['@/server'],

  router: {
    middleware: ['visits', 'user-agent'],
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

  // colorMode: {
  //   preference: 'system',
  // },

  colorMode: {
    classSuffix: '',
  },

  content: {
    markdown: {
      remarkPlugins: [['remark-emoji', {emoticon: true}]],
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css',
      },
    },
    nestedProperties: ['author.name', 'categories.slug'],
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
    extend(config, ctx) {},
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
