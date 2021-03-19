<script>
import global from '~/helpers/global'
import getSiteMeta from '~/helpers/get-site-meta'

export default {
  async asyncData({$content, params}) {
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles')
      .only(['title', 'slug', 'published'])
      .sortBy('published', 'desc')
      .surround(params.slug)
      .fetch()

    return {
      article,
      prev,
      next,
    }
  },
  computed: {
    meta() {
      const metaData = {
        type: 'article',
        title: this.article.title,
        description: this.article.description,
        url: `${this.$config.baseUrl}/articles/${this.$route.params.slug}`,
        mainImage: this.article.image,
      }
      return getSiteMeta(metaData)
    },
  },
  head() {
    return {
      title: this.article.title,
      meta: [
        ...this.meta,
        {
          property: 'article:published_time',
          content: this.article.createdAt,
        },
        {
          property: 'article:modified_time',
          content: this.article.updatedAt,
        },
        {
          property: 'article:tag',
          content: this.article.tags ? this.article.tags.toString() : '',
        },
        {name: 'twitter:label1', content: 'Written by'},
        {name: 'twitter:data1', content: global.author || ''},
        {name: 'twitter:label2', content: 'Filed under'},
        {
          name: 'twitter:data2',
          content: this.article.tags ? this.article.tags.toString() : '',
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.baseUrl}/articles/${this.$route.params.slug}`,
        },
      ],
    }
  },
}
</script>

<template>
  <article>
    <header class="mx-auto text-xs text-white">
      <div class="p-5 bg-indigo-500 md:inline-block">
        <p>
          <span class="uppercase">Published:</span>
          <span>{{ article.published }}</span>
        </p>
        <div class="flex">
          <span class="mr-1 uppercase">Filed under:</span>
          <ul class="flex">
            <li v-for="tag in article.tags" :key="tag" class="mr-2">
              <NuxtLink
                :to="{name: 'tags-tag', params: {tag: tag.toLowerCase()}}"
                class="hover:underline"
              >
                {{ tag }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </header>

    <div class="p-5 mx-auto prose prose-lg text-gray-500 bg-white rounded">
      <NuxtContent :document="article" />
    </div>

    <footer class="py-5 mt-5">
      <ArticlePrevNextLinks :prev="prev" :next="next" />
    </footer>
  </article>
</template>
