<template>
  <button
    @click="openMenu"
    class="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:bg-gray-100 focus:text-gray-600 lg:hidden"
    aria-label="Open sidebar"
  >
    <svg
      class="w-6 h-6"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M4 6h16M4 12h8m-8 6h16" />
    </svg>
  </button>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  methods: {
    ...mapMutations(['openMenu']),
  },
}
</script>
