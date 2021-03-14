<!-- @vue-ignore -->
<script>
import Affiliate from '~/models/Affiliate'

export default {
  async fetch() {
    const affiliates = await Affiliate.page(this.currentPage).get()
    this.affiliates = this.affiliates.concat(affiliates)
  },
  data() {
    return {
      currentPage: 1,
      affiliates: [],
    }
  },
  computed: {
    _affiliates() {
      return this.affiliates.map(affiliate => new Affiliate(affiliate))
    },
  },
  methods: {
    lazyLoadAffiliates(isVisible) {
      if (isVisible) {
        if (this.currentPage < 5) {
          this.currentPage++
          this.$fetch()
        }
      }
    },
  },
  head() {
    return {
      title: 'New Nuxt.js affiliates',
    }
  },
}
</script>

<template>
  <div>
    <div v-if="affiliates.length">{{ affiliates }}</div>
    <div v-else>loading...</div>
  </div>
</template>
