<template>
  <div class="share-button">
    <button
      class="border-0 is-mobile"
      type="button"
      data-tooltip="Copied!"
      title="Copied!"
      @click.prevent.stop="copyLink"
    >
      <FontAwesomeIcon icon="link" class="text-2xl pointer-events-none" />
      <!-- eslint-disable -->
      <span
        class="hidden pointer-events-none lg:inline"
        v-html="lang.copy_and_share_button"
      />
    </button>
    <span class="text-sm lg:hidden" v-html="lang.copy_and_share_button" />

    <button
      data-tooltip="Copied!"
      title="Copied!"
      class="block w-full is-desktop"
      @click.prevent.stop="copyLink"
    >
      <FontAwesomeIcon icon="link" class="mr-2 text-2xl pointer-events-none" />
      <span class="pointer-events-none" v-html="lang.copy_and_share_button" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'CopyLinkButton',
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
    copyLink(event) {
      const span = event.target.querySelector('span')
      const originalText = span.textContent

      this.$copyText(this.link).then(
        function (e) {
          span.textContent = 'Copied!'
        },
        function (e) {
          alert('Can not copy')
        },
      )

      setTimeout(() => {
        span.textContent = originalText
      }, 2000)

      this.gaTrack()
    },
    gaTrack() {
      const action =
        'Share Button: ' + this.type + (this.hasVideo ? ' video' : '')
      this.gaEvent(this.gaSiteLocation, this.gaPageLocation, action)
    },
    getShareUrl(referrerName) {
      const filterFunction = function (specialUrl) {
        return specialUrl.referrer.name === referrerName
      }
      const shortKey = this.specialUrls.filter(filterFunction)[0].short_key
      return (
        window.location.protocol +
        '//' +
        window.location.hostname +
        '/v3/dash/' +
        shortKey
      )
    },
  },
}
</script>

<style lang="postcss">
.share-button {
  @apply flex;
  @apply flex-col;
  @apply flex-wrap;
  @apply w-1/4;
  @apply text-center;
}

.share-button button {
  @apply flex;
  @apply items-center;
  @apply justify-center;
  @apply mx-auto;
  @apply font-semibold;
  @apply text-white;
  /* @apply bg-share; */
  @apply rounded-full;
  @apply shadow;
  @apply cursor-pointer;
}

.share-button button:focus {
  @apply outline-none;
  @apply ring;
}

.share-button button:hover {
  @apply text-white;
}

.share-button button.is-mobile {
  @apply w-12;
  @apply h-12;
}

.share-button button.is-desktop {
  @apply hidden;
}

@screen lg {
  .share-button button.is-mobile {
    @apply hidden;
  }

  .share-button button.is-desktop {
    @apply flex;
    @apply px-2;
    @apply py-2;
  }
}
</style>
