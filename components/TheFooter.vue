<template>
  <footer
    class="w-full h-20 bg-white border-t dark:border-gray-800 dark:bg-gray-900"
  >
    <div class="flex items-center justify-between w-full h-full px-8 mx-auto">
      <div class="flex items-center">
        <span class="mr-2 text-sm leading-none">
          © {{ new Date().getFullYear() }}
        </span>
        <a
          href="https://vticonsulting.com"
          target="_blank"
          rel="noopener"
          class="flex items-center space-x-1"
        >
          <IconTolbertDesign class="h-4" />
          <span class="text-sm">VTi Consulting (Victor Tolbert)</span>
          <!-- <IconPromiseServes class="h-4" /> -->
        </a>
      </div>
      <div class="flex">
        <LangSwitcher class="p-2" />
        <ColorSwitcher class="p-2 pr-0" />
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
  },
}
</script>
