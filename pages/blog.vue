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
}
</script>

<template>
  <ArticleList :articles="paginatedArticles" :total="allArticles.length" />
</template>
