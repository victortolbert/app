import { pwa } from './config/pwa'
import { appDescription } from './constants/index'
import pkg from './package.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.svg', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/uxlab.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  colorMode: {
    preference: 'light',
    fallback: 'light',
  },

  content: {
    highlight: {
      preload: [
        'apex',
        'bash',
        'csharp',
        'css',
        'diff',
        'gherkin',
        'html',
        'ini',
        'js',
        'json',
        'markdown',
        'php',
        'powershell',
        'prisma',
        'pug',
        'python',
        'razor',
        'ruby',
        'scss',
        'shell',
        'sql',
        'svelte',
        'ts',
        'tsx',
        'vue',
        'yaml',
      ],
    },
    // markdown: { },
    navigation: {
      fields: ['author', 'publishedAt'],
    },
  },

  css: [
    '~/assets/debug-grid.scss',
    '~/assets/debug.scss',
  ],

  devtools: { enabled: true },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  imports: {
    dirs: ['stores'],
  },

  modules: [
    '@pinia/nuxt',
    '@nuxthq/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    '@vite-pwa/nuxt',
    'nuxt-swiper',
  ],

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
  },

  plugins: ['~/plugins/vuex.ts', '~/plugins/loadUser.ts', '~/plugins/v-wave.directive.ts'],

  pwa,

  runtimeConfig: {
    public: {
      version: pkg.version,
    },
  },

  ssr: false,

  ui: {
    global: true,
    icons: ['carbon', 'heroicons', 'heroicons-outline', 'mdi', 'simple-icons'],
  },

  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@use "~/assets/_vars.sass" as *\n',
        },
      },
    },
  },

  vue: {
    defineModel: true,
    propsDestructure: true,
  },
})
