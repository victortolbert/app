<template>
  <main class="flex-1 p-8 prose dark:prose-dark">
    <NuxtLink to="/">Home</NuxtLink>

    <h2>partners</h2>

    <input id="search" v-model="q" placeholder="Search..." />

    <ul>
      <li v-for="partner in partners" :key="partner.slug">
        <NuxtLink :to="`${partner.path}/`">{{ partner.title }}</NuxtLink>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  async asyncData({$content, route}) {
    const q = route.query.q

    let query = $content('partners', {deep: true}).sortBy('date', 'desc')

    if (q) {
      query = query.search(q)
      // OR query = query.search('title', q)
    }

    const partners = await query.fetch()

    return {
      q,
      partners,
    }
  },
  watch: {
    q() {
      this.$router
        .replace({query: this.q ? {q: this.q} : undefined})
        .catch(() => {})
    },
  },
  watchQuery: true,
}
</script>
