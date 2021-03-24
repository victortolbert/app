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
    <PageHeading> {{ $t('training') }} </PageHeading>
  </article>
</template>
