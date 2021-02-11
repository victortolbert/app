<template>
  <div class="flex flex-col email-link">
    <a
      :href="`mailto:?body=${getBody()}&subject=${getSubject()}`"
      class="border-0 is-mobile"
      @click="gaTrack"
    >
      <FontAwesomeIcon icon="envelope" class="text-2xl pointer-events-none" />

      <span class="hidden pointer-events-none lg:inline">
        {{ $t('email_link') }}
      </span>
    </a>

    <span class="text-sm lg:hidden">
      {{ $t('email_link') }}
    </span>

    <a
      :href="`mailto:?body=${getBody()}&subject=${getSubject()}`"
      class="border-0 is-desktop"
      @click="gaTrack"
    >
      <FontAwesomeIcon
        icon="envelope"
        class="mr-2 text-2xl pointer-events-none"
      />

      <span class="pointer-events-none">
        {{ $t('email_link') }}
      </span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'EmailLink',
  props: {
    program: {
      type: Object,
      default: undefined,
    },
    link: {
      type: String,
      default: '',
    },
  },
  methods: {
    gaTrack() {
      const action =
        'Share Button: ' + this.type + (this.hasVideo ? ' video' : '')
      this.gaEvent(this.gaSiteLocation, this.gaPageLocation, action)
    },
    getSubject() {
      return this.$t('share_email_template_subject')
    },
    getBody() {
      const emailTemplate = this.parseLanguage(
        this.$t('share_email_template_body'),
        {
          eventName: this.program.decoded_event_name,
          link: this.link,
        },
      )
      return encodeURIComponent(emailTemplate)
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

<style lang="postcss">
.email-link {
  @apply flex-wrap w-1/4 text-center;
}

.email-link a {
  @apply flex items-center justify-center mx-auto font-semibold text-white rounded-full bg-emailer shadow cursor-pointer;
}

.email-link a:focus {
  @apply outline-none shadow-inner;
}

.email-link a:hover {
  @apply text-white;
}

.email-link a.is-mobile {
  @apply w-12 h-12;
}

.email-link a.is-desktop {
  @apply hidden;
}

@screen lg {
  .email-link a.is-mobile {
    @apply hidden;
  }

  .email-link a.is-desktop {
    @apply w-full flex px-2 py-2;
  }
}
</style>
