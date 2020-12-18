<template>
  <header
    class="px-4 py-4 border-b border-gray-200 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
  >
    <div class="flex-1 min-w-0 prose">
      <slot name="left"> <h2>Messages</h2> </slot>
    </div>

    <div class="flex mt-4 sm:mt-0 sm:ml-4">
      <slot name="right" />
    </div>
  </header>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
