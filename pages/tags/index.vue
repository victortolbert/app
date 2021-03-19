<script>
export default {
  async asyncData({$content}) {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index
    }
    const articles = await $content('articles').only(['tags']).fetch()
    const tags = articles.flatMap(article => article.tags).filter(onlyUnique)
    return {
      tags,
    }
  },
  head() {
    return {
      title: 'Article Tags - Learning Laravel and VueJS',
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.baseUrl}/tags`,
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
        All Tags
      </h2>
    </div>
    <ul>
      <li v-for="tag in tags" :key="tag" class="mb-2 text-center">
        <NuxtLink
          :to="{name: 'tags-tag', params: {tag: tag.toLowerCase()}}"
          class="text-4xl hover:underline"
        >
          {{ tag }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
