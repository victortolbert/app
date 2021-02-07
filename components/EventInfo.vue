<template>
  <div class="w-full max-w-4xl mx-auto">
    <div class="pr-8">
      <span>{{ $t('event_date') }}</span>
      <b>{{ eventDate }}</b>
    </div>

    <div v-if="daysRemaining && displayDaysRemaining">
      <b>{{ daysRemaining }}</b>
      {{ $t('days_remaining') }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventInfo',
  props: {
    displayDaysRemaining: {
      type: Boolean,
      default: true,
    },
    funRun: {
      type: String,
      default: '',
    },
  },
  computed: {
    funRunIgnoreTimeZone() {
      return new Date(this.funRun.replace(/-/g, '/').replace(/T.+/, ''))
    },
    eventDate() {
      let month = this.funRunIgnoreTimeZone.getMonth() + 1
      let day = this.funRunIgnoreTimeZone.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      return month + '/' + day + '/' + this.funRunIgnoreTimeZone.getFullYear()
    },
    daysRemaining() {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const days = Math.ceil(
        (this.funRunIgnoreTimeZone - today.getTime()) / (1000 * 60 * 60 * 24),
      )
      if (days < 0) {
        return 0
      }

      return days
    },
  },
}
</script>
