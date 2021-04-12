<script>
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const state = reactive({
      email: '',
      receiveNewsletter: false,
      date: '2018-04-12',
      isEnabled: false,
    })

    const submit = () => {
      console.log('Submitting preferences...', {
        email: state.email,
        receiveNewsletter: state.receiveNewsletter
      })
    }

    return { submit, ...toRefs(state) }
  },
})
</script>

<template>
  <form class="card max-w-lg" @submit.prevent="submit">
    <h1 class="text-2xl font-bold mb-6">Your Settings</h1>

    <div class="mt-4">
      <label id="email">Email Address</label>
      <input
        id="email"
        v-model="email"
        type="text"
        class="mt-1 max-w-lg block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
        placeholder="you@example.com"
      />
    </div>

    <div class="mt-4">
      <label for="newsletter">Newsletter</label>
      <div class="mt-1 flex justify-between items-center">
        <p class="mr-4">Send you occasional news and updates.</p>
        <BaseToggleSwitch id="newletter" v-model="receiveNewsletter"></BaseToggleSwitch>
      </div>
    </div>

    <div class="mt-4">
      <BaseCheckbox v-model="isEnabled" />
    </div>

    <div class="mt-4">
      <BaseDatepicker v-model="date" format="D MMM YYYY" :options="{ firstDay: 1 }" />
    </div>

    <div class="mt-4 text-right">
      <button
        class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >{{ $t('cancel') }}</button>
      <button
        type="submit"
        class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >{{ $t('update_settings') }}</button>
    </div>
  </form>
</template>
