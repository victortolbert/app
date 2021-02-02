<template>
  <main class="flex-1 p-8 prose dark:prose-dark">
    <NuxtLink to="/articles/">Articles</NuxtLink>

    <h2>{{ article.title }}</h2>

    <NuxtContent :document="article" />
  </main>
</template>

<script>
export default {
  async asyncData({$content, params, error}) {
    const {year, month, slug} = params

    let article

    try {
      article = await $content('articles', year, month, slug).fetch()
    } catch (e) {
      error({message: 'Article not found'})
    }

    return {
      article,
    }
  },
  head() {
    return {
      meta: [{name: 'description', content: this.article.description}],
    }
  },
}
</script>
