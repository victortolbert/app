<script>
export default {
  layout: 'blog',
  async asyncData({$content}) {
    const document = await $content('about').fetch()
    return {document}
  },
}
</script>

<template>
  <div class="content">
    <nuxt-content :document="document"></nuxt-content>
  </div>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/_settings';
.nuxt-content {
  h1 {
    @apply mt-5;
    @apply mb-3;
    @apply font-bold;
    font-family: $ff-sans;
    @apply text-4xl;
  }
  p {
    font-family: $ff-serif;
    @apply mb-3;
  }
}
</style>
