import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _34f8010e = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _765a442e = () => interopDefault(import('../pages/advocates.vue' /* webpackChunkName: "pages/advocates" */))
const _425fc495 = () => interopDefault(import('../pages/affiliates.vue' /* webpackChunkName: "pages/affiliates" */))
const _8ce32de6 = () => interopDefault(import('../pages/announcements.vue' /* webpackChunkName: "pages/announcements" */))
const _23669dcf = () => interopDefault(import('../pages/articles/index.vue' /* webpackChunkName: "pages/articles/index" */))
const _11df7e66 = () => interopDefault(import('../pages/calendar.vue' /* webpackChunkName: "pages/calendar" */))
const _648c106e = () => interopDefault(import('../pages/clients.vue' /* webpackChunkName: "pages/clients" */))
const _716018d0 = () => interopDefault(import('../pages/cookies.vue' /* webpackChunkName: "pages/cookies" */))
const _59bd850e = () => interopDefault(import('../pages/courses.vue' /* webpackChunkName: "pages/courses" */))
const _55f6ac7e = () => interopDefault(import('../pages/css-modules.vue' /* webpackChunkName: "pages/css-modules" */))
const _3fde2859 = () => interopDefault(import('../pages/css-tricks.vue' /* webpackChunkName: "pages/css-tricks" */))
const _4ee81015 = () => interopDefault(import('../pages/dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _b357c09e = () => interopDefault(import('../pages/dashboards/index.vue' /* webpackChunkName: "pages/dashboards/index" */))
const _fccc071c = () => interopDefault(import('../pages/demo.vue' /* webpackChunkName: "pages/demo" */))
const _e6a3fe98 = () => interopDefault(import('../pages/demos/index.vue' /* webpackChunkName: "pages/demos/index" */))
const _13c0d88d = () => interopDefault(import('../pages/easy-emailer.vue' /* webpackChunkName: "pages/easy-emailer" */))
const _412a657f = () => interopDefault(import('../pages/edit-participant.vue' /* webpackChunkName: "pages/edit-participant" */))
const _21ff8ef5 = () => interopDefault(import('../pages/edit-profile.vue' /* webpackChunkName: "pages/edit-profile" */))
const _8ac26d88 = () => interopDefault(import('../pages/editor.vue' /* webpackChunkName: "pages/editor" */))
const _54afdbd3 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _531ad2e8 = () => interopDefault(import('../pages/events.vue' /* webpackChunkName: "pages/events" */))
const _1e088fb3 = () => interopDefault(import('../pages/file-upload.vue' /* webpackChunkName: "pages/file-upload" */))
const _6ac6b2d3 = () => interopDefault(import('../pages/form.vue' /* webpackChunkName: "pages/form" */))
const _3363967e = () => interopDefault(import('../pages/forums.vue' /* webpackChunkName: "pages/forums" */))
const _5526bded = () => interopDefault(import('../pages/get-involved.vue' /* webpackChunkName: "pages/get-involved" */))
const _c8b5bac0 = () => interopDefault(import('../pages/give.vue' /* webpackChunkName: "pages/give" */))
const _61802055 = () => interopDefault(import('../pages/grid.vue' /* webpackChunkName: "pages/grid" */))
const _041e3975 = () => interopDefault(import('../pages/homes.vue' /* webpackChunkName: "pages/homes" */))
const _4155306e = () => interopDefault(import('../pages/index1.vue' /* webpackChunkName: "pages/index1" */))
const _16a7e750 = () => interopDefault(import('../pages/landing.vue' /* webpackChunkName: "pages/landing" */))
const _6d92ce06 = () => interopDefault(import('../pages/loading.vue' /* webpackChunkName: "pages/loading" */))
const _1e577eea = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _28db0829 = () => interopDefault(import('../pages/logos.vue' /* webpackChunkName: "pages/logos" */))
const _c09b6cc6 = () => interopDefault(import('../pages/map.vue' /* webpackChunkName: "pages/map" */))
const _7f0ee04a = () => interopDefault(import('../pages/messages.vue' /* webpackChunkName: "pages/messages" */))
const _7652861e = () => interopDefault(import('../pages/messages/index.vue' /* webpackChunkName: "pages/messages/index" */))
const _3e731b8e = () => interopDefault(import('../pages/messages/layout.vue' /* webpackChunkName: "pages/messages/layout" */))
const _646fdedd = () => interopDefault(import('../pages/messages/tags/_tag.vue' /* webpackChunkName: "pages/messages/tags/_tag" */))
const _42677806 = () => interopDefault(import('../pages/messages/_id.vue' /* webpackChunkName: "pages/messages/_id" */))
const _de467c70 = () => interopDefault(import('../pages/modules.vue' /* webpackChunkName: "pages/modules" */))
const _a93917dc = () => interopDefault(import('../pages/movies.vue' /* webpackChunkName: "pages/movies" */))
const _2f9a0552 = () => interopDefault(import('../pages/my-profile.vue' /* webpackChunkName: "pages/my-profile" */))
const _3c385c2a = () => interopDefault(import('../pages/network-error.vue' /* webpackChunkName: "pages/network-error" */))
const _802010ee = () => interopDefault(import('../pages/not-found.vue' /* webpackChunkName: "pages/not-found" */))
const _0e265286 = () => interopDefault(import('../pages/partners/index.vue' /* webpackChunkName: "pages/partners/index" */))
const _0009fd3e = () => interopDefault(import('../pages/people/index.vue' /* webpackChunkName: "pages/people/index" */))
const _3fd70f24 = () => interopDefault(import('../pages/person.vue' /* webpackChunkName: "pages/person" */))
const _05807358 = () => interopDefault(import('../pages/posts.vue' /* webpackChunkName: "pages/posts" */))
const _79666c02 = () => interopDefault(import('../pages/posts/_id.vue' /* webpackChunkName: "pages/posts/_id" */))
const _71361836 = () => interopDefault(import('../pages/products/index.vue' /* webpackChunkName: "pages/products/index" */))
const _3cbf7a2c = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _97f899b4 = () => interopDefault(import('../pages/resources.vue' /* webpackChunkName: "pages/resources" */))
const _13a1e008 = () => interopDefault(import('../pages/resume.vue' /* webpackChunkName: "pages/resume" */))
const _d1748df0 = () => interopDefault(import('../pages/sandbox.vue' /* webpackChunkName: "pages/sandbox" */))
const _3c1b5bbb = () => interopDefault(import('../pages/scratch.vue' /* webpackChunkName: "pages/scratch" */))
const _1cec3e8a = () => interopDefault(import('../pages/search-copy.vue' /* webpackChunkName: "pages/search-copy" */))
const _25eb1012 = () => interopDefault(import('../pages/search.vue' /* webpackChunkName: "pages/search" */))
const _2bef0732 = () => interopDefault(import('../pages/settings.vue' /* webpackChunkName: "pages/settings" */))
const _3748161e = () => interopDefault(import('../pages/signin.vue' /* webpackChunkName: "pages/signin" */))
const _1275d521 = () => interopDefault(import('../pages/sockets.vue' /* webpackChunkName: "pages/sockets" */))
const _2fe19bbd = () => interopDefault(import('../pages/stay-informed.vue' /* webpackChunkName: "pages/stay-informed" */))
const _2ca9e73c = () => interopDefault(import('../pages/store.vue' /* webpackChunkName: "pages/store" */))
const _68b0b610 = () => interopDefault(import('../pages/support.vue' /* webpackChunkName: "pages/support" */))
const _6fb264e7 = () => interopDefault(import('../pages/tailwind.vue' /* webpackChunkName: "pages/tailwind" */))
const _deb51ee2 = () => interopDefault(import('../pages/tasks.vue' /* webpackChunkName: "pages/tasks" */))
const _29d31828 = () => interopDefault(import('../pages/team.vue' /* webpackChunkName: "pages/team" */))
const _7b63aab7 = () => interopDefault(import('../pages/teams.vue' /* webpackChunkName: "pages/teams" */))
const _5f3f405e = () => interopDefault(import('../pages/testing.vue' /* webpackChunkName: "pages/testing" */))
const _4e6bded0 = () => interopDefault(import('../pages/thanks.vue' /* webpackChunkName: "pages/thanks" */))
const _637fe050 = () => interopDefault(import('../pages/timeline.vue' /* webpackChunkName: "pages/timeline" */))
const _2c4bce6e = () => interopDefault(import('../pages/todos.vue' /* webpackChunkName: "pages/todos" */))
const _08fecc44 = () => interopDefault(import('../pages/tooltip.vue' /* webpackChunkName: "pages/tooltip" */))
const _4d092069 = () => interopDefault(import('../pages/training.vue' /* webpackChunkName: "pages/training" */))
const _08e64bd0 = () => interopDefault(import('../pages/upload.vue' /* webpackChunkName: "pages/upload" */))
const _58981e06 = () => interopDefault(import('../pages/watch-reactive.vue' /* webpackChunkName: "pages/watch-reactive" */))
const _1e49a0d4 = () => interopDefault(import('../pages/watch-ref.vue' /* webpackChunkName: "pages/watch-ref" */))
const _58c2d0dc = () => interopDefault(import('../pages/website.vue' /* webpackChunkName: "pages/website" */))
const _4937a653 = () => interopDefault(import('../pages/webworker.vue' /* webpackChunkName: "pages/webworker" */))
const _52605fba = () => interopDefault(import('../pages/welcome.vue' /* webpackChunkName: "pages/welcome" */))
const _27518e95 = () => interopDefault(import('../pages/admin/dashboard.vue' /* webpackChunkName: "pages/admin/dashboard" */))
const _507918a4 = () => interopDefault(import('../pages/dashboards/admin.vue' /* webpackChunkName: "pages/dashboards/admin" */))
const _7e1e4c48 = () => interopDefault(import('../pages/dashboards/advocate.vue' /* webpackChunkName: "pages/dashboards/advocate" */))
const _62bcfb3e = () => interopDefault(import('../pages/dashboards/applicant.vue' /* webpackChunkName: "pages/dashboards/applicant" */))
const _4a03f4a2 = () => interopDefault(import('../pages/dashboards/booster.vue' /* webpackChunkName: "pages/dashboards/booster" */))
const _45165f3c = () => interopDefault(import('../pages/dashboards/candidate.vue' /* webpackChunkName: "pages/dashboards/candidate" */))
const _57008c47 = () => interopDefault(import('../pages/dashboards/executive.vue' /* webpackChunkName: "pages/dashboards/executive" */))
const _424c02bf = () => interopDefault(import('../pages/dashboards/staff.vue' /* webpackChunkName: "pages/dashboards/staff" */))
const _6e78d2c8 = () => interopDefault(import('../pages/dashboards/super-admin.vue' /* webpackChunkName: "pages/dashboards/super-admin" */))
const _8414f18a = () => interopDefault(import('../pages/demos/resume.vue' /* webpackChunkName: "pages/demos/resume" */))
const _6735aa37 = () => interopDefault(import('../pages/demos/top.vue' /* webpackChunkName: "pages/demos/top" */))
const _142a9ea0 = () => interopDefault(import('../pages/event/create.vue' /* webpackChunkName: "pages/event/create" */))
const _180eac4e = () => interopDefault(import('../pages/event/details.vue' /* webpackChunkName: "pages/event/details" */))
const _14cbf0a4 = () => interopDefault(import('../pages/event/edit.vue' /* webpackChunkName: "pages/event/edit" */))
const _319dedc7 = () => interopDefault(import('../pages/event/register.vue' /* webpackChunkName: "pages/event/register" */))
const _31dbc2eb = () => interopDefault(import('../pages/welcomes/funrun.vue' /* webpackChunkName: "pages/welcomes/funrun" */))
const _0d856bb8 = () => interopDefault(import('../pages/demos/t/_tag.vue' /* webpackChunkName: "pages/demos/t/_tag" */))
const _21affc87 = () => interopDefault(import('../pages/articles/_slug.vue' /* webpackChunkName: "pages/articles/_slug" */))
const _048f2cda = () => interopDefault(import('../pages/demos/_username/index.vue' /* webpackChunkName: "pages/demos/_username/index" */))
const _6f9109c6 = () => interopDefault(import('../pages/event/_id.vue' /* webpackChunkName: "pages/event/_id" */))
const _be807492 = () => interopDefault(import('../pages/guide/_slug-bak.vue' /* webpackChunkName: "pages/guide/_slug-bak" */))
const _f9938710 = () => interopDefault(import('../pages/guide/_slug.vue' /* webpackChunkName: "pages/guide/_slug" */))
const _ab6807ce = () => interopDefault(import('../pages/home/_id.vue' /* webpackChunkName: "pages/home/_id" */))
const _11939516 = () => interopDefault(import('../pages/partners/_slug.vue' /* webpackChunkName: "pages/partners/_slug" */))
const _277dcef8 = () => interopDefault(import('../pages/thread/_id.vue' /* webpackChunkName: "pages/thread/_id" */))
const _47978caa = () => interopDefault(import('../pages/articles/_year/_month/index.vue' /* webpackChunkName: "pages/articles/_year/_month/index" */))
const _e745db42 = () => interopDefault(import('../pages/demos/_username/_article.vue' /* webpackChunkName: "pages/demos/_username/_article" */))
const _c7c47308 = () => interopDefault(import('../pages/partners/_year/_month/index.vue' /* webpackChunkName: "pages/partners/_year/_month/index" */))
const _45e0eb62 = () => interopDefault(import('../pages/articles/_year/_month/_slug.vue' /* webpackChunkName: "pages/articles/_year/_month/_slug" */))
const _cb31b598 = () => interopDefault(import('../pages/partners/_year/_month/_slug.vue' /* webpackChunkName: "pages/partners/_year/_month/_slug" */))
const _52f93a8b = () => interopDefault(import('../pages/_slug.vue' /* webpackChunkName: "pages/_slug" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about/",
    component: _34f8010e,
    pathToRegexpOptions: {"strict":true},
    name: "about___en"
  }, {
    path: "/advocates/",
    component: _765a442e,
    pathToRegexpOptions: {"strict":true},
    name: "advocates___en"
  }, {
    path: "/affiliates/",
    component: _425fc495,
    pathToRegexpOptions: {"strict":true},
    name: "affiliates___en"
  }, {
    path: "/announcements/",
    component: _8ce32de6,
    pathToRegexpOptions: {"strict":true},
    name: "announcements___en"
  }, {
    path: "/articles/",
    component: _23669dcf,
    pathToRegexpOptions: {"strict":true},
    name: "articles___en"
  }, {
    path: "/calendar/",
    component: _11df7e66,
    pathToRegexpOptions: {"strict":true},
    name: "calendar___en"
  }, {
    path: "/clients/",
    component: _648c106e,
    pathToRegexpOptions: {"strict":true},
    name: "clients___en"
  }, {
    path: "/cookies/",
    component: _716018d0,
    pathToRegexpOptions: {"strict":true},
    name: "cookies___en"
  }, {
    path: "/courses/",
    component: _59bd850e,
    pathToRegexpOptions: {"strict":true},
    name: "courses___en"
  }, {
    path: "/css-modules/",
    component: _55f6ac7e,
    pathToRegexpOptions: {"strict":true},
    name: "css-modules___en"
  }, {
    path: "/css-tricks/",
    component: _3fde2859,
    pathToRegexpOptions: {"strict":true},
    name: "css-tricks___en"
  }, {
    path: "/dashboard/",
    component: _4ee81015,
    pathToRegexpOptions: {"strict":true},
    name: "dashboard___en"
  }, {
    path: "/dashboards/",
    component: _b357c09e,
    pathToRegexpOptions: {"strict":true},
    name: "dashboards___en"
  }, {
    path: "/demo/",
    component: _fccc071c,
    pathToRegexpOptions: {"strict":true},
    name: "demo___en"
  }, {
    path: "/demos/",
    component: _e6a3fe98,
    pathToRegexpOptions: {"strict":true},
    name: "demos___en"
  }, {
    path: "/easy-emailer/",
    component: _13c0d88d,
    pathToRegexpOptions: {"strict":true},
    name: "easy-emailer___en"
  }, {
    path: "/edit-participant/",
    component: _412a657f,
    pathToRegexpOptions: {"strict":true},
    name: "edit-participant___en"
  }, {
    path: "/edit-profile/",
    component: _21ff8ef5,
    pathToRegexpOptions: {"strict":true},
    name: "edit-profile___en"
  }, {
    path: "/editor/",
    component: _8ac26d88,
    pathToRegexpOptions: {"strict":true},
    name: "editor___en"
  }, {
    path: "/es/",
    component: _54afdbd3,
    pathToRegexpOptions: {"strict":true},
    name: "index___es"
  }, {
    path: "/events/",
    component: _531ad2e8,
    pathToRegexpOptions: {"strict":true},
    name: "events___en"
  }, {
    path: "/file-upload/",
    component: _1e088fb3,
    pathToRegexpOptions: {"strict":true},
    name: "file-upload___en"
  }, {
    path: "/form/",
    component: _6ac6b2d3,
    pathToRegexpOptions: {"strict":true},
    name: "form___en"
  }, {
    path: "/forums/",
    component: _3363967e,
    pathToRegexpOptions: {"strict":true},
    name: "forums___en"
  }, {
    path: "/get-involved/",
    component: _5526bded,
    pathToRegexpOptions: {"strict":true},
    name: "get-involved___en"
  }, {
    path: "/give/",
    component: _c8b5bac0,
    pathToRegexpOptions: {"strict":true},
    name: "give___en"
  }, {
    path: "/grid/",
    component: _61802055,
    pathToRegexpOptions: {"strict":true},
    name: "grid___en"
  }, {
    path: "/homes/",
    component: _041e3975,
    pathToRegexpOptions: {"strict":true},
    name: "homes___en"
  }, {
    path: "/index1/",
    component: _4155306e,
    pathToRegexpOptions: {"strict":true},
    name: "index1___en"
  }, {
    path: "/landing/",
    component: _16a7e750,
    pathToRegexpOptions: {"strict":true},
    name: "landing___en"
  }, {
    path: "/loading/",
    component: _6d92ce06,
    pathToRegexpOptions: {"strict":true},
    name: "loading___en"
  }, {
    path: "/login/",
    component: _1e577eea,
    pathToRegexpOptions: {"strict":true},
    name: "login___en"
  }, {
    path: "/logos/",
    component: _28db0829,
    pathToRegexpOptions: {"strict":true},
    name: "logos___en"
  }, {
    path: "/map/",
    component: _c09b6cc6,
    pathToRegexpOptions: {"strict":true},
    name: "map___en"
  }, {
    path: "/messages/",
    component: _7f0ee04a,
    pathToRegexpOptions: {"strict":true},
    children: [{
      path: "",
      component: _7652861e,
      pathToRegexpOptions: {"strict":true},
      name: "messages___en"
    }, {
      path: "layout/",
      component: _3e731b8e,
      pathToRegexpOptions: {"strict":true},
      name: "messages-layout___en"
    }, {
      path: "tags/:tag?/",
      component: _646fdedd,
      pathToRegexpOptions: {"strict":true},
      name: "messages-tags-tag___en"
    }, {
      path: ":id/",
      component: _42677806,
      pathToRegexpOptions: {"strict":true},
      name: "messages-id___en"
    }]
  }, {
    path: "/modules/",
    component: _de467c70,
    pathToRegexpOptions: {"strict":true},
    name: "modules___en"
  }, {
    path: "/movies/",
    component: _a93917dc,
    pathToRegexpOptions: {"strict":true},
    name: "movies___en"
  }, {
    path: "/my-profile/",
    component: _2f9a0552,
    pathToRegexpOptions: {"strict":true},
    name: "my-profile___en"
  }, {
    path: "/network-error/",
    component: _3c385c2a,
    pathToRegexpOptions: {"strict":true},
    name: "network-error___en"
  }, {
    path: "/not-found/",
    component: _802010ee,
    pathToRegexpOptions: {"strict":true},
    name: "not-found___en"
  }, {
    path: "/partners/",
    component: _0e265286,
    pathToRegexpOptions: {"strict":true},
    name: "partners___en"
  }, {
    path: "/people/",
    component: _0009fd3e,
    pathToRegexpOptions: {"strict":true},
    name: "people___en"
  }, {
    path: "/person/",
    component: _3fd70f24,
    pathToRegexpOptions: {"strict":true},
    name: "person___en"
  }, {
    path: "/posts/",
    component: _05807358,
    pathToRegexpOptions: {"strict":true},
    name: "posts___en",
    children: [{
      path: ":id?/",
      component: _79666c02,
      pathToRegexpOptions: {"strict":true},
      name: "posts-id___en"
    }]
  }, {
    path: "/products/",
    component: _71361836,
    pathToRegexpOptions: {"strict":true},
    name: "products___en"
  }, {
    path: "/profile/",
    component: _3cbf7a2c,
    pathToRegexpOptions: {"strict":true},
    name: "profile___en"
  }, {
    path: "/resources/",
    component: _97f899b4,
    pathToRegexpOptions: {"strict":true},
    name: "resources___en"
  }, {
    path: "/resume/",
    component: _13a1e008,
    pathToRegexpOptions: {"strict":true},
    name: "resume___en"
  }, {
    path: "/sandbox/",
    component: _d1748df0,
    pathToRegexpOptions: {"strict":true},
    name: "sandbox___en"
  }, {
    path: "/scratch/",
    component: _3c1b5bbb,
    pathToRegexpOptions: {"strict":true},
    name: "scratch___en"
  }, {
    path: "/search-copy/",
    component: _1cec3e8a,
    pathToRegexpOptions: {"strict":true},
    name: "search-copy___en"
  }, {
    path: "/search/",
    component: _25eb1012,
    pathToRegexpOptions: {"strict":true},
    name: "search___en"
  }, {
    path: "/settings/",
    component: _2bef0732,
    pathToRegexpOptions: {"strict":true},
    name: "settings___en"
  }, {
    path: "/signin/",
    component: _3748161e,
    pathToRegexpOptions: {"strict":true},
    name: "signin___en"
  }, {
    path: "/sockets/",
    component: _1275d521,
    pathToRegexpOptions: {"strict":true},
    name: "sockets___en"
  }, {
    path: "/stay-informed/",
    component: _2fe19bbd,
    pathToRegexpOptions: {"strict":true},
    name: "stay-informed___en"
  }, {
    path: "/store/",
    component: _2ca9e73c,
    pathToRegexpOptions: {"strict":true},
    name: "store___en"
  }, {
    path: "/support/",
    component: _68b0b610,
    pathToRegexpOptions: {"strict":true},
    name: "support___en"
  }, {
    path: "/tailwind/",
    component: _6fb264e7,
    pathToRegexpOptions: {"strict":true},
    name: "tailwind___en"
  }, {
    path: "/tasks/",
    component: _deb51ee2,
    pathToRegexpOptions: {"strict":true},
    name: "tasks___en"
  }, {
    path: "/team/",
    component: _29d31828,
    pathToRegexpOptions: {"strict":true},
    name: "team___en"
  }, {
    path: "/teams/",
    component: _7b63aab7,
    pathToRegexpOptions: {"strict":true},
    name: "teams___en"
  }, {
    path: "/testing/",
    component: _5f3f405e,
    pathToRegexpOptions: {"strict":true},
    name: "testing___en"
  }, {
    path: "/thanks/",
    component: _4e6bded0,
    pathToRegexpOptions: {"strict":true},
    name: "thanks___en"
  }, {
    path: "/timeline/",
    component: _637fe050,
    pathToRegexpOptions: {"strict":true},
    name: "timeline___en"
  }, {
    path: "/todos/",
    component: _2c4bce6e,
    pathToRegexpOptions: {"strict":true},
    name: "todos___en"
  }, {
    path: "/tooltip/",
    component: _08fecc44,
    pathToRegexpOptions: {"strict":true},
    name: "tooltip___en"
  }, {
    path: "/training/",
    component: _4d092069,
    pathToRegexpOptions: {"strict":true},
    name: "training___en"
  }, {
    path: "/upload/",
    component: _08e64bd0,
    pathToRegexpOptions: {"strict":true},
    name: "upload___en"
  }, {
    path: "/watch-reactive/",
    component: _58981e06,
    pathToRegexpOptions: {"strict":true},
    name: "watch-reactive___en"
  }, {
    path: "/watch-ref/",
    component: _1e49a0d4,
    pathToRegexpOptions: {"strict":true},
    name: "watch-ref___en"
  }, {
    path: "/website/",
    component: _58c2d0dc,
    pathToRegexpOptions: {"strict":true},
    name: "website___en"
  }, {
    path: "/webworker/",
    component: _4937a653,
    pathToRegexpOptions: {"strict":true},
    name: "webworker___en"
  }, {
    path: "/welcome/",
    component: _52605fba,
    pathToRegexpOptions: {"strict":true},
    name: "welcome___en"
  }, {
    path: "/admin/dashboard/",
    component: _27518e95,
    pathToRegexpOptions: {"strict":true},
    name: "admin-dashboard___en"
  }, {
    path: "/dashboards/admin/",
    component: _507918a4,
    pathToRegexpOptions: {"strict":true},
    name: "dashboards-admin___en"
  }, {
    path: "/dashboards/advocate/",
    component: _7e1e4c48,
    pathToRegexpOptions: {"strict":true},
    name: "dashboards-advocate___en"
  }, {
    path: "/dashboards/applicant/",
    component: _62bcfb3e,
    pathToRegexpOptions: {"strict":true},
    name: "dashboards-applicant___en"
  }, {
    path: "/dashboards/booster/",
    component: _4a03f4a2,
    pathToRegexpOptions: {"strict":true},
    name: "dashboards-booster___en"
  }, {
    path: "/dashboards/candidate/",
    component: _45165f3c,
    pathToRegexpOptions: {"strict":true},
    name: "dashboards-candidate___en"
  }, {
    path: "/dashboards/executive/",
    component: _57008c47,
    pathToRegexpOptions: {"strict":true},
    name: "dashboards-executive___en"
  }, {
    path: "/dashboards/staff/",
    component: _424c02bf,
    pathToRegexpOptions: {"strict":true},
    name: "dashboards-staff___en"
  }, {
    path: "/dashboards/super-admin/",
    component: _6e78d2c8,
    pathToRegexpOptions: {"strict":true},
    name: "dashboards-super-admin___en"
  }, {
    path: "/demos/resume/",
    component: _8414f18a,
    pathToRegexpOptions: {"strict":true},
    name: "demos-resume___en"
  }, {
    path: "/demos/top/",
    component: _6735aa37,
    pathToRegexpOptions: {"strict":true},
    name: "demos-top___en"
  }, {
    path: "/es/about/",
    component: _34f8010e,
    pathToRegexpOptions: {"strict":true},
    name: "about___es"
  }, {
    path: "/es/advocates/",
    component: _765a442e,
    pathToRegexpOptions: {"strict":true},
    name: "advocates___es"
  }, {
    path: "/es/affiliates/",
    component: _425fc495,
    pathToRegexpOptions: {"strict":true},
    name: "affiliates___es"
  }, {
    path: "/es/announcements/",
    component: _8ce32de6,
    pathToRegexpOptions: {"strict":true},
    name: "announcements___es"
  }, {
    path: "/es/articles/",
    component: _23669dcf,
    pathToRegexpOptions: {"strict":true},
    name: "articles___es"
  }, {
    path: "/es/calendar/",
    component: _11df7e66,
    pathToRegexpOptions: {"strict":true},
    name: "calendar___es"
  }, {
    path: "/es/clients/",
    component: _648c106e,
    pathToRegexpOptions: {"strict":true},
    name: "clients___es"
  }, {
    path: "/es/cookies/",
    component: _716018d0,
    pathToRegexpOptions: {"strict":true},
    name: "cookies___es"
  }, {
    path: "/es/courses/",
    component: _59bd850e,
    pathToRegexpOptions: {"strict":true},
    name: "courses___es"
  }, {
    path: "/es/css-modules/",
    component: _55f6ac7e,
    pathToRegexpOptions: {"strict":true},
    name: "css-modules___es"
  }, {
    path: "/es/css-tricks/",
    component: _3fde2859,
    pathToRegexpOptions: {"strict":true},
    name: "css-tricks___es"
  }, {
    path: "/es/dashboard/",
    component: _4ee81015,
    pathToRegexpOptions: {"strict":true},
    name: "dashboard___es"
  }, {
    path: "/es/dashboards/",
    component: _b357c09e,
    pathToRegexpOptions: {"strict":true},
    name: "dashboards___es"
  }, {
    path: "/es/demo/",
    component: _fccc071c,
    pathToRegexpOptions: {"strict":true},
    name: "demo___es"
  }, {
    path: "/es/demos/",
    component: _e6a3fe98,
    pathToRegexpOptions: {"strict":true},
    name: "demos___es"
  }, {
    path: "/es/easy-emailer/",
    component: _13c0d88d,
    pathToRegexpOptions: {"strict":true},
    name: "easy-emailer___es"
  }, {
    path: "/es/edit-participant/",
    component: _412a657f,
    pathToRegexpOptions: {"strict":true},
    name: "edit-participant___es"
  }, {
    path: "/es/edit-profile/",
    component: _21ff8ef5,
    pathToRegexpOptions: {"strict":true},
    name: "edit-profile___es"
  }, {
    path: "/es/editor/",
    component: _8ac26d88,
    pathToRegexpOptions: {"strict":true},
    name: "editor___es"
  }, {
    path: "/es/events/",
    component: _531ad2e8,
    pathToRegexpOptions: {"strict":true},
    name: "events___es"
  }, {
    path: "/es/file-upload/",
    component: _1e088fb3,
    pathToRegexpOptions: {"strict":true},
    name: "file-upload___es"
  }, {
    path: "/es/form/",
    component: _6ac6b2d3,
    pathToRegexpOptions: {"strict":true},
    name: "form___es"
  }, {
    path: "/es/forums/",
    component: _3363967e,
    pathToRegexpOptions: {"strict":true},
    name: "forums___es"
  }, {
    path: "/es/get-involved/",
    component: _5526bded,
    pathToRegexpOptions: {"strict":true},
    name: "get-involved___es"
  }, {
    path: "/es/give/",
    component: _c8b5bac0,
    pathToRegexpOptions: {"strict":true},
    name: "give___es"
  }, {
    path: "/es/grid/",
    component: _61802055,
    pathToRegexpOptions: {"strict":true},
    name: "grid___es"
  }, {
    path: "/es/homes/",
    component: _041e3975,
    pathToRegexpOptions: {"strict":true},
    name: "homes___es"
  }, {
    path: "/es/index1/",
    component: _4155306e,
    pathToRegexpOptions: {"strict":true},
    name: "index1___es"
  }, {
    path: "/es/landing/",
    component: _16a7e750,
    pathToRegexpOptions: {"strict":true},
    name: "landing___es"
  }, {
    path: "/es/loading/",
    component: _6d92ce06,
    pathToRegexpOptions: {"strict":true},
    name: "loading___es"
  }, {
    path: "/es/login/",
    component: _1e577eea,
    pathToRegexpOptions: {"strict":true},
    name: "login___es"
  }, {
    path: "/es/logos/",
    component: _28db0829,
    pathToRegexpOptions: {"strict":true},
    name: "logos___es"
  }, {
    path: "/es/map/",
    component: _c09b6cc6,
    pathToRegexpOptions: {"strict":true},
    name: "map___es"
  }, {
    path: "/es/messages/",
    component: _7f0ee04a,
    pathToRegexpOptions: {"strict":true},
    children: [{
      path: "",
      component: _7652861e,
      pathToRegexpOptions: {"strict":true},
      name: "messages___es"
    }, {
      path: "layout/",
      component: _3e731b8e,
      pathToRegexpOptions: {"strict":true},
      name: "messages-layout___es"
    }, {
      path: "tags/:tag?/",
      component: _646fdedd,
      pathToRegexpOptions: {"strict":true},
      name: "messages-tags-tag___es"
    }, {
      path: ":id/",
      component: _42677806,
      pathToRegexpOptions: {"strict":true},
      name: "messages-id___es"
    }]
  }, {
    path: "/es/modules/",
    component: _de467c70,
    pathToRegexpOptions: {"strict":true},
    name: "modules___es"
  }, {
    path: "/es/movies/",
    component: _a93917dc,
    pathToRegexpOptions: {"strict":true},
    name: "movies___es"
  }, {
    path: "/es/my-profile/",
    component: _2f9a0552,
    pathToRegexpOptions: {"strict":true},
    name: "my-profile___es"
  }, {
    path: "/es/network-error/",
    component: _3c385c2a,
    pathToRegexpOptions: {"strict":true},
    name: "network-error___es"
  }, {
    path: "/es/not-found/",
    component: _802010ee,
    pathToRegexpOptions: {"strict":true},
    name: "not-found___es"
  }, {
    path: "/es/partners/",
    component: _0e265286,
    pathToRegexpOptions: {"strict":true},
    name: "partners___es"
  }, {
    path: "/es/people/",
    component: _0009fd3e,
    pathToRegexpOptions: {"strict":true},
    name: "people___es"
  }, {
    path: "/es/person/",
    component: _3fd70f24,
    pathToRegexpOptions: {"strict":true},
    name: "person___es"
  }, {
    path: "/es/posts/",
    component: _05807358,
    pathToRegexpOptions: {"strict":true},
    name: "posts___es",
    children: [{
      path: ":id?/",
      component: _79666c02,
      pathToRegexpOptions: {"strict":true},
      name: "posts-id___es"
    }]
  }, {
    path: "/es/products/",
    component: _71361836,
    pathToRegexpOptions: {"strict":true},
    name: "products___es"
  }, {
    path: "/es/profile/",
    component: _3cbf7a2c,
    pathToRegexpOptions: {"strict":true},
    name: "profile___es"
  }, {
    path: "/es/resources/",
    component: _97f899b4,
    pathToRegexpOptions: {"strict":true},
    name: "resources___es"
  }, {
    path: "/es/resume/",
    component: _13a1e008,
    pathToRegexpOptions: {"strict":true},
    name: "resume___es"
  }, {
    path: "/es/sandbox/",
    component: _d1748df0,
    pathToRegexpOptions: {"strict":true},
    name: "sandbox___es"
  }, {
    path: "/es/scratch/",
    component: _3c1b5bbb,
    pathToRegexpOptions: {"strict":true},
    name: "scratch___es"
  }, {
    path: "/es/search-copy/",
    component: _1cec3e8a,
    pathToRegexpOptions: {"strict":true},
    name: "search-copy___es"
  }, {
    path: "/es/search/",
    component: _25eb1012,
    pathToRegexpOptions: {"strict":true},
    name: "search___es"
  }, {
    path: "/es/settings/",
    component: _2bef0732,
    pathToRegexpOptions: {"strict":true},
    name: "settings___es"
  }, {
    path: "/es/signin/",
    component: _3748161e,
    pathToRegexpOptions: {"strict":true},
    name: "signin___es"
  }, {
    path: "/es/sockets/",
    component: _1275d521,
    pathToRegexpOptions: {"strict":true},
    name: "sockets___es"
  }, {
    path: "/es/stay-informed/",
    component: _2fe19bbd,
    pathToRegexpOptions: {"strict":true},
    name: "stay-informed___es"
  }, {
    path: "/es/store/",
    component: _2ca9e73c,
    pathToRegexpOptions: {"strict":true},
    name: "store___es"
  }, {
    path: "/es/support/",
    component: _68b0b610,
    pathToRegexpOptions: {"strict":true},
    name: "support___es"
  }, {
    path: "/es/tailwind/",
    component: _6fb264e7,
    pathToRegexpOptions: {"strict":true},
    name: "tailwind___es"
  }, {
    path: "/es/tasks/",
    component: _deb51ee2,
    pathToRegexpOptions: {"strict":true},
    name: "tasks___es"
  }, {
    path: "/es/team/",
    component: _29d31828,
    pathToRegexpOptions: {"strict":true},
    name: "team___es"
  }, {
    path: "/es/teams/",
    component: _7b63aab7,
    pathToRegexpOptions: {"strict":true},
    name: "teams___es"
  }, {
    path: "/es/testing/",
    component: _5f3f405e,
    pathToRegexpOptions: {"strict":true},
    name: "testing___es"
  }, {
    path: "/es/thanks/",
    component: _4e6bded0,
    pathToRegexpOptions: {"strict":true},
    name: "thanks___es"
  }, {
    path: "/es/timeline/",
    component: _637fe050,
    pathToRegexpOptions: {"strict":true},
    name: "timeline___es"
  }, {
    path: "/es/todos/",
    component: _2c4bce6e,
    pathToRegexpOptions: {"strict":true},
    name: "todos___es"
  }, {
    path: "/es/tooltip/",
    component: _08fecc44,
    pathToRegexpOptions: {"strict":true},
    name: "tooltip___es"
  }, {
    path: "/es/training/",
    component: _4d092069,
    pathToRegexpOptions: {"strict":true},
    name: "training___es"
  }, {
    path: "/es/upload/",
    component: _08e64bd0,
    pathToRegexpOptions: {"strict":true},
    name: "upload___es"
  }, {
    path: "/es/watch-reactive/",
    component: _58981e06,
    pathToRegexpOptions: {"strict":true},
    name: "watch-reactive___es"
  }, {
    path: "/es/watch-ref/",
    component: _1e49a0d4,
    pathToRegexpOptions: {"strict":true},
    name: "watch-ref___es"
  }, {
    path: "/es/website/",
    component: _58c2d0dc,
    pathToRegexpOptions: {"strict":true},
    name: "website___es"
  }, {
    path: "/es/webworker/",
    component: _4937a653,
    pathToRegexpOptions: {"strict":true},
    name: "webworker___es"
  }, {
    path: "/es/welcome/",
    component: _52605fba,
    pathToRegexpOptions: {"strict":true},
    name: "welcome___es"
  }, {
    path: "/event/create/",
    component: _142a9ea0,
    pathToRegexpOptions: {"strict":true},
    name: "event-create___en"
  }, {
    path: "/event/details/",
    component: _180eac4e,
    pathToRegexpOptions: {"strict":true},
    name: "event-details___en"
  }, {
    path: "/event/edit/",
    component: _14cbf0a4,
    pathToRegexpOptions: {"strict":true},
    name: "event-edit___en"
  }, {
    path: "/event/register/",
    component: _319dedc7,
    pathToRegexpOptions: {"strict":true},
    name: "event-register___en"
  }, {
    path: "/welcomes/funrun/",
    component: _31dbc2eb,
    pathToRegexpOptions: {"strict":true},
    name: "welcomes-funrun___en"
  }, {
    path: "/es/admin/dashboard/",
    component: _27518e95,
    pathToRegexpOptions: {"strict":true},
    name: "admin-dashboard___es"
  }, {
    path: "/es/dashboards/admin/",
    component: _507918a4,
    pathToRegexpOptions: {"strict":true},
    name: "dashboards-admin___es"
  }, {
    path: "/es/dashboards/advocate/",
    component: _7e1e4c48,
    pathToRegexpOptions: {"strict":true},
    name: "dashboards-advocate___es"
  }, {
    path: "/es/dashboards/applicant/",
    component: _62bcfb3e,
    pathToRegexpOptions: {"strict":true},
    name: "dashboards-applicant___es"
  }, {
    path: "/es/dashboards/booster/",
    component: _4a03f4a2,
    pathToRegexpOptions: {"strict":true},
    name: "dashboards-booster___es"
  }, {
    path: "/es/dashboards/candidate/",
    component: _45165f3c,
    pathToRegexpOptions: {"strict":true},
    name: "dashboards-candidate___es"
  }, {
    path: "/es/dashboards/executive/",
    component: _57008c47,
    pathToRegexpOptions: {"strict":true},
    name: "dashboards-executive___es"
  }, {
    path: "/es/dashboards/staff/",
    component: _424c02bf,
    pathToRegexpOptions: {"strict":true},
    name: "dashboards-staff___es"
  }, {
    path: "/es/dashboards/super-admin/",
    component: _6e78d2c8,
    pathToRegexpOptions: {"strict":true},
    name: "dashboards-super-admin___es"
  }, {
    path: "/es/demos/resume/",
    component: _8414f18a,
    pathToRegexpOptions: {"strict":true},
    name: "demos-resume___es"
  }, {
    path: "/es/demos/top/",
    component: _6735aa37,
    pathToRegexpOptions: {"strict":true},
    name: "demos-top___es"
  }, {
    path: "/es/event/create/",
    component: _142a9ea0,
    pathToRegexpOptions: {"strict":true},
    name: "event-create___es"
  }, {
    path: "/es/event/details/",
    component: _180eac4e,
    pathToRegexpOptions: {"strict":true},
    name: "event-details___es"
  }, {
    path: "/es/event/edit/",
    component: _14cbf0a4,
    pathToRegexpOptions: {"strict":true},
    name: "event-edit___es"
  }, {
    path: "/es/event/register/",
    component: _319dedc7,
    pathToRegexpOptions: {"strict":true},
    name: "event-register___es"
  }, {
    path: "/es/welcomes/funrun/",
    component: _31dbc2eb,
    pathToRegexpOptions: {"strict":true},
    name: "welcomes-funrun___es"
  }, {
    path: "/es/demos/t/:tag?/",
    component: _0d856bb8,
    pathToRegexpOptions: {"strict":true},
    name: "demos-t-tag___es"
  }, {
    path: "/demos/t/:tag?/",
    component: _0d856bb8,
    pathToRegexpOptions: {"strict":true},
    name: "demos-t-tag___en"
  }, {
    path: "/es/articles/:slug/",
    component: _21affc87,
    pathToRegexpOptions: {"strict":true},
    name: "articles-slug___es"
  }, {
    path: "/es/demos/:username/",
    component: _048f2cda,
    pathToRegexpOptions: {"strict":true},
    name: "demos-username___es"
  }, {
    path: "/es/event/:id?/",
    component: _6f9109c6,
    pathToRegexpOptions: {"strict":true},
    name: "event-id___es"
  }, {
    path: "/es/guide/:slug-bak?/",
    component: _be807492,
    pathToRegexpOptions: {"strict":true},
    name: "guide-slug-bak___es"
  }, {
    path: "/es/guide/:slug?/",
    component: _f9938710,
    pathToRegexpOptions: {"strict":true},
    name: "guide-slug___es"
  }, {
    path: "/es/home/:id?/",
    component: _ab6807ce,
    pathToRegexpOptions: {"strict":true},
    name: "home-id___es"
  }, {
    path: "/es/partners/:slug/",
    component: _11939516,
    pathToRegexpOptions: {"strict":true},
    name: "partners-slug___es"
  }, {
    path: "/es/thread/:id?/",
    component: _277dcef8,
    pathToRegexpOptions: {"strict":true},
    name: "thread-id___es"
  }, {
    path: "/es/articles/:year/:month?/",
    component: _47978caa,
    pathToRegexpOptions: {"strict":true},
    name: "articles-year-month___es"
  }, {
    path: "/es/demos/:username/:article/",
    component: _e745db42,
    pathToRegexpOptions: {"strict":true},
    name: "demos-username-article___es"
  }, {
    path: "/es/partners/:year/:month?/",
    component: _c7c47308,
    pathToRegexpOptions: {"strict":true},
    name: "partners-year-month___es"
  }, {
    path: "/es/articles/:year/:month?/:slug/",
    component: _45e0eb62,
    pathToRegexpOptions: {"strict":true},
    name: "articles-year-month-slug___es"
  }, {
    path: "/es/partners/:year/:month?/:slug/",
    component: _cb31b598,
    pathToRegexpOptions: {"strict":true},
    name: "partners-year-month-slug___es"
  }, {
    path: "/articles/:slug/",
    component: _21affc87,
    pathToRegexpOptions: {"strict":true},
    name: "articles-slug___en"
  }, {
    path: "/demos/:username/",
    component: _048f2cda,
    pathToRegexpOptions: {"strict":true},
    name: "demos-username___en"
  }, {
    path: "/es/:slug/",
    component: _52f93a8b,
    pathToRegexpOptions: {"strict":true},
    name: "slug___es"
  }, {
    path: "/event/:id?/",
    component: _6f9109c6,
    pathToRegexpOptions: {"strict":true},
    name: "event-id___en"
  }, {
    path: "/guide/:slug-bak?/",
    component: _be807492,
    pathToRegexpOptions: {"strict":true},
    name: "guide-slug-bak___en"
  }, {
    path: "/guide/:slug?/",
    component: _f9938710,
    pathToRegexpOptions: {"strict":true},
    name: "guide-slug___en"
  }, {
    path: "/home/:id?/",
    component: _ab6807ce,
    pathToRegexpOptions: {"strict":true},
    name: "home-id___en"
  }, {
    path: "/partners/:slug/",
    component: _11939516,
    pathToRegexpOptions: {"strict":true},
    name: "partners-slug___en"
  }, {
    path: "/thread/:id?/",
    component: _277dcef8,
    pathToRegexpOptions: {"strict":true},
    name: "thread-id___en"
  }, {
    path: "/articles/:year/:month?/",
    component: _47978caa,
    pathToRegexpOptions: {"strict":true},
    name: "articles-year-month___en"
  }, {
    path: "/demos/:username/:article/",
    component: _e745db42,
    pathToRegexpOptions: {"strict":true},
    name: "demos-username-article___en"
  }, {
    path: "/partners/:year/:month?/",
    component: _c7c47308,
    pathToRegexpOptions: {"strict":true},
    name: "partners-year-month___en"
  }, {
    path: "/articles/:year/:month?/:slug/",
    component: _45e0eb62,
    pathToRegexpOptions: {"strict":true},
    name: "articles-year-month-slug___en"
  }, {
    path: "/partners/:year/:month?/:slug/",
    component: _cb31b598,
    pathToRegexpOptions: {"strict":true},
    name: "partners-year-month-slug___en"
  }, {
    path: "/",
    component: _54afdbd3,
    pathToRegexpOptions: {"strict":true},
    name: "index___en"
  }, {
    path: "/:slug/",
    component: _52f93a8b,
    pathToRegexpOptions: {"strict":true},
    name: "slug___en"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
