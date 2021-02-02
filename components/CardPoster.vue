<template>
  <div class="w-64 h-40 overflow-hidden img-contain">
    <div
      class="absolute z-10 block w-64 h-40 m-1 overflow-hidden transition-opacity duration-300 ease-in transform opacity-0 overlay"
    >
      <p class="mt-10 overlay-text">I don't like this one</p>
      <button
        @click="toggleShow"
        class="px-4 py-1 my-3 text-white bg-red-700 rounded"
      >
        Replace!
      </button>
    </div>

    <transition name="flip" mode="out-in">
      <img
        class="w-full m-1 origin-center transform scale-100 cursor-pointer"
        v-if="!isShowing"
        src="https://images.unsplash.com/photo-1521911528923-9c3838123490?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
        alt=""
      />
      <img
        class="w-full m-1 origin-center transform scale-100 cursor-pointer"
        v-else
        src="https://images.unsplash.com/flagged/photo-1563248101-a975e9a18cc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
        alt=""
      />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowing: false,
    }
  },
  methods: {
    toggleShow() {
      this.isShowing = !this.isShowing
    },
  },
}
</script>

<style>
.img-contain:hover .overlay {
  opacity: 1;
  background: hsla(50, 0%, 0%, 0.6);
  transition: 0.3s opacity ease-out;
}

.flip-enter-active {
  transition: all 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53); /*ease-in-quad */
}

.flip-leave-active {
  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94); /*ease-out-quad */
}

.flip-enter,
.flip-leave-to {
  transform: scaleY(0) translateZ(0);
  opacity: 0;
}
</style>
