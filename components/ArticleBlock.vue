<template>
  <article>
    <template v-if="$fetchState.pending">
      <content-placeholders rounded>
        <content-placeholders-heading />
        <content-placeholders-img />
        <content-placeholders-text :lines="50" />
      </content-placeholders>
    </template>
    <template v-else-if="$fetchState.error">
      <inline-error-block :error="$fetchState.error" />
    </template>
    <template v-else>
      <header>
        <h1>{{ _article.title }}</h1>
        <div class="tags">
          <NuxtLink
            v-for="tag in _article.tags"
            :key="tag"
            :to="{name: 't-tag___en', params: {tag}}"
            class="tag"
          >
            #{{ tag }}
          </NuxtLink>
        </div>
        <div v-if="_article.cover_image" class="image-wrapper">
          <img :src="_article.cover_image" :alt="_article.title" />
        </div>
        <div class="meta">
          <div class="scl">
            <span>
              HeartIcon
              {{ _article.positive_reactions_count }}
            </span>
            <span class="comments" @click="scrollToComments">
              CommentsIcon
              {{ _article.comments_count }}
            </span>
          </div>
          <time>{{ _article.readable_publish_date }}</time>
        </div>
      </header>
      <!-- eslint-disable-next-line -->
      <div class="content" v-html="_article.body_html" />
    </template>
  </article>
</template>

<script>
import Article from '~/models/Article'

export default {
  props: [],
  async fetch() {
    const article = await Article.find(this.$route.params.article)

    if (article.id && article.user.username === this.$route.params.username) {
      this.article = article
      this.$store.commit('SET_CURRENT_ARTICLE', {...this.article})
    } else {
      // set status code on server
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404
      }
      throw new Error('Article not found')
    }
  },
  data() {
    return {
      article: {},
    }
  },
  computed: {
    _article() {
      return new Article(this.article)
    },
  },
  activated() {
    // Call fetch again if last fetch more than 60 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 60000) {
      this.$fetch()
    }
  },
  methods: {
    scrollToComments() {
      const el = document.querySelector('#comments')
      if (el) {
        const scrollTo = el.getBoundingClientRect().top
        window.scrollBy({top: scrollTo - 20, left: 0, behavior: 'smooth'})
      }
    },
  },
  head() {
    return {
      title: this._article.title,
    }
  },
}
</script>
