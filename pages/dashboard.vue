<!-- @vue-ignore -->
<script>
import {defineComponent, ref} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {},
  async asyncData({app}) {
    return {
      affiliate: await app.$affiliateRepository.show(45),
      volunteer: await app.$personRepository.show(1),
    }
  },
  methods: {
    showToast() {
      this.$toast.success('shown toast')
    },
  },
})
</script>

<template>
  <PageWrapper>
    <SectionWrapper>
      <ColorMode />
      <div>
        <OButton @click="$sounds.back.play">Boop! 🎺</OButton>
        <OButton @click="showToast">Show Toast</OButton>
      </div>

      <div>{{ affiliate }}</div>
    </SectionWrapper>
  </PageWrapper>
</template>
