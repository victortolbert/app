<template>
  <div class="username-articles-block">
    <template v-if="$fetchState.pending">
      <div class="article-cards-wrapper">
        <content-placeholders
          v-for="p in 30"
          :key="p"
          rounded
          class="article-card-block"
        >
          <content-placeholders-img />
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
    </template>
    <template v-else-if="$fetchState.error">
      <inline-error-block :error="$fetchState.error" />
    </template>
    <template v-else>
      <div class="article-cards-wrapper">
        <article-card-block
          v-for="article in _articles"
          :key="article.id"
          :article="article"
          class="article-card-block"
        />
      </div>
    </template>
  </div>
</template>

<script>
import Article from '@/models/Article'

export default {
  async fetch() {
    this.articles = await Article.params({
      username: this.$route.params.username,
    }).get()
  },
  data() {
    return {
      articles: [],
    }
  },
  computed: {
    _articles() {
      return this.articles.map(article => new Article(article))
    },
  },
}
</script>

<style lang="scss" scoped>
.username-articles-block {
  max-width: $screen-sm;
  margin: auto;
  padding: 1rem;
}
.article-cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  .article-card-block {
    width: calc(100% - 2 * 1rem);
    margin: 1rem;
  }
}
</style>
