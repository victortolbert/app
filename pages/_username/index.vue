<template>
  <div class="page-wrapper">
    <UsernameBlock />
    <UsernameArticlesBlock />
  </div>
</template>

<script>
export default {
  nuxtI18n: false,
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  max-width: $screen-xl;
  margin: auto;
  padding: 1rem;
}
</style>
