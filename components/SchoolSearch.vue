<template>
  <div>
    <h2 class="mt-4 mb-4 text-30">{{ $t('school_search_header') }}</h2>
    <div class="mx-auto form-group">
      <label class="sr-only">{{ $t('last_name') }}</label>
      <input
        :placeholder="$t('placeholder_school_search')"
        type="text"
        class="form-control text-16"
        name="school_search"
        required
        @input="search"
      />
      <ul v-show="schools.length" class="list-group">
        <li
          v-for="(school, index) in schools"
          :key="index"
          :class="{active: regCode === school.registration_code}"
          class="text-left radio text-gray text-16 list-group-item list-group-item-action"
          @click="selectSchool(school)"
        >
          <div class="font-weight-bold">{{ school.name }}</div>
          <div>{{ school.event_name }}</div>
          <div>{{ school.city }}, {{ school.state }}</div>
        </li>
      </ul>
    </div>

    <p class="text-12 fw-300">
      <a
        class="text-inherit fw-600"
        href="#"
        data-target="#schoolSearchHelpModal"
        data-toggle="modal"
      >
        {{ $t('school_search.click_here') }}
      </a>
      {{ $t('school_search.search_school_help') }}
    </p>
    <p class="mx-auto my-4 text-12 gap-strike mw-200px">
      <span class="strike" />
      <span>or</span>
      <span class="strike" />
    </p>
    <p class="text-12 fw-300">
      <a
        class="text-inherit fw-600"
        href="#"
        @click="hideRegCode = !hideRegCode"
      >
        {{ $t('school_search.click_here') }}
      </a>
      {{ $t('school_search.enter_registration_code') }}
    </p>

    <div :class="{invisible: hideRegCode}" class="mx-auto form-group">
      <p
        v-if="registrationCodeResponse !== null"
        class="text-invalid text-11 alert alert-danger"
      >
        {{ registrationCodeResponse }}
      </p>
      <label class="sr-only">{{ $t('registration_code') }}</label>
      <input
        :placeholder="$t('placeholder_reg_code')"
        v-model="regCode"
        type="text"
        class="mb-5 form-control text-16"
        name="reg_code"
        required
      />

      <button
        class="mx-auto mb-3 btn btn-primary btn-round d-block w-200px btn-drop-shadow text-18"
        @click="next"
      >
        Next
      </button>
    </div>
    <a
      v-if="userHasParticipants"
      href="#"
      class="mx-auto btn btn-danger btn-round d-block w-200px btn-drop-shadow text-15 mb-15"
      @click="cancel"
    >
      {{ $t('cancel') }}
    </a>
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      default: null,
    },
    cancelLink: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      hideRegCode: true,
      regCode: '',
      schools: [],
      registrationCodeResponse: null,
    }
  },
  computed: {
    userHasParticipants() {
      return this.$store.getters.hasParticipants
    },
  },
  mounted() {
    this.hjTrigger('dash-school-search')
  },
  methods: {
    search(event) {
      const searchTerm = event.target.value
      if (searchTerm.length >= 3) {
        this.$axios
          .get('/v3/api/schools/' + searchTerm)
          .then(response => {
            this.schools = response.data
          })
          .catch()
      } else {
        this.schools = []
      }
    },
    selectSchool(school) {
      this.regCode = school.registration_code
      this.next()
    },
    next() {
      if (this.regCode) {
        this.$axios
          .get('/v3/api/schools/registration-code/' + this.regCode)
          .then(response => {
            // validate the response was successful
            if (response.data.error === undefined) {
              // send the response over to the next panel
              this.$store.commit('NEW_PARTICIPANT', response.data)
              this.$emit('participant-registration', response.data)
            } else {
              this.registrationCodeResponse = response.data.error
            }
          })
          .catch()
      }
    },
    cancel() {
      window.location.href = this.cancelLink
    },
  },
}
</script>
