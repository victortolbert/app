<template>
  <div class="pt-16">
    <!-- <p class="p-1 bg-primary-500" /> -->
    <!-- <BaseHero logo="promise-serves" centered title="JavaScript and Markup" /> -->
    <!-- <AppHeader /> -->
    <main class="container px-4 mx-auto lg:px-8">
      <div class="relative flex flex-wrap">
        <AppNav />

        <Nuxt class="w-full lg:w-4/5" />
      </div>
    </main>

    <AppFooter />
  </div>
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
  computed: {
    ...mapGetters(['settings']),
    bodyClass() {
      return this.$store.state.menu.open
        ? ['h-screen lg:h-auto overflow-y-hidden lg:overflow-y-auto']
        : []
    },
  },
}
</script>
