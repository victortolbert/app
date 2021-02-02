<template>
  <!-- Mobile_menu_button -->
  <div class="flex mr-2 -ml-2 baseline md:hidden">
    <button
      @click="open = !open"
      class="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
      :aria-expanded="open"
    >
      <span class="sr-only">
        {{ $t('open_main_menu') }}
      </span>

      <!-- Icon when menu is closed. -->
      <svg
        x-state:on="Menu open"
        x-state:off="Menu closed"
        :class="{hidden: open, block: !open}"
        class="block w-6 h-6"
        x-description="Heroicon name: menu"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>

      <!-- Icon when menu is open. -->
      <svg
        x-state:on="Menu open"
        x-state:off="Menu closed"
        :class="{hidden: !open, block: open}"
        class="hidden w-6 h-6"
        x-description="Heroicon name: x"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {}
</script>

<style scoped></style>
