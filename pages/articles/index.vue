<template>
  <main class="flex-1 p-8 prose dark:prose-dark">
    <NuxtLink to="/">Home</NuxtLink>

    <h2>Articles</h2>

    <input id="search" v-model="q" autocomplete="off" placeholder="Search..." />

    <ul>
      <li v-for="article in articles" :key="article.slug">
        <NuxtLink :to="`${article.path}/`">{{ article.title }}</NuxtLink>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  async asyncData({$content, route}) {
    const q = route.query.q

    let query = $content('articles', {deep: true}).sortBy('date', 'desc')

    if (q) {
      query = query.search(q)
      // OR query = query.search('title', q)
    }

    const articles = await query.fetch()

    return {
      q,
      articles,
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
