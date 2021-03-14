import VueGtm from 'vue-gtm'
import VueRouter from 'vue-router'
const router = new VueRouter({routes, mode, linkActiveClass})

Vue.use(VueGtm, {
  id: 'GTM-PJD9BBB',
  defer: false, // defaults to false. Script can be set to `defer` to increase page-load-time at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible)
  enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
  debug: true,
  loadScript: true,
  vueRouter: router,
  ignoredViews: [],
  trackOnNextTick: false, // Whether or not call trackView in Vue.nextTick
})
