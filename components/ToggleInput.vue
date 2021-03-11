<template>
  <span
    class="toggle"
    role="checkbox"
    :tabindex="0"
    @click="toggle"
    @keydown.space.prevent="toggle"
    :aria-checked="value.toString()"
  />
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  props: ['value'],
  methods: {
    toggle() {
      this.$emit('input', !this.value)
    },
  },
})
</script>
