<script lang="ts">
import {defineComponent, computed, ref} from '@nuxtjs/composition-api'
// import "intro.js/introjs.css";
import 'intro.js/minified/introjs.min.css'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup(props) {
    const msgUpper = computed(() => props?.msg?.toUpperCase())
    const counter = ref(0)
    const inc = () => {
      counter.value += 1
    }
    const dec = () => {
      counter.value -= 1
    }
    return {
      msgUpper,
      counter,
      inc,
      dec,
    }
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  mounted() {
    const introJS = require('intro.js')
    introJS.introJs().start()
  },
})
</script>

<template>
  <div class="hello">
    <h1 data-intro="This is your message">{{ msg }}</h1>
    <h5>{{ msgUpper }}</h5>
    <p>
      <button @click="inc">Inc</button>
      <span>{{ counter }}</span>
      <button @click="dec">Dec</button>
    </p>
  </div>
</template>
