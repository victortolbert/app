<template>
  <main class="flex-1">
    <p>{{ $t('register_for_the_event') }}</p>
    <button @click="register">{{ $t('register_me') }}</button>
  </main>
</template>

<script>
export default {
  props: ['event'],
  methods: {
    register() {
      // Call to API
      // If registered then redirect to event details

      this.$router.push({
        name: 'event',
      })
    },
  },
}
</script>
