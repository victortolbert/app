<template>
  <Layout>
    <TheNavbar
      class="text-gray-600 bg-white dark:bg-gray-900 dark:text-white"
    />
    <BnbHeader />

    <main class="flex-1 overflow-hidden bg-gray-100">
      <Nuxt keep-alive :key="$route.params.id" />
    </main>

    <template #footer>
      <TheFooter />
    </template>
  </Layout>
</template>
