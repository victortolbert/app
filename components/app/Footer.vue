<script>
// import { useI18n } from 'vue-i18n'
// import { isDark, toggleDark } from '~/logics'
// const { t, availableLocales, locale } = useI18n()
export default {
  setup() {
    const toggleLocales = () => {
      // change to some real logic
      // const locales = availableLocales
      // locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
    }
    return {
      toggleLocales,
    }
  },
  computed: {
    currentYear() {
      const today = new Date()
      return today.getFullYear()
    },
  },
}
</script>

<template>
  <footer class="flex items-center justify-between px-8 py-2 bg-gray-50">
    <span>© {{ currentYear }}</span>
    <AppLanguageSwitcher />
  </footer>
</template>
