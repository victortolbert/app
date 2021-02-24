<template>
  <div class="p-4">
    <h1 class="text-5xl">About page</h1>
    <p>
      <n-link to="/" class="text-blue-500 underline">Home page</n-link>
    </p>

    <h3 class="mt-2 text-3xl">Tailwind config:</h3>

    <pre class="p-3 bg-gray-200 rounded dark:bg-gray-700">
      {{ JSON.stringify(tailwindConfig, null, 2) }}
    </pre>
  </div>
</template>

<script>
import tailwindConfig from '~tailwind.config'

export default {
  data() {
    return {
      tailwindConfig,
    }
  },
}
</script>
