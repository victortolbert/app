<script>
export default {
  async asyncData({$content}) {
    const page = await $content('media-log').fetch()

    return {page}
  },
}
</script>

<template>
  <article>
    <NuxtContent :document="page" />
  </article>
</template>
