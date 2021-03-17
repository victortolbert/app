<template>
  <div>
    <div class="mx-auto registration-form-constraint d-block">
      <h2 class="mt-4">{{ $t('shipping.title') }}</h2>

      <p class="">{{ $t('shipping.subtitle') }}</p>

      <form class="shipping-address-form">
        <div>
          <textInput
            :label="$t('shipping.address_label')"
            :error="errors.address"
            v-model="form.address"
            type="text"
            name="address"
            required
            @invalid="resetSubmitButton"
          />
        </div>

        <div>
          <textInput
            :label="$t('shipping.address_2_label')"
            :error="errors.address_2"
            v-model="form.address_2"
            type="text"
            name="address_2"
            @invalid="resetSubmitButton"
          />
        </div>

        <div>
          <textInput
            :label="$t('shipping.city_label')"
            :error="errors.city"
            v-model="form.city"
            type="text"
            name="city"
            required
            @invalid="resetSubmitButton"
          />
        </div>

        <selection-input
          :default-value="null"
          :default-text="$t('shipping.state_label.name')"
          :error="errors.state"
          v-model="form.state"
          class="mb-24px blue-rounded"
          name="state"
          required
          @invalid="resetSubmitButton"
        >
          <option value="-1" disabled>
            {{ $t('shipping.state_label.name') }}
          </option>
          <option
            v-for="(stateObject, index) in $store.state.states"
            :key="index"
            :value="stateObject.state_code"
            :selected="stateObject.state_code === form.state"
          >
            {{ stateObject.name }}
          </option>
        </selection-input>

        <textInput
          :label="$t('shipping.zip_label')"
          :error="errors.zip"
          v-model="form.zip"
          type="text"
          name="zip"
          required
          @invalid="resetSubmitButton"
        />

        <button
          :disabled="submitting"
          type="button"
          class="mx-auto mb-1 btn btn-primary btn-round d-block w-200px btn-drop-shadow text-18"
          @click.prevent="validateAndSubmit"
        >
          {{ $t('shipping.save_button_label') }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'ShippingAddress',

  data() {
    return {
      errors: {
        address: null,
        address_2: null,
        city: null,
        state: null,
        zip: null,
      },
      form: {
        address: '',
        address_2: '',
        city: '',
        state: '-1',
        zip: '',
      },
      submitting: false,
    }
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
  },
  methods: {
    ...mapActions(['setSuggestedAddresses', 'setEnteredAddress']),
    getSubmitData() {
      const formData = new FormData()
      formData.append('address', this.form.address)
      formData.append('address_2', this.form.address_2)
      formData.append('city', this.form.city)
      formData.append('state', this.form.state)
      formData.append('zip', this.form.zip)

      return formData
    },
    submit() {
      this.submitting = true
      const submitData = this.getSubmitData()

      this.$axios
        .post('/v3/api/shipping/create', submitData)
        .then(response => {
          this.$emit('address-saved', this.form)
          this.resetSubmitButton()
        })
        .catch(error => {
          this.errors = JSON.parse(error.request.response).errors
          this.resetSubmitButton()
        })
    },
    validateAndSubmit() {
      this.submitting = true

      this.setEnteredAddress({
        address: this.form.address,
        address_2: this.form.address_2,
        city: this.form.city,
        state: this.form.state,
        zip: this.form.zip,
      })

      const submitData = this.getSubmitData()

      this.$axios
        .post('/v3/api/shipping/validate', submitData)
        .then(response => {
          if (response.data.status === 'accept') {
            const newAddress = response.data.addresses[0]
            this.form.address = newAddress.address.join(' ')
            this.form.city = newAddress.city
            this.form.state = newAddress.state
            this.form.zip = newAddress.zip

            this.submit()
          } else {
            this.openShippingModal(response.data.addresses)
          }
          this.resetSubmitButton()
        })
        .catch(error => {
          this.errors = JSON.parse(error.request.response).errors
          this.resetSubmitButton()
        })
    },
    resetSubmitButton() {
      this.submitting = false
    },
    openShippingModal(addresses) {
      this.setSuggestedAddresses(addresses)
      // $('#shippingAddressRegistrationModal').modal('show')
    },
  },
}
</script>

<style>
.shipping-address-form .error-msg {
  text-align: left;
}
</style>
