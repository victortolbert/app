<template>
  <main class="flex-1 p-8 prose dark:prose-dark">
    <NuxtLink to="/articles/">Articles</NuxtLink>

    <h2>{{ year }}/{{ month }}</h2>

    <ul>
      <li v-for="article in articles" :key="article.slug">
        <NuxtLink :to="`${article.path}/`">{{ article.title }}</NuxtLink>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  async asyncData({$content, route, params}) {
    const {year, month} = params

    const articles = await $content('articles', year, month)
      .sortBy('date', 'desc')
      .fetch()

    return {
      articles,
      year,
      month,
    }
  },
  watchQuery: true,
}
</script>
