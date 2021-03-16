<script>
import {useKeydown} from '~/composables/useKeydown'

export default {
  props: {
    closeModal: {
      type: Function,
      required: true,
    },
  },
  setup({closeModal}) {
    useKeydown([{key: 'Escape', fn: closeModal}])
  },
}
</script>

<template>
  <div class="modal">
    <div class="overlay" @click="closeModal" />
    <div class="modal-card">
      <slot />
    </div>
  </div>
</template>
