<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { useDark, useToggle } from '@vueuse/core'

export default defineComponent({
  setup() {
    const isDark = useDark()
    const toggleDark = useToggle(isDark)
    return { isDark, toggleDark }
  },
  computed: {
    currentYear() {
      const today = new Date()
      return today.getFullYear()
    },
  },
})
</script>

<template>
  <footer class="flex items-center justify-between px-8 py-2">
    <span>© {{ currentYear }}</span>
    <button @click="toggleDark">Toggle Dark</button>
  </footer>
</template>
