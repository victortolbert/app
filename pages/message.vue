<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    const message: string = 'This is a message'

    return {
      message,
    }
  },
})
</script>

<template>
  <div>
    {{ message }}
  </div>
</template>
