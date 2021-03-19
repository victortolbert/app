<script>
import getContent from '~/helpers/get-content'

export default {
  async asyncData({$content, app, params, error}) {
    const content = await getContent($content, params, error)
    return {
      allArticles: content.allArticles,
      paginatedArticles: content.paginatedArticles,
    }
  },
  head() {
    return {
      title: `Articles Page ${this.$route.params.page} - Learning Laravel and VueJS`,
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.baseUrl}/articles/page/${this.$route.params.page}`,
        },
      ],
    }
  },
}
</script>

<template>
  <div>
    <div class="flex justify-center">
      <h2
        class="inline-block px-2 mx-auto mb-4 text-3xl text-center text-white uppercase bg-black"
      >
        All Articles ({{ allArticles.length }})
      </h2>
    </div>

    <ArticleList :articles="paginatedArticles" :total="allArticles.length" />
  </div>
</template>
