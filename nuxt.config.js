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
  components: true,
  target: 'static',
  ssr: false,
  modules: [
    '@nuxt/content',
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@oruga-ui/oruga/nuxt',
    'nuxt-i18n',
  ],
  buildModules: ['@nuxtjs/composition-api', '@nuxtjs/tailwindcss'],
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
    '~/plugins/vue-api-query',
    '~/plugins/vue-awesome-swiper.client',
    '~/plugins/vue-codemirror.client',
    '~/plugins/vue-content-placeholders',
    '~/plugins/vue-drag-zone',
    '~/plugins/vue-float-label.client',
    '~/plugins/vue-instantsearch.client',
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
    '~/plugins/vue-virtual-scroller.client',
    // '~/plugins/msw',
    // '~/plugins/vue-chartkick.client',
  ],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3003,
  },
  router: {trailingSlash: true},
  auth: {
    fullPathRedirect: true,
    redirect: {
      callback: '/login/',
      home: '/dashboard/',
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
  },
  colorMode: {
    classSuffix: '',
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
  oruga: {},
  pwa: {
    manifest: {
      lang: 'en',
    },
    meta: {
      ogImage: '/static/preview.png',
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

  storybook: {
    port: 3006,
    stories: [
      '~/components/**/*.stories.mdx',
      '~/components/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    parameters: {
      darkMode: {
        stylePreview: true,
      },
      viewMode: 'docs',
      actions: {argTypesRegex: '^on[A-Z].*'},
    },
    addons: [
      '@storybook/addon-a11y',
      '@storybook/addon-storysource',
      '@whitespace/storybook-addon-html',
      // '@storybook/addon-docs',
      '@storybook/addon-notes',
      // 'storybook-dark-mode',
    ],
    webpackFinal(config, {configDir}) {
      // manipulate webpack config
      return config
    },
  },

  styleResources: {
    scss: ['~/assets/scss/vars/*.scss', '~/assets/scss/abstracts/_mixins.scss'],
  },

  // tailwindcss: {
  //   jit: true,
  // },
  toast: {
    timeout: 2000,
    closeOnClick: false,
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
      // /@fullcalendar.*/, // transpile ESM modules within all fullcalendar packages
      'vee-validate/dist/rules',
      // 'vue-instantsearch',
      // 'instantsearch.js/es',
    ],
  },
}
