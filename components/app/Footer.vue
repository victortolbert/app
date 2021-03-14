<script>
export default {
  computed: {
    currentYear() {
      const today = new Date()
      return today.getFullYear()
    },
  },
}
</script>

<template>
  <footer class="footer">
    <SocialMediaBar />
    <p>© Victor Tolbert {{ currentYear }}</p>
  </footer>
</template>
