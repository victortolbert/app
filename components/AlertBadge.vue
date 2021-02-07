<template>
  <div
    v-if="number"
    :class="[!staticPosition ? 'relative' : 'static']"
    class="text-lg font-bold text-center text-white rounded-full cursor-pointer has-background-danger alert-badge"
    @click="$emit('toggle')"
  >
    {{ number }}
  </div>
</template>

<script>
export default {
  name: 'AlertBadge',
  props: {
    number: {
      type: Number,
      default: null,
    },
    staticPosition: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
