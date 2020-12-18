<template>
  <div class="flex flex-col w-full min-h-screen bg-primary-200">
    <header v-if="hasHeaderSlot">
      <slot name="header"></slot>
    </header>

    <slot />

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
