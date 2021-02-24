<template>
  <div class="page-wrapper">
    <template v-if="$fetchState.pending && !_articles.length">
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
      <InlineErrorBlock :error="$fetchState.error" />
    </template>

    <template v-else>
      <div class="article-cards-wrapper">
        <ArticleCardBlock
          v-for="(article, i) in _articles"
          :key="article.id"
          v-observe-visibility="
            i === _articles.length - 1 ? lazyLoadArticles : false
          "
          :article="article"
          class="article-card-block"
        />
      </div>
    </template>

    <template v-if="$fetchState.pending && _articles.length">
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
  </div>
</template>

<script>
import Article from '@/models/Article'

export default {
  nuxtI18n: false,
  async fetch() {
    const articles = await Article.params({
      tag: 'nuxt',
      state: 'rising',
    })
      .page(this.currentPage)
      .get()
    this.articles = this.articles.concat(articles)
  },
  data() {
    return {
      currentPage: 1,
      articles: [],
    }
  },
  computed: {
    _articles() {
      return this.articles.map(article => new Article(article))
    },
  },
  methods: {
    lazyLoadArticles(isVisible) {
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
      title: 'New Nuxt.js articles',
    }
  },
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  max-width: $screen-xl;
  margin: auto;
  padding: 1rem;
  min-height: 100vh;
}

.article-cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  .article-card-block {
    width: calc(100% - 2 * 1rem);
    margin: 1rem;
    margin-bottom: 1.5rem;
    margin-top: 0.5rem;
    @media (min-width: $screen-sm) {
      width: calc(50% - 2 * 1rem);
    }
    @media (min-width: $screen-lg) {
      width: calc(33.33333% - 2 * 1rem);
    }
  }
}
</style>
