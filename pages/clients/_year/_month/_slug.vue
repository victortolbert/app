<template>
  <main class="flex-1 p-8 prose dark:prose-dark">
    <NuxtLink to="/clients/">Clients</NuxtLink>

    <h2>{{ client.title }}</h2>

    <NuxtContent :document="client" />
  </main>
</template>

<script>
export default {
  async asyncData({$content, params, error}) {
    const {year, month, slug} = params

    let client

    try {
      client = await $content('clients', year, month, slug).fetch()
    } catch (e) {
      error({message: 'client not found'})
    }

    return {
      client,
    }
  },
  head() {
    return {
      meta: [{name: 'description', content: this.client.description}],
    }
  },
}
</script>
