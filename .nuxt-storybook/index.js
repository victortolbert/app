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

import nuxt_plugin_plugin_5ac6ec38 from 'nuxt_plugin_plugin_5ac6ec38' // Source: ./components/plugin.js (mode: 'all')
import nuxt_plugin_oruga_46408f38 from 'nuxt_plugin_oruga_46408f38' // Source: ./oruga.js (mode: 'all')
import nuxt_plugin_toast_2423b7a9 from 'nuxt_plugin_toast_2423b7a9' // Source: ./toast.js (mode: 'client')
import nuxt_plugin_pluginrouting_0de0078c from 'nuxt_plugin_pluginrouting_0de0078c' // Source: ./nuxt-i18n/plugin.routing.js (mode: 'all')
import nuxt_plugin_pluginmain_0716213a from 'nuxt_plugin_pluginmain_0716213a' // Source: ./nuxt-i18n/plugin.main.js (mode: 'all')
import nuxt_plugin_workbox_aad5ecd4 from 'nuxt_plugin_workbox_aad5ecd4' // Source: ./workbox.js (mode: 'client')
import nuxt_plugin_metaplugin_4eee5aa9 from 'nuxt_plugin_metaplugin_4eee5aa9' // Source: ./pwa/meta.plugin.js (mode: 'all')
import nuxt_plugin_iconplugin_5396001d from 'nuxt_plugin_iconplugin_5396001d' // Source: ./pwa/icon.plugin.js (mode: 'all')
import nuxt_plugin_pluginserver_19686502 from 'nuxt_plugin_pluginserver_19686502' // Source: ./color-mode/plugin.server.js (mode: 'server')
import nuxt_plugin_pluginclient_98a2190c from 'nuxt_plugin_pluginclient_98a2190c' // Source: ./color-mode/plugin.client.js (mode: 'client')
import nuxt_plugin_axios_57f36afa from 'nuxt_plugin_axios_57f36afa' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_pluginclient_6d827940 from 'nuxt_plugin_pluginclient_6d827940' // Source: ./content/plugin.client.js (mode: 'client')
import nuxt_plugin_pluginserver_2ef834e8 from 'nuxt_plugin_pluginserver_2ef834e8' // Source: ./content/plugin.server.js (mode: 'server')
import nuxt_plugin_googleanalytics_b02da628 from 'nuxt_plugin_googleanalytics_b02da628' // Source: ./google-analytics.js (mode: 'client')
import nuxt_plugin_moment_95b4f444 from 'nuxt_plugin_moment_95b4f444' // Source: ./moment.js (mode: 'all')
import nuxt_plugin_plugin_0a022933 from 'nuxt_plugin_plugin_0a022933' // Source: ./composition-api/plugin.js (mode: 'all')
import nuxt_plugin_polyfillclient_4aa46bfe from 'nuxt_plugin_polyfillclient_4aa46bfe' // Source: ./composition-api/polyfill.client.js (mode: 'client')
import nuxt_plugin_api_5e4622e4 from 'nuxt_plugin_api_5e4622e4' // Source: ../plugins/api (mode: 'all')
import nuxt_plugin_auth_6442cd9b from 'nuxt_plugin_auth_6442cd9b' // Source: ../plugins/auth.client (mode: 'client')
import nuxt_plugin_dataapi_5da83eed from 'nuxt_plugin_dataapi_5da83eed' // Source: ../plugins/data-api (mode: 'all')
import nuxt_plugin_devto_352300cc from 'nuxt_plugin_devto_352300cc' // Source: ../plugins/devto (mode: 'all')
import nuxt_plugin_fontawesome_b8d42804 from 'nuxt_plugin_fontawesome_b8d42804' // Source: ../plugins/fontawesome (mode: 'all')
import nuxt_plugin_maps_6ed989cc from 'nuxt_plugin_maps_6ed989cc' // Source: ../plugins/maps.client (mode: 'client')
import nuxt_plugin_menu_318e6bf8 from 'nuxt_plugin_menu_318e6bf8' // Source: ../plugins/menu.client (mode: 'client')
import nuxt_plugin_portalvue_cb5f1eca from 'nuxt_plugin_portalvue_cb5f1eca' // Source: ../plugins/portal-vue (mode: 'all')
import nuxt_plugin_vueapiquery_964c47d0 from 'nuxt_plugin_vueapiquery_964c47d0' // Source: ../plugins/vue-api-query (mode: 'all')
import nuxt_plugin_vuechartkick_2cc813b2 from 'nuxt_plugin_vuechartkick_2cc813b2' // Source: ../plugins/vue-chartkick.client (mode: 'client')
import nuxt_plugin_vuecontentplaceholders_2d242d91 from 'nuxt_plugin_vuecontentplaceholders_2d242d91' // Source: ../plugins/vue-content-placeholders (mode: 'all')
import nuxt_plugin_vueobservevisibility_9bd06b0e from 'nuxt_plugin_vueobservevisibility_9bd06b0e' // Source: ../plugins/vue-observe-visibility.client (mode: 'client')
import nuxt_plugin_vuescrollactive_96ef6720 from 'nuxt_plugin_vuescrollactive_96ef6720' // Source: ../plugins/vue-scrollactive (mode: 'all')
import nuxt_plugin_vuetables2_7217d5f2 from 'nuxt_plugin_vuetables2_7217d5f2' // Source: ../plugins/vue-tables-2.client (mode: 'client')
import nuxt_plugin_vuetippy_73799e27 from 'nuxt_plugin_vuetippy_73799e27' // Source: ../plugins/vue-tippy (mode: 'all')
import nuxt_plugin_vuelidate_4345260a from 'nuxt_plugin_vuelidate_4345260a' // Source: ../plugins/vuelidate (mode: 'all')

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
    return this.$root.$options.$nuxt
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
    head: {"titleTemplate":"App: %s","htmlAttrs":{"lang":"en"},"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"Lab"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.svg"},{"rel":"stylesheet","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Josefin+Sans|Playfair+Display"},{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.svg"}],"bodyAttrs":{},"style":[],"script":[{"hid":"nuxt-color-mode-script","innerHTML":"!function(){\"use strict\";var e=window,s=document,o=s.documentElement,a=[\"dark\",\"light\"],t=window.localStorage.getItem(\"nuxt-color-mode\")||\"system\",c=\"system\"===t?l():t,i=s.body.getAttribute(\"data-color-mode-forced\");function r(e){var s=\"\"+e+\"-mode\";o.classList?o.classList.add(s):o.className+=\" \"+s}function n(s){return e.matchMedia(\"(prefers-color-scheme\"+s+\")\")}function l(){if(e.matchMedia&&\"not all\"!==n(\"\").media)for(var s of a)if(n(\":\"+s).matches)return s;return\"light\"}i&&(c=i),r(c),e[\"__NUXT_COLOR_MODE__\"]={preference:t,value:c,getColorScheme:l,addClass:r,removeClass:function(e){var s=\"\"+e+\"-mode\";o.classList?o.classList.remove(s):o.className=o.className.replace(new RegExp(s,\"g\"),\"\")}}}();\n","pbody":true}],"__dangerouslyDisableSanitizersByTagID":{"nuxt-color-mode-script":["innerHTML"]}},

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

  if (typeof nuxt_plugin_plugin_5ac6ec38 === 'function') {
    await nuxt_plugin_plugin_5ac6ec38(app.context, inject)
  }

  if (typeof nuxt_plugin_oruga_46408f38 === 'function') {
    await nuxt_plugin_oruga_46408f38(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_toast_2423b7a9 === 'function') {
    await nuxt_plugin_toast_2423b7a9(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginrouting_0de0078c === 'function') {
    await nuxt_plugin_pluginrouting_0de0078c(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginmain_0716213a === 'function') {
    await nuxt_plugin_pluginmain_0716213a(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_workbox_aad5ecd4 === 'function') {
    await nuxt_plugin_workbox_aad5ecd4(app.context, inject)
  }

  if (typeof nuxt_plugin_metaplugin_4eee5aa9 === 'function') {
    await nuxt_plugin_metaplugin_4eee5aa9(app.context, inject)
  }

  if (typeof nuxt_plugin_iconplugin_5396001d === 'function') {
    await nuxt_plugin_iconplugin_5396001d(app.context, inject)
  }

  if (process.server && typeof nuxt_plugin_pluginserver_19686502 === 'function') {
    await nuxt_plugin_pluginserver_19686502(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_pluginclient_98a2190c === 'function') {
    await nuxt_plugin_pluginclient_98a2190c(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_57f36afa === 'function') {
    await nuxt_plugin_axios_57f36afa(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_pluginclient_6d827940 === 'function') {
    await nuxt_plugin_pluginclient_6d827940(app.context, inject)
  }

  if (process.server && typeof nuxt_plugin_pluginserver_2ef834e8 === 'function') {
    await nuxt_plugin_pluginserver_2ef834e8(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_googleanalytics_b02da628 === 'function') {
    await nuxt_plugin_googleanalytics_b02da628(app.context, inject)
  }

  if (typeof nuxt_plugin_moment_95b4f444 === 'function') {
    await nuxt_plugin_moment_95b4f444(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_0a022933 === 'function') {
    await nuxt_plugin_plugin_0a022933(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_polyfillclient_4aa46bfe === 'function') {
    await nuxt_plugin_polyfillclient_4aa46bfe(app.context, inject)
  }

  if (typeof nuxt_plugin_api_5e4622e4 === 'function') {
    await nuxt_plugin_api_5e4622e4(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_auth_6442cd9b === 'function') {
    await nuxt_plugin_auth_6442cd9b(app.context, inject)
  }

  if (typeof nuxt_plugin_dataapi_5da83eed === 'function') {
    await nuxt_plugin_dataapi_5da83eed(app.context, inject)
  }

  if (typeof nuxt_plugin_devto_352300cc === 'function') {
    await nuxt_plugin_devto_352300cc(app.context, inject)
  }

  if (typeof nuxt_plugin_fontawesome_b8d42804 === 'function') {
    await nuxt_plugin_fontawesome_b8d42804(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_maps_6ed989cc === 'function') {
    await nuxt_plugin_maps_6ed989cc(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_menu_318e6bf8 === 'function') {
    await nuxt_plugin_menu_318e6bf8(app.context, inject)
  }

  if (typeof nuxt_plugin_portalvue_cb5f1eca === 'function') {
    await nuxt_plugin_portalvue_cb5f1eca(app.context, inject)
  }

  if (typeof nuxt_plugin_vueapiquery_964c47d0 === 'function') {
    await nuxt_plugin_vueapiquery_964c47d0(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuechartkick_2cc813b2 === 'function') {
    await nuxt_plugin_vuechartkick_2cc813b2(app.context, inject)
  }

  if (typeof nuxt_plugin_vuecontentplaceholders_2d242d91 === 'function') {
    await nuxt_plugin_vuecontentplaceholders_2d242d91(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueobservevisibility_9bd06b0e === 'function') {
    await nuxt_plugin_vueobservevisibility_9bd06b0e(app.context, inject)
  }

  if (typeof nuxt_plugin_vuescrollactive_96ef6720 === 'function') {
    await nuxt_plugin_vuescrollactive_96ef6720(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuetables2_7217d5f2 === 'function') {
    await nuxt_plugin_vuetables2_7217d5f2(app.context, inject)
  }

  if (typeof nuxt_plugin_vuetippy_73799e27 === 'function') {
    await nuxt_plugin_vuetippy_73799e27(app.context, inject)
  }

  if (typeof nuxt_plugin_vuelidate_4345260a === 'function') {
    await nuxt_plugin_vuelidate_4345260a(app.context, inject)
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
      router.push(ssrContext.url, resolve, (err) => {
        // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
        if (!err._isRouter) return reject(err)
        if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

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
    router
  }
}

export { createApp, NuxtError }
