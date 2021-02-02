<template>
  <Layout>
    <template #header>
      <Navbar class="text-gray-600 bg-white dark:bg-gray-900 dark:text-white" />
    </template>

    <main class="flex-1 overflow-hidden bg-gray-100">
      <div class="px-8 py-2 bg-red-800 text-red-50" v-if="$nuxt.isOffline">
        {{ $t('You are offline') }}
      </div>

      <!-- <aside
        class="fixed inset-0 z-30 w-full mt-16 bg-white lg:w-1/5 lg:block lg:relative lg:mt-0 dark:bg-gray-900 lg:bg-transparent"
        :class="{block: menu, hidden: !menu}"
      >
        <div
          class="h-full overflow-y-scroll lg:sticky lg:top-0 lg:pt-16 lg:-mt-16 lg:h-auto"
        >
          <ul class="p-4 lg:py-8 lg:pl-0 lg:pr-8">
            <li class="mb-4 lg:hidden">
              <SearchInput />
            </li>
            <li
              v-for="(docs, category) in categories"
              :key="category"
              class="mb-4"
            >
              <h3
                class="mb-2 text-sm font-bold tracking-wide text-gray-500 uppercase dark:text-gray-600 lg:text-xs"
              >
                {{ category }}
              </h3>
              <ul>
                <li
                  v-for="doc of docs"
                  :key="doc.slug"
                  class="text-gray-600 dark:text-gray-500"
                >
                  <NuxtLink
                    :to="toLink(doc.slug)"
                    class="block px-2 py-1 font-medium rounded hover:text-gray-800 dark-hover:text-gray-100"
                    exact-active-class="text-green-600 bg-green-100 hover:text-green-600 dark:text-white dark:bg-green-800 dark-hover:text-white"
                    >{{ doc.title }}</NuxtLink
                  >
                </li>
              </ul>
            </li>
            <li class="mb-4 lg:hidden">
              <h3
                class="mb-2 text-sm font-bold tracking-wide text-gray-500 uppercase dark:text-gray-600 lg:text-xs"
              >
                More
              </h3>
              <ul class="flex items-center ml-2">
                <li class="mr-4">
                  <a
                    href="https://twitter.com/nuxt_js"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Twitter"
                    name="Twitter"
                    class="hover:text-green-500"
                  >
                    <icon-twitter class="w-6 h-6" />
                  </a>
                </li>
                <li class="mr-4">
                  <a
                    href="https://github.com/nuxt/content"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Github"
                    name="Github"
                    class="hover:text-green-500"
                  >
                    <icon-github class="w-6 h-6" />
                  </a>
                </li>
                <li class="mr-4">
                  <LangSwitcher />
                </li>
                <li>
                  <ColorSwitcher />
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside> -->

      <Nuxt class="w-full h-full" keep-alive :key="$route.params.id" />

      <!-- <input type="text" ref="citySearch" @changed="changed" /> -->
    </main>

    <template #footer>
      <TheFooter />
      <DeveloperToolbar />
    </template>
    <PortalTarget name="modals" />
    <SvgSprite />
    <!-- <CookieConsent
      message="I use Cookies for user analysis and on-page improvements!"
      link-label="Privacy Policy"
      href="https://lichter.io/privacy/"
    /> -->
    <!-- <CookieConsent>
      <template slot="message">
        This website uses cookies
        <a class="btn btn-link" href="#">Read more</a>
      </template>
      <template slot="button">
        <button class="btn btn-info">Accept</button>
      </template>
    </CookieConsent> -->

    <client-only>
      <!-- <CookieLaw button-decline theme="mytheme"></CookieLaw> -->
      <CookieLaw class="flex-col" theme="mytheme">
        <div
          slot-scope="{accept, close}"
          class="w-full px-2 mx-auto sm:px-4 lg:px-6"
        >
          <div class="p-2 rounded-lg shadow-lg bg-primary-600 sm:p-3">
            <div class="flex flex-wrap items-center justify-between">
              <div class="flex items-center flex-1 w-0">
                <!-- <span class="flex p-2 rounded-lg bg-primary-800">
                  <svg
                    class="w-6 h-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                </span> -->
                <p class="ml-3 font-medium text-white truncate">
                  <span class="md:hidden">
                    This website uses cookies to improve user experience.<br />
                    By using our website you consent to all cookies in
                    accordance with our Cookie Policy.
                  </span>
                  <span class="hidden md:inline">
                    {{ $t('cookie_consent') }}
                  </span>
                </p>
              </div>

              <div
                class="flex-shrink-0 order-3 w-full mt-2 sm:order-2 sm:mt-0 sm:w-auto"
              >
                <button
                  class="flex items-center justify-center px-4 py-2 text-sm font-medium bg-white border border-transparent rounded-md shadow-sm text-primary-600 hover:bg-primary-50"
                  @click="accept"
                >
                  <span>{{ $t('i_agree') }}</span>
                </button>
              </div>

              <div class="flex-shrink-0 order-2 sm:order-3 sm:ml-2">
                <button
                  type="button"
                  @click="close"
                  class="flex p-2 -mr-1 rounded-md hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span class="sr-only">{{ $t('dismiss') }}</span>
                  <!-- Heroicon name: x -->
                  <svg
                    class="w-6 h-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </CookieLaw>
    </client-only>
  </Layout>
</template>

<script>
import {defineComponent} from '@nuxtjs/composition-api'
// import CookieConsent from 'vue-cookieconsent-component/src/components/CookieConsent.vue'
// import CookieLaw from 'vue-cookie-law'
// import CookieConsent from 'vue-cookieconsent-component'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    // CookieConsent,
    CookieLaw: () => (process.client ? import('vue-cookie-law') : null),
  },
  // head() {
  //   return {
  //     title: '',
  //     titleTemplate: chunk => {
  //       if (chunk) {
  //         return `${chunk} - Lab`
  //       }
  //       return 'Lab'
  //     },
  //     bodyAttrs: {
  //       // class: ['bg-gray-100 dark:bg-gray-800 antialiased'],
  //     },
  //   }
  // },

  computed: {
    bodyClass() {
      return this.$store.state.menu.open
        ? ['h-screen lg:h-auto overflow-y-hidden lg:overflow-y-auto']
        : []
    },
    menu: {
      get() {
        return this.$store.state.menu.open
      },
      set(val) {
        this.$store.commit('menu/toggle', val)
      },
    },
    categories() {
      return this.$store.state.categories[this.$i18n.locale]
    },
  },
  methods: {
    toLink(slug) {
      if (slug === 'index') {
        return this.localePath('slug')
      }
      return this.localePath({name: 'slug', params: {slug}})
    },
    changed(event) {
      const place = event.detail
      if (!place.geometry) return

      this.$router.push({
        name: 'search',
        query: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          label: this.$refs.citySearch.value,
        },
      })
    },
  },
  head() {
    const i18nSeo = this.$nuxtI18nSeo()
    const baseUrl = process.env.baseUrl
    const {path} = this.$route
    const pathWithSlash = path.endsWith('/') ? path : `${path}/`

    return {
      link: [{rel: 'canonical', href: `${baseUrl}${pathWithSlash}`}],
      bodyAttrs: {
        class: [
          ...this.bodyClass,
          'antialiased text-gray-800 leading-normal bg-white dark:bg-gray-900 dark:text-gray-100',
        ],
      },
      ...i18nSeo,
    }
  },
  mounted() {
    this.$maps.makeAutoComplete(this.$refs.citySearch)
  },
})
</script>

<style lang="postcss">
.Cookie.Cookie--mytheme {
  @apply fixed bottom-0 inset-x-0 pb-2 sm:pb-5 md:flex-col lg:flex-col;
}
.Cookie--mytheme .Cookie__button {
  background: green;
}
.Cookie--mytheme div.Cookie__button:hover {
  background: blue;
}
</style>
