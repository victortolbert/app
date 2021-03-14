<script>
export default {
  name: 'BlogPostPreview',
  props: {
    published: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
  },
  computed: {
    formatPublishDate() {
      const dateFormat = new Date(this.published)
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }

      return dateFormat.toLocaleDateString('en-US', options)
    },
  },
}
</script>

<template>
  <section class="blog-post">
    <time class="blog-post__time">{{ formatPublishDate }}</time>
    <h2 class="blog-post__title">
      <a :href="path" class="blog-post__link">{{ title }}</a>
    </h2>
    <p v-if="excerpt" class="blog-post__excerpt">{{ excerpt }}</p>
    <nuxt-link class="button blog-post__button" :to="path">
      Read More &rarr;
    </nuxt-link>
  </section>
</template>
