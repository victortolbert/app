<template>
  <div>
    <ProgressBar :width="pgWidth" />

    <Back v-if="showBackButton" @back-button="back" />

    <div class="registration">
      <Welcome
        v-if="position == 'welcome'"
        :login-url="loginUrl"
        class="animated fadeIn animated-slow"
        @sign-up="setPosition"
      />
      <SignUp
        v-if="position == 'sign-up'"
        :login-url="loginUrl"
        class="animated fadeIn animated-slow"
        @register="setPosition"
      />
      <RegistrationType
        v-if="position == 'registration-type'"
        :login-url="loginUrl"
        class="animated fadeIn animated-slow"
        @email-registration="setPosition"
      />
      <RegistrationForm
        v-if="position == 'registration'"
        :old="old"
        :csrf="csrf"
        :errors="errors"
        :login-url="loginUrl"
        :register-url="registerUrl"
        :social-register-url="socialRegisterUrl"
        class="animated fadeIn animated-slow"
        @registration-successful="setPosition"
        @registration-error="error"
      />
      <WelcomeBack
        v-if="position == 'welcome-back'"
        :is-beta-user="isBetaUser"
        :is-org-admin="isOrgAdmin"
        @selection-made="setPosition"
        @incomplete-registration="position = 'registration'"
      />
      <WelcomeTeachers
        v-if="position == 'welcome-teacher'"
        :login-url="loginUrl"
        :cancel-link="welcomeTeachersCancelLink"
        class="animated fadeIn animated-slow"
        @teacher-registered="setPosition"
      />
      <SchoolSearch
        v-if="position == 'school-search'"
        :old="old"
        :csrf="csrf"
        :errors="errors"
        :login-url="loginUrl"
        :register_url="registerUrl"
        :cancel-link="schoolSearchCancelLink"
        class="animated fadeIn animated-slow auth-pane"
        @participant-registration="setPosition"
        @registration-error="error"
      />
      <ParticipantForm
        v-if="position == 'participant-registration'"
        class="animated fadeIn animated-slow auth-pane"
        @participant-registered="setPosition"
      />
      <ParticipantRegisterSuccess
        v-if="position == 'participant-register-success'"
        :can-show-address="canShowAddress"
        class="animated fadeIn animated-slow"
        @school-search="setPosition"
        @shipping-address="position = 'shipping'"
      />
      <ShippingAddress
        v-if="position == 'shipping'"
        class="animated fadeIn animated-slow"
        @address-saved="setPosition"
      />
      <div v-if="position === 'error'" class="animated fadeIn animated-slow">
        <h4 class="mt-12">{{ $t('register_error') }}</h4>
        <p class="mt-8">{{ $t('redirect_message') }}</p>
      </div>
      <Snowf
        v-if="showSnow"
        :amount="150"
        :size="5"
        :speed="1.7"
        :wind="0"
        :opacity="0.8"
        :swing="1"
        :image="null"
        :z-index="-1"
        :resize="true"
        color="#fff"
      />
    </div>
  </div>
</template>

<script>
import findIndex from 'lodash/findIndex'
import toArray from 'lodash/toArray'

export default {
  props: {
    lang: {
      type: Object,
      default: null,
    },
    loginUrl: {
      type: String,
      default: '',
    },
    csrf: {
      type: String,
      default: '',
    },
    errors: {
      type: Array,
      default: null,
    },
    welcomePage: {
      type: String,
      default: '',
    },
    old: {
      type: Array,
      default: null,
    },
    registerUrl: {
      type: String,
      default: '',
    },
    socialRegisterUrl: {
      type: String,
      default: '',
    },
    homeURL: {
      type: String,
      default: '',
    },
    user: {
      type: Object,
      default: undefined,
    },
    defaultImageURL: {
      type: String,
      default: null,
    },
    userType: {
      type: String,
      default: '',
    },
    showSnow: {
      type: Boolean,
      default: false,
    },
    isBetaUser: {
      type: Boolean,
      default: false,
    },
    isOrgAdmin: {
      type: Boolean,
      default: false,
    },
    loggedInBackAction: {
      type: String,
      default: 'welcome-back',
    },
    startingPosition: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      position: 'welcome',
      pgWidth: 'd-none',
      agreesTerms: false,
      teacherRegistrationCode: null,
      parent: false,
      isInWelcomeBackFlow: false,
      positions: {
        welcome: {
          width: 'd-none',
          back: false,
          step: 1,
          teacher: true,
          parent: true,
        },
        'sign-up': {
          width: 'w-20pct',
          back: true,
          step: 2,
          teacher: true,
          parent: true,
        },
        'registration-type': {
          width: 'w-20pct',
          back: true,
          step: 3,
          teacher: true,
          parent: true,
        },
        registration: {
          width: 'w-40pct',
          back: true,
          step: 4,
          teacher: true,
          parent: true,
        },
        'school-search': {
          width: 'w-60pct',
          back: true,
          step: 5,
          teacher: false,
          parent: true,
        },
        'welcome-teacher': {
          width: 'w-100pct',
          back: true,
          step: 5,
          teacher: true,
          parent: false,
        },
        'participant-registration': {
          width: 'w-80pct',
          back: true,
          step: 6,
          teacher: false,
          parent: true,
        },
        'participant-register-success': {
          width: 'hide',
          back: false,
          step: 7,
          teacher: false,
          parent: true,
        },
        shipping: {
          width: 'hide',
          back: true,
          step: 8,
          teacher: false,
          parent: true,
        },
        error: {
          width: 'd-none',
          back: false,
          step: -1,
          teacher: true,
          parent: true,
        },
        'welcome-back': {
          width: 'w-20pct',
          back: true,
          step: 4,
          teacher: false,
          parent: false,
        },
      },
    }
  },
  computed: {
    showBackButton() {
      return this.positions[this.position].back
    },
    schoolSearchCancelLink() {
      if (this.loggedInBackAction === 'welcome-back') {
        return '/v3/home/dashboard'
      } else {
        return this.loggedInBackAction
      }
    },
    welcomeTeachersCancelLink() {
      if (this.loggedInBackAction === 'welcome-back') {
        return '/v3/home/dashboard'
      } else {
        return this.loggedInBackAction
      }
    },
  },
  watch: {
    position(val) {
      this.pgWidth = this.positions[val].width
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
  },
  created() {
    this.$store.commit('SET_USER_TYPE', this.userType)

    this.isInWelcomeBackFlow = this.startingPosition !== null

    // If there is old data lets load directly to the registration page that failed.
    if (this.errors.length !== 0) {
      this.position = 'registration'
      this.teacherRegistrationCode = this.old.teacherRegistrationCode
    }
    if (this.user !== null) {
      this.$store.commit('SET_USER', this.user)
      switch (this.$store.getters.getUserType.toLowerCase()) {
        case 'incompleteprofile':
          this.position = 'registration'
          break
        default:
          this.position = 'welcome-back'
          break
      }
    }

    if (this.startingPosition) {
      this.position = this.startingPosition
    }

    this.$store.commit('SET_DEFAULT_USER_IMAGE', this.defaultImageURL)
  },
  methods: {
    back() {
      if (this.positions[this.position].step === 2) {
        this.position = 'welcome'
        return
      }
      if (
        this.position === 'registration' ||
        this.position === 'welcome-back'
      ) {
        this.$axios.get('/v3/logout')
        this.$store.commit('RESET_USER')
        this.position = 'welcome'
        return
      }

      if (this.isInWelcomeBackFlow) {
        this.performLoggedInBackAction()
        return
      } else if (
        this.position === 'school-search' ||
        this.position === 'welcome-teacher'
      ) {
        this.position = 'welcome-back'
        return
      }

      const newPosition = findIndex(toArray(this.positions), {
        step: this.positions[this.position].step - 1,
        [this.$store.state.userType.toLowerCase()]: true,
      })

      this.position = Object.keys(this.positions)[newPosition]
    },
    error() {
      this.position = 'error'
      setTimeout(() => {
        window.location.href = '/'
      }, 60000)
    },
    setPosition() {
      if (this.positions[this.position].step === 7) {
        this.position = 'school-search'
        return
      } else if (this.positions[this.position].step === 1) {
        this.position = 'sign-up'
        return
      }

      if (this.position === 'welcome-teacher') {
        window.location.href = '/v3/home/teacher-dashboard'
        return
      } else if (this.position === 'registration-type') {
        this.isInWelcomeBackFlow = false
      }

      const nextStep = findIndex(toArray(this.positions), {
        step: this.positions[this.position].step + 1,
        [this.$store.state.userType.toLowerCase()]: true,
      })

      // Flip back to dashboard if there isn't another step to take.
      if (nextStep === -1) {
        window.location.href = '/v3/home/dashboard'
      }

      this.position = Object.keys(this.positions)[nextStep]
    },
    performLoggedInBackAction() {
      if (this.loggedInBackAction === 'welcome-back') {
        this.position = 'welcome-back'
      } else {
        window.location.href = this.loggedInBackAction
      }
    },
    canShowAddress() {
      return (
        this.startingPosition !== 'school-search' &&
        this.startingPosition !== 'welcome-teacher'
      )
    },
  },
}
</script>
