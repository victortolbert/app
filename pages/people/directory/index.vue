<script>
export default {
  data() {
    return {
      activeTab: '0',
      showBooks: false,
      multiline: false,
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
  <div>
    <NuxtChild />
  </div>
</template>

<style>
.custom-icon {
  margin-right: 5px;
}
</style>
