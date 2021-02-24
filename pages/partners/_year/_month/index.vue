<template>
  <main class="flex-1 p-8 prose dark:prose-dark">
    <NuxtLink to="/partners/">partners</NuxtLink>

    <h2>{{ year }}/{{ month }}</h2>

    <ul>
      <li v-for="partner in partners" :key="partner.slug">
        <NuxtLink :to="partner.path">{{ partner.title }}</NuxtLink>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  async asyncData({$content, route, params}) {
    const {year, month} = params

    const partners = await $content('partners', year, month)
      .sortBy('date', 'desc')
      .fetch()

    return {
      partners,
      year,
      month,
    }
  },
  watchQuery: true,
}
</script>
