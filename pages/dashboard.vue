<script>
export default {
  async asyncData({$axios, app}) {
    return {
      // affiliate: await app.$affiliateRepository.show(45),
      // volunteer: await app.$personRepository.show(1),
      volunteers: await app.$volunteerRepository.index(),
      // resources: await $axios.$get('http://resources.ga-sps.org/resources/api')
    }
  },
}
</script>

<template>
  <PageWrapper>
    <SectionWrapper>
      <BaseDirectory :people="volunteers" />

      <!-- <DashboardCharts /> -->
      {{ resources }}
    </SectionWrapper>
  </PageWrapper>
</template>
