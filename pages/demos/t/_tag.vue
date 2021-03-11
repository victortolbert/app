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

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default {
  nuxtI18n: false,
  async fetch() {
    const articles = await Article.params({
      tag: this.$route.params.tag,
      top: '365',
    })
      .page(this.currentPage)
      .get()

    if (!articles.length && this.currentPage === 1) {
      // set status code on server
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404
      }
      throw new Error(`Tag ${this.$route.params.tag} not found`)
    }

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
      title:
        this.$route.params.tag &&
        `${capitalize(this.$route.params.tag)} articles`,
    }
  },
}
</script>
