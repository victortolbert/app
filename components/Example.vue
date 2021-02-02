<template>
  <div class="hello">
    <button @click="show = true" role="show-text"></button>
    <div v-if="show">
      {{ msg }}
    </div>
  </div>
</template>

<script>
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      show: false,
    }
  },
})
</script>
