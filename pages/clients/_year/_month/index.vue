<template>
  <main class="flex-1 p-8 prose dark:prose-dark">
    <NuxtLink to="/clients/">clients</NuxtLink>

    <h2>{{ year }}/{{ month }}</h2>

    <ul>
      <li v-for="client in clients" :key="client.slug">
        <NuxtLink :to="client.path">{{ client.title }}</NuxtLink>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  async asyncData({$content, route, params}) {
    const {year, month} = params

    const clients = await $content('clients', year, month)
      .sortBy('date', 'desc')
      .fetch()

    return {
      clients,
      year,
      month,
    }
  },
  watchQuery: true,
}
</script>
