<template>
  <div>
    <h1 class="text-60">{{ $t('create_your_account') }}</h1>
    <p class="text-13">{{ $t('get_started') }}</p>
    <p>
      <button
        dusk="parent-registration"
        class="py-2 mx-auto mb-4 btn btn-primary btn-round d-block mw-200px w-200px btn-drop-shadow text-15"
        @click="setUserType('parent')"
      >
        {{ buttonText }}
      </button>
      <button
        dusk="teacher-registration"
        class="py-2 mx-auto mb-4 btn btn-success btn-round d-block mw-200px w-200px text-15"
        @click="setUserType('teacher')"
      >
        {{ $t('im_a_teacher') }}
      </button>
      <a
        data-toggle="modal"
        data-target="#sponsorInstructionModal"
        href="#"
        class="py-2 mx-auto pledge-a-student btn btn-white-outline btn-813-dk-grey-outline btn-round d-block mw-200px text-15"
        @click="sponsor"
      >
        {{ $t('im_a_sponsor') }}
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
