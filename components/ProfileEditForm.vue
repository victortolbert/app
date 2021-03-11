<template>
  <form
    novalidate
    role="form"
    class="px-3"
    @submit.prevent="
      $store.getters.requiresShipping ? validateAndSave : saveFormData
    "
  >
    <legend class="mb-4 text-lg font-semibold">
      {{ $t('edit_profile_title') }}
    </legend>

    <!-- First Name -->
    <BaseInput
      v-model.trim="form.first_name"
      :v="$v.form.first_name"
      :label="$t('first_name_label')"
      :placeholder="$t('first_name_placeholder')"
      :show-asterisk="false"
      required
    />

    <!-- Last Name -->
    <BaseInput
      v-model.trim="form.last_name"
      :v="$v.form.last_name"
      :label="$t('last_name_label')"
      :placeholder="$t('last_name_placeholder')"
      :show-asterisk="false"
      required
    />

    <!-- Email Address -->
    <BaseInput
      v-model.trim="form.email"
      :v="$v.form.email"
      :label="$t('email_label')"
      :placeholder="$t('email_placeholder')"
      :help-text="$t('email_help_text')"
      :show-asterisk="false"
      type="email"
      required
    />

    <!-- Change Password Button -->
    <div class="mb-4 field">
      <button
        class="inline-block px-2 py-1 my-4 font-normal underline rounded-lg text-secondary hover:text-black focus:outline-none focus:shadow-outline"
        @click.prevent="showChangePasswordModal"
      >
        {{ $t('change_password') }}
      </button>
    </div>

    <!-- Phone Number -->
    <BaseInput
      v-model="form.phone"
      :v="$v.form.phone"
      :label="$t('phone_label')"
      :placeholder="$t('phone_placeholder')"
      :help-text="$t('phone_help_text')"
      :show-asterisk="false"
      type="tel"
      mask="(###) ###-####"
      required
    />

    <!-- Month, Day, Year-->
    <div class="mb-4 field">
      <label
        for="birthday"
        class="inline-block pl-2 mb-1 text-sm text-grey-darker"
      >
        {{ $t('birthday_label') }}
      </label>
      <div class="flex items-start justify-between -mx-2">
        <div class="w-1/3 mx-2">
          <div
            :class="{'is-danger border-red-600': $v.form.dob.$invalid}"
            class="w-full select"
          >
            <select v-model="birthMonth" class="w-full" required>
              <option disabled>{{ $t('month') }}</option>
              <option
                v-for="month in months"
                :key="month.value"
                :value="month.value"
              >
                {{ month.label }}
              </option>
            </select>
          </div>
        </div>
        <div class="w-1/3 mx-2">
          <div
            :class="{'is-danger border-red-600': $v.form.dob.$invalid}"
            class="w-full select"
          >
            <select v-model="birthDay" class="w-full" required>
              <option disabled>{{ $t('day') }}</option>
              <option
                v-for="i in maxNumberOfDays(birthMonth, birthYear)"
                :value="padWithZero(i)"
                :key="i"
              >
                {{ i }}
              </option>
            </select>
          </div>
        </div>
        <div class="w-1/3 mx-2">
          <div
            :class="{'is-danger border-red-600': $v.form.dob.$invalid}"
            class="w-full select"
          >
            <select v-model="birthYear" class="w-full">
              <option disabled>{{ $t('year') }}</option>
              <option v-for="i in years" :value="i" :key="i">{{ i }}</option>
            </select>
          </div>
        </div>
      </div>
      <p
        v-if="$v.form.dob.$invalid"
        class="pl-2 text-xs text-red-500 help is-danger"
      >
        {{ $t('minimum_age_error') }}
      </p>
      <p v-if="!$v.form.dob.$invalid" class="pl-2 text-xs help">
        {{ $t('dob_help_text') }}
      </p>
    </div>

    <!-- Shipping Address Information -->
    <div v-if="$store.getters.requiresShipping" class="mt-8">
      <legend class="mb-4 text-lg font-semibold">
        {{ $t('shipping_title') }}
      </legend>

      <BaseInput
        v-model.trim="form.address"
        :v="$v.form.address"
        :label="$t('address')"
        :placeholder="$t('address_placeholder')"
        :required="true"
        :show-asterisk="false"
      />

      <BaseInput
        v-model.trim="form.address2"
        :v="$v.form.address2"
        :label="$t('address2')"
        :placeholder="$t('address2_placeholder')"
        :required="false"
        :show-asterisk="false"
      />

      <BaseInput
        v-model.trim="form.city"
        :v="$v.form.city"
        :label="$t('city')"
        :placeholder="$t('city_placeholder')"
        :required="true"
        :show-asterisk="false"
      />

      <label
        for="state"
        class="inline-block pl-2 mt-2 mb-1 text-sm text-grey-700"
      >
        {{ $t('state') }}
      </label>

      <div
        :class="{'is-danger border-red-600': $v.form.state.$invalid}"
        class="w-full select"
      >
        <select v-model.trim="form.state" :required="true" class="w-full">
          <option selected disabled>State</option>
          <option
            v-for="(state, index) in $store.state.states"
            :key="index"
            :value="state.state_code"
          >
            {{ state.name }}
          </option>
        </select>
      </div>

      <BaseInput
        v-model.trim="form.zip"
        :v="$v.form.zip"
        :label="$t('zip_code')"
        :placeholder="$t('zip_code_placeholder')"
        :required="true"
        :show-asterisk="false"
        class="mt-4"
        maxlength="10"
      />
    </div>

    <!-- Buttons -->
    <div class="pb-10 my-10 text-center">
      <div class="max-w-md mx-0 md:mx-auto">
        <div class="flex flex-col items-center justify-center">
          <button
            type="submit"
            class="inline-block w-full py-2 mb-4 text-lg font-semibold leading-none text-white rounded-full shadow-md sm:w-64 focus:outline-none focus:shadow-outline bg-secondary"
          >
            {{ $t('edit_profile.save') }}
          </button>
          <NuxtLink
            :to="{name: 'parent-dashboard'}"
            tag="button"
            class="inline-block w-full py-2 mb-4 text-lg font-semibold leading-none bg-white border rounded-full shadow-md sm:w-64 focus:outline-none focus:shadow-outline text-secondary hover:text-secondary-light border-secondary hover:border-secondary-light"
          >
            {{ $t('edit_profile.cancel') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import range from 'lodash/range'
import required from 'vuelidate/lib/validators/required'
import email from 'vuelidate/lib/validators/email'
import {mask} from 'vue-the-mask'
import {
  notBooster,
  meetsMinimumAge,
  isPhone,
} from '~/utilities/customValidators'

export default {
  name: 'EditProfileForm',
  directives: {mask},
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      test: null,
      focused: false,
      isLoading: false,
      hasError: false,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dob: '0000-00-00',
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
      },
      months: [
        {
          value: '01',
          label: this.$t('month_january'),
        },
        {
          value: '02',
          label: this.$t('month_february'),
        },
        {
          value: '03',
          label: this.$t('month_march'),
        },
        {
          value: '04',
          label: this.$t('month_april'),
        },
        {
          value: '05',
          label: this.$t('month_may'),
        },
        {
          value: '06',
          label: this.$t('month_jun'),
        },
        {
          value: '07',
          label: this.$t('month_july'),
        },
        {
          value: '08',
          label: this.$t('month_august'),
        },
        {
          value: '09',
          label: this.$t('month_september'),
        },
        {
          value: '10',
          label: this.$t('month_october'),
        },
        {
          value: '11',
          label: this.$t('month_november'),
        },
        {
          value: '12',
          label: this.$t('month_december'),
        },
      ],
    }
  },
  computed: {
    years() {
      return range(new Date().getFullYear(), 1927, -1)
    },
    shipping() {
      if (this.$store.state.user.shipping) {
        return this.$store.state.user.shipping
      }

      return {
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
      }
    },
    birthDay: {
      get() {
        return this.form.dob.split('-')[2]
      },
      set(value) {
        const parts = this.form.dob.split('-')
        parts[2] = value
        const dob = parts.join('-')
        this.form = Object.assign({}, this.form, {dob})
      },
    },
    birthMonth: {
      get() {
        return this.form.dob.split('-')[1]
      },
      set(value) {
        const parts = this.form.dob.split('-')
        parts[1] = value
        const dob = parts.join('-')
        this.form = Object.assign({}, this.form, {dob})
      },
    },
    birthYear: {
      get() {
        return parseInt(this.form.dob.split('-')[0])
      },
      set(value) {
        const parts = this.form.dob.split('-')
        parts[0] = value
        const dob = parts.join('-')
        this.form = Object.assign({}, this.form, {dob})
      },
    },
    tooltipOptions() {
      return {
        classes: ['info'],
        content: this.$t('edit_profile.tooltip'),
        placement: 'auto-start',
        trigger: 'hover click focus',
      }
    },
  },
  mounted() {
    const {firstName, lastName, email, dob, phone} = this.user
    const address = this.shipping.address
    const address2 = this.shipping.address2
    const city = this.shipping.city
    const state = this.shipping.state
    const zip = this.shipping.zip
    this.form = {
      firstName,
      lastName,
      email,
      dob,
      phone,
      address,
      address2,
      city,
      state,
      zip,
    }
  },
  validations() {
    if (this.$store.getters.requiresShipping) {
      return {
        form: {
          firstName: {required},
          lastName: {required},
          email: {required, email, notBooster},
          phone: {required, isPhone},
          dob: {required, meetsMinimumAge},
          address: {required},
          address2: {},
          city: {required},
          state: {required},
          zip: {required},
        },
      }
    }

    return {
      form: {
        firstName: {required},
        lastName: {required},
        email: {required, email, notBooster},
        phone: {required, isPhone},
        dob: {required, meetsMinimumAge},
      },
    }
  },
  methods: {
    padWithZero(day) {
      if (day < 10) {
        return `0${day}`
      }
      return day
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
    getSubmitData() {
      return {
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        email: this.form.email,
        phone: this.form.phone,
        dob: this.form.dob,
        address: this.form.address,
        address2: this.form.address2,
        city: this.form.city,
        state: this.form.state,
        zip: this.form.zip,
      }
    },
    validateAndSave() {
      this.$v.$touch()
      this.$forceUpdate()

      // if (this.$v.$invalid) return

      // const submitData = this.getSubmitData()

      // this.$axon.create('shipping/validate', submitData).then(response => {
      //   if (response.data.status === 'accept') {
      //     const newAddress = response.data.addresses[0]
      //     this.form.address = newAddress.address.shift()
      //     this.form.city = newAddress.city
      //     this.form.state = newAddress.state
      //     this.form.zip = newAddress.zip

      //     this.saveFormData()
      //   } else {
      //     this.openShippingModal(response.data.addresses)
      //   }
      // })
    },
    saveFormData() {
      this.$v.$touch()
      this.$forceUpdate()

      // if (this.$v.$invalid) return

      // const submitData = this.getSubmitData()

      // this.$axon.create('parent/update', submitData).then(response => {
      //   const userUpdate = this.form

      //   if (this.$store.getters.requiresShipping) {
      //     userUpdate.shipping = this.getFormShippingAddress()
      //   }

      //   this.$store.commit('UPDATE_USER', userUpdate)

      //   this.showSaveSuccessModal()
      // })
    },
    showSaveSuccessModal() {
      // this.$modal.open({
      //   parent: this,
      //   component: SaveSuccessModal,
      //   scroll: 'keep',
      //   hasModalCard: true,
      //   canCancel: false,
      //   props: {
      //     title: this.$t('edit_profile.saved_successfully,
      //   },
      // })
    },
    showChangePasswordModal() {
      this.addClass(document.querySelector('body'), 'modal-is-open')

      // this.$modal.open({
      //   parent: this,
      //   component: ChangePasswordModal,
      //   hasModalCard: true,
      //   canCancel: ['escape', 'outside'],
      //   onCancel: () => {
      //     this.removeClass(document.querySelector('body'), 'modal-is-open')
      //   },
      // })
    },
    addClass(element, className) {
      element.classList.add(className)
    },
    removeClass(element, className) {
      element.classList.remove(className)
    },
    openShippingModal(suggestedAddresses) {
      // this.$modal.open({
      //   parent: this,
      //   component: ShippingModal,
      //   hasModalCard: false,
      //   canCancel: ['escape', 'outside'],
      //   width: 'auto',
      //   onCancel: this.unBlur,
      //   props: {
      //     address: this.form.address,
      //     address_2: this.form.address_2,
      //     city: this.form.city,
      //     state: this.form.state,
      //     zip: this.form.zip,
      //     suggestedAddresses,
      //   },
      //   events: {
      //     addressConfirmed: address => {
      //       this.updateAddressAndSubmit(address)
      //     },
      //   },
      // })
      // this.blur()
    },
    updateAddressAndSubmit(newAddress) {
      this.form.address = newAddress.address
      this.form.city = newAddress.city
      this.form.state = newAddress.state
      this.form.zip = newAddress.zip

      if (typeof newAddress.address2 !== 'undefined') {
        this.form.address2 = newAddress.address2
      }

      this.saveFormData()
    },
    getFormShippingAddress() {
      return {
        address: this.form.address,
        address2: this.form.address2,
        city: this.form.city,
        state: this.form.state,
        zip: this.form.zip,
      }
    },
  },
}
</script>
