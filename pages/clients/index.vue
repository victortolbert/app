<!-- @vue-ignore -->
<script>
import Client from '~/models/Client'

export default {
  async fetch() {
    const clients = await Client.page(this.currentPage).get()
    this.clients = this.clients.concat(clients)
  },
  data() {
    return {
      currentPage: 1,
      clients: [],
    }
  },
  computed: {
    _clients() {
      return this.clients.map(client => new Client(client))
    },
  },
  methods: {
    lazyLoadClients(isVisible) {
      if (isVisible) {
        if (this.currentPage < 5) {
          this.currentPage++
          this.$fetch()
        }
      }
    },
  },
  head() {
    return {
      title: 'New Nuxt.js clients',
    }
  },
}
</script>

<template>
  <div>
    <div v-if="clients.length">{{ clients }}</div>
    <div v-else>loading...</div>
  </div>
</template>
