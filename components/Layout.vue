<template>
  <div class="flex flex-col w-full min-h-screen">
    <header v-if="hasHeaderSlot">
      <slot name="header"></slot>
    </header>

    <main class="flex-1 w-full">
      <slot />
    </main>

    <footer v-if="hasFooterSlot">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  computed: {
    hasHeaderSlot() {
      return !!this.$slots.header
    },
    hasFooterSlot() {
      return !!this.$slots.footer
    },
  },
}
</script>
