import Vue from 'vue'
import Router from 'vue-router'
import {normalizeURL, decode} from '@nuxt/ufo'
import {interopDefault} from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5c688916 = () =>
  interopDefault(
    import(
      '../pages/affiliates.vue' /* webpackChunkName: "pages/affiliates" */
    ),
  )
const _c787b6a2 = () =>
  interopDefault(
    import(
      '../pages/articles/index.vue' /* webpackChunkName: "pages/articles/index" */
    ),
  )
const _04cc6fad = () =>
  interopDefault(
    import('../pages/calendar.vue' /* webpackChunkName: "pages/calendar" */),
  )
const _022f2704 = () =>
  interopDefault(
    import('../pages/cards.vue' /* webpackChunkName: "pages/cards" */),
  )
const _29538373 = () =>
  interopDefault(
    import('../pages/compose.vue' /* webpackChunkName: "pages/compose" */),
  )
const _97ecdcc4 = () =>
  interopDefault(
    import(
      '../pages/css-modules.vue' /* webpackChunkName: "pages/css-modules" */
    ),
  )
const _0e9c8596 = () =>
  interopDefault(
    import('../pages/dashboard.vue' /* webpackChunkName: "pages/dashboard" */),
  )
const _33809b52 = () =>
  interopDefault(
    import('../pages/demo.vue' /* webpackChunkName: "pages/demo" */),
  )
const _158d1338 = () =>
  interopDefault(
    import('../pages/examples.vue' /* webpackChunkName: "pages/examples" */),
  )
const _1cad51b3 = () =>
  interopDefault(
    import('../pages/form.vue' /* webpackChunkName: "pages/form" */),
  )
const _8d1f0666 = () =>
  interopDefault(
    import(
      '../pages/get-involved.vue' /* webpackChunkName: "pages/get-involved" */
    ),
  )
const _4d8bc180 = () =>
  interopDefault(
    import('../pages/give.vue' /* webpackChunkName: "pages/give" */),
  )
const _141daecf = () =>
  interopDefault(
    import('../pages/index2.vue' /* webpackChunkName: "pages/index2" */),
  )
const _793e8178 = () =>
  interopDefault(
    import('../pages/landing.vue' /* webpackChunkName: "pages/landing" */),
  )
const _e693f14c = () =>
  interopDefault(
    import('../pages/legal.vue' /* webpackChunkName: "pages/legal" */),
  )
const _6396828a = () =>
  interopDefault(
    import('../pages/messages.vue' /* webpackChunkName: "pages/messages" */),
  )
const _51321486 = () =>
  interopDefault(
    import(
      '../pages/messages/tags/_tag.vue' /* webpackChunkName: "pages/messages/tags/_tag" */
    ),
  )
const _21afe604 = () =>
  interopDefault(
    import(
      '../pages/messages/index.vue' /* webpackChunkName: "pages/messages/index" */
    ),
  )
const _b29d9234 = () =>
  interopDefault(
    import(
      '../pages/messages/_id.vue' /* webpackChunkName: "pages/messages/_id" */
    ),
  )
const _156f36e8 = () =>
  interopDefault(
    import('../pages/modules.vue' /* webpackChunkName: "pages/modules" */),
  )
const _95916b2e = () =>
  interopDefault(
    import('../pages/privacy.vue' /* webpackChunkName: "pages/privacy" */),
  )
const _2be8c1d4 = () =>
  interopDefault(
    import(
      '../pages/products/index.vue' /* webpackChunkName: "pages/products/index" */
    ),
  )
const _6632b80a = () =>
  interopDefault(
    import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */),
  )
const _4d3dcd3a = () =>
  interopDefault(import('../pages/pug.vue' /* webpackChunkName: "pages/pug" */))
const _b490d28a = () =>
  interopDefault(
    import('../pages/releases.vue' /* webpackChunkName: "pages/releases" */),
  )
const _5f00a9e9 = () =>
  interopDefault(
    import(
      '../pages/secondary-usage.vue' /* webpackChunkName: "pages/secondary-usage" */
    ),
  )
const _54cfb8dd = () =>
  interopDefault(
    import(
      '../pages/stay-informed.vue' /* webpackChunkName: "pages/stay-informed" */
    ),
  )
const _7d6e93c7 = () =>
  interopDefault(
    import('../pages/tailwind.vue' /* webpackChunkName: "pages/tailwind" */),
  )
const _d2425832 = () =>
  interopDefault(
    import(
      '../pages/theme-stackoverflow.vue' /* webpackChunkName: "pages/theme-stackoverflow" */
    ),
  )
const _713c0f30 = () =>
  interopDefault(
    import('../pages/timeline.vue' /* webpackChunkName: "pages/timeline" */),
  )
const _9344ff9c = () =>
  interopDefault(
    import('../pages/timeline2.vue' /* webpackChunkName: "pages/timeline2" */),
  )
const _918de8e4 = () =>
  interopDefault(
    import('../pages/todos.vue' /* webpackChunkName: "pages/todos" */),
  )
const _5ac54f49 = () =>
  interopDefault(
    import('../pages/training.vue' /* webpackChunkName: "pages/training" */),
  )
const _29a32bb4 = () =>
  interopDefault(
    import(
      '../pages/typescript.vue' /* webpackChunkName: "pages/typescript" */
    ),
  )
const _1ee1558c = () =>
  interopDefault(
    import('../pages/user.vue' /* webpackChunkName: "pages/user" */),
  )
const _2506f329 = () =>
  interopDefault(
    import('../pages/users.vue' /* webpackChunkName: "pages/users" */),
  )
const _5b624543 = () =>
  interopDefault(
    import('../pages/welcome.vue' /* webpackChunkName: "pages/welcome" */),
  )
const _6da63896 = () =>
  interopDefault(
    import(
      '../pages/admin/dashboard.vue' /* webpackChunkName: "pages/admin/dashboard" */
    ),
  )
const _caf4f932 = () =>
  interopDefault(
    import(
      '../pages/articles/_slug.vue' /* webpackChunkName: "pages/articles/_slug" */
    ),
  )
const _8fefaa0e = () =>
  interopDefault(
    import('../pages/home/_id.vue' /* webpackChunkName: "pages/home/_id" */),
  )
const _4a7c31ca = () =>
  interopDefault(
    import(
      '../pages/articles/_year/_month/index.vue' /* webpackChunkName: "pages/articles/_year/_month/index" */
    ),
  )
const _48c59082 = () =>
  interopDefault(
    import(
      '../pages/articles/_year/_month/_slug.vue' /* webpackChunkName: "pages/articles/_year/_month/_slug" */
    ),
  )
const _40c5ce1a = () =>
  interopDefault(
    import('../pages/index.vue' /* webpackChunkName: "pages/index" */),
  )
const _443310aa = () =>
  interopDefault(
    import('../pages/_slug.vue' /* webpackChunkName: "pages/_slug" */),
  )

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-exact-active',
  scrollBehavior,

  routes: [
    {
      path: '/es/es/affiliates/',
      component: _5c688916,
      pathToRegexpOptions: {strict: true},
      name: 'affiliates___es___es',
    },
    {
      path: '/es/affiliates/',
      component: _5c688916,
      pathToRegexpOptions: {strict: true},
      name: 'affiliates___es___en',
    },
    {
      path: '/es/affiliates/',
      component: _5c688916,
      pathToRegexpOptions: {strict: true},
      name: 'affiliates___en___es',
    },
    {
      path: '/affiliates/',
      component: _5c688916,
      pathToRegexpOptions: {strict: true},
      name: 'affiliates___en___en',
    },
    {
      path: '/es/es/articles/',
      component: _c787b6a2,
      pathToRegexpOptions: {strict: true},
      name: 'articles___es___es',
    },
    {
      path: '/es/articles/',
      component: _c787b6a2,
      pathToRegexpOptions: {strict: true},
      name: 'articles___es___en',
    },
    {
      path: '/es/articles/',
      component: _c787b6a2,
      pathToRegexpOptions: {strict: true},
      name: 'articles___en___es',
    },
    {
      path: '/articles/',
      component: _c787b6a2,
      pathToRegexpOptions: {strict: true},
      name: 'articles___en___en',
    },
    {
      path: '/es/es/calendar/',
      component: _04cc6fad,
      pathToRegexpOptions: {strict: true},
      name: 'calendar___es___es',
    },
    {
      path: '/es/calendar/',
      component: _04cc6fad,
      pathToRegexpOptions: {strict: true},
      name: 'calendar___es___en',
    },
    {
      path: '/es/calendar/',
      component: _04cc6fad,
      pathToRegexpOptions: {strict: true},
      name: 'calendar___en___es',
    },
    {
      path: '/calendar/',
      component: _04cc6fad,
      pathToRegexpOptions: {strict: true},
      name: 'calendar___en___en',
    },
    {
      path: '/es/es/cards/',
      component: _022f2704,
      pathToRegexpOptions: {strict: true},
      name: 'cards___es___es',
    },
    {
      path: '/es/cards/',
      component: _022f2704,
      pathToRegexpOptions: {strict: true},
      name: 'cards___es___en',
    },
    {
      path: '/es/cards/',
      component: _022f2704,
      pathToRegexpOptions: {strict: true},
      name: 'cards___en___es',
    },
    {
      path: '/cards/',
      component: _022f2704,
      pathToRegexpOptions: {strict: true},
      name: 'cards___en___en',
    },
    {
      path: '/es/es/compose/',
      component: _29538373,
      pathToRegexpOptions: {strict: true},
      name: 'compose___es___es',
    },
    {
      path: '/es/compose/',
      component: _29538373,
      pathToRegexpOptions: {strict: true},
      name: 'compose___es___en',
    },
    {
      path: '/es/compose/',
      component: _29538373,
      pathToRegexpOptions: {strict: true},
      name: 'compose___en___es',
    },
    {
      path: '/compose/',
      component: _29538373,
      pathToRegexpOptions: {strict: true},
      name: 'compose___en___en',
    },
    {
      path: '/es/es/css-modules/',
      component: _97ecdcc4,
      pathToRegexpOptions: {strict: true},
      name: 'css-modules___es___es',
    },
    {
      path: '/es/css-modules/',
      component: _97ecdcc4,
      pathToRegexpOptions: {strict: true},
      name: 'css-modules___es___en',
    },
    {
      path: '/es/css-modules/',
      component: _97ecdcc4,
      pathToRegexpOptions: {strict: true},
      name: 'css-modules___en___es',
    },
    {
      path: '/css-modules/',
      component: _97ecdcc4,
      pathToRegexpOptions: {strict: true},
      name: 'css-modules___en___en',
    },
    {
      path: '/es/es/dashboard/',
      component: _0e9c8596,
      pathToRegexpOptions: {strict: true},
      name: 'dashboard___es___es',
    },
    {
      path: '/es/dashboard/',
      component: _0e9c8596,
      pathToRegexpOptions: {strict: true},
      name: 'dashboard___es___en',
    },
    {
      path: '/es/dashboard/',
      component: _0e9c8596,
      pathToRegexpOptions: {strict: true},
      name: 'dashboard___en___es',
    },
    {
      path: '/dashboard/',
      component: _0e9c8596,
      pathToRegexpOptions: {strict: true},
      name: 'dashboard___en___en',
    },
    {
      path: '/es/es/demo/',
      component: _33809b52,
      pathToRegexpOptions: {strict: true},
      name: 'demo___es___es',
    },
    {
      path: '/es/demo/',
      component: _33809b52,
      pathToRegexpOptions: {strict: true},
      name: 'demo___es___en',
    },
    {
      path: '/es/demo/',
      component: _33809b52,
      pathToRegexpOptions: {strict: true},
      name: 'demo___en___es',
    },
    {
      path: '/demo/',
      component: _33809b52,
      pathToRegexpOptions: {strict: true},
      name: 'demo___en___en',
    },
    {
      path: '/es/es/examples/',
      component: _158d1338,
      pathToRegexpOptions: {strict: true},
      name: 'examples___es___es',
    },
    {
      path: '/es/examples/',
      component: _158d1338,
      pathToRegexpOptions: {strict: true},
      name: 'examples___es___en',
    },
    {
      path: '/es/examples/',
      component: _158d1338,
      pathToRegexpOptions: {strict: true},
      name: 'examples___en___es',
    },
    {
      path: '/examples/',
      component: _158d1338,
      pathToRegexpOptions: {strict: true},
      name: 'examples___en___en',
    },
    {
      path: '/es/es/form/',
      component: _1cad51b3,
      pathToRegexpOptions: {strict: true},
      name: 'form___es___es',
    },
    {
      path: '/es/form/',
      component: _1cad51b3,
      pathToRegexpOptions: {strict: true},
      name: 'form___es___en',
    },
    {
      path: '/es/form/',
      component: _1cad51b3,
      pathToRegexpOptions: {strict: true},
      name: 'form___en___es',
    },
    {
      path: '/form/',
      component: _1cad51b3,
      pathToRegexpOptions: {strict: true},
      name: 'form___en___en',
    },
    {
      path: '/es/es/get-involved/',
      component: _8d1f0666,
      pathToRegexpOptions: {strict: true},
      name: 'get-involved___es___es',
    },
    {
      path: '/es/get-involved/',
      component: _8d1f0666,
      pathToRegexpOptions: {strict: true},
      name: 'get-involved___es___en',
    },
    {
      path: '/es/get-involved/',
      component: _8d1f0666,
      pathToRegexpOptions: {strict: true},
      name: 'get-involved___en___es',
    },
    {
      path: '/get-involved/',
      component: _8d1f0666,
      pathToRegexpOptions: {strict: true},
      name: 'get-involved___en___en',
    },
    {
      path: '/es/es/give/',
      component: _4d8bc180,
      pathToRegexpOptions: {strict: true},
      name: 'give___es___es',
    },
    {
      path: '/es/give/',
      component: _4d8bc180,
      pathToRegexpOptions: {strict: true},
      name: 'give___es___en',
    },
    {
      path: '/es/give/',
      component: _4d8bc180,
      pathToRegexpOptions: {strict: true},
      name: 'give___en___es',
    },
    {
      path: '/give/',
      component: _4d8bc180,
      pathToRegexpOptions: {strict: true},
      name: 'give___en___en',
    },
    {
      path: '/es/es/index2/',
      component: _141daecf,
      pathToRegexpOptions: {strict: true},
      name: 'index2___es___es',
    },
    {
      path: '/es/index2/',
      component: _141daecf,
      pathToRegexpOptions: {strict: true},
      name: 'index2___es___en',
    },
    {
      path: '/es/index2/',
      component: _141daecf,
      pathToRegexpOptions: {strict: true},
      name: 'index2___en___es',
    },
    {
      path: '/index2/',
      component: _141daecf,
      pathToRegexpOptions: {strict: true},
      name: 'index2___en___en',
    },
    {
      path: '/es/es/landing/',
      component: _793e8178,
      pathToRegexpOptions: {strict: true},
      name: 'landing___es___es',
    },
    {
      path: '/es/landing/',
      component: _793e8178,
      pathToRegexpOptions: {strict: true},
      name: 'landing___es___en',
    },
    {
      path: '/es/landing/',
      component: _793e8178,
      pathToRegexpOptions: {strict: true},
      name: 'landing___en___es',
    },
    {
      path: '/landing/',
      component: _793e8178,
      pathToRegexpOptions: {strict: true},
      name: 'landing___en___en',
    },
    {
      path: '/es/es/legal/',
      component: _e693f14c,
      pathToRegexpOptions: {strict: true},
      name: 'legal___es___es',
    },
    {
      path: '/es/legal/',
      component: _e693f14c,
      pathToRegexpOptions: {strict: true},
      name: 'legal___es___en',
    },
    {
      path: '/es/legal/',
      component: _e693f14c,
      pathToRegexpOptions: {strict: true},
      name: 'legal___en___es',
    },
    {
      path: '/legal/',
      component: _e693f14c,
      pathToRegexpOptions: {strict: true},
      name: 'legal___en___en',
    },
    {
      path: '/es/es/messages/',
      component: _6396828a,
      pathToRegexpOptions: {strict: true},
      children: [
        {
          path: 'tags/:tag?/',
          component: _51321486,
          pathToRegexpOptions: {strict: true},
          name: 'messages-tags-tag___es___es',
        },
        {
          path: '',
          component: _21afe604,
          pathToRegexpOptions: {strict: true},
          name: 'messages___es___es',
        },
        {
          path: ':id/',
          component: _b29d9234,
          pathToRegexpOptions: {strict: true},
          name: 'messages-id___es___es',
        },
      ],
    },
    {
      path: '/es/messages/',
      component: _6396828a,
      pathToRegexpOptions: {strict: true},
      children: [
        {
          path: 'tags/:tag?/',
          component: _51321486,
          pathToRegexpOptions: {strict: true},
          name: 'messages-tags-tag___es___en',
        },
        {
          path: '',
          component: _21afe604,
          pathToRegexpOptions: {strict: true},
          name: 'messages___es___en',
        },
        {
          path: ':id/',
          component: _b29d9234,
          pathToRegexpOptions: {strict: true},
          name: 'messages-id___es___en',
        },
      ],
    },
    {
      path: '/es/messages/',
      component: _6396828a,
      pathToRegexpOptions: {strict: true},
      children: [
        {
          path: 'tags/:tag?/',
          component: _51321486,
          pathToRegexpOptions: {strict: true},
          name: 'messages-tags-tag___en___es',
        },
        {
          path: '',
          component: _21afe604,
          pathToRegexpOptions: {strict: true},
          name: 'messages___en___es',
        },
        {
          path: ':id/',
          component: _b29d9234,
          pathToRegexpOptions: {strict: true},
          name: 'messages-id___en___es',
        },
      ],
    },
    {
      path: '/messages/',
      component: _6396828a,
      pathToRegexpOptions: {strict: true},
      children: [
        {
          path: 'tags/:tag?/',
          component: _51321486,
          pathToRegexpOptions: {strict: true},
          name: 'messages-tags-tag___en___en',
        },
        {
          path: '',
          component: _21afe604,
          pathToRegexpOptions: {strict: true},
          name: 'messages___en___en',
        },
        {
          path: ':id/',
          component: _b29d9234,
          pathToRegexpOptions: {strict: true},
          name: 'messages-id___en___en',
        },
      ],
    },
    {
      path: '/es/es/modules/',
      component: _156f36e8,
      pathToRegexpOptions: {strict: true},
      name: 'modules___es___es',
    },
    {
      path: '/es/modules/',
      component: _156f36e8,
      pathToRegexpOptions: {strict: true},
      name: 'modules___es___en',
    },
    {
      path: '/es/modules/',
      component: _156f36e8,
      pathToRegexpOptions: {strict: true},
      name: 'modules___en___es',
    },
    {
      path: '/modules/',
      component: _156f36e8,
      pathToRegexpOptions: {strict: true},
      name: 'modules___en___en',
    },
    {
      path: '/es/es/privacy/',
      component: _95916b2e,
      pathToRegexpOptions: {strict: true},
      name: 'privacy___es___es',
    },
    {
      path: '/es/privacy/',
      component: _95916b2e,
      pathToRegexpOptions: {strict: true},
      name: 'privacy___es___en',
    },
    {
      path: '/es/privacy/',
      component: _95916b2e,
      pathToRegexpOptions: {strict: true},
      name: 'privacy___en___es',
    },
    {
      path: '/privacy/',
      component: _95916b2e,
      pathToRegexpOptions: {strict: true},
      name: 'privacy___en___en',
    },
    {
      path: '/es/es/products/',
      component: _2be8c1d4,
      pathToRegexpOptions: {strict: true},
      name: 'products___es___es',
    },
    {
      path: '/es/products/',
      component: _2be8c1d4,
      pathToRegexpOptions: {strict: true},
      name: 'products___es___en',
    },
    {
      path: '/es/products/',
      component: _2be8c1d4,
      pathToRegexpOptions: {strict: true},
      name: 'products___en___es',
    },
    {
      path: '/products/',
      component: _2be8c1d4,
      pathToRegexpOptions: {strict: true},
      name: 'products___en___en',
    },
    {
      path: '/es/es/profile/',
      component: _6632b80a,
      pathToRegexpOptions: {strict: true},
      name: 'profile___es___es',
    },
    {
      path: '/es/profile/',
      component: _6632b80a,
      pathToRegexpOptions: {strict: true},
      name: 'profile___es___en',
    },
    {
      path: '/es/profile/',
      component: _6632b80a,
      pathToRegexpOptions: {strict: true},
      name: 'profile___en___es',
    },
    {
      path: '/profile/',
      component: _6632b80a,
      pathToRegexpOptions: {strict: true},
      name: 'profile___en___en',
    },
    {
      path: '/es/es/pug/',
      component: _4d3dcd3a,
      pathToRegexpOptions: {strict: true},
      name: 'pug___es___es',
    },
    {
      path: '/es/pug/',
      component: _4d3dcd3a,
      pathToRegexpOptions: {strict: true},
      name: 'pug___es___en',
    },
    {
      path: '/es/pug/',
      component: _4d3dcd3a,
      pathToRegexpOptions: {strict: true},
      name: 'pug___en___es',
    },
    {
      path: '/pug/',
      component: _4d3dcd3a,
      pathToRegexpOptions: {strict: true},
      name: 'pug___en___en',
    },
    {
      path: '/es/es/releases/',
      component: _b490d28a,
      pathToRegexpOptions: {strict: true},
      name: 'releases___es___es',
    },
    {
      path: '/es/releases/',
      component: _b490d28a,
      pathToRegexpOptions: {strict: true},
      name: 'releases___es___en',
    },
    {
      path: '/es/releases/',
      component: _b490d28a,
      pathToRegexpOptions: {strict: true},
      name: 'releases___en___es',
    },
    {
      path: '/releases/',
      component: _b490d28a,
      pathToRegexpOptions: {strict: true},
      name: 'releases___en___en',
    },
    {
      path: '/es/es/secondary-usage/',
      component: _5f00a9e9,
      pathToRegexpOptions: {strict: true},
      name: 'secondary-usage___es___es',
    },
    {
      path: '/es/secondary-usage/',
      component: _5f00a9e9,
      pathToRegexpOptions: {strict: true},
      name: 'secondary-usage___es___en',
    },
    {
      path: '/es/secondary-usage/',
      component: _5f00a9e9,
      pathToRegexpOptions: {strict: true},
      name: 'secondary-usage___en___es',
    },
    {
      path: '/secondary-usage/',
      component: _5f00a9e9,
      pathToRegexpOptions: {strict: true},
      name: 'secondary-usage___en___en',
    },
    {
      path: '/es/es/stay-informed/',
      component: _54cfb8dd,
      pathToRegexpOptions: {strict: true},
      name: 'stay-informed___es___es',
    },
    {
      path: '/es/stay-informed/',
      component: _54cfb8dd,
      pathToRegexpOptions: {strict: true},
      name: 'stay-informed___es___en',
    },
    {
      path: '/es/stay-informed/',
      component: _54cfb8dd,
      pathToRegexpOptions: {strict: true},
      name: 'stay-informed___en___es',
    },
    {
      path: '/stay-informed/',
      component: _54cfb8dd,
      pathToRegexpOptions: {strict: true},
      name: 'stay-informed___en___en',
    },
    {
      path: '/es/es/tailwind/',
      component: _7d6e93c7,
      pathToRegexpOptions: {strict: true},
      name: 'tailwind___es___es',
    },
    {
      path: '/es/tailwind/',
      component: _7d6e93c7,
      pathToRegexpOptions: {strict: true},
      name: 'tailwind___es___en',
    },
    {
      path: '/es/tailwind/',
      component: _7d6e93c7,
      pathToRegexpOptions: {strict: true},
      name: 'tailwind___en___es',
    },
    {
      path: '/tailwind/',
      component: _7d6e93c7,
      pathToRegexpOptions: {strict: true},
      name: 'tailwind___en___en',
    },
    {
      path: '/es/es/theme-stackoverflow/',
      component: _d2425832,
      pathToRegexpOptions: {strict: true},
      name: 'theme-stackoverflow___es___es',
    },
    {
      path: '/es/theme-stackoverflow/',
      component: _d2425832,
      pathToRegexpOptions: {strict: true},
      name: 'theme-stackoverflow___es___en',
    },
    {
      path: '/es/theme-stackoverflow/',
      component: _d2425832,
      pathToRegexpOptions: {strict: true},
      name: 'theme-stackoverflow___en___es',
    },
    {
      path: '/theme-stackoverflow/',
      component: _d2425832,
      pathToRegexpOptions: {strict: true},
      name: 'theme-stackoverflow___en___en',
    },
    {
      path: '/es/es/timeline/',
      component: _713c0f30,
      pathToRegexpOptions: {strict: true},
      name: 'timeline___es___es',
    },
    {
      path: '/es/timeline/',
      component: _713c0f30,
      pathToRegexpOptions: {strict: true},
      name: 'timeline___es___en',
    },
    {
      path: '/es/timeline/',
      component: _713c0f30,
      pathToRegexpOptions: {strict: true},
      name: 'timeline___en___es',
    },
    {
      path: '/timeline/',
      component: _713c0f30,
      pathToRegexpOptions: {strict: true},
      name: 'timeline___en___en',
    },
    {
      path: '/es/es/timeline2/',
      component: _9344ff9c,
      pathToRegexpOptions: {strict: true},
      name: 'timeline2___es___es',
    },
    {
      path: '/es/timeline2/',
      component: _9344ff9c,
      pathToRegexpOptions: {strict: true},
      name: 'timeline2___es___en',
    },
    {
      path: '/es/timeline2/',
      component: _9344ff9c,
      pathToRegexpOptions: {strict: true},
      name: 'timeline2___en___es',
    },
    {
      path: '/timeline2/',
      component: _9344ff9c,
      pathToRegexpOptions: {strict: true},
      name: 'timeline2___en___en',
    },
    {
      path: '/es/es/todos/',
      component: _918de8e4,
      pathToRegexpOptions: {strict: true},
      name: 'todos___es___es',
    },
    {
      path: '/es/todos/',
      component: _918de8e4,
      pathToRegexpOptions: {strict: true},
      name: 'todos___es___en',
    },
    {
      path: '/es/todos/',
      component: _918de8e4,
      pathToRegexpOptions: {strict: true},
      name: 'todos___en___es',
    },
    {
      path: '/todos/',
      component: _918de8e4,
      pathToRegexpOptions: {strict: true},
      name: 'todos___en___en',
    },
    {
      path: '/es/es/training/',
      component: _5ac54f49,
      pathToRegexpOptions: {strict: true},
      name: 'training___es___es',
    },
    {
      path: '/es/training/',
      component: _5ac54f49,
      pathToRegexpOptions: {strict: true},
      name: 'training___es___en',
    },
    {
      path: '/es/training/',
      component: _5ac54f49,
      pathToRegexpOptions: {strict: true},
      name: 'training___en___es',
    },
    {
      path: '/training/',
      component: _5ac54f49,
      pathToRegexpOptions: {strict: true},
      name: 'training___en___en',
    },
    {
      path: '/es/es/typescript/',
      component: _29a32bb4,
      pathToRegexpOptions: {strict: true},
      name: 'typescript___es___es',
    },
    {
      path: '/es/typescript/',
      component: _29a32bb4,
      pathToRegexpOptions: {strict: true},
      name: 'typescript___es___en',
    },
    {
      path: '/es/typescript/',
      component: _29a32bb4,
      pathToRegexpOptions: {strict: true},
      name: 'typescript___en___es',
    },
    {
      path: '/typescript/',
      component: _29a32bb4,
      pathToRegexpOptions: {strict: true},
      name: 'typescript___en___en',
    },
    {
      path: '/es/es/user/',
      component: _1ee1558c,
      pathToRegexpOptions: {strict: true},
      name: 'user___es___es',
    },
    {
      path: '/es/user/',
      component: _1ee1558c,
      pathToRegexpOptions: {strict: true},
      name: 'user___es___en',
    },
    {
      path: '/es/user/',
      component: _1ee1558c,
      pathToRegexpOptions: {strict: true},
      name: 'user___en___es',
    },
    {
      path: '/user/',
      component: _1ee1558c,
      pathToRegexpOptions: {strict: true},
      name: 'user___en___en',
    },
    {
      path: '/es/es/users/',
      component: _2506f329,
      pathToRegexpOptions: {strict: true},
      name: 'users___es___es',
    },
    {
      path: '/es/users/',
      component: _2506f329,
      pathToRegexpOptions: {strict: true},
      name: 'users___es___en',
    },
    {
      path: '/es/users/',
      component: _2506f329,
      pathToRegexpOptions: {strict: true},
      name: 'users___en___es',
    },
    {
      path: '/users/',
      component: _2506f329,
      pathToRegexpOptions: {strict: true},
      name: 'users___en___en',
    },
    {
      path: '/es/es/welcome/',
      component: _5b624543,
      pathToRegexpOptions: {strict: true},
      name: 'welcome___es___es',
    },
    {
      path: '/es/welcome/',
      component: _5b624543,
      pathToRegexpOptions: {strict: true},
      name: 'welcome___es___en',
    },
    {
      path: '/es/welcome/',
      component: _5b624543,
      pathToRegexpOptions: {strict: true},
      name: 'welcome___en___es',
    },
    {
      path: '/welcome/',
      component: _5b624543,
      pathToRegexpOptions: {strict: true},
      name: 'welcome___en___en',
    },
    {
      path: '/es/es/admin/dashboard/',
      component: _6da63896,
      pathToRegexpOptions: {strict: true},
      name: 'admin-dashboard___es___es',
    },
    {
      path: '/es/admin/dashboard/',
      component: _6da63896,
      pathToRegexpOptions: {strict: true},
      name: 'admin-dashboard___es___en',
    },
    {
      path: '/es/admin/dashboard/',
      component: _6da63896,
      pathToRegexpOptions: {strict: true},
      name: 'admin-dashboard___en___es',
    },
    {
      path: '/admin/dashboard/',
      component: _6da63896,
      pathToRegexpOptions: {strict: true},
      name: 'admin-dashboard___en___en',
    },
    {
      path: '/es/es/articles/:slug/',
      component: _caf4f932,
      pathToRegexpOptions: {strict: true},
      name: 'articles-slug___es___es',
    },
    {
      path: '/es/articles/:slug/',
      component: _caf4f932,
      pathToRegexpOptions: {strict: true},
      name: 'articles-slug___es___en',
    },
    {
      path: '/es/articles/:slug/',
      component: _caf4f932,
      pathToRegexpOptions: {strict: true},
      name: 'articles-slug___en___es',
    },
    {
      path: '/articles/:slug/',
      component: _caf4f932,
      pathToRegexpOptions: {strict: true},
      name: 'articles-slug___en___en',
    },
    {
      path: '/es/es/home/:id?/',
      component: _8fefaa0e,
      pathToRegexpOptions: {strict: true},
      name: 'home-id___es___es',
    },
    {
      path: '/es/home/:id?/',
      component: _8fefaa0e,
      pathToRegexpOptions: {strict: true},
      name: 'home-id___es___en',
    },
    {
      path: '/es/home/:id?/',
      component: _8fefaa0e,
      pathToRegexpOptions: {strict: true},
      name: 'home-id___en___es',
    },
    {
      path: '/home/:id?/',
      component: _8fefaa0e,
      pathToRegexpOptions: {strict: true},
      name: 'home-id___en___en',
    },
    {
      path: '/es/es/articles/:year/:month?/',
      component: _4a7c31ca,
      pathToRegexpOptions: {strict: true},
      name: 'articles-year-month___es___es',
    },
    {
      path: '/es/articles/:year/:month?/',
      component: _4a7c31ca,
      pathToRegexpOptions: {strict: true},
      name: 'articles-year-month___es___en',
    },
    {
      path: '/es/articles/:year/:month?/',
      component: _4a7c31ca,
      pathToRegexpOptions: {strict: true},
      name: 'articles-year-month___en___es',
    },
    {
      path: '/articles/:year/:month?/',
      component: _4a7c31ca,
      pathToRegexpOptions: {strict: true},
      name: 'articles-year-month___en___en',
    },
    {
      path: '/es/es/articles/:year/:month?/:slug/',
      component: _48c59082,
      pathToRegexpOptions: {strict: true},
      name: 'articles-year-month-slug___es___es',
    },
    {
      path: '/es/articles/:year/:month?/:slug/',
      component: _48c59082,
      pathToRegexpOptions: {strict: true},
      name: 'articles-year-month-slug___es___en',
    },
    {
      path: '/es/articles/:year/:month?/:slug/',
      component: _48c59082,
      pathToRegexpOptions: {strict: true},
      name: 'articles-year-month-slug___en___es',
    },
    {
      path: '/articles/:year/:month?/:slug/',
      component: _48c59082,
      pathToRegexpOptions: {strict: true},
      name: 'articles-year-month-slug___en___en',
    },
    {
      path: '/es/es/',
      component: _40c5ce1a,
      pathToRegexpOptions: {strict: true},
      name: 'index___es___es',
    },
    {
      path: '/es/',
      component: _40c5ce1a,
      pathToRegexpOptions: {strict: true},
      name: 'index___es___en',
    },
    {
      path: '/es/',
      component: _40c5ce1a,
      pathToRegexpOptions: {strict: true},
      name: 'index___en___es',
    },
    {
      path: '/',
      component: _40c5ce1a,
      pathToRegexpOptions: {strict: true},
      name: 'index___en___en',
    },
    {
      path: '/es/es/:slug/',
      component: _443310aa,
      pathToRegexpOptions: {strict: true},
      name: 'slug___es___es',
    },
    {
      path: '/es/:slug/',
      component: _443310aa,
      pathToRegexpOptions: {strict: true},
      name: 'slug___es___en',
    },
    {
      path: '/es/:slug/',
      component: _443310aa,
      pathToRegexpOptions: {strict: true},
      name: 'slug___en___es',
    },
    {
      path: '/:slug/',
      component: _443310aa,
      pathToRegexpOptions: {strict: true},
      name: 'slug___en___en',
    },
  ],

  fallback: false,
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter() {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
