<template>
  <div>
    <h1 class="text-60">{{ $t('welcome') }}</h1>
    <p class="pb-3 mx-auto text-18 mw-250px font-weight-light">
      {{ $t('landing_tagline') }}
    </p>
    <p>
      <button
        class="py-2 mx-auto mb-4 btn btn-grey btn-round d-block mw-200px w-200px btn-drop-shadow text-15"
        type="button"
        @click="$emit('sign-up')"
      >
        {{ $t('sign_up') }}
      </button>
    </p>
    <p class="mx-auto my-4 text-12 gap-strike mw-200px">
      <span class="strike" />
      <span>{{ $t('or') }}</span>
      <span class="strike" />
    </p>
    <p class="text-13">
      <a
        :href="loginUrl"
        class="py-2 mx-auto mt-2 btn btn-primary btn-round d-block mw-200px btn-drop-shadow text-15"
        @click="login"
      >
        {{ $t('login') }}
      </a>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    loginUrl: {
      type: String,
      default: null,
    },
  },
  computed: {
    buttonText() {
      if (window.location.hostname.includes('funrunpro')) {
        return this.$t('im_a_participant')
      }

      return this.$t('im_a_parent')
    },
  },
  mounted() {
    this.hjTrigger('dash-welcome')
  },
  methods: {
    setUserType(type) {
      this.gaEvent('Titan Registration', 'Landing Page', type)
      this.$store.commit('SET_USER_TYPE', type)
      this.$emit('register')
    },
    login() {
      this.gaEvent('Titan Registration', 'Landing Page', 'login')
    },
    sponsor() {
      this.gaEvent('Titan Registration', 'Landing Page', 'sponsor')
    },
  },
}
</script>
