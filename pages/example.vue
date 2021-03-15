<script>
export default {
  asyncData() {
    return {content: 'Created at: ' + new Date()}
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
  methods: {
    refresh() {
      this.$nuxt.refresh()
    },
  },
}
</script>

<template>
  <div>
    <div>{{ content }}</div>
    <button @click="refresh">Refresh</button>
  </div>
</template>
