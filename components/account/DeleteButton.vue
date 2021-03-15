<!-- @vue-ignore -->
<script>
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  props: ['id'],
  data() {
    return {
      modalOpen: false,
    }
  },
})
</script>

<template>
  <button type="button" @click="modalOpen = true">
    <slot />
    <AccountDeleteConfirmModal
      :show="modalOpen"
      @close="modalOpen = false"
      :id="id"
    />
  </button>
</template>
