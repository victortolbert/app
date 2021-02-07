<template>
  <div class="flex items-center text-gray-400">
    <OIcon icon="sun" :class="{'text-highlight-background': !darkMode}" />
    <OSwitch size="small" class="mx-1" v-model="darkMode" />
    <OIcon icon="moon" :class="{'text-highlight-background-dark': darkMode}" />
  </div>
</template>

<script>
export default {
  name: 'DarkModeSwitch',
  data() {
    return {
      darkMode: null,
    }
  },
  mounted() {
    this.darkMode =
      localStorage.theme === 'dark'
        ? true
        : localStorage.theme === 'light'
        ? false
        : window.matchMedia('(prefers-color-scheme: dark)').matches
  },
  watch: {
    darkMode(isDarkNow, wasDarkBefore) {
      if (wasDarkBefore !== null) {
        localStorage.theme = isDarkNow ? 'dark' : 'light'
      }
      setTimeout(() => {
        const html = document.querySelector('html')
        if (isDarkNow) {
          html.classList.add('dark')
        } else {
          html.classList.remove('dark')
        }
      }, 300)
    },
  },
}
</script>
