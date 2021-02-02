<template>
  <div class="max-w-sm pb-2 mx-auto bg-white shadow-lg rounded-xl">
    <div class="overflow-x-scroll modal-card" style="width: auto">
      <button
        type="button"
        class="absolute mb-4 bg-transparent modal-close inner-modal-close modal-close-btn-position is-large"
        aria-label="close"
        @click="cancel"
      >
        &times;
      </button>
      <h2 class="pt-4 pb-2 text-2xl font-bold text-center">
        {{ $t('edit_profile.shipping_information') }}
      </h2>
      <div
        v-if="address"
        class="w-3/4 max-w-xs px-6 pt-2 pb-2 mx-auto leading-normal text-center border-b-2 border-grey"
      >
        <h4 class="text-lg font-bold">{{ $t('edit_profile.you_entered') }}:</h4>
        <p class="pl-2">{{ address }}</p>
        <p v-if="address2" class="pl-2">{{ address2 }}</p>
        <p class="pl-2">{{ city }} {{ state }}</p>
        <p class="pl-2">{{ zip }}</p>
      </div>
      <div class="mx-auto">
        <div
          v-if="suggestedAddresses.length > 0"
          class="px-6 py-2 mx-auto leading-normal whitespace-no-wrap"
        >
          <h4 class="text-lg font-bold text-center">
            {{ $t('edit_profile.recommended_addresses ') }}:
          </h4>
          <div
            v-for="(suggestedAddress, i) in suggestedAddresses"
            :key="i"
            class="p-2 control"
          >
            <div class="columns">
              <label
                class="radio"
                @click="updateSelectedAddress(suggestedAddress)"
              >
                <div class="column">
                  <input
                    :checked="i === 0"
                    name="confirmedAddress"
                    type="radio"
                    class="inline-block float-left mx-4 my-5"
                  />
                  <div class="inline-block">
                    <p
                      v-for="(addressLine, j) in suggestedAddress.address"
                      :key="j"
                      class="pl-2"
                    >
                      {{ addressLine }}
                    </p>
                    <p class="pl-2">
                      {{ suggestedAddress.city }} {{ suggestedAddress.state }}
                    </p>
                    <p class="pl-2">{{ suggestedAddress.zip }}</p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div v-if="suggestedAddresses.length === 0">
          <p class="px-6 pt-2 pb-5 text-center">
            {{ $t('edit_profile.address_not_found') }}
          </p>
        </div>
        <div class="px-6 pb-2 mx-auto leading-normal whitespace-no-wrap">
          <div class="px-2 control">
            <div class="columns">
              <label class="radio">
                <div class="column">
                  <input
                    :checked="suggestedAddresses.length === 0"
                    name="confirmedAddress"
                    type="radio"
                    class="inline-block float-left mx-4"
                    @click="setEnteredAddress"
                  />
                  <div class="inline-block">
                    <p class="pl-2">
                      {{ $t('edit_profile.use_entered_address') }}
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="px-6 controls">
        <div class="pb-1 mt-5 text-center">
          <div class="max-w-md mx-0 md:mx-auto">
            <div>
              <button
                type="submit"
                class="inline-block w-64 mb-4 shadow button is-secondary is-rounded"
                @click="confirmed"
              >
                {{ submitBtnText }}
              </button>
              <button
                type="button"
                class="inline-block w-64 mb-4 shadow button border-grey-dark text-grey-dark is-rounded is-outlined"
                @click="cancel"
              >
                {{ $t('cancel') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShippingModal',
  props: {
    address: {
      type: String,
      default: '',
    },
    address2: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
    zip: {
      type: String,
      default: '',
    },
    suggestedAddresses: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedAddress: {
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
      },
    }
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
    submitBtnText() {
      return this.suggestedAddresses.length > 0
        ? this.$t.edit_profile.submit
        : this.$t.edit_profile.confirm
    },
  },
  mounted() {
    this.setSelectedAddress()
  },
  methods: {
    cancel() {
      this.$emit('close')
      this.unBlur()
      return false
    },
    confirmed() {
      this.$emit('addressConfirmed', this.selectedAddress)
      this.$emit('close')
      this.unBlur()
      return false
    },
    setSelectedAddress() {
      if (this.suggestedAddresses.length > 0) {
        this.updateSelectedAddress(this.suggestedAddresses[0])
      } else {
        this.setEnteredAddress()
      }
    },
    setEnteredAddress() {
      this.selectedAddress.address = this.address
      this.selectedAddress.address2 = this.address2
      this.selectedAddress.city = this.city
      this.selectedAddress.state = this.state
      this.selectedAddress.zip = this.zip
    },
    updateSelectedAddress(address) {
      if (address) {
        this.selectedAddress.address = address.address[0]
        if (typeof address.address[1] !== 'undefined') {
          this.selectedAddress.address2 = address.address[1]
        }
        this.selectedAddress.city = address.city
        this.selectedAddress.state = address.state
        this.selectedAddress.zip = address.zip
      }
    },
  },
}
</script>
