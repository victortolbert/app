<template>
  <Component :is="is" :data="data" :donut="true" />
</template>

<script>
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'column',
    },
    data: {
      type: [Array, Object],
      default: () => [
        {name: 'Workout', data: {'2017-01-01': 3, '2017-01-02': 4}},
        {name: 'Call parents', data: {'2017-01-01': 5, '2017-01-02': 3}},
      ],
    },
  },
  computed: {
    is() {
      return `${this.type}-chart`
    },
  },
})
</script>
