import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import {createRouter} from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '../layouts/error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import {setContext, getLocation, getRouteData, normalizeError} from './utils'
import {createStore} from './store.js'

/* Plugins */

import nuxt_plugin_plugin_08027e78 from 'nuxt_plugin_plugin_08027e78' // Source: ./components/plugin.js (mode: 'all')
import nuxt_plugin_sentryserver_2a00379e from 'nuxt_plugin_sentryserver_2a00379e' // Source: ./sentry.server.js (mode: 'server')
import nuxt_plugin_sentryclient_777273d4 from 'nuxt_plugin_sentryclient_777273d4' // Source: ./sentry.client.js (mode: 'client')
import nuxt_plugin_pluginrouting_56bc54ac from 'nuxt_plugin_pluginrouting_56bc54ac' // Source: ./nuxt-i18n/plugin.routing.js (mode: 'all')
import nuxt_plugin_pluginmain_abbe937a from 'nuxt_plugin_pluginmain_abbe937a' // Source: ./nuxt-i18n/plugin.main.js (mode: 'all')
import nuxt_plugin_axios_5e6e1c4c from 'nuxt_plugin_axios_5e6e1c4c' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_pluginclient_76ea8a40 from 'nuxt_plugin_pluginclient_76ea8a40' // Source: ./content/plugin.client.js (mode: 'client')
import nuxt_plugin_pluginserver_46b80870 from 'nuxt_plugin_pluginserver_46b80870' // Source: ./content/plugin.server.js (mode: 'server')
import nuxt_plugin_moment_5700dafe from 'nuxt_plugin_moment_5700dafe' // Source: ./moment.js (mode: 'all')
import nuxt_plugin_googleanalytics_7ff49a0c from 'nuxt_plugin_googleanalytics_7ff49a0c' // Source: ./google-analytics.js (mode: 'client')
import nuxt_plugin_plugin_11cf3e53 from 'nuxt_plugin_plugin_11cf3e53' // Source: ./composition-api/plugin.js (mode: 'all')
import nuxt_plugin_pluginserver_6244b222 from 'nuxt_plugin_pluginserver_6244b222' // Source: ./color-mode/plugin.server.js (mode: 'server')
import nuxt_plugin_pluginclient_06e97ecc from 'nuxt_plugin_pluginclient_06e97ecc' // Source: ./color-mode/plugin.client.js (mode: 'client')
import nuxt_plugin_i18n_6bd029b2 from 'nuxt_plugin_i18n_6bd029b2' // Source: ../plugins/i18n.client (mode: 'client')
import nuxt_plugin_polyfills_f131d02e from 'nuxt_plugin_polyfills_f131d02e' // Source: ../plugins/polyfills.client (mode: 'client')
import nuxt_plugin_portalvue_fdc2f4ce from 'nuxt_plugin_portalvue_fdc2f4ce' // Source: ../plugins/portal-vue (mode: 'all')
import nuxt_plugin_vuecontentplaceholders_5f72ae0f from 'nuxt_plugin_vuecontentplaceholders_5f72ae0f' // Source: ../plugins/vue-content-placeholders (mode: 'all')
import nuxt_plugin_vuescrollreveal_87e31432 from 'nuxt_plugin_vuescrollreveal_87e31432' // Source: ../plugins/vue-scroll-reveal.client (mode: 'client')
import nuxt_plugin_markdown_667a7ee3 from 'nuxt_plugin_markdown_667a7ee3' // Source: ../plugins/markdown (mode: 'all')
import nuxt_plugin_init_9269fdf8 from 'nuxt_plugin_init_9269fdf8' // Source: ../plugins/init (mode: 'all')
import nuxt_plugin_vuescrollactive_41e62aee from 'nuxt_plugin_vuescrollactive_41e62aee' // Source: ../plugins/vue-scrollactive (mode: 'all')
import nuxt_plugin_menu_4ba55674 from 'nuxt_plugin_menu_4ba55674' // Source: ../plugins/menu.client (mode: 'client')
import nuxt_plugin_meta_3e659e01 from 'nuxt_plugin_meta_3e659e01' // Source: ./composition-api/meta.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render(h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn(
        '<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead',
      )
    }
    return NoSsr.render(h, ctx)
  },
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    return this.$root.$options.$nuxt
  },
  configurable: true,
})

Vue.use(Meta, {
  keyName: 'head',
  attribute: 'data-n-head',
  ssrAttribute: 'data-n-head-ssr',
  tagIDKeyName: 'hid',
})

const defaultTransition = {
  name: 'page',
  mode: 'out-in',
  appear: true,
  appearClass: 'appear',
  appearActiveClass: 'appear-active',
  appearToClass: 'appear-to',
}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule(path, rawModule, options = {}) {
  const preserveState =
    process.client &&
    (Array.isArray(path)
      ? !!path.reduce(
          (namespacedState, path) => namespacedState && namespacedState[path],
          this.state,
        )
      : path in this.state)
  return originalRegisterModule.call(this, path, rawModule, {
    preserveState,
    ...options,
  })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {
      title: 'Lab',
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {hid: 'description', name: 'description', content: 'Lab'},
      ],
      link: [
        {rel: 'icon', type: 'image\u002Fx-icon', href: '\u002Ffavicon.svg'},
        {
          rel: 'stylesheet',
          href:
            'https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Inter:400,500,600&display=swap',
        },
        {
          rel: 'stylesheet',
          href:
            'https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Caveat:wght@400;430&family=Markazi+Text&display=swap',
        },
      ],
      script: [
        {
          src:
            'https:\u002F\u002Fcdn.jsdelivr.net\u002Fgh\u002Falpinejs\u002Falpine@v2.x.x\u002Fdist\u002Falpine.min.js',
          defer: true,
        },
        {
          hid: 'nuxt-color-mode-script',
          innerHTML:
            '!function (){"use strict";var e=window,s=document,o=s.documentElement,a=["dark","light"],t=window.localStorage.getItem("nuxt-color-mode")||"system",c="system"===t?l():t,i=s.body.getAttribute("data-color-mode-forced");function r(e){var s=""+e+"";o.classList?o.classList.add(s):o.className+=" "+s}function n(s){return e.matchMedia("(prefers-color-scheme"+s+")")}function l(){if(e.matchMedia&&"not all"!==n("").media)for(var s of a)if(n(":"+s).matches)return s;return"light"}i&&(c=i),r(c),e["__NUXT_COLOR_MODE__"]={preference:t,value:c,getColorScheme:l,addClass:r,removeClass:function(e){var s=""+e+"";o.classList?o.classList.remove(s):o.className=o.className.replace(new RegExp(s,"g"),"")}}}();\n',
          pbody: true,
        },
      ],
      style: [],
      __dangerouslyDisableSanitizersByTagID: {
        'nuxt-color-mode-script': ['innerHTML'],
      },
    },

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions(transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map(transition => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, {
              name: transition,
            })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error(err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      },
    },
    ...App,
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext
    ? ssrContext.next
    : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext,
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get() {
            return this.$root.$options[key]
          },
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_08027e78 === 'function') {
    await nuxt_plugin_plugin_08027e78(app.context, inject)
  }

  if (
    process.server &&
    typeof nuxt_plugin_sentryserver_2a00379e === 'function'
  ) {
    await nuxt_plugin_sentryserver_2a00379e(app.context, inject)
  }

  if (
    process.client &&
    typeof nuxt_plugin_sentryclient_777273d4 === 'function'
  ) {
    await nuxt_plugin_sentryclient_777273d4(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginrouting_56bc54ac === 'function') {
    await nuxt_plugin_pluginrouting_56bc54ac(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginmain_abbe937a === 'function') {
    await nuxt_plugin_pluginmain_abbe937a(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_5e6e1c4c === 'function') {
    await nuxt_plugin_axios_5e6e1c4c(app.context, inject)
  }

  if (
    process.client &&
    typeof nuxt_plugin_pluginclient_76ea8a40 === 'function'
  ) {
    await nuxt_plugin_pluginclient_76ea8a40(app.context, inject)
  }

  if (
    process.server &&
    typeof nuxt_plugin_pluginserver_46b80870 === 'function'
  ) {
    await nuxt_plugin_pluginserver_46b80870(app.context, inject)
  }

  if (typeof nuxt_plugin_moment_5700dafe === 'function') {
    await nuxt_plugin_moment_5700dafe(app.context, inject)
  }

  if (
    process.client &&
    typeof nuxt_plugin_googleanalytics_7ff49a0c === 'function'
  ) {
    await nuxt_plugin_googleanalytics_7ff49a0c(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_11cf3e53 === 'function') {
    await nuxt_plugin_plugin_11cf3e53(app.context, inject)
  }

  if (
    process.server &&
    typeof nuxt_plugin_pluginserver_6244b222 === 'function'
  ) {
    await nuxt_plugin_pluginserver_6244b222(app.context, inject)
  }

  if (
    process.client &&
    typeof nuxt_plugin_pluginclient_06e97ecc === 'function'
  ) {
    await nuxt_plugin_pluginclient_06e97ecc(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_i18n_6bd029b2 === 'function') {
    await nuxt_plugin_i18n_6bd029b2(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_polyfills_f131d02e === 'function') {
    await nuxt_plugin_polyfills_f131d02e(app.context, inject)
  }

  if (typeof nuxt_plugin_portalvue_fdc2f4ce === 'function') {
    await nuxt_plugin_portalvue_fdc2f4ce(app.context, inject)
  }

  if (typeof nuxt_plugin_vuecontentplaceholders_5f72ae0f === 'function') {
    await nuxt_plugin_vuecontentplaceholders_5f72ae0f(app.context, inject)
  }

  if (
    process.client &&
    typeof nuxt_plugin_vuescrollreveal_87e31432 === 'function'
  ) {
    await nuxt_plugin_vuescrollreveal_87e31432(app.context, inject)
  }

  if (typeof nuxt_plugin_markdown_667a7ee3 === 'function') {
    await nuxt_plugin_markdown_667a7ee3(app.context, inject)
  }

  if (typeof nuxt_plugin_init_9269fdf8 === 'function') {
    await nuxt_plugin_init_9269fdf8(app.context, inject)
  }

  if (typeof nuxt_plugin_vuescrollactive_41e62aee === 'function') {
    await nuxt_plugin_vuescrollactive_41e62aee(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_menu_4ba55674 === 'function') {
    await nuxt_plugin_menu_4ba55674(app.context, inject)
  }

  if (typeof nuxt_plugin_meta_3e659e01 === 'function') {
    await nuxt_plugin_meta_3e659e01(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, err => {
        // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
        if (!err._isRouter) return reject(err)
        if (err.type !== 2 /* NavigationFailureType.redirected */)
          return resolve()

        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router,
  }
}

export {createApp, NuxtError}
