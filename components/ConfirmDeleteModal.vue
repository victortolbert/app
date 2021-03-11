<template>
  <ModalDialog :show="show" @close="cancel">
    <h1 class="mb-4 text-2xl font-bold text-center">Are you sure?</h1>
    <p class="mb-6 text-center text-grey-darker">
      Deleting your account cannot be undone.
    </p>
    <div class="text-center">
      <button @click="cancel" type="button" class="mr-4 btn btn-grey">
        Cancel
      </button>
      <button @click="confirmDelete" type="button" class="btn btn-red">
        Delete it
      </button>
    </div>
  </ModalDialog>
</template>

<script>
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  props: ['show', 'accountId'],
  methods: {
    cancel() {
      this.$emit('close')
    },
    confirmDelete() {
      console.log(`Deleting account ${this.accountId}...`)
      this.$emit('close')
    },
  },
})
</script>
