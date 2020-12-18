import Vue from 'vue'
import VueGtm from 'vue-gtm'
import router from '@/router'

Vue.use(VueGtm, {
  id: ['UA-18391724-15'],
  queryParams: {
    // Add url query string when load gtm.js with GTM ID (optional)
    gtm_auth: 'AB7cDEf3GHIjkl-MnOP8qr',
    gtm_preview: 'env-4',
    gtm_cookies_win: 'x',
  },
  enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
  debug: true, // Whether or not display console logs debugs (optional)
  loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
  vueRouter: router, // Pass the router instance to automatically sync with router (optional)
  ignoredViews: ['homepage'], // If router, you can exclude some routes name (case insensitive) (optional)
})
