<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Pikaday from 'pikaday'
import 'pikaday/css/pikaday.css'

export default defineComponent({
  props: {
    value: { required: true },
    format: { default: 'YYYY-MM-DD' },
    options: { default: {} }
  },
  mounted() {
    const picker = new Pikaday({
      field: this.$refs.input,
      format: this.format,
      onSelect: () => {
        this.$emit('input', picker.toString())
      },
      ...this.options
    })
  }
})
</script>

<template>
  <input :value="value" class="py-1 px-4 rounded border" ref="input" placeholder="YYYY-MM-DD" />
</template>
