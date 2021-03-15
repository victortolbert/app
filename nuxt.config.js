import path from 'path'

export default {
  publicRuntimeConfig: {
    auth: {
      cookieName: 'idToken',
      clientId:
        '462364873905-pshoug4pfdd74iso13km6n7hg88s2ova.apps.googleusercontent.com',
    },
    algolia: {
      appId: 'WTEU7RU64C',
      key: '0bdd840be2d7d4377e10b238bc731901',
    },
    apiURL: process.env.API_URL || 'http://localhost:8686',
    awsS3DefaultRegion: process.env.AWS_S3_DEFAULT_REGION || 'us-east-1',
    awsS3AccessKey: process.env.AWS_S3_ACCESS_KEY || 'AKIAXGYXHSXXHYBR5HOE',
    awsS3AccessSecret:
      process.env.AWS_S3_ACCESS_SECRET ||
      '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',
    awsS3Bucket: process.env.AWS_S3_BUCKET || 'victortolbert',
    awsS3Url: process.env.AWS_S3_URL || 'https://the_url.s3.amazonaws.co',
    assetsURL:
      process.env.ASSETS_URL ||
      'https://td-aws-bucket.s3.amazonaws.com/album2/',
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://app.vticonsulting.com'
        : 'http://example-app.test',

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

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  target: 'static',
  ssr: false,
  // watch: ['~/config/*'],
  head: {
    // title: 'App',
    titleTemplate: 'App: %s',
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
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Josefin+Sans|Playfair+Display',
      },
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
          '//cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css',
      },
    ],
    script: [
      // {
      //   src:
      //     'https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js',
      //   defer: true,
      // },
      {
        src:
          '//cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css',
        defer: true,
      },
    ],
    bodyAttrs: {
      // class: ['antialiased font-sans bg-gray-200'],
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // '~/assets/css/bulma.scss',
    // '~/assets/css/app.scss',
    // '~/assets/css/content.css',
    // '~/assets/css/transitions.css',
    // '~/assets/css/select.scss',
    // '~/assets/styles/oruga_tailwind.css',
    // '@fortawesome/fontawesome-svg-core/styles.css',
  ],

  layoutTransition: {
    name: 'layout',
    mode: 'out-in',
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',

    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',

    // Doc: https://oruga.io/documentation/#nuxt
    '@oruga-ui/oruga/nuxt',

    'nuxt-i18n',
    // '@nuxtjs/auth-next',
    // '@nuxtjs/auth',
    // '@nuxtjs/feed',
    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/pwa',
    // '@nuxtjs/sentry',
    // '~/modules/algolia',
    // '~/modules/auth',
    // 'nuxt-basic-auth-module',
    // 'nuxt-use-sound',
    // 'vue-toastification/nuxt',
    // 'yamlful-nuxt',
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
    // '@nuxtjs/sitemap',
    // '~/modules/test',
    // ['~/modules/module', {message: 'my module!!!!!!!!!!!!!!'}],
    // '~/modules/io',
  ],
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/color-mode',
    '@nuxtjs/composition-api',
    'nuxt-use-sound',
    'nuxt-windicss',
    // '@nuxtjs/google-analytics',
    // '@nuxtjs/moment',
    // '@nuxtjs/style-resources',
    // '@nuxtjs/stylelint-module',
    // '@nuxtjs/stylelint-module',
    // '@nuxtjs/svg',
    // '@nuxtjs/tailwindcss',
    // '@nuxtjs/vuetify',
    // https://go.nuxtjs.dev/stylelint
    // https://go.nuxtjs.dev/typescript
    // 'nuxt-ackee',
    // [
    //   '@nuxt/typescript-build',
    //   {
    //     ignoreNotFoundWarnings: true,
    //   },
    // ],
    // '@nuxtjs/netlify-files',
    // 'nuxt-svg-loader',
    // '@nuxtjs/pwa',
    // '@nuxt/http',
    // '@nuxtjs/sitemap'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/api',
    '~/plugins/demo',
    '~/plugins/filters',
    '~/plugins/fontawesome',
    '~/plugins/jam',
    '~/plugins/portal-vue',
    '~/plugins/repository',
    '~plugins/vue-api-query',
    '~plugins/vue-content-placeholders',
    '~plugins/vue-float-label',
    '~plugins/vue-notifications',
    '~plugins/vue-shortkey',
    '~/plugins/vue-toastification.client',

    // '~/plugins/vue-chartkick.client',
    // '~plugins/vue-gtm',
    // '~plugins/vue-ray.client',
    // '~/plugins/vuelidate',
    // '~plugins/vue-introjs.client',

    // '~/plugins/auth.client',
    // '~/plugins/data-api',
    // '~/plugins/i18n.client',
    // '~/plugins/init-categories',
    // '~/plugins/maps.client',
    // '~/plugins/menu.client',
    // '~/plugins/vue-observe-visibility.client',
    // '~/plugins/vue-scrollactive',
    // '~/plugins/vue-tables-2.client',
    // '~/plugins/vue-tippy',
    // '~/plugins/auth.client',
    // '~/plugins/data-api',
    // '~/plugins/devto',
    // '~/plugins/i18n.client',
    // '~/plugins/init-categories',
    // '~/plugins/maps.client',
    // '~/plugins/menu.client',
    // '~/plugins/portal-vue',
    // '~/plugins/vue-api-query',
    // '~/plugins/vue-chartkick.client',
    // '~/plugins/vue-content-placeholders',
    // '~/plugins/vue-observe-visibility.client',
    // '~/plugins/vue-scrollactive',
    // '~/plugins/vue-tables-2.client',
    // '~/plugins/vue-tippy',
    // '~/plugins/vuelidate',
    // '~/plugins/axios.plugin',
    // '~/plugins/cookies',
    // '~/plugins/dynamic-marquee.client',
    // '~/plugins/highcharts',
    // '~/plugins/inject-ww.client',
    // '~/plugins/markdown',
    // '~/plugins/oruga',
    // '~/plugins/polyfills.client',
    // '~/plugins/repositories',
    // '~/plugins/slick.client.js',
    // '~/plugins/socketio.client.js',
    // '~/plugins/to-title-case',
    // '~/plugins/v-tooltip',
    // '~/plugins/vue-cocomaterial-image',
    // '~/plugins/vue-feather-icons',
    // '~/plugins/vue-good-table.client',
    // '~/plugins/vue-notifications',
    // '~/plugins/vue-scroll-reveal.client',
    // '~/plugins/vue-select',
    // '~/plugins/vue-trix.client',
    // '~/plugins/vuebars',
  ],

  server: {
    // host: '0.0.0.0',
    port: process.env.PORT || 3003,
  },

  // serverMiddleware: ['~/myServerMiddleware', '~/server'],
  router: {
    prefetchLinks: false,
    trailingSlash: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.apiUrl || 'https://api.victortolbert.com/',
    credentials: true,
  },

  colorMode: {
    classSuffix: '',
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  // content: {
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
    includeCss: 'vars',
    // iconPack: 'mdi',
    // iconPack: 'fas',
    // iconComponent: 'FontAwesomeIcon',
    // button: {
    //   override: true,
    // },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

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

  toast: {
    timeout: 2000,
    closeOnClick: false,
    // Use your own CSS file
    // cssFile: 'path/to/your/file.scss',
    // Or disable CSS injection
    // cssFile: false,
  },

  windicss: {
    scan: {
      dirs: ['./'],
      exclude: [
        '.nuxt/**/*',
        '*.template.html',
        // Any classes added in app.html (that have not previously been referenced) will need to be added to the safelist
        'app.html',
      ],
    },
    transformCSS: 'pre',
    preflight: {
      alias: {
        // add nuxt aliases
        'nuxt-link': 'a',
      },
    },
  },

  build: {
    // extend(config, context) {
    //   config.module.rules.push({
    //     test: /\.(ogg|mp3|wav|mpe?g)$/i,
    //     loader: 'file-loader',
    //     options: {
    //       name: '[path][name].[ext]',
    //     },
    //   })
    // },

    preset: {
      stage: 1,
    },
    transpile: [/@fullcalendar.*/], // transpile ESM modules within all fullcalendar packages
  },

  // eslint: {
  //   cache: false,
  // },

  generate: {
    interval: 2000,
    fallback: '404.html',
    // routes: ['/'],
    async routes() {
      const {$content} = require('@nuxt/content')
      const files = await $content('blog').fetch()

      return files.map(file => (file.path === '/index' ? '/' : file.path))
    },
  },
}
