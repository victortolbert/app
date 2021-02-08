<template>
  <div class="text-left back-button">
    <a
      href="#"
      class="text-24"
      @click="$emit('back-button', $event.target.value)"
    >
      <i class="fas fa-arrow-left" />
    </a>
  </div>
</template>

<script>
export default {
  props: {
    homeUrl: {
      type: String,
      default: '',
    },
  },
}
</script>
