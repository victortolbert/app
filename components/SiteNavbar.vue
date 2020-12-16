<template>
  <nav
    class="w-full py-4 transition-all duration-300 border-b border-gray-300 dark:border-gray-700"
  >
    <div class="flex items-center justify-between px-4 mx-auto">
      <div class="items-center lg:space-x-2 lg:flex">
        <button
          class="flex items-center space-x-2 font-mono font-semibold tracking-wider text-gray-800 dark:text-white"
        >
          <SiteLogo class="w-8 h-8" />
          <span> &lt;{{ $t('app.title') }}/> </span>
        </button>

        <div class="w-full max-w-xs pl-4"></div>
      </div>

      <div class="flex items-center space-x-2">
        <ColorModeToggle />
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TolbertDesignNavbar',
  data: () => ({}),
  methods: {
    toggle() {
      this.$colorMode.preference =
        this.$colorMode.value === 'light' ? 'dark' : 'light'
    },
    toggleNavbar(collapseID) {
      this.$refs[collapseID].classList.toggle('hidden')
      this.$refs[collapseID].classList.toggle('block')
    },
  },
}
</script>
