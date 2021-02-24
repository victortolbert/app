<template>
  <main class="flex-1 p-8">
    <div class="flex flex-wrap-reverse flex-1 h-full mx-8">
      <div
        class="flex flex-col w-full max-w-prose"
        :class="{
          '': partner.toc && partner.toc.length,
          'lg:w-3/4': !partner.fullscreen,
        }"
      >
        <section
          class="flex-1 prose prose-dark max-w-none lg:px-8"
          :class="{'prose-dark dark': $colorMode.value === 'dark'}"
        >
          <h2>{{ partner.title }}</h2>

          <div v-for="author of authors" :key="author.slug">
            <img :src="author.avatarUrl" width="50" height="50" />
            {{ author.name }}
          </div>

          <NuxtContent :document="partner" />
        </section>
      </div>
      <SidebarToc v-if="partner.toc && partner.toc.length" :toc="partner.toc" />
    </div>

    <NuxtLink
      v-if="prev"
      :to="{name: 'partners-slug', params: {slug: prev.slug}}"
    >
      &lt; {{ prev.title }}
    </NuxtLink>
    <NuxtLink
      v-if="next"
      :to="{name: 'partners-slug', params: {slug: next.slug}}"
    >
      {{ next.title }} &gt;
    </NuxtLink>
    <NuxtLink to="/partners/">partners</NuxtLink>
  </main>
</template>

<script>
export default {
  async asyncData({$content, params, error}) {
    let partner

    try {
      partner = await $content('partners', params.slug).fetch()
      // OR const partner = await $content(`partners/${params.slug}`).fetch()
    } catch (e) {
      return error({message: 'partner not found'})
    }

    const authors = await $content('authors')
      .where({slug: {$in: partner.authors}})
      .fetch()

    const [prev, next] = await $content('partners')
      .only(['title', 'slug'])
      .sortBy('date', 'desc')
      .surround(params.slug)
      .fetch()

    return {
      partner,
      authors,
      prev,
      next,
    }
  },
  head() {
    return {
      title: this.partner.title,
      description: this.partner.description,
    }
  },
}
</script>
