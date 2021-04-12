import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '../layouts/error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_273b0d45 from 'nuxt_plugin_plugin_273b0d45' // Source: ./components/plugin.js (mode: 'all')
import nuxt_plugin_sentryserver_2690ec9f from 'nuxt_plugin_sentryserver_2690ec9f' // Source: ./sentry.server.js (mode: 'server')
import nuxt_plugin_sentryclient_7e5109d2 from 'nuxt_plugin_sentryclient_7e5109d2' // Source: ./sentry.client.js (mode: 'client')
import nuxt_plugin_oruga_19a78545 from 'nuxt_plugin_oruga_19a78545' // Source: ./oruga.js (mode: 'all')
import nuxt_plugin_plugin_18839a72 from 'nuxt_plugin_plugin_18839a72' // Source: ./composition-api/plugin.js (mode: 'all')
import nuxt_plugin_pluginrouting_fc6bb5ea from 'nuxt_plugin_pluginrouting_fc6bb5ea' // Source: ./nuxt-i18n/plugin.routing.js (mode: 'all')
import nuxt_plugin_pluginmain_0d70da44 from 'nuxt_plugin_pluginmain_0d70da44' // Source: ./nuxt-i18n/plugin.main.js (mode: 'all')
import nuxt_plugin_pluginclient_4b8aa37e from 'nuxt_plugin_pluginclient_4b8aa37e' // Source: ./content/plugin.client.js (mode: 'client')
import nuxt_plugin_pluginserver_3ff41fc9 from 'nuxt_plugin_pluginserver_3ff41fc9' // Source: ./content/plugin.server.js (mode: 'server')
import nuxt_plugin_workbox_56c5bb92 from 'nuxt_plugin_workbox_56c5bb92' // Source: ./workbox.js (mode: 'client')
import nuxt_plugin_metaplugin_cb2f7b6c from 'nuxt_plugin_metaplugin_cb2f7b6c' // Source: ./pwa/meta.plugin.js (mode: 'all')
import nuxt_plugin_iconplugin_c1e03084 from 'nuxt_plugin_iconplugin_c1e03084' // Source: ./pwa/icon.plugin.js (mode: 'all')
import nuxt_plugin_axios_d689904a from 'nuxt_plugin_axios_d689904a' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_sound_1add88a2 from 'nuxt_plugin_sound_1add88a2' // Source: ./sound.js (mode: 'all')
import nuxt_plugin_pluginserver_e55afafe from 'nuxt_plugin_pluginserver_e55afafe' // Source: ./color-mode/plugin.server.js (mode: 'server')
import nuxt_plugin_pluginclient_279910f9 from 'nuxt_plugin_pluginclient_279910f9' // Source: ./color-mode/plugin.client.js (mode: 'client')
import nuxt_plugin_fontawesome_b8d42804 from 'nuxt_plugin_fontawesome_b8d42804' // Source: ../plugins/fontawesome (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root.$options.$nuxt
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":true,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"testing","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":""}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.svg"}],"script":[{"src":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fmoment.js\u002F2.29.1\u002Fmoment.min.js","defer":true},{"hid":"nuxt-color-mode-script","innerHTML":"!function(){\"use strict\";var e=window,s=document,o=s.documentElement,a=[\"dark\",\"light\"],t=window.localStorage.getItem(\"nuxt-color-mode\")||\"system\",c=\"system\"===t?l():t,i=s.body.getAttribute(\"data-color-mode-forced\");function r(e){var s=\"\"+e+\"\";o.classList?o.classList.add(s):o.className+=\" \"+s}function n(s){return e.matchMedia(\"(prefers-color-scheme\"+s+\")\")}function l(){if(e.matchMedia&&\"not all\"!==n(\"\").media)for(var s of a)if(n(\":\"+s).matches)return s;return\"light\"}i&&(c=i),r(c),e[\"__NUXT_COLOR_MODE__\"]={preference:t,value:c,getColorScheme:l,addClass:r,removeClass:function(e){var s=\"\"+e+\"\";o.classList?o.classList.remove(s):o.className=o.className.replace(new RegExp(s,\"g\"),\"\")}}}();\n","pbody":true}],"bodyAttrs":{"class":"bg-gray-100 dark:bg-gray-900"},"style":[],"__dangerouslyDisableSanitizersByTagID":{"nuxt-color-mode-script":["innerHTML"]}},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
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
      error (err) {
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
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
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
    ssrContext
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
          get () {
            return this.$root.$options[key]
          }
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

  if (typeof nuxt_plugin_plugin_273b0d45 === 'function') {
    await nuxt_plugin_plugin_273b0d45(app.context, inject)
  }

  if (process.server && typeof nuxt_plugin_sentryserver_2690ec9f === 'function') {
    await nuxt_plugin_sentryserver_2690ec9f(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_sentryclient_7e5109d2 === 'function') {
    await nuxt_plugin_sentryclient_7e5109d2(app.context, inject)
  }

  if (typeof nuxt_plugin_oruga_19a78545 === 'function') {
    await nuxt_plugin_oruga_19a78545(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_18839a72 === 'function') {
    await nuxt_plugin_plugin_18839a72(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginrouting_fc6bb5ea === 'function') {
    await nuxt_plugin_pluginrouting_fc6bb5ea(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginmain_0d70da44 === 'function') {
    await nuxt_plugin_pluginmain_0d70da44(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_pluginclient_4b8aa37e === 'function') {
    await nuxt_plugin_pluginclient_4b8aa37e(app.context, inject)
  }

  if (process.server && typeof nuxt_plugin_pluginserver_3ff41fc9 === 'function') {
    await nuxt_plugin_pluginserver_3ff41fc9(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_workbox_56c5bb92 === 'function') {
    await nuxt_plugin_workbox_56c5bb92(app.context, inject)
  }

  if (typeof nuxt_plugin_metaplugin_cb2f7b6c === 'function') {
    await nuxt_plugin_metaplugin_cb2f7b6c(app.context, inject)
  }

  if (typeof nuxt_plugin_iconplugin_c1e03084 === 'function') {
    await nuxt_plugin_iconplugin_c1e03084(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_d689904a === 'function') {
    await nuxt_plugin_axios_d689904a(app.context, inject)
  }

  if (typeof nuxt_plugin_sound_1add88a2 === 'function') {
    await nuxt_plugin_sound_1add88a2(app.context, inject)
  }

  if (process.server && typeof nuxt_plugin_pluginserver_e55afafe === 'function') {
    await nuxt_plugin_pluginserver_e55afafe(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_pluginclient_279910f9 === 'function') {
    await nuxt_plugin_pluginclient_279910f9(app.context, inject)
  }

  if (typeof nuxt_plugin_fontawesome_b8d42804 === 'function') {
    await nuxt_plugin_fontawesome_b8d42804(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    router.push(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
