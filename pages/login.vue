<!-- @vue-ignore -->
<script>
export default {
  name: 'DemoView',
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
}
</script>
<template>
  <div>
    <o-button @click="loginError">Show Error</o-button>
  </div>
</template>
