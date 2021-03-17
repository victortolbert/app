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
  <PageWrapper>
    <PageHeading>{{ $t('affiliates') }}</PageHeading>

    <SectionWrapper v-if="affiliates.length">
      <!-- <pre> {{affiliates}}</pre> -->
      <div class="overflow-hidden border-b border-gray-200">
        <div class="grid grid-cols-2 gap-8 md:grid-cols-3">
          <NuxtLink
            v-for="affiliate in affiliates"
            :key="affiliate.id"
            class="flex justify-center col-span-1 px-8 py-8 shadow bg-gray-50"
            :to="localePath(`/affiliates/${affiliate.id}/`)"
          >
            <img
              class="max-h-12"
              :src="`https://cominex.net/assets/img/affiliates/${affiliate.id}/logo_large.png`"
              :alt="affiliate.affiliate_name"
            />
          </NuxtLink>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper v-else> loading... </SectionWrapper>
  </PageWrapper>
</template>
