<template>
  <div class="hello">
    <form @submit.prevent="submit">
      <label for="name">Name</label>
      <input type="text" v-model="name" id="name" />
      <button role="button" :disabled="!name.length">Submit</button>
    </form>
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
      name: '',
      show: false,
    }
  },
  methods: {
    submit() {
      this.$emit('submit', {
        name: this.name,
      })
    },
  },
})
</script>
