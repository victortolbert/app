<template>
  <main class="flex-1 p-8 prose dark:prose-dark">
    <NuxtLink to="/partners/">partners</NuxtLink>

    <h2>{{ partner.title }}</h2>

    <NuxtContent :document="partner" />
  </main>
</template>

<script>
export default {
  async asyncData({$content, params, error}) {
    const {year, month, slug} = params

    let partner

    try {
      partner = await $content('partners', year, month, slug).fetch()
    } catch (e) {
      error({message: 'partner not found'})
    }

    return {
      partner,
    }
  },
  head() {
    return {
      meta: [{name: 'description', content: this.partner.description}],
    }
  },
}
</script>
