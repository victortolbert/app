<template>
  <div>
    {{ message }}
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const message = ref('This is a message')

    return {
      message,
    }
  },
})
</script>
