<script>
export default {
  methods: {
    handleSubmit() {
      this.$toast('handling submit...')
    },
  },
}
</script>
<template>
  <form class="flex items-center space-x-4" @submit.prevent="handleSubmit">
    <FormLabel>
      <input
        class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        type="text"
        placeholder="First name"
      />
    </FormLabel>
    <FormLabel>
      <input
        class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        type="text"
        placeholder="Email Address"
      />
    </FormLabel>
    <button type="submit">{{ $t('signup') }}</button>
  </form>
</template>
