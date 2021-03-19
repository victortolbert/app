<template>
  <div>
    <div class="flex justify-center">
      <h2
        class="inline-block px-2 mx-auto mb-4 text-3xl text-center text-white uppercase bg-black"
      >
        Tag: {{ $route.params.tag }}
      </h2>
    </div>

    <ArticleList :articles="articlesByTag" />
  </div>
</template>

<script>
export default {
  async asyncData({$content, params}) {
    const articles = await $content('articles')
      .only(['title', 'description', 'image', 'slug', 'published', 'tags'])
      .sortBy('published', 'desc')
      .fetch()
    const articlesByTag = articles.filter(article => {
      const articleTags = article.tags.map(x => x.toLowerCase())
      return articleTags.includes(params.tag)
    })
    return {
      articlesByTag,
    }
  },
  methods: {
    captialise(text) {
      return text.charAt(0).toUpperCase() + text.slice(1)
    },
  },
  head() {
    return {
      title: `Articles Tagged - ${this.captialise(this.$route.params.tag)}`,
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.baseUrl}/tags/${this.$route.params.tag}`,
        },
      ],
    }
  },
}
</script>
