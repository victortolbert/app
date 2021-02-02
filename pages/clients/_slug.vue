<template>
  <main class="flex-1 p-8">
    <div class="flex flex-wrap-reverse flex-1 h-full mx-8">
      <div
        class="flex flex-col w-full max-w-prose"
        :class="{
          '': client.toc && client.toc.length,
          'lg:w-3/4': !client.fullscreen,
        }"
      >
        <section
          class="flex-1 prose prose-dark max-w-none lg:px-8"
          :class="{'prose-dark dark': $colorMode.value === 'dark'}"
        >
          <h2>{{ client.title }}</h2>

          <div v-for="author of authors" :key="author.slug">
            <img :src="author.avatarUrl" width="50" height="50" />
            {{ author.name }}
          </div>

          <NuxtContent :document="client" />
        </section>
      </div>
      <SidebarToc v-if="client.toc && client.toc.length" :toc="client.toc" />
    </div>

    <NuxtLink
      v-if="prev"
      :to="{name: 'clients-slug', params: {slug: prev.slug}}"
    >
      &lt; {{ prev.title }}
    </NuxtLink>
    <NuxtLink
      v-if="next"
      :to="{name: 'clients-slug', params: {slug: next.slug}}"
    >
      {{ next.title }} &gt;
    </NuxtLink>
    <NuxtLink to="/clients/">clients</NuxtLink>
  </main>
</template>

<script>
export default {
  async asyncData({$content, params, error}) {
    let client

    try {
      client = await $content('clients', params.slug).fetch()
      // OR const client = await $content(`clients/${params.slug}`).fetch()
    } catch (e) {
      return error({message: 'client not found'})
    }

    const authors = await $content('authors')
      .where({slug: {$in: client.authors}})
      .fetch()

    const [prev, next] = await $content('clients')
      .only(['title', 'slug'])
      .sortBy('date', 'desc')
      .surround(params.slug)
      .fetch()

    return {
      client,
      authors,
      prev,
      next,
    }
  },
  head() {
    return {
      title: this.client.title,
      description: this.client.description,
    }
  },
}
</script>
