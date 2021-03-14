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
  <main>
    <color-mode />
    <o-button @click="$sounds.back.play">Boop! 🎺</o-button>
    <o-button @click="showToast">Show Toast</o-button>
    {{ affiliate }}
  </main>
</template>
