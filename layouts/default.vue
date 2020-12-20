<template>
  <Layout>
    <template #header>
      <DeveloperToolbar />
      <Navbar class="text-gray-600 bg-white dark:bg-gray-900 dark:text-white" />
    </template>

    <main class="flex-1 overflow-hidden">
      <div class="px-8 py-2 bg-red-800 text-red-50" v-if="$nuxt.isOffline">
        {{ $t('You are offline') }}
      </div>

      <Nuxt keep-alive :key="$route.params.id" />
    </main>

    <template #footer>
      <Footer />
    </template>

    <PortalTarget name="modals" />
    <SvgSprite />
  </Layout>
</template>

<script>
export default {
  name: 'DefaultLayout',
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

  head() {
    const baseUrl = process.env.baseUrl
    const {path} = this.$route
    const pathWithSlash = path.endsWith('/') ? path : `${path}/`
    return {
      link: [{rel: 'canonical', href: `${baseUrl}${pathWithSlash}`}],
    }
  },
}
</script>
