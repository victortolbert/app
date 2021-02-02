<script>
export default {
  async asyncData({$content, $axios}) {
    const affiliates = await $axios.$get('affiliates')
    return {
      affiliates,
    }
  },
}
</script>

<template>
  <section
    class="flex flex-col items-center justify-center flex-1 w-full min-h-screen p-8"
  >
    <AffiliatesTable class="w-full" :affiliates="affiliates" />
  </section>
</template>
