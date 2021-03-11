<template>
  <Layout>
    <!-- <p class="p-1 bg-primary-500" /> -->
    <!-- <BaseHero logo="promise-serves" centered title="JavaScript and Markup" /> -->
    <!-- <AppHeader /> -->
    <!-- <AppNav /> -->
    <TheNavbar
      class="text-gray-600 bg-white dark:bg-gray-900 dark:text-white"
    />

    <div class="app-user-menu">
      <template v-if="isLoggedIn">
        <img :src="user.profileUrl" class="avatar" />
      </template>

      <div v-show="!isLoggedIn" id="googleButton" class="ml-8" />
    </div>

    <main class="flex-1 overflow-hidden bg-gray-100">
      <nuxt keep-alive :key="$route.params.id" />
    </main>

    <template #footer>
      <TheFooter />
    </template>
    <PortalTarget name="overlays" />
  </Layout>
</template>

<script>
// import 'prism-theme-vars/base.css'
import {mapGetters} from 'vuex'

export default {
  head() {
    const previewUrl = this.settings.url.replace(/\/$/, '') + '/preview.png'

    return {
      titleTemplate: chunk => {
        if (chunk) {
          return `${chunk} - ${this.settings.title}`
        }

        return this.settings.title
      },
      bodyAttrs: {
        class: [
          ...this.bodyClass,
          'antialiased text-gray-700 leading-normal bg-white dark:bg-gray-900 dark:text-gray-300',
        ],
      },
      meta: [].concat([
        // Open Graph
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: this.settings.title,
        },
        {hid: 'og:type', property: 'og:type', content: 'website'},
        {hid: 'og:url', property: 'og:url', content: this.settings.url},
        {hid: 'og:image', property: 'og:image', content: previewUrl},
        // Twitter Card
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: this.settings.twitter,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.settings.title,
        },
        {hid: 'twitter:image', name: 'twitter:image', content: previewUrl},
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: this.settings.title,
        },
      ]),
    }
  },
  mounted() {
    // this.$maps.makeAutoComplete(this.$refs.citySearch)
    console.log('auth', this.$store.state.auth)
  },
  computed: {
    ...mapGetters(['settings']),
    user() {
      return this.$store.state.auth.user
    },
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn
    },
    bodyClass() {
      return this.$store.state.menu.open
        ? ['h-screen lg:h-auto overflow-y-hidden lg:overflow-y-auto']
        : []
    },
  },
}
</script>
