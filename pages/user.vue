<!-- @vue-ignore -->
<script>
export default {
  async asyncData({app}) {
    return {
      user: await app.$api.users.show(1),
    }
  },
  methods: {
    async loadTwo() {
      this.user = await this.$api.users.show(2)
    },
  },
}
</script>

<template>
  <div>
    <p>Loaded with <b>$api.users.show(1)</b> in SSR context</p>

    <p class="code">{{ user }}</p>

    <button @click="loadTwo">Load <b>$api.users.show(2)</b> from client</button>
  </div>
</template>
