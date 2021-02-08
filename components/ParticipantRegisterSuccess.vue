<template>
  <div>
    <h1 class="mt-8 mb-4 text-30 fw-500 lh-42 d-block">
      {{ $t('participant_registration.awesome_exclaim') }}
      <br />
      {{ $t('participant_registration.thanks_for_student') }}
    </h1>
    <h3 class="mb-3 text-18 fw-200 lh-22 d-block">
      {{ $t('participant_registration.need_another') }}
    </h3>
    <button
      class="mx-auto mb-3 btn btn-primary btn-round d-4lock w-200px btn-drop-shadow text-18"
      @click="registerAnotherStudent"
    >
      {{ $t('yes') }}
    </button>
    <a
      v-if="requireAddress"
      class="mx-auto mb-3 no-button btn btn-navy btn-round d-block w-200px btn-drop-shadow text-18"
      @click="shippingRegisterComplete"
    >
      {{ $t('no') }}
    </a>
    <a
      v-else
      href="/v3/home/dashboard"
      class="mx-auto mb-3 no-button btn btn-navy btn-round d-block w-200px btn-drop-shadow text-18"
      @click="registerComplete"
      >{{ $t('no') }}</a
    >
  </div>
</template>

<script>
export default {
  props: {
    canShowAddress: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      requireAddress: false,
    }
  },
  mounted() {
    this.hjTrigger('dash-participant-register-success')
    const confetti = this.$confetti
    confetti.start({
      shape: 'rect',
    })

    setTimeout(function () {
      confetti.stop()
    }, 3000)

    const hasProgramWithRequireAddressEnable = this.$store.state.user.participants.find(
      participant => {
        return (
          participant.participant_info.classroom.group.program
            .require_address === 1
        )
      },
    )

    if (this.canShowAddress && hasProgramWithRequireAddressEnable) {
      this.requireAddress = true
    } else {
      this.requireAddress = false
    }
  },
  methods: {
    registerComplete() {
      this.gaEvent('Titan Registration', 'Parent Registration', 'Completed')
    },

    shippingRegisterComplete() {
      this.gaEvent('Titan Registration', 'Parent Registration', 'Completed')
      this.$emit('shipping-address')
    },

    registerAnotherStudent(event) {
      this.gaEvent(
        'Titan Registration',
        'Parent Registration',
        'Additional Participant',
      )
      this.$emit('school-search', event.target.value)
    },
  },
}
</script>
