<template>
  <div>
    <h1 class="mx-auto text-48 mw-200px">{{ $t('welcome_back') }}</h1>
    <p class="mt-12">
      <a
        v-if="shouldShowBackToDashboardButton"
        href="/v3/home/dashboard"
        class="py-2 mx-auto mb-4 btn btn-white-outline btn-813-dk-grey-outline btn-round d-block mw-200px text-15 w-200px"
      >
        {{ $t('back_to_dashboard') }}
      </a>
      <a
        v-if="isOrgAdmin"
        :href="`/v3/tkdashboard/?redirect=admin`"
        class="py-2 mx-auto mb-4 btn btn-white-outline btn-813-dk-grey-outline btn-round d-block mw-200px text-15 w-200px"
      >
        {{ $t('admin_dashboard') }}
      </a>
      <button
        class="py-2 mx-auto mb-4 btn btn-primary btn-round d-block mw-200px btn-drop-shadow text-15 w-200px"
        @click="setUserType('parent')"
      >
        {{ buttonText }}
      </button>
      <button
        class="py-2 mx-auto mb-4 btn btn-success btn-round d-block mw-200px text-15 w-200px"
        @click="setUserType('teacher')"
      >
        {{ $t('im_a_teacher') }}
      </button>
      <a
        data-toggle="modal"
        data-target="#sponsorInstructionModal"
        href="#"
        class="py-2 mx-auto btn btn-white-outline btn-813-dk-grey-outline btn-round d-block mw-200px text-15 w-200px"
        @click="sponsor"
      >
        {{ $t('im_a_sponsor') }}
      </a>

      <a
        id="regButtonsExplanationModalAnchor"
        data-toggle="modal"
        data-target="#regButtonsExplanationModal"
        href="#"
        class="py-3 mx-auto text-white d-block mw-200px text-15 font-weight-bold"
        @click="whatDoesThisMean"
      >
        {{ $t('what_does_this_mean') }}
      </a>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    isBetaUser: {
      type: Boolean,
      default: false,
    },
    isOrgAdmin: {
      type: Boolean,
      default: false,
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
    this.hjTrigger('dash-welcome-back')
    this.hjTag('Welcome Back')
  },
  methods: {
    setUserType(val) {
      this.gaEvent('Titan Registration', 'Welcome Back', val)
      this.$axios.get('/v3/api/validate-profile-complete').then(response => {
        if (response.data.valid === true) {
          this.$store.commit('SET_USER_TYPE', val)
          this.$emit('selection-made')
        } else {
          this.$store.commit('SET_USER_TYPE', 'incompleteProfile')
          this.$emit('incomplete-registration')
        }
      })
    },
    sponsor() {
      this.gaEvent('Titan Registration', 'Welcome Back', 'sponsor')
    },
    whatDoesThisMean() {
      this.gaEvent('Titan Registration', 'Welcome Back', 'What does this mean')
    },
    shouldShowBackToDashboardButton() {
      if (
        typeof this.$store.state.user !== 'undefined' &&
        typeof this.$store.state.user.participants !== 'undefined'
      ) {
        return (
          this.isBetaUser &&
          !this.isOrgAdmin &&
          this.$store.state.user.participants.length > 0
        )
      } else {
        return this.isBetaUser && !this.isOrgAdmin
      }
    },
  },
}
</script>

<style scoped>
@media (min-width: 813px) {
  #regButtonsExplanationModalAnchor {
    color: black !important;
  }
}
</style>
