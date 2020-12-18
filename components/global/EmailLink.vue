<template>
  <div class="flex flex-col email-link">
    <a
      :href="`mailto:?body=${getBody()}&subject=${getSubject()}`"
      class="border-0 is-mobile"
      @click="gaTrack"
    >
      <FontAwesomeIcon icon="envelope" class="text-2xl pointer-events-none" />

      <span class="hidden pointer-events-none lg:inline">
        {{ lang.email_link }}
      </span>
    </a>

    <span class="text-sm lg:hidden">
      {{ lang.email_link }}
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
        {{ lang.email_link }}
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
  computed: {
    lang() {
      return this.$store.state.lang
    },
  },
  methods: {
    gaTrack() {
      const action =
        'Share Button: ' + this.type + (this.hasVideo ? ' video' : '')
      this.gaEvent(this.gaSiteLocation, this.gaPageLocation, action)
    },
    getSubject() {
      return this.lang.share_email_template.subject
    },
    getBody() {
      const emailTemplate = this.parseLanguage(
        this.lang.share_email_template.body,
        {
          eventName: this.program.decoded_event_name,
          link: this.link,
        },
      )
      return encodeURIComponent(emailTemplate)
    },
  },
}
</script>

<style>
.email-link {
  @apply flex-wrap;
  @apply w-1/4;
  @apply text-center;
}

.email-link a {
  @apply flex;
  @apply items-center;
  @apply justify-center;
  @apply mx-auto;
  @apply font-semibold;
  @apply text-white;
  @apply rounded-full;
  @apply bg-emailer;
  @apply shadow;
  @apply cursor-pointer;
}

.email-link a:focus {
  @apply outline-none;
  @apply ring;
}

.email-link a:hover {
  @apply text-white;
}

.email-link a.is-mobile {
  @apply w-12;
  @apply h-12;
}

.email-link a.is-desktop {
  @apply hidden;
}

@screen lg {
  .email-link a.is-mobile {
    @apply hidden;
  }

  .email-link a.is-desktop {
    @apply block;
    @apply w-full;
    @apply flex;
    @apply px-2;
    @apply py-2;
  }
}
</style>
