<script>
export default {
  data() {
    return {
      people: []
    }
  },
  async fetch() {
    this.people = await this.$personRepository.index()
    // await fetch('https://api.nuxtjs.dev/mountains').then(res =>res.json())
  },
  computed: {
    slicedPeople() {
      return this.people.slice(0, 20)
    }
  }
}
</script>

<template>
  <PageWrapper>
    <SectionWrapper>
      <div v-if="slicedPeople.length">
        <BaseDirectory :people="slicedPeople" />
      </div>
      <!-- <DashboardCharts /> -->
    </SectionWrapper>
  </PageWrapper>
</template>
