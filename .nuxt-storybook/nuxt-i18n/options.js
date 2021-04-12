

export const Constants = {
  COMPONENT_OPTIONS_KEY: "nuxtI18n",
  STRATEGIES: {"PREFIX":"prefix","PREFIX_EXCEPT_DEFAULT":"prefix_except_default","PREFIX_AND_DEFAULT":"prefix_and_default","NO_PREFIX":"no_prefix"},
}
export const nuxtOptions = {
  isUniversalMode: false,
  trailingSlash: undefined,
}
export const options = {
  vueI18n: {},
  vueI18nLoader: false,
  locales: [{"code":"es","file":"es.json","iso":"en-ES","name":"Español"},{"code":"en","file":"en.json","iso":"en-US","name":"English"}],
  defaultLocale: "en",
  defaultDirection: "ltr",
  routesNameSeparator: "___",
  defaultLocaleRouteNameSuffix: "default",
  strategy: "prefix_except_default",
  lazy: true,
  langDir: "/Users/victortolbert/Code/boosterthon/testing/locales",
  rootRedirect: null,
  detectBrowserLanguage: {"alwaysRedirect":false,"cookieCrossOrigin":false,"cookieDomain":null,"cookieKey":"i18n_redirected","cookieSecure":false,"fallbackLocale":"","onlyOnNoPrefix":false,"onlyOnRoot":false,"useCookie":true},
  differentDomains: false,
  seo: false,
  baseUrl: "",
  vuex: {"moduleName":"i18n","syncLocale":false,"syncMessages":false,"syncRouteParams":true},
  parsePages: false,
  pages: {},
  skipSettingLocaleOnNavigate: false,
  beforeLanguageSwitch: () => null,
  onLanguageSwitched: () => null,
  normalizedLocales: [{"code":"es","file":"es.json","iso":"en-ES","name":"Español"},{"code":"en","file":"en.json","iso":"en-US","name":"English"}],
  localeCodes: ["es","en"],
}

export const localeMessages = {
  'es.json': () => import('../../locales/es.json' /* webpackChunkName: "lang-es.json" */),
  'en.json': () => import('../../locales/en.json' /* webpackChunkName: "lang-en.json" */),
}
