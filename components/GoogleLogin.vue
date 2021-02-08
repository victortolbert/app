<template>
  <a
    id="google"
    :href="'/v3/oauth/redirect/google/' + $store.state.userType"
    class="py-2 mx-auto mb-4 btn btn-social-login text-14 btn-round d-block mw-200px btn-drop-shadow"
    @click="$emit('link-clicked')"
  >
    <img
      :alt="$t('google_logo')"
      class="mr-10 login-logo"
      src="/v3-assets/dashboard/images/google-logo.png"
    />
    {{ $t('google_account') }}
  </a>
</template>

<script>
export default {
  props: {
    setLang: {
      type: Object,
      default: undefined,
    },
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
  },
  mounted() {
    if (this.setLang !== undefined) {
      this.$store.commit('SET_LANG', this.setLang)
    }
  },
}
</script>
