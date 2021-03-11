<template>
  <ModalDialog :show="show" @close="dismiss">
    <h1 class="mb-4 text-2xl font-bold text-center">
      Exciting new features are here!
    </h1>
    <p class="mb-6 text-center text-grey-darker">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. At ut eligendi
      quod tempore totam explicabo sit consectetur architecto? Tempora, repellat
      est rem ut esse ab officia saepe ratione tempore. Obcaecati.
    </p>
    <div class="text-center">
      <button @click="dismiss" type="button" class="btn btn-blue">
        Dismiss
      </button>
    </div>
  </ModalDialog>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  props: ['show'],
  methods: {
    dismiss() {
      this.$emit('close')
    },
  },
})
</script>
