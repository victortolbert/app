<!-- @vue-ignore -->
<script>
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ModalDialog',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show: {
      immediate: true,
      handler(show) {
        if (show) {
          document.body.style.setProperty('overflow', 'hidden')
        } else {
          document.body.style.removeProperty('overflow')
        }
      },
    },
  },
  mounted() {
    const escapeHandler = e => {
      if (e.key === 'Escape' && this.show) {
        this.dismiss()
      }
    }
    document.addEventListener('keydown', escapeHandler)
    this.$once('hook:destroyed', () => {
      document.removeEventListener('keydown', escapeHandler)
    })
  },
  methods: {
    dismiss() {
      this.$emit('close')
    },
  },
})
</script>

<template>
  <Portal v-if="show" to="overlays">
    <div class="modal-backdrop">
      <div class="modal">
        <slot />
      </div>
    </div>
  </Portal>
</template>
