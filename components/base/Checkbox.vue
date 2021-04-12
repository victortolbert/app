<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Boolean,
    },
  },
  methods: {
    onChange() {
      this.$emit('change', !this.value)
    }
  }
})
</script>

<template>
  <div>
    <input
      type="checkbox"
      :checked="value"
      @change="onChange"
      class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
    />
  </div>
</template>
