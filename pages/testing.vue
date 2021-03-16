<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { CharCountParams } from '~/components/base/CharCount.vue'

interface State {
  inputText: string
}

export default defineComponent({
  name: 'App',

  data: (): State => {
    return { inputText: '' }
  },
  computed: {
    charCountParams(): CharCountParams {
      return {
        inputText: this.inputText,
        label: 'Count',
      }
    },
  },
  methods: {
    reset() {
      this.inputText = ''
    },
  },
})
</script>

<template>
  <main class="flex-1">
    <section class="p-8">
      <p>
        <input v-model="inputText" type="text">
      </p>

      <BaseCharCount :params="charCountParams" />

      <p>
        <button @click="reset()">
          Reset
        </button>
      </p>
    </section>
  </main>
</template>
