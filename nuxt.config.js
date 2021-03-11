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
  modules: [
    '@nuxt/content',
    '@nuxtjs/axios',
    '@nuxtjs/feed',
    '@nuxtjs/pwa',
    '@oruga-ui/oruga/nuxt',
    '~/modules/algolia',
    '~/modules/auth',
    'nuxt-i18n',
    'vue-toastification/nuxt',

    // '@nuxtjs/auth-next',
    // '@nuxtjs/auth',
    // '@nuxtjs/sentry',
    // 'nuxt-basic-auth-module',
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
    // '@nuxtjs/sitemap',
    // '~/modules/test',
    // ['~/modules/module', {message: 'my module!!!!!!!!!!!!!!'}],
    // '~/modules/io',
  ],
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/color-mode',
    '@nuxtjs/composition-api',
    '@nuxtjs/moment',
    '@nuxtjs/google-analytics',
    '@nuxtjs/style-resources',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/stylelint-module',
    // '@nuxtjs/svg',
    // '@nuxtjs/vuetify',
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

  plugins: [
    '~/plugins/api',
    '~/plugins/auth.client',
    '~/plugins/data-api',
    '~/plugins/devto',
    '~/plugins/fontawesome',
    '~/plugins/maps.client',
    '~/plugins/menu.client',
    '~/plugins/portal-vue',
    '~/plugins/vue-api-query',
    '~/plugins/vue-chartkick.client',
    '~/plugins/vue-content-placeholders',
    '~/plugins/vue-observe-visibility.client',
    '~/plugins/vue-scrollactive',
    '~/plugins/vue-tables-2.client',
    '~/plugins/vue-tippy',
    '~/plugins/vuelidate',
    // '~/plugins/axios.plugin',
    // '~/plugins/cookies',
    // '~/plugins/dynamic-marquee.client',
    // '~/plugins/highcharts',
    // '~/plugins/i18n.client',
    // '~/plugins/init',
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
    port: process.env.PORT || 8686,
  },

  serverMiddleware: ['~/myServerMiddleware', '~/server'],

  router: {
    prefetchLinks: false,
    // trailingSlash: true,
  },

  axios: {
    baseURL: process.env.apiUrl || 'https://api.victortolbert.com/',
    credentials: true,
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
  },

  feed: [
    {
      path: '/rss.xml',
      async create(feed) {
        const {$content} = require('@nuxt/content')
        const files = await $content('blog').fetch()

        feed.options = {
          title: 'Blog',
          link: 'https://blog.designcoder.net/feed.xml',
          description: 'Get the latest posts from designcoder.net',
        }

        files.forEach(post => {
          feed.addItem({
            title: post.title,
            id: post.path,
            link: `https://blog.designcoder.net${post.path}`,
            description: post.excerpt,
          })
        })

        feed.addContributor({
          name: 'Victor Tolbert',
          email: 'victor.tolbert@gmail.com',
          link: 'https://www.victortolbert.com',
        })
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
  ],

  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID || 'UA-76464598-5',
  },

  hooks: {
    'content:file:beforeInsert': document => {
      if (document.extension === '.md') {
        const {time} = require('reading-time')(document.text)

        document.readingTime = time
      }
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
    includeCss: true,
  },

  // sentry: {
  //   dsn:
  //     'https://c30dc69c78434050aed6f64b97cbd645@o244691.ingest.sentry.io/1422222',
  //   config: {
  //     maxBreadcrumbs: 50,
  //     debug: false,
  //   },
  // },

  styleResources: {
    scss: ['~/assets/scss/variables.scss'],
  },

  storybook: {
    port: 6006,
    stories: [
      '~/components/**/*.stories.mdx',
      '~/components/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    parameters: {
      viewMode: 'docs',
      actions: {argTypesRegex: '^on[A-Z].*'},
    },
    addons: [
      '@storybook/addon-a11y',
      '@storybook/addon-storysource',
      '@whitespace/storybook-addon-html',
    ],
    webpackFinal(config) {
      return config
    },
  },

  tailwindcss: {
    cssPath: '~/assets/styles/tailwind.css',
    exposeConfig: true,
  },

  toast: {timeout: 2000, closeOnClick: false},

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

    postcss: {
      plugins: {
        'postcss-nested': {},
        'postcss-import': {},
        tailwindcss: path.resolve(__dirname, './tailwind.config.js'),
        'postcss-preset-env': {},
        'postcss-100vh-fix': {},
      },
    },
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
