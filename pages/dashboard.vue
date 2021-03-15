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
  <article>
    <section>
      <ColorMode />
    </section>

    <section>
      <OButton @click="$sounds.back.play">Boop! 🎺</OButton>
      <OButton @click="showToast">Show Toast</OButton>
    </section>

    <section>{{ affiliate }}</section>
  </article>
</template>
