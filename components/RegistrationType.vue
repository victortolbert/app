<template>
  <div>
    <h1 class="mt-8 mb-15 text-50 fw-500">{{ $t('welcome') }}</h1>
    <div class="mx-auto registration-form-constraint d-block">
      <h2 class="mt-12 mb-4 text-30 fw-200">{{ $t('sign_up') }}</h2>
      <GoogleLogin @link-clicked="registerGAEvent" />
      <a
        id="email_registration"
        class="mx-auto text-white btn btn-primary btn-round d-block w-200px btn-drop-shadow text-18 d-flex align-items-center justify-content-center align"
        @click="$emit('email-registration', $event.target.value)"
      >
        <i class="mr-10 far fa-envelope text-21" />
        Use My Email
      </a>
      <p class="mt-12 text-14 fw-200">
        {{ $t('sign_in_message') }}
        <a :href="loginUrl" class="parent_login">
          {{ $t('sign_in') }}
        </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loginUrl: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.hjTrigger('dash-registration-type')
  },
  methods: {
    registerGAEvent() {
      if (this.$store.getters.getUserType === 'parent') {
        this.gaEvent(
          'Titan Registration',
          'Parent Registration',
          'Google Registration',
        )
      } else {
        this.gaEvent(
          'Titan Registration',
          'Teacher Registration',
          'Google Registration',
        )
      }
    },
  },
}
</script>
