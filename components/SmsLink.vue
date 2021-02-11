<template>
  <div class="sms-link">
    <a :href="smsLink" class="border-0" @click="gaTrack">
      <FontAwesomeIcon :icon="['fas', 'comment']" class="text-2xl" />
    </a>
    <!-- eslint-disable -->
    <span class="text-sm lg:hidden" v-html="$t('sms_link')" />
  </div>
</template>

<script>
export default {
  name: 'SmsLink',
  props: {
    program: {
      type: Object,
      default: undefined,
    },
    gaPageLocation: {
      type: String,
      default: 'Student Card Header Section',
    },
    gaSiteLocation: {
      type: String,
      default: 'Parent Dashboard',
    },
    link: {
      type: String,
      default: '',
    },
  },
  computed: {
    smsLink() {
      const template = this.parseLanguage(this.$t('share_sms_template'), {
        eventName: this.program.decoded_event_name,
        link: this.link,
      })

      return 'sms:?&body=' + template.replace(/&/g, 'and')
    },
  },
  methods: {
    gaTrack() {
      const action =
        'Share Button: ' + this.type + (this.hasVideo ? ' video' : '')
      this.gaEvent(this.gaSiteLocation, this.gaPageLocation, action)
    },
    parseLanguage(lang, vals) {
      for (const value in vals) {
        lang = lang.replace(new RegExp(`:${value}`, 'g'), vals[value])
      }

      return lang
    },
  },
}
</script>

<style>
.sms-link {
  @apply flex;
  @apply flex-col;
}
.sms-link a {
  @apply flex;
  @apply items-center;
  @apply justify-center;
  @apply w-12;
  @apply h-12;
  @apply mx-auto;
  @apply text-white;
  @apply bg-sms;
  @apply rounded-full;
  @apply shadow;
  @apply cursor-pointer;
}

.sms-link a:hover {
  @apply text-white;
}

@screen lg {
  .sms-link a {
    @apply hidden;
  }
}
</style>
