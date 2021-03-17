<script>
export default {
  props: {
    isPadded: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
<template>
  <section :class="{'p-8': isPadded}">
    <slot />
  </section>
</template>
