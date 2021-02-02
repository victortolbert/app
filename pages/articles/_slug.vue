<template>
  <main class="flex-1 p-8">
    <div class="flex flex-wrap-reverse flex-1 h-full mx-8">
      <div
        class="flex flex-col w-full max-w-prose"
        :class="{
          '': article.toc && article.toc.length,
          'lg:w-3/4': !article.fullscreen,
        }"
      >
        <article
          class="flex-1 prose prose-dark max-w-none lg:px-8"
          :class="{'prose-dark dark': $colorMode.value === 'dark'}"
        >
          <h2>{{ article.title }}</h2>

          <div v-for="author of authors" :key="author.slug">
            <img :src="author.avatarUrl" width="50" height="50" />
            {{ author.name }}
          </div>

          <NuxtContent :document="article" />
        </article>
      </div>
      <SidebarToc v-if="article.toc && article.toc.length" :toc="article.toc" />
    </div>

    <NuxtLink
      v-if="prev"
      :to="{name: 'articles-slug', params: {slug: prev.slug}}"
    >
      &lt; {{ prev.title }}
    </NuxtLink>
    <NuxtLink
      v-if="next"
      :to="{name: 'articles-slug', params: {slug: next.slug}}"
    >
      {{ next.title }} &gt;
    </NuxtLink>
    <NuxtLink to="/articles/">Articles</NuxtLink>
  </main>
</template>

<script>
export default {
  async asyncData({$content, params, error}) {
    let article

    try {
      article = await $content('articles', params.slug).fetch()
      // OR const article = await $content(`articles/${params.slug}`).fetch()
    } catch (e) {
      return error({message: 'Article not found'})
    }

    const authors = await $content('authors')
      .where({slug: {$in: article.authors}})
      .fetch()

    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('date', 'desc')
      .surround(params.slug)
      .fetch()

    return {
      article,
      authors,
      prev,
      next,
    }
  },
  head() {
    return {
      title: this.article.title,
      description: this.article.description,
    }
  },
}
</script>
