<template>
  <button type="button" @click="modalOpen = true">
    <slot />
    <ConfirmDeleteModal
      :show="modalOpen"
      @close="modalOpen = false"
      :account-id="accountId"
    />
  </button>
</template>

<script>
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  props: ['accountId'],
  data() {
    return {
      modalOpen: false,
    }
  },
})
</script>
