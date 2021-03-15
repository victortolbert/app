<!-- @vue-ignore -->
<script>
export default {
  async asyncData({app}) {
    return {
      affiliate: await app.$affiliateRepository.show(45),
      volunteer: await app.$personRepository.show(1),
      // volunteers: await app.$personRepository.index(),
    }
  },
  methods: {
    showToast() {
      this.$toast.success('shown toast')
    },
  },
}
</script>

<template>
  <PageWrapper>
    <SectionWrapper>
      <!-- <ColorMode /> -->
        <!-- <pre>{{ volunteers }}</pre> -->
          <!-- <BaseDirectory :people="affiliates" /> -->
      <div>
        <OButton @click="$sounds.back.play">Boop! 🎺</OButton>
        <OButton @click="showToast">Show Toast</OButton>
      </div>

      <div>{{ affiliate }}</div>
    </SectionWrapper>
  </PageWrapper>
</template>
