import global from './helpers/global'
import getRoutes from './helpers/get-routes'
import getSiteMeta from './helpers/get-site-meta'
import {defineNuxtConfig} from '@nuxtjs/composition-api'

const meta = getSiteMeta()

import path from 'path'

export default defineNuxtConfig({
  // publicRuntimeConfig: {
  //   baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  // },
  publicRuntimeConfig: {
    apiURL: process.env.API_URL || 'http://localhost:8686',
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

    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://app.vticonsulting.com'
        : 'http://example-app.test',

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
    stripePublicKey:
      process.env.STRIPE_PUBLIC_KEY || 'pk_test_HHvO5elQXBUhbNuZWt0ngNLx',
    stripePublishableKey:
      process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_HHvO5elQXBUhbNuZWt0ngNLx',
    vueAppApiURL:
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

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  ssr: false,

  // watch: ['~/config/*'],

  // // Global page headers (https://go.nuxtjs.dev/config-head)
  // head: {
  //   htmlAttrs: {
  //     lang: 'en-GB',
  //     class: 'bg-black',
  //   },
  //   title: 'Nuxt Basic Blog',
  //   meta: [
  //     ...meta,
  //     {charset: 'utf-8'},
  //     {name: 'viewport', content: 'width=device-width, initial-scale=1'},
  //     {
  //       hid: 'description',
  //       name: 'description',
  //       content: global.siteDesc || '',
  //     },
  //     {property: 'og:site_name', content: global.siteName || ''},
  //     {
  //       hid: 'description',
  //       name: 'description',
  //       content: global.siteDesc || '',
  //     },
  //     {property: 'og:image:width', content: '740'},
  //     {property: 'og:image:height', content: '300'},
  //     {name: 'twitter:site', content: global.siteName || ''},
  //     {name: 'twitter:card', content: 'summary_large_image'},
  //   ],
  //   link: [
  //     {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
  //     {
  //       hid: 'canonical',
  //       rel: 'canonical',
  //       href: global.siteUrl,
  //     },
  //   ],
  // },

  head: {
    title: 'My amazing Nuxt application',
    titleTemplate: 'Demo App | %s',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      ...meta,
      {charset: 'utf-8'},
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'An amazing Nuxt application created by @design_coder',
      },

      // Twitter
      // Test on: https://cards-dev.twitter.com/validator
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {hid: 'twitter:site', name: 'twitter:site', content: '@victor_tolbert'},
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: 'https://app.vticonsulting.com',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'An amazing Nuxt application created by @design_coder',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'An amazing Nuxt application created by @design_coder',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://cominex.net/assets/img/preview.png',
      },

      // Open Graph
      // Test on: https://developers.facebook.com/tools/debug/
      {hid: 'og:site_name', property: 'og:site_name', content: 'Demo App'},
      {hid: 'og:type', property: 'og:type', content: 'website'},
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://app.vticonsulting.com',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'An amazing Nuxt application created by @design_coder',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'An amazing Nuxt application created by @design_coder',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://cominex.net/assets/img/preview.png',
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: 'https://cominex.net/assets/img/preview.png',
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'NuxtJS',
      },
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.svg'},
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Josefin+Sans|Playfair+Display',
      },
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.svg'},
      {
        hid: 'canonical',
        rel: 'canonical',
        href: `https://app.vticonsulting.com/examples`,
      },
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
      // {
      //   rel: 'stylesheet',
      //   href:
      //     '//cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css',
      // },
    ],
    script: [
      // {
      //   src:
      //     'https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js',
      //   defer: true,
      // },
      // {
      //   src:
      //     '//cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css',
      //   defer: true,
      // },
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
    // '~/assets/styles/oruga_tailwind.css',
    // '@fortawesome/fontawesome-svg-core/styles.css',
    'video.js/dist/video-js.css',
    '~/assets/scss/vue-select.scss',
    'codemirror/lib/codemirror.css',
    'codemirror/theme/base16-dark.css',
    'swiper/swiper-bundle.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
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

    '@nuxtjs/auth-next',

    // '@nuxtjs/emotion,

    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',

    '@nuxtjs/style-resources',

    // Doc: https://oruga.io/documentation/#nuxt
    // '@oruga-ui/oruga/nuxt',

    'nuxt-i18n',

    // '@nuxtjs/feed',
    // '@nuxtjs/sitemap',

    // '@nuxtjs/auth-next',
    // '@nuxtjs/auth',
    // '@nuxtjs/feed',

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

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/typescript-build',
    '@nuxtjs/color-mode',
    '@nuxtjs/composition-api',
    '@nuxtjs/pwa',
    'nuxt-use-sound',
    // '@nuxtjs/ackee',
    // 'nuxt-windicss',
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
    // '@nuxt/http',
    // '@nuxtjs/sitemap'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/api',
    '~/plugins/data-api',
    '~/plugins/demo',
    '~/plugins/filters',
    '~/plugins/fontawesome',
    '~/plugins/jam',
    '~/plugins/maps.client',
    '~/plugins/msw',
    '~/plugins/oruga',
    '~/plugins/particles.client',
    '~/plugins/portal-vue',
    '~/plugins/repository',
    '~/plugins/vee-validate',
    '~/plugins/vue-advanced-cropper.client',
    '~/plugins/vue-api-query',
    '~/plugins/vue-awesome-swiper.client',
    // '~/plugins/vue-chartkick.client',
    '~/plugins/markdown',
    '~/plugins/vue-codemirror.client',
    '~/plugins/vue-content-placeholders',
    '~/plugins/vue-drag-zone',
    '~/plugins/vue-float-label.client',
    '~/plugins/vue-notifications.client',
    '~/plugins/vue-print-nb',
    '~/plugins/vue-ray',
    '~/plugins/vue-scrollactive',
    '~/plugins/vue-select',
    '~/plugins/vue-shortkey.client',
    '~/plugins/vue-toastification.client',
    '~/plugins/vue-touch-ripple',
    '~/plugins/vue-video-player.client',
    '~/plugins/vue-virtual-scroller.client',

    // {src: '~plugins/vue-video-player.js', ssr: false},
    // '~plugins/vue-gtm',
    // '~/plugins/vuelidate',
    // '~plugins/vue-introjs.client',

    // '~/plugins/auth.client',
    // '~/plugins/i18n.client',
    // '~/plugins/init-categories',
    // '~/plugins/menu.client',
    // '~/plugins/vue-observe-visibility.client',
    // '~/plugins/vue-scrollactive',
    // '~/plugins/vue-tables-2.client',
    // '~/plugins/vue-tippy',
    // '~/plugins/auth.client',
    // '~/plugins/devto',
    // '~/plugins/i18n.client',
    // '~/plugins/init-categories',
    // '~/plugins/menu.client',
    // '~/plugins/portal-vue',
    // '~/plugins/vue-api-query',
    // '~/plugins/vue-chartkick.client',
    // '~/plugins/vue-content-placeholders',
    // '~/plugins/vue-observe-visibility.client',
    // '~/plugins/vue-tables-2.client',
    // '~/plugins/vue-tippy',
    // '~/plugins/vuelidate',
    // '~/plugins/axios.plugin',
    // '~/plugins/cookies',
    // '~/plugins/dynamic-marquee.client',
    // '~/plugins/highcharts',
    // '~/plugins/inject-ww.client',
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
    // middleware: ['check-auth', 'ui'],
    middleware: ['ui'],
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

  // ackee: {
  //   server: 'https://example.com',
  //   domainId: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
  //   /* see configuration for more */
  //   // do not gather detailed data unless user gives permission
  //   detailed: true,
  //   // also tracks when on localhost
  //   ignoreLocalhost: false,
  //   // also tracks your own visits
  //   ignoreOwnVisits: false,
  //   storageKey: 'nuxt-ackee',
  // },

  auth: {
    rewriteRedirects: true,
    fullPathRedirect: true,
    redirect: {
      login: '/login/',
      logout: '/',
      callback: '/login/',
      home: '/',
    },
    strategies: {
      local: {
        token: {
          required: false,
          type: false,
        },
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.apiURL || 'https://api.victortolbert.com/',
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

  // // RSS Feed Configuration (https://github.com/nuxt-community/feed-module)
  // feed() {
  //   const baseUrlArticles = `${global.siteUrl}/articles`
  //   const baseLinkFeedArticles = '/articles'
  //   const feedFormats = {
  //     rss: {type: 'rss2', file: 'rss.xml'},
  //     json: {type: 'json1', file: 'feed.json'},
  //   }
  //   const {$content} = require('@nuxt/content')

  //   const createFeedArticles = async function (feed) {
  //     feed.options = {
  //       title: global.siteName || '',
  //       description: global.siteDesc || '',
  //       link: baseUrlArticles,
  //     }
  //     const articles = await $content('articles').fetch()

  //     articles.forEach(article => {
  //       const url = `${baseUrlArticles}/${article.slug}`

  //       feed.addItem({
  //         title: article.title,
  //         id: url,
  //         link: url,
  //         date: new Date(article.published),
  //         description: article.description,
  //         content: article.description,
  //         author: global.twitterHandle,
  //       })
  //     })
  //   }

  //   return Object.values(feedFormats).map(({file, type}) => ({
  //     path: `${baseLinkFeedArticles}/${file}`,
  //     type,
  //     create: createFeedArticles,
  //   }))
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
    // includeCss: 'vars',
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
    meta: {
      ogImage: '/static/preview.png',
    },
  },

  // // Sitemap Configuration (https://github.com/nuxt-community/sitemap-module)
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
    port: 3006,
    addons: [
      '@storybook/addon-docs',
      '@storybook/addon-notes',
      '@storybook/addon-controls',
      'storybook-dark-mode',
    ],
    parameters: {
      darkMode: {
        stylePreview: true,
      },
    },

    webpackFinal(config, {configDir}) {
      // manipulate webpack config
      return config
    },
  },

  styleResources: {
    scss: ['~/assets/scss/vars/*.scss', '~/assets/scss/abstracts/_mixins.scss'],
  },

  tailwindcss: {
    jit: true,
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
  // windicss: {
  //   scan: {
  //     dirs: ['./'],
  //     exclude: [
  //       'node_modules',
  //       '.git',
  //       '.nuxt/**/*',
  //       '*.template.html',
  //       // Any classes added in app.html (that have not previously been referenced) will need to be added to the safelist
  //       'app.html',
  //     ],
  //   },
  //   transformCSS: 'pre',
  //   preflight: {
  //     alias: {
  //       // add nuxt aliases
  //       'nuxt-link': 'a',
  //     },
  //   },
  // },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
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
    transpile: [/@fullcalendar.*/, 'vee-validate/dist/rules'], // transpile ESM modules within all fullcalendar packages
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
})
