<script>
export default {
  props: {
    isPadded: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<template>
  <section :class="{'p-8': isPadded}">
    <slot />
  </section>
</template>
