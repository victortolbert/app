<template>
  <div class="absolute top-0 right-0 p-1 -mr-14">
    <button
      class="flex items-center justify-center w-12 h-12 rounded-full focus:outline-none focus:bg-gray-600"
      aria-label="Close sidebar"
      @click="closeMenu"
    >
      <svg
        class="w-6 h-6 text-white"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 24 24"
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
import {mapMutations} from 'vuex'

export default {
  methods: {
    ...mapMutations(['closeMenu']),
  },
}
</script>
