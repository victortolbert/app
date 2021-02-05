import path from 'path'
// eslint-disable-next-line import/named
// import {utils} from './config'
// const isDev = process.env.NODE_ENV !== "production"

export default {
  buildModules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/composition-api',
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
  ],

  axios: {
    baseURL: process.env.apiUrl || 'https://victortolbert-api.herokuapp.com/',
    credentials: true,
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
  },

  eslint: {
    cache: false,
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

  plugins: [
    '@/plugins/oruga',
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
    '@/plugins/to-title-case',
    '@/plugins/vue-chartkick.client',
    '@/plugins/vue-content-placeholders',
    '@/plugins/vue-good-table.client',
    '@/plugins/vue-select',
    '@/plugins/vue-scroll-reveal.client',
    '@/plugins/vue-scrollactive',
    '@/plugins/vue-trix.client',
    '@/plugins/vue-tables-2.client',
    '@/plugins/vuebars',
    '@/plugins/vuelidate',
  ],

  router: {
    trailingSlash: true,
  },

  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 8686,
  },

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

  tailwindcss: {
    cssPath: '@/assets/styles/tailwind.css',
    exposeConfig: true,
  },

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
        'postcss-100vh-fix': {},
      },
    },
    preset: {
      stage: 1,
    },
  },
}
