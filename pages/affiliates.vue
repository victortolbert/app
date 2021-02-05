<template>
  <main class="flex-1">
    <BasePageHeading> {{ $t('affiliates') }}</BasePageHeading>
    <section
      class="flex flex-col items-center justify-center flex-1 w-full min-h-screen p-8"
    >
      <AffiliatesTable class="w-full" :affiliates="affiliates" />
    </section>
  </main>
</template>

<script>
import affiliates from '@/__mocks__/livethepromise/ltp_affiliates'

export default {
  // async asyncData({$content, $axios}) {
  //   const affiliates = await $axios.$get('affiliates')
  //   return {
  //     affiliates,
  //   }
  // },
  data() {
    return {
      affiliates,
    }
  },
}
</script>
