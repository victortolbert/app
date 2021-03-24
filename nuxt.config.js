export default {
  publicRuntimeConfig: {
    algolia: {appId: 'WTEU7RU64C', key: '0bdd840be2d7d4377e10b238bc731901'},
  },
  privateRuntimeConfig: {
    algolia: {appId: 'WTEU7RU64C', key: 'd1fe567d10edb4ffe8e470d61dc84616'},
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
  buildModules: [
    '@nuxtjs/composition-api',
    '@nuxtjs/tailwindcss',
    '@nuxt/typescript-build',
  ],
  plugins: [
    '~/plugins/api',
    '~/plugins/data-api',
    '~/plugins/filters',
    '~/plugins/fontawesome',
    '~/plugins/jam',
    '~/plugins/maps.client',
    // '~/plugins/msw',
    '~/plugins/oruga',
    '~/plugins/particles.client',
    '~/plugins/portal-vue',
    '~/plugins/repository',
    '~/plugins/vee-validate',
    // '~/plugins/vue-chartkick.client',
    '~/plugins/markdown',
    '~/plugins/vue-content-placeholders',
    '~/plugins/vue-float-label.client',
    '~/plugins/vue-instantsearch.client',
    '~/plugins/vue-notifications.client',
    '~/plugins/vue-shortkey.client',
    '~/plugins/vue-textarea-autosize',
    '~/plugins/vue-toastification.client',
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

  tailwindcss: {
    jit: true,
  },
  toast: {
    timeout: 2000,
    closeOnClick: false,
  },
  typescript: {
    typeCheck: false,
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
      /@fullcalendar.*/, // transpile ESM modules within all fullcalendar packages
      // 'vee-validate/dist/rules',
      // 'vue-instantsearch',
      // 'instantsearch.js/es',
    ],
  },
}
