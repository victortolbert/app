<template>
  <button
    class="text-blue-500 border-b border-blue-500 border-dotted hover:border-solid"
    @click="modalOpen = true"
  >
    Privacy Policy
    <Portal v-if="modalOpen" to="overlays">
      <PrivacyPolicyModal :show="modalOpen" @close="modalOpen = false" />
    </Portal>
  </button>
</template>

<script>
export default {
  data() {
    return {
      modalOpen: false,
    }
  },
}
</script>
