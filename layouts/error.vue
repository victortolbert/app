<template>
  <div
    v-if="error"
    class="flex flex-col items-center justify-center min-h-screen"
  >
    <h1>{{ error.statusCode }}</h1>
    <h2>{{ error.message }}</h2>

    <img
      class="mb-8"
      src="https://thecatapi.com/api/images/get?format=src&type=gif"
    />

    <div class="error-navigation">
      <a href="#" @click="$router.push(-1)"> Back </a>
      <nuxt-link to="/"> Main Page </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'plain',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  head() {
    return {
      title: '404 - Not found',
    }
  },
  // head() {
  //   return {
  //     title: this.error.message || 'Error Page',
  //   }
  // },
}
</script>
