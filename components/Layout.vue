<template>
  <div
    class="flex flex-col w-full min-h-screen pt-16 bg-white dark:bg-gray-900 dark:text-primary-50"
  >
    <header v-if="hasHeaderSlot">
      <slot name="header">
        <!-- Header Slot -->
      </slot>
    </header>

    <slot />

    <footer v-if="hasFooterSlot">
      <slot name="footer">
        <!-- Footer Slot -->
      </slot>
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
