<template>
  <form
    id="donationform"
    class="flex flex-col"
    @submit.prevent="handleCreditCardPayment"
  >
    <h2 class="pt-10 mt-8 text-3xl text-center md:text-4xl">
      Please enter your credit card details
    </h2>
    <p class="pt-2 text-gray-700">
      Don't worry. Payments are processed through Stripe
    </p>

    <label
      class="flex flex-col items-center justify-between py-4 pt-12 text-md md:text-xl md:flex-row"
    >
      <span class="font-bold"> Donation Amount (in Euro): </span>
      <input
        v-model="amount"
        class="px-3 py-2 text-right border border-gray-400 shadow-inner appearance-none"
        lang="en-150"
        max="10000.00"
        min="0.50"
        placeholder="13.37"
        step="0.01"
        type="number"
      />
    </label>
    <label
      ref="email"
      class="flex flex-col items-center justify-between py-4 text-lg md:text-xl md:flex-row"
    >
      <span class="font-bold"> Your e-mail (optional): </span>
      <input
        v-model="email"
        class="px-3 py-2 text-right border border-gray-400 shadow-inner appearance-none"
        placeholder="you@areaweso.me"
        type="email"
      />
    </label>
    <label
      class="flex flex-col items-center justify-between py-4 text-md md:text-xl md:flex-row"
    >
      <span class="font-bold"> Leave me a message (optional): </span>
      <input
        v-model="message"
        class="px-3 py-2 text-right border border-gray-400 shadow-inner appearance-none"
        placeholder="<3"
      />
    </label>

    <ClientOnly>
      <PaymentButton
        v-if="canRenderPaymentButton"
        class="mt-8"
        :stripe="stripeInstance"
        :options="paymentButtonOptions"
        @available="setPaymentButtonAvailability"
        @received-payment-method="handlePaymentButtonPayment"
      />
      <span
        v-if="isPaymentButtonAvailable && canRenderPaymentButton"
        class="py-4 text-gray-700"
      >
        or enter your credit card info below
      </span>
    </ClientOnly>

    <span class="mt-8 font-bold text-md md:hidden"> Credit Card Info </span>
    <Card
      :class="{'border-green-600': complete}"
      :stripe="$options.stripeKey"
      class="px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-400 rounded shadow-inner"
      @change="complete = $event.complete"
    />
    <p v-if="error" class="my-5 text-lg text-red-500" v-text="error" />

    <button
      :class="loading ? 'cursor-not-allowed' : ''"
      class="px-16 py-2 mx-auto mt-8 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-green-500 border border-green-400 shadow-lg hover:bg-green-400"
    >
      <span v-if="!loading">
        Donate {{ isPaymentButtonAvailable ? 'via credit card' : '' }} ❤️
      </span>
      <span v-else class="inline-flex items-center">
        <svg
          class="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        Processing
      </span>
    </button>
  </form>
</template>

<script>
import {Card, handleCardPayment, instance} from 'vue-stripe-elements-plus'

export default {
  components: {
    Card,
  },
  props: {
    donationType: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      complete: false,
      message: '',
      amount: undefined,
      loading: false,
      error: false,
      invalid: [],
      email: '',
      stripeInstance: null,
      isPaymentButtonAvailable: false,
    }
  },
  computed: {
    amountInCents() {
      return Number(this.amount).toFixed(2) * 100
    },
    canRenderPaymentButton() {
      if (!this.stripeInstance) {
        return false
      }

      if (!this.amountInCents) {
        return false
      }

      return true
    },
    paymentButtonOptions() {
      return {
        paymentRequest: {
          country: 'DE',
          currency: 'eur',
          total: {
            label: 'Donation to Alexander Lichter',
            amount: this.amountInCents,
          },
        },
        style: {
          paymentRequestButton: {
            type: 'donate',
          },
        },
      }
    },
  },
  watch: {
    donationType(type) {
      if (!type) {
        return
      }

      if (type.price === -1) {
        this.amount = undefined
        return
      }

      this.amount = Number(type.price / 100).toFixed(2)
      setTimeout(() => this.$refs.email.focus(), 250)
    },
  },
  mounted() {
    this.stripeInstance = instance
  },
  methods: {
    resetFormData() {
      this.resetFormState()
      this.amount = undefined
      this.email = ''
      this.message = ''
    },
    resetFormState() {
      this.loading = false
      this.error = false
      this.invalid = []
    },
    handleCreditCardPayment() {
      const isFormValid = this.validateForm()
      if (!isFormValid) {
        return
      }

      this.chargeCreditCard()
    },
    async handlePaymentButtonPayment({complete, paymentMethod}) {
      this.loading = true
      const {secret} = await this.createIntent()
      try {
        const {error: confirmError} = await instance.confirmPaymentIntent(
          secret,
          {
            payment_method: paymentMethod.id,
          },
        )

        if (confirmError) {
          complete('fail')
          this.handleError(confirmError.message)
          return
        }

        complete('success')
        this.handleCardPayment(secret, true)
      } catch (e) {
        this.handleError(e.message)
      }
    },
    validateForm() {
      if (this.loading) {
        return false
      }

      this.resetFormState()

      const isNumberInvalid = !this.amount || Number.isNaN(this.amount)

      if (isNumberInvalid) {
        this.invalid.push(['amount'])
      }

      const {amountInCents: amount} = this

      if (this.invalid.length) {
        this.error =
          'The form is not filled correctly. The amount is set wrong.'
        return
      }

      if (amount < 50) {
        this.error = 'Stripe does not accept payments lower than 50 cents'
        return
      }

      if (!this.complete) {
        this.error = 'Your Credit Card details are not correct'
        return
      }

      return true
    },
    async chargeCreditCard() {
      this.loading = true

      try {
        const {secret} = await this.createIntent()
        this.handleCardPayment(secret)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        this.handleError('Could not create intent')
      }
    },
    createIntent() {
      const {email, message, amountInCents: amount} = this

      return this.$http.$post(
        'register-intent',
        {
          amount,
          donationType: this.donationType.slug,
          email,
          message,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    },
    async handleCardPayment(secret, useFreshInstance = false) {
      const handleFn = useFreshInstance
        ? instance.handleCardPayment
        : handleCardPayment
      const [{error}, {Confetti}] = await Promise.all([
        handleFn(secret),
        import('vue-confetti'),
      ])

      if (error) {
        this.handleError((error && error.message) || error)
        return
      }

      this.loading = false

      this.resetFormData()
      this.$emit('completed')
      const confetti = new Confetti()
      confetti.start({})
      setTimeout(() => confetti.stop(), 5000)
    },
    handleError(errorMessage) {
      this.error = errorMessage
      this.loading = false
    },
    setPaymentButtonAvailability(isAvailable) {
      this.isPaymentButtonAvailable = isAvailable
    },
  },
  stripeKey: process.env.stripePublicKey,
}
</script>
