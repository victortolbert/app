<script>
export default {
  data() {
    return {
      activeTab: '0',
      count: 1,
    }
  },
  mounted() {
    setTimeout(() => {
      this.count++
    }, 3 * 1000)
  },
}
</script>

<template>
  <article class="flex-1">
    <PageWrapper>
      <PageHeading> {{ $t('training') }} </PageHeading>

      <PageBreadcrumb class="mt-2" />

      <NuxtChild />
    </PageWrapper>
  </article>
</template>
