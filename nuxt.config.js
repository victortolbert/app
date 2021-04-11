export default {
  publicRuntimeConfig: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://app.vticonsulting.com'
        : 'http://vticonsulting.test',
    apiURL: process.env.API_URL || 'https://api.vticonsulting.com',
    assetsURL:
      process.env.ASSETS_URL ||
      'https://td-aws-bucket.s3.amazonaws.com/album2/',
    auth: {
      cookieName: 'idToken',
      clientId:
        '462364873905-pshoug4pfdd74iso13km6n7hg88s2ova.apps.googleusercontent.com',
    },
    algolia: {
      appId: 'WTEU7RU64C',
      key: '0bdd840be2d7d4377e10b238bc731901',
    },
    awsS3DefaultRegion: process.env.AWS_S3_DEFAULT_REGION || 'us-east-1',
    awsS3AccessKey: process.env.AWS_S3_ACCESS_KEY || 'AKIAXGYXHSXXHYBR5HOE',
    awsS3AccessSecret:
      process.env.AWS_S3_ACCESS_SECRET ||
      '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',
    awsS3Bucket: process.env.AWS_S3_BUCKET || 'victortolbert',
    awsS3URL: process.env.AWS_S3_URL || 'https://the_url.s3.amazonaws.co',
    ackeeDomainId:
      process.env.ACKEE_DOMAIN_ID || '601bbeb1-8a0a-4d5d-ba1f-a75ce1cefda3',
    calendlyApiKey:
      process.env.CALENDLY_API_KEY || 'LCCHKGMJC2UDJQM6TXZQF4IZUDOB7QO3',
    contentApiURL:
      process.env.CONTENT_API_URL || 'http://localhost:3000/_content',
    githubCallbackURL:
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
    googleCallbackURL:
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
  },

  privateRuntimeConfig: {
    apiSecret: process.env.API_SECRET,
    dbDatabase: process.env.DB_DATABASE,
    dbHost: process.env.DB_HOST,
    dbPassword: process.env.DB_PASSWORD,
    dbUser: process.env.DB_USER,
    algolia: {
      appId: 'WTEU7RU64C',
      key: 'd1fe567d10edb4ffe8e470d61dc84616',
    },
  },

  target: 'static',

  ssr: false,

  head: {
    title: '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
    ],
  },

  build: {
    extend(config, context) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      })
    },

    preset: {
      stage: 1,
    },

    transpile: [
      /vue-awesome/,
      /@fullcalendar.*/, // transpile ESM modules within all fullcalendar packages
      'vee-validate/dist/rules',
      'vue-instantsearch',
      'instantsearch.js/es',
    ],
  },

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/color-mode',
    '@nuxtjs/composition-api',
    '@nuxtjs/google-fonts',
    '@nuxtjs/pwa',
    '@nuxtjs/tailwindcss',
    'nuxt-use-sound',
  ],

  components: true,

  generate: {
    interval: 2000,
    fallback: '404.html',
    // routes: ['/'],
    // async routes() {
    //   const {$content} = require('@nuxt/content')
    //   const files = await $content('blog').fetch()

    //   return files.map(file => (file.path === '/index' ? '/' : file.path))
    // },
    // },
  },

  // hooks: {
  //   'content:file:beforeInsert': document => {
  //     if (document.extension === '.md') {
  //       const {time} = require('reading-time')(document.text)
  //       document.readingTime = time

  //       // const regexp = new RegExp(`^/(${options.i18n.locales.map(locale => locale.code).join('|')})`, 'gi')
  //       // const { dir, slug, category } = document
  //       // const _dir = dir.replace(regexp, '')
  //       // const _slug = slug.replace(/^index/, '')
  //       // const _category = category && typeof category === 'string' ? category : ''

  //       // document.to = `${_dir}/${_slug}`
  //       // document.category = _category
  //     }
  //   },
  // },

  layoutTransition: {
    name: 'layout',
    mode: 'out-in',
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    '@nuxtjs/emotion',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    'nuxt-i18n',
  ],

  plugins: [
    '~/plugins/api',
    '~/plugins/data-api',
    '~/plugins/demo',
    '~/plugins/filters',
    '~/plugins/fontawesome',
    '~/plugins/jam',
    '~/plugins/maps.client',
    '~/plugins/markdown',
    '~/plugins/oruga',
    '~/plugins/particles.client',
    '~/plugins/portal-vue',
    '~/plugins/repository',
    '~/plugins/vee-validate',
    '~/plugins/vue-advanced-cropper.client',
    '~/plugins/vue-aos.client',
    '~/plugins/vue-api-query',
    '~/plugins/vue-awesome-swiper.client',
    '~/plugins/vue-awesome',
    '~/plugins/vue-content-placeholders',
    '~/plugins/vue-drag-zone',
    '~/plugins/vue-float-label.client',
    '~/plugins/vue-infinite-loading.client',
    '~/plugins/vue-instantsearch.client',
    '~/plugins/vue-masonry-css.client',
    '~/plugins/vue-notifications.client',
    '~/plugins/vue-print-nb',
    '~/plugins/vue-ray',
    '~/plugins/vue-scrollactive',
    '~/plugins/vue-select',
    '~/plugins/vue-shortkey.client',
    '~/plugins/vue-textarea-autosize',
    '~/plugins/vue-toastification.client',
    '~/plugins/vue-touch-ripple',
    '~/plugins/vue-video-player.client',
  ],

  router: {
    // middleware: ['check-auth', 'ui'],
    middleware: ['auth', 'ui'],
    prefetchLinks: false,
    trailingSlash: true,
    // base: '/beta/',
    // extendRoutes(routes, resolve) {
    //   routes.push({
    //     name: 'bookmark',
    //     path: '/:slug/:list/:id',
    //     component: resolve(__dirname, 'components/pages/bookmark.vue'),
    //   })
    // },
  },

  // routerModule: {
  //   keepDefaultRouter: true, // this line is mandatory...
  // },

  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
  },

  // serverMiddleware: ['~/server'],

  /**
   * Add on configuration
   */

  ackee: {
    server: 'https://example.com',
    domainId: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
    detailed: true,
    ignoreLocalhost: true,
    ignoreOwnVisits: true,
    storageKey: 'nuxt-ackee',
  },

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
    baseURL: process.env.apiURL || 'https://api.victortolbert.com/',
    credentials: true,
    // proxy: true,
  },

  colorMode: {
    classSuffix: '',
  },

  // content: {
  //   liveEdit: false,
  //   markdown: {
  //     remarkPlugins: [['remark-emoji', {emoticon: true}]],
  //     prism: {
  //       theme: 'prism-themes/themes/prism-material-oceanic.css',
  //     },
  //   },
  //   nestedProperties: ['author.name', 'categories.slug'],
  //   extendParser: {
  //     '.custom': file => ({body: file.split('\n').map(line => line.trim())}),
  //   },
  // },

  // eslint: {
  //   cache: false,
  // },

  // feed: [
  //   {
  //     path: '/rss.xml',
  //     async create(feed) {
  //       const {$content} = require('@nuxt/content')
  //       const files = await $content('blog').fetch()

  //       feed.options = {
  //         title: 'Blog',
  //         link: 'https://blog.designcoder.net/feed.xml',
  //         description: 'Get the latest posts from designcoder.net',
  //       }

  //       files.forEach(post => {
  //         feed.addItem({
  //           title: post.title,
  //           id: post.path,
  //           link: `https://blog.designcoder.net${post.path}`,
  //           description: post.excerpt,
  //         })
  //       })

  //       feed.addContributor({
  //         name: 'Victor Tolbert',
  //         email: 'victor.tolbert@gmail.com',
  //         link: 'https://www.victortolbert.com',
  //       })
  //     },
  //     cacheTime: 1000 * 60 * 15,
  //     type: 'rss2',
  //   },
  // ],

  // googleAnalytics: {
  //   id: process.env.GOOGLE_ANALYTICS_ID || 'UA-76464598-5', // Use as fallback if no runtime config is provided
  // },

  googleFonts: {
    families: {
      Roboto: true,
      'Roboto+Condensed': true,
    },
  },

  i18n: {
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

  oruga: {
    // includeCss: 'vars',
    // iconPack: 'mdi',
    // iconPack: 'fas',
    // iconComponent: 'FontAwesomeIcon',
    // button: {
    //   override: true,
    // },
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

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
    meta: {
      ogImage: '/static/preview.png',
    },
  },

  // sitemap: {
  //   hostname: global.siteUrl,
  //   routes() {
  //     return getRoutes()
  //   },
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

  storybook: {
    port: 4000,
    stories: ['~/components/**/*.stories.mdx'],
    webpackFinal(config) {
      return config
    },
  },

  styleResources: {
    scss: ['~/assets/scss/vars/*.scss', '~/assets/scss/abstracts/_mixins.scss'],
  },

  tailwindcss: {
    // jit: true,
    configPath: '~/config/tailwind.config.js',
  },

  toast: {
    timeout: 2000,
    closeOnClick: false,
    // Use your own CSS file
    // cssFile: 'path/to/your/file.scss',
    // Or disable CSS injection
    // cssFile: false,
  },

  typescript: {
    typeCheck: false,
  },
}
