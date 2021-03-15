<script>
/* eslint-disable vue/no-unused-components */
import GuideItem from '~/components/guide/Item'

export default {
  components: {
    GuideItem,
  },
  async asyncData({$content}) {
    const page = await $content('learn').fetch()

    return {page}
  },
}
</script>

<template>
  <main class="container mx-auto content">
    <nuxt-content :document="page"></nuxt-content>
  </main>
</template>
