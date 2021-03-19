<script>
import global from '~/helpers/global'

export default {
  computed: {
    siteName() {
      return global.siteName
    },
  },
}
</script>

<template>
  <footer class="text-white bg-black">
    <div class="container p-4 mx-auto text-center">
      <small>&copy; {{ new Date().getFullYear() }} {{ siteName }}</small>
    </div>
  </footer>
</template>
