<template>
  <div class="progress-bar-thin">
    <div :class="['progress-success', width]" />
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: 'w-0pct',
    },
  },
}
</script>
