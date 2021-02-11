<template>
  <div>
    <OCollapse
      :open="isOpen"
      class="border-t-2 shadow-none card border-grey-light"
    >
      <button
        slot="trigger"
        class="flex items-baseline justify-between w-full px-4 py-4 mb-px shadow-none cursor-pointer sm:py-4 md:px-4 focus:outline-none"
        @click="collapseClick"
      >
        <slot name="title">
          <p :class="titleFontWeight" class="text-xl sm:text-2xl">
            <span class="pl-1">{{ title }}</span>
          </p>
        </slot>
        <slot name="toggle">
          <span
            class="flex items-center justify-center cursor-pointer text-grey-dark"
          >
            <FontAwesomeIcon :icon="open ? 'chevron-up' : 'chevron-down'" />
          </span>
        </slot>
      </button>
      <slot>
        <div class="p-2">
          <div
            class="p-4 text-sm bg-white modal-card-body md:p-6 sm:text-base md:text-lg"
          >
            <p class="mb-4">
              {{ content }}
            </p>
          </div>
        </div>
      </slot>
    </OCollapse>
  </div>
</template>

<script>
export default {
  name: 'Accordion',
  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    shouldReslick: {
      type: Boolean,
      default: false,
    },
    shouldEmitViewed: {
      type: Boolean,
      default: false,
    },
    titleFontWeight: {
      type: String,
      default: 'font-semibold',
    },
  },
  data() {
    return {
      open: false,
    }
  },
  created() {
    this.open = this.isOpen
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
    collapseClick() {
      this.toggle()
      if (this.shouldReslick) {
        this.$nextTick(() => {
          if (
            navigator.userAgent.includes('MSIE') ||
            navigator.appVersion.indexOf('Trident/') > 0
          ) {
            const evt = document.createEvent('UIEvents')
            evt.initUIEvent('reslicked', true, false, window, 0)
            window.dispatchEvent(evt)
          } else {
            window.dispatchEvent(new Event('reslicked'))
          }
        })
      }
      if (this.shouldEmitViewed) {
        this.$emit('viewed', true)
      }
    },
  },
}
</script>
