<template>
  <div>
    <div class="mx-auto registration-form-constraint d-block">
      <h2 class="mt-4">{{ $t('sign_up') }}</h2>
      <form @submit="verify($event)">
        <input :value="csrf" type="hidden" name="_token" />
        <input
          v-model="$parent.teacherRegistrationCode"
          name="teacher_registration_code"
          class="mb-3 form-control"
          type="hidden"
        />
        <div class="mx-auto form-group">
          <label class="sr-only">{{ $t('first_name') }}</label>
          <input
            :class="[
              errors.firstName != undefined ? 'is-invalid' : '',
              'form-control text-16',
            ]"
            :placeholder="$t('firstName')"
            :oninvalid="`setCustomValidity('${errorMessages.firstName}')`"
            v-model="firstName"
            oninput="setCustomValidity('')"
            type="text"
            name="first_name"
            required
            @change.once="handleInputChange($event)"
          />
          <div v-if="errors.firstName != undefined" class="error-msg">
            {{ errors.firstName[0] }}
          </div>
        </div>
        <div class="mx-auto form-group">
          <label class="sr-only">{{ $t('last_name') }}</label>
          <input
            :class="[
              errors.lastName != undefined ? 'is-invalid' : '',
              'form-control text-16',
            ]"
            :placeholder="$t('lastName')"
            :oninvalid="`setCustomValidity('${errorMessages.lastName}')`"
            v-model="lastName"
            oninput="setCustomValidity('')"
            type="text"
            name="last_name"
            required
            @change.once="handleInputChange($event)"
          />
          <div v-if="errors.lastName != undefined" class="error-msg">
            {{ errors.lastName[0] }}
          </div>
        </div>
        <div v-if="!isSocialRegistration" class="mx-auto form-group">
          <label class="sr-only">{{ $t('email') }}</label>
          <input
            :class="[
              errors.email != undefined ? 'is-invalid' : '',
              'form-control text-16',
            ]"
            :placeholder="$t('email')"
            :oninvalid="`setCustomValidity('${errorMessages.email[0]}')`"
            v-model="email"
            oninput="setCustomValidity('')"
            type="email"
            name="email"
            required
            @change="handleInputChange($event)"
          />
          <div
            v-if="emailRegistered"
            id="email-registered-error"
            class="p-3 text-center error-msg"
          >
            {{ $t('email_registered') }}
          </div>
          <a
            v-if="emailRegistered"
            class="mx-auto mb-3 text-white btn btn-primary btn-round d-block w-200px btn-drop-shadow text-18"
            href="/v3/password/reset"
          >
            {{ $t('reset_password') }}
          </a>
          <div v-if="errors.email != undefined" class="error-msg">
            {{ errors.email[0] }}
          </div>
        </div>
        <div
          v-if="!emailRegistered && !isSocialRegistration"
          class="mx-auto form-group"
        >
          <label class="sr-only">{{ $t('confirm_email') }}</label>
          <input
            :class="[
              errors.emailConfirmation != undefined ? 'is-invalid' : '',
              'form-control text-16',
            ]"
            :placeholder="$t('confirm_email')"
            :oninvalid="`setCustomValidity('${errorMessages.emailConfirmation}')`"
            v-model="emailConfirmation"
            oninput="setCustomValidity('')"
            type="email"
            name="email_confirmation"
            required
          />
          <div v-if="errors.emailConfirmation != undefined" class="error-msg">
            {{ errors.emailConfirmation[0] }}
          </div>
        </div>
        <div
          v-if="!emailRegistered && !isSocialRegistration"
          class="mx-auto form-group"
        >
          <p class="mx-auto mb-2 text-left text-14 fw-200">
            {{ $t('password_requirements') }}
          </p>
          <label class="sr-only">{{ $t('password') }}</label>
          <input
            :title="$t('password_requirements')"
            :class="[
              errors.password != undefined ? 'is-invalid' : '',
              'form-control text-16',
            ]"
            :placeholder="$t('password')"
            :oninvalid="`setCustomValidity('${errorMessages.password}')`"
            v-model="password"
            oninput="setCustomValidity('')"
            type="password"
            name="password"
            pattern=".{7,20}"
            required
            @change.once="handleInputChange($event)"
          />
          <div v-if="errors.password != undefined" class="error-msg">
            {{ errors.password[0] }}
          </div>
        </div>
        <div v-if="!emailRegistered" class="form-group position-relative">
          <label class="sr-only">{{ $t('phone') }}</label>
          <TheMask
            :class="[
              errors.phone != undefined ? 'is-invalid' : '',
              'form-control text-16',
            ]"
            :placeholder="$t('phone_number')"
            v-model="phone"
            type="tel"
            name="phone"
            maxlength="14"
            mask="(###) ###-####"
            required
            @change.native.once="handleInputChange($event)"
          />
          <i
            :title="$t('phone_tip')"
            class="fas fa-info-circle phone-tip"
            data-toggle="tooltip"
            data-placement="top"
          />
          <div v-if="errors.phone != undefined" class="error-msg">
            {{ errors.phone[0] }}
          </div>
        </div>
        <p
          v-if="!emailRegistered"
          class="mx-auto mb-2 text-left text-14 fw-200"
        >
          {{ $t('birthdate') }}
        </p>
        <div
          v-if="!emailRegistered"
          class="mb-2 form-group d-flex positon-relative"
        >
          <select
            :class="[
              errors.month != undefined ? 'is-invalid' : '',
              'form-control',
            ]"
            v-model="month"
            name="month"
            required="required"
            @change.once="handleInputChange($event)"
          >
            <option class="p-0" value="0" disabled>{{ $t('month') }}</option>
            <option class="p-0" value="1">{{ $t('Jan') }}</option>
            <option class="p-0" value="2">{{ $t('Feb') }}</option>
            <option class="p-0" value="3">{{ $t('Mar') }}</option>
            <option class="p-0" value="4">{{ $t('Apr') }}</option>
            <option class="p-0" value="5">{{ $t('May') }}</option>
            <option class="p-0" value="6">{{ $t('Jun') }}</option>
            <option class="p-0" value="7">{{ $t('Jul') }}</option>
            <option class="p-0" value="8">{{ $t('Aug') }}</option>
            <option class="p-0" value="9">{{ $t('Sep') }}</option>
            <option class="p-0" value="10">{{ $t('Oct') }}</option>
            <option class="p-0" value="11">{{ $t('Nov') }}</option>
            <option class="p-0" value="12">{{ $t('Dec') }}</option>
          </select>
          <select
            :class="[
              errors.day != undefined ? 'is-invalid' : '',
              'form-control',
            ]"
            v-model="day"
            name="day"
            required
            @change.once="handleInputChange($event)"
          >
            <option class="p-0" value="0" disabled>{{ $t('day') }}</option>
            <option
              v-for="i in maxNumberOfDays(month, year)"
              :value="i"
              :key="i"
              class="p-0"
            >
              {{ i }}
            </option>
          </select>
          <select
            :class="[
              errors.year != undefined ? 'is-invalid' : '',
              'form-control',
            ]"
            v-model="year"
            name="year"
            required
            @change.once="handleInputChange($event)"
          >
            <option class="p-0" value="0" disabled>{{ $t('year') }}</option>
            <option v-for="i in years" :value="i" :key="i" class="p-0">
              {{ i }}
            </option>
          </select>
          <i
            :title="$t('birthdate_tip')"
            class="fas fa-info-circle birthday-tip position-relative"
            data-toggle="tooltip"
            data-placement="top"
          />
          <div
            v-if="
              errors.year != undefined ||
              errors.month != undefined ||
              errors.day != undefined
            "
            class="error-msg"
          >
            {{ $t('birthdate_error') }}
          </div>
        </div>
        <div
          v-if="!emailRegistered"
          class="pb-3 mx-auto mb-2 form-group position-relative"
        >
          <label class="my-0 text-11 fw-200">
            <input
              v-model="marketingOptIn"
              type="checkbox"
              name="marketing_opt_in"
              class="mr-1"
              value="true"
            />
            {{ $t('marketing_opt_in') }}
          </label>
          <i
            :title="$t('marketing_opt_in_tip')"
            class="fas fa-info-circle marketing-opt-in-tip"
            data-toggle="tooltip"
            data-placement="top"
          />
        </div>
        <div
          v-if="errors.teacherRegistrationCode != undefined"
          class="mb-2 text-center error-msg"
        >
          {{ errors.teacherRegistrationCode[0] }}
        </div>
        <div
          v-if="errors.generic != undefined"
          class="mb-2 text-center error-msg"
        >
          {{ errors.generic }}
        </div>
        <button
          v-if="!emailRegistered"
          id="create_account"
          :disabled="formSubmitting"
          type="submit"
          class="mx-auto mb-3 btn btn-primary btn-round d-block w-200px btn-drop-shadow text-18"
        >
          {{ $t('create_account') }}
        </button>
        <p v-if="!emailRegistered" class="my-0 text-14 fw-200">
          {{ $t('sign_in_message') }}
          <a :href="loginURL" class="parent_login fw-600">
            {{ $t('sign_in') }}
          </a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
// import startCase from 'lodash/startCase'
// import camelCase from 'lodash/camelCase'
// import capitalize from 'lodash/capitalize'
import range from 'lodash/range'
import {TheMask} from 'vue-the-mask'

export default {
  props: {
    csrf: {
      type: String,
      default: '',
    },
    loginURL: {
      type: String,
      default: '',
    },
    old: {
      type: Array,
      default: null,
    },
    registerURL: {
      type: String,
      default: '',
    },
    socialRegisterURL: {
      type: String,
      default: '',
    },
    homeURL: {
      type: String,
      default: '',
    },
  },
  components: {TheMask},
  data() {
    return {
      year: 0,
      month: 0,
      day: 0,
      firstName: '',
      lastName: '',
      email: '',
      emailConfirmation: '',
      phone: '',
      password: '',
      errors: [],
      emailRegistered: false,
      marketingOptIn: false,
      validationLoaded: false,
      formSubmitting: false,
    }
  },
  computed: {
    years() {
      return range(new Date().getFullYear(), 1927, -1)
    },
    isSocialRegistration() {
      if (this.$store.getters.getUserType === 'incompleteProfile') {
        return true
      }
      return false
    },
    errorMessages() {
      return {
        firstName: this.$t('error_messages.firstName'),
        lastName: this.$t('error_messages.lastName'),
        email: this.$t('error_messages.email'),
        emailConfirmation: this.$t('error_messages.emailConfirmation'),
        password: this.passwordErrorMessage,
        phoneNumber: this.$t('error_messages.phone_number'),
        month: this.$t('error_messages.month'),
        day: this.$t('error_messages.day'),
        year: this.$t('error_messages.year'),
      }
    },
    passwordErrorMessage() {
      if (this.password.length === 0) {
        return this.$t('error_messages.password[0]')
      }

      return this.$t('error_messages.password[1]')
    },
  },
  mounted() {
    this.hjTrigger('dash-registration')
    // load all tooltips
    // $('[data-toggle="tooltip"]').tooltip()

    // if (this.$store.getters.getUserType === 'incompleteProfile') {
    //   this.old = this.$store.state.User
    // }
    const missingBirthday =
      this.old.year > 0 && this.old.month > 0 && this.old.day > 0
    const incompleteProfile =
      this.$store.getters.getUserType === 'incompleteProfile'
    if (missingBirthday || incompleteProfile) {
      this.year = Number(this.old.year)
      this.month = Number(this.old.month)
      this.day = Number(this.old.day)
      this.firstName = this.old.firstName
      this.lastName = this.old.lastName
      this.email = this.old.email
      this.emailConfirmation = this.old.emailConfirmation
      this.phone = this.old.phone
      this.marketing_opt_in = this.old.marketing_opt_in
    }

    const inputs = document.querySelectorAll('input')
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener(
        'invalid',
        event => {
          this.validationError(event)
        },
        false,
      )
    }

    if (this.isSocialRegistration) {
      // dataLayer.push({
      //   event: 'vpv',
      //   vpvUrl: '/virtual/createAccount/googleSignUpForm',
      //   vpvTitle: 'Registration Form – Google Signup Form',
      // })
    } else {
      // dataLayer.push({
      //   event: 'vpv',
      //   vpvUrl: '/virtual/createAccount/emailSignUpForm',
      //   vpvTitle: 'Registration Form -- Email Signup Form',
      // })
    }
  },
  methods: {
    _verify(event) {
      this.formSubmitting = true
      this.errors = []
      if (this.year === 0 || this.month === 0 || this.day === 0) {
        if (event) event.preventDefault()
        this.year === 0
          ? (this.errors.year = true)
          : (this.errors.year = undefined)
        this.month === 0
          ? (this.errors.month = true)
          : (this.errors.month = undefined)
        this.day === 0
          ? (this.errors.day = true)
          : (this.errors.day = undefined)
        this.$forceUpdate()
        return
      }

      const bd = new Date(this.year + 13, this.month - 1, this.day)
      if (bd >= new Date()) {
        if (event) event.preventDefault()
        this.$emit('registration-error')
        this.formSubmitting = false
      } else {
        event.preventDefault()
        this.register()
      }
    },
    validateEmail() {
      // prevent ajax if the email is blank and reset the form
      if (this.email === '') {
        this.resetForm()
        return
      }

      this.$axios
        .post('/v3/api/register/email-address', {emailAddress: this.email})
        .then(response => {
          if (response.data.email_available === false) {
            this.emailRegistered = true
          } else if (
            this.emailRegistered === true &&
            response.data.email_available === true
          ) {
            this.resetForm()
          }
        })
        .catch(error => {
          // Lets fail back to the normal post validations if ajax gets an error
          this.resetForm(error)
        })
    },
    register() {
      const postUrl = this.isSocialRegistration
        ? this.socialRegisterUrl
        : this.registerUrl
      const postData = {
        csrf: this.csrf,
        year: this.year,
        month: this.month,
        day: this.day,
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
        isSocialRegistration: this.isSocialRegistration,
        teacherRegistrationCode: this.$parent.teacherRegistrationCode,
        marketingOptIn: this.marketingOptIn,
      }
      if (!this.isSocialRegistration) {
        postData.email = this.email
        postData.emailConfirmation = this.emailConfirmation
        postData.password = this.password
      }
      this.$axios
        .post(postUrl, postData)
        .then(response => {
          if (response.status === 200) {
            if (this.$store.getters.getUserType === 'parent') {
              this.gaEvent(
                'Titan Registration',
                'Parent Registration',
                'Started',
              )
            } else {
              this.gaEvent(
                'Titan Registration',
                'Teacher Registration',
                'Started',
              )
            }

            if (this.isSocialRegistration) {
              // dataLayer.push({
              //   event: 'vpv',
              //   vpvUrl: '/virtual/createAccount/googleSignUpComplete',
              //   vpvTitle: 'Registration Form – Google Signup Completed',
              // })
            } else {
              // dataLayer.push({
              //   event: 'vpv',
              //   vpvUrl: '/virtual/createAccount/emailSignUpComplete',
              //   vpvTitle: 'Registration Form – Email Signup Completed',
              //   acountType: capitalize(this.$store.getters.getUserType),
              // })
            }

            this.$emit('registration-successful', response)
          } else {
            this.showErrors(response.errors)
          }
          this.formSubmitting = false
        })
        .catch(error => {
          this.formSubmitting = false
          if (error.response.status === 409) {
            this.emailRegistered = true
          } else {
            this.showErrors(error.response)
          }
        })
    },
    resetForm() {
      this.emailConfirmation = ''
      this.emailRegistered = false
    },
    showErrors(errors) {
      if (typeof errors.data === 'object') {
        if (typeof errors.data.errors === 'object' && errors.data.errors) {
          this.errors = errors.data.errors
        } else if (
          typeof errors.data.message === 'string' &&
          errors.data.message
        ) {
          this.errors.generic = errors.data.message
        } else {
          this.errors.generic = this.$t('general_error')
        }
      } else {
        this.errors.generic = this.$t('general_error')
      }
    },
    maxNumberOfDays(month, year) {
      if (month === 2) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
          return 29
        } else {
          return 28
        }
      } else if (month === 4 || month === 6 || month === 9 || month === 11) {
        return 30
      }
      return 31
    },
    handleInputChange(e) {
      const name = e.target.getAttribute('name')
      if (name === 'month' || name === 'day' || name === 'year') {
        // dataLayer.push({
        //   event: 'vpv',
        //   vpvUrl: `vfields/createAccount/DoB${name}`,
        //   vpvTitle: `Registration Form -- Date of Birth ${capitalize(
        //     name,
        //   )} Field`,
        // })
      } else if (name === 'email') {
        this.updateDataLayer(`${name}Field`)
        this.validateEmail()
      } else {
        this.updateDataLayer(`${name}Field`)
      }
    },
    updateDataLayer(field, title = null) {
      // dataLayer.push({
      //   event: 'vpv',
      //   vpvUrl: `vfields/createAccount/${camelCase(field)}`,
      //   vpvTitle: title || `Registration Form -- ${startCase(field)}`,
      // })
    },
    validationError(event) {
      if (!this.validationLoaded) {
        this.validationLoaded = true
        return
      }
      return ''
      // dataLayer.push({
      //   event: 'gaEvent',
      //   eventCategory: 'Account Creation Form Errors',
      //   eventAction: event.target.name,
      //   eventLabel: event.target.validationMessage,
      // })
    },
  },
}
</script>

<style scoped>
a.btn {
  color: #fff;
}
#email-registered-error {
  font-size: 15px;
}
</style>
