<template>
  <Layout>
    <div class="overflow-hidden">
      <div class="px-8 py-2 text-gray-900 bg-gray-300" v-if="$nuxt.isOffline">
        {{ $t('You are offline') }}
      </div>
      <Nuxt keep-alive :key="$route.params.id" />
    </div>

    <template #header>
      <Navbar class="text-gray-600 bg-white dark:bg-gray-900 dark:text-white" />
    </template>

    <template #footer>
      <!-- <DebugFooter /> -->
    </template>

    <PortalTarget name="modals" />
    <SvgSprite />
  </Layout>
</template>

<script>
export default {
  name: 'DefaultLayout',
  head() {
    return {
      title: '',
      titleTemplate: chunk => {
        if (chunk) {
          return `${chunk} - Lab`
        }
        return 'Lab'
      },
      bodyAttrs: {
        // class: ['bg-gray-100 dark:bg-gray-800 antialiased'],
      },
    }
  },
}
</script>

<style>
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}
</style>
