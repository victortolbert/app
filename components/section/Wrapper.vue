<script lang="ts">
export default {
  props: {
    padded: {
      type: Boolean,
      default: true,
    },
    contained: {
      type: Boolean,
      default: true
    }
  },
}
</script>
<template>
  <section :class="{
    'lg:p-8': padded,
    'max-w-7xl w-full mx-auto': contained
  }">
    <slot />
  </section>
</template>
