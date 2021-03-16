<template>
  <div class="z-30 modal">
    <!--
            Background overlay, show/hide based on modal state.

            Entering: "ease-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
            Leaving: "ease-in duration-200"
            From: "opacity-100"
            To: "opacity-0"
        -->
    <Transition
      enter-class="opacity-0"
      enter-active-class="ease-out transition-medium"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-out transition-medium"
      leave-to-class="opacity-0"
      appear
    >
      <div v-show="show" class="fixed inset-0 transition-opacity">
        <div
          class="absolute inset-0 bg-gray-500 opacity-75"
          tabindex="-1"
          @click="dismiss"
        />
      </div>
    </Transition>

    <!--
            Modal panel, show/hide based on modal state.

            Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
            Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        -->
    <div v-show="show" class="modal-panel">
      <PrivacyPolicy />

      <div class="mt-5 sm:mt-6">
        <span class="flex w-full">
          <button
            type="button"
            class="flex items-center justify-center w-32 max-w-sm mx-auto font-bold leading-6 text-white transition duration-150 ease-in-out border border-transparent rounded-full shadow-sm h-11 bg-secondary-600 hover:bg-secondary-500 focus:outline-none focus:border-secondary-700 focus:shadow-outline-secondary sm:text-sm sm:leading-5"
            @click="dismiss"
          >
            Close
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicyModal',
  props: {
    show: {
      type: Boolean,
    },
    preventBackgroundScrolling: {
      type: Boolean,
    },
  },
  watch: {
    show: {
      immediate: true,
      handler(show) {
        if (show) {
          this.preventBackgroundScrolling &&
            document.body.style.setProperty('overflow', 'hidden')

          document.documentElement.style.setProperty('overflow-y', 'scroll')
        } else {
          this.preventBackgroundScrolling &&
            document.body.style.removeProperty('overflow')
        }
      },
    },
  },
  mounted() {
    const escapeHandler = event => {
      if (event.key === 'Escape' && this.show) {
        this.dismiss()
      }
    }

    document.addEventListener('keydown', escapeHandler)

    this.$once('hook:destroyed', () => {
      document.removeEventListener('keydown', escapeHandler)
    })
  },
  methods: {
    dismiss() {
      document.body.style.removeProperty('overflow')
      this.$emit('close')
    },
  },
}
</script>

<style>
.modal {
  @apply fixed;
  @apply bottom-0;
  @apply inset-x-0;
  @apply px-4;
  @apply pb-6;
}

.modal-panel {
  @apply bg-white;
  @apply rounded-lg;
  @apply px-4;
  @apply pt-5;
  @apply pb-4;
  @apply overflow-hidden;
  @apply shadow-xl;
  @apply transform;
  @apply transition-all;
}

@screen sm {
  .modal {
    @apply inset-0;
    @apply p-0;
    @apply flex;
    @apply items-center;
    @apply justify-center;
  }

  .modal-panel {
    @apply max-w-3xl;
    @apply w-full;
    @apply p-6;
  }
}
</style>
