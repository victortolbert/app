<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    accountId: {
      type: Number
    }
  },
  data() {
    return {
      email: 'jane@example.com',
      receiveNewsletter: false,
    }
  },
  methods: {
    toggleNewsletter() {
      this.receiveNewsletter = !this.receiveNewsletter
    },
  },
})
</script>

<template>
  <div class="card">
    <h1 class="mb-6 text-2xl font-bold">Your Settings</h1>

    <label class="block mb-6">
      <span class="block mb-2 font-semibold text-grey-darker">
        Email Address
      </span>
      <input v-model="email" class="form-input" placeholder="you@example.com" />
    </label>

    <div class="mb-8">
      <span class="block mb-2 font-semibold text-grey-darker">Newsletter</span>
      <div class="flex items-center justify-between">
        <p class="mr-4">Send you occasional news and updates.</p>

        <ToggleInput v-model="receiveNewsletter" />
      </div>
    </div>

    <div class="flex justify-between">
      <DeleteAccountButton :account-id="accountId">
        Delete Account
      </DeleteAccountButton>

      <button type="button" class="btn btn-blue">Update Settings</button>
    </div>
  </div>
</template>

