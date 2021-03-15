<script>
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LoginView',
  data() {
    return {}
  },
  methods: {
    loginError() {
      this.showLoginError()
      //   this.$toast.success('Default toast')
      //   this.$sounds.error.play()
    },
  },
  notifications: {
    showLoginError: {
      title: 'Login Failed',
      message: 'Failed to authenticate',
      type: 'error',
    },
  },
})
</script>

<template>
  <article>
    <OButton @click="loginError">Show Error</OButton>
  </article>
</template>
