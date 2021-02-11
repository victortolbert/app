<template>
  <div class="credit-card-inputs">
    <div class="mb-4 card-number">
      <div
        id="card-number"
        :class="{'is-invalid': isInvalid('number')}"
        class="hosted-field"
      />
    </div>

    <div class="grid grid-cols-8 gap-2">
      <div
        id="expiration-date"
        :class="{'is-invalid': isInvalid('expirationDate')}"
        class="col-span-4 mb-2 hosted-field sm:col-span-3"
      />

      <div
        id="cvv"
        :class="{'is-invalid': isInvalid('cvv')}"
        class="col-span-4 mb-2 hosted-field sm:col-span-2"
      />

      <div id="postal-code2" class="col-span-8 mb-2 sm:col-span-3">
        <slot />
      </div>
    </div>

    <p v-if="error.message !== null" class="alert has-error">
      {{ error.message }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'CreditCardInputs',
  props: {
    error: {
      type: Object,
      default() {
        return {
          code: '',
          message: '',
          details: {},
        }
      },
    },
  },
  methods: {
    isInvalid(field) {
      return (
        this.error.code === 'HOSTED_FIELDS_FIELDS_EMPTY' ||
        this.error.details.invalidFieldKeys.includes(field)
      )
    },
  },
}
</script>

<style lang="postcss">
.hosted-field {
  @apply h-10 font-semibold border-gray-200 border-2 block w-full rounded;
  font-size: 1rem !important;
  height: 2.75rem;
}
.hosted-field.is-invalid {
  @apply border-red-200 text-red-200;
  font-size: 1rem !important;
}
</style>
