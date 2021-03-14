<script>
export default {
  async asyncData({$content, params}) {
    const page = await $content(`blog/${params.slug}`).fetch()
    return {
      page,
    }
  },
  computed: {
    formatPublishDate() {
      const dateFormat = new Date(this.page.date)
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
  <main>
    <article class="content">
      <p class="blog-publish-date">{{ formatPublishDate }}</p>
      <h1 class="blog-title">{{ page.title }}</h1>
      <nuxt-content :document="page" />
    </article>
  </main>
</template>
