<template>
  <main class="flex-1">
    <BasePageHeading>
      {{ $t('search') }}
    </BasePageHeading>

    <section class="p-8">
      <div>
        {{ lat }} / {{ lng }} / {{ label }}<br />
        <div v-for="home in homes" :key="home.objectID">
          {{ home.title }}<br />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  // watchQuery: ['lat'],
  async beforeRouteUpdate(to, from, next) {
    const data = await this.$dataApi.getHomesByLocation(
      to.query.lat,
      to.query.lng,
    )
    this.homes = data.json.hits
    this.label = to.query.label
    this.lat = to.query.lat
    this.lng = to.query.lng
    next()
  },

  async asyncData({query, $dataApi}) {
    const data = await $dataApi.getHomesByLocation(query.lat, query.lng)
    return {
      homes: data.json.hits,
      label: query.label,
      lat: query.lat,
      lng: query.lng,
    }
  },
}
</script>
