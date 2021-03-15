<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  data() {
    return {
      mountains: [],
    }
  },
  watch: {
    // call fetch on query changes also
    '$route.query': '$fetch',
  },
  async fetch() {
    this.mountains = await fetch('https://api.nuxtjs.dev/mountains').then(res =>
      res.json(),
    )
  },
})
</script>

<template>
  <p v-if="$fetchState.pending">Fetching mountains...</p>
  <p v-else-if="$fetchState.error">An error occurred :(</p>
  <div v-else>
    <h1>Nuxt Mountains</h1>
    <ul>
      <li v-for="mountain of mountains">{{ mountain.title }}</li>
    </ul>
    <button @click="$fetch">Refresh</button>
  </div>
</template>
