<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'plain',
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  head() {
    return {
      title: this.error.message || 'Error Page',
    }
  },
  mounted() {
    // this.$sentry.captureException(this.error)
  },
})
</script>

<template>
  <div v-if="error" class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="font-black text-9xl">{{ error.statusCode }}</h1>

    <div class="w-full max-w-sm mx-auto my-4 space-y-4" v-if="error.statusCode === 500">
      <p class="text-xl">
        Sorry, something went wrong on our end. We are currently trying to fix
        the problem.
      </p>

      <p>In the meantime, you can...</p>
    </div>

    <h2>{{ error.message }}</h2>

    <img class="mb-8" src="https://thecatapi.com/api/images/get?format=src&type=gif" />

    <div class="error-navigation">
      <a href="#" @click="$router.push(-1)">Back</a>
      <NuxtLink :to="localePath('/')">Main Page</NuxtLink>
    </div>
  </div>
</template>
