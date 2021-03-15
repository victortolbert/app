<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  // async asyncData({params, $axios}) {
  //   const volunteer = await $axios.$get(
  //     `https://api.victortolbert.com/people/${params.id}`,
  //   )
  //   return {volunteer}
  // },

  async asyncData(context) {
    const id = context.params.id
    const i18n = context.app.$i18n
    const query = context.query
    const config = context.$config

    console.log({id, i18n, query, config})

    // Server-side
    if (process.server) {
      const {req, res, beforeNuxtRender} = context
    }
    // Client-side
    if (process.client) {
      const {from, nuxtState} = context
    }

    try {
      // Using the nuxtjs/http module here exposed via context.app
      const volunteer = await context.app.$http.$get(
        `https://api.nuxtjs.dev/volunteers/${id}`,
      )
      return {volunteer}
    } catch (e) {
      context.error(e) // Show the nuxt error page with the thrown error
    }
  },
})
</script>
<template>
  <div>
    <h1>{{ volunteer.firstName }}</h1>
    <p>{{ volunteer.lastName }}</p>
  </div>
</template>
