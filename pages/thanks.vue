<template>
  <main class="thanks-view page">
    <h2>{{ $t('thanks_heading') }}</h2>

    <div
      class="max-w-xl mx-auto mb-10 text-lg text-left"
      v-html="thanksMessage"
    />

    <div v-if="$store.state.program.show_corporate_matching_widget">
      <DoubleTheDonation />
    </div>

    <NuxtLink
      class="flex justify-center mb-8 primary-button"
      tag="button"
      :to="localePath({path: '/give/'})"
    >
      {{ $t('done_button') }}
    </NuxtLink>

    <h3>{{ $t('share_heading') }}</h3>

    <div class="space-x-6 share-this">
      <EmailLink :program="$store.state.program" :link="shareEmailLink" />

      <SmsLink :program="$store.state.program" :link="shareSmsLink" />

      <ShareButton :program="$store.state.program" :link="shareCopyLink" />
    </div>
  </main>
</template>

<script>
export default {
  name: 'ThanksView',
  computed: {
    thanksMessage() {
      if (this.hasThankYouTextOverride) {
        return this.thankYouTextOverride
      }

      return this.defaultThankYouOverride
    },
    thankYouTextOverride() {
      return this.$store.state.program.microsite.clean_thank_you_text_override
    },
    hasThankYouTextOverride() {
      return (
        typeof this.thankYouTextOverride === 'string' &&
        this.thankYouTextOverride.trim() !== ''
      )
    },
    defaultThankYouOverride() {
      return this.parseLanguage(this.$t('thank_you_text_override'), {
        event_name: this.$store.state.program.event_name,
      })
    },

    shareLink() {
      return (
        'https://' + window.location.hostname + '/' + this.$route.params.slug
      )
    },
    shareEmailLink() {
      return (
        this.shareLink +
        '?utm_source=email&utm_medium=email_share&utm_content=unknown&utm_campaign=directgive'
      )
    },
    shareSmsLink() {
      return this.shareLink
    },
    shareCopyLink() {
      return (
        this.shareLink +
        '?utm_source=unknown&utm_medium=link_share&utm_content=unknown&utm_campaign=directgive'
      )
    },
  },
  methods: {
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
.thanks-view {
  @apply overflow-auto flex-1 w-full max-w-4xl mx-auto p-0 px-6 text-center bg-white border-gray-200 rounded-lg;
}

.thanks-view h2 {
  @apply my-16 text-center text-2xl font-bold;
}

.thanks-view h3 {
  @apply mb-4 text-center text-lg font-bold;
}

.thanks-view .share-this {
  @apply flex justify-center;
}

@screen lg {
  .thanks-view {
    @apply py-8 px-12 border shadow-xl;
  }
}
</style>
