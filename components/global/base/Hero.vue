<script lang="ts">
import {defineComponent, computed, reactive} from '@nuxtjs/composition-api'
const backgrounds = ['hero_error_2.jpg', 'hero_error_5.jpg']

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    fullheight: {
      type: Boolean,
      default: false,
    },
    bgCover: {
      type: Boolean,
      default: false,
    },
    coverUrl: {
      type: String,
      default: '',
    },
    logo: {
      type: String,
      default: '',
    },
  },
  setup(props, {slots}) {
    const hasActionsSlot = computed(() => !!slots.actions)
    const hasTitleSlot = computed(() => !!slots.title)
    const hasSubtitleSlot = computed(() => !!slots.subtitle)
    const hasFooterSlot = computed(() => !!slots.footer)
    const affiliate = reactive({
      coverUrl: 'https://cominex.net/assets/img/people/victor.jpeg',
    })
    const backgroundImage = computed(() => {
      return props.coverUrl ? `url(${props.coverUrl})` : 'none'
    })

    return {
      backgroundImage,
      hasActionsSlot,
      hasTitleSlot,
      hasSubtitleSlot,
      hasFooterSlot,
      affiliate,
    }
  },
})
</script>

<template>
  <section
    :style="`background-image: ${backgroundImage}`"
    :class="{
      'min-h-screen': fullheight,
      'bg-cover': bgCover,
    }"
    class="relative w-full bg-repeat md:flex md:flex-col md:items-center md:justify-center"
  >
    <header
      class="relative z-10 max-w-screen-lg mx-auto xl:max-w-screen-xl"
      v-if="hasTitleSlot || title"
    >
      <div class="flex-1 min-w-0 p-8 mx-8">
        <BaseLogo v-if="logo" :name="logo" class="w-auto h-7 sm:h-8" />

        <div class="hero-body">
          <h1
            :class="[
              {' text-gray-900 ': true},
              {'mt-10 mb-8 sm:mt-14 sm:mb-10': true},
              {'text-4xl font-extrabold sm:text-6xl lg:text-7xl': true},
            ]"
            class="leading-none tracking-tight"
          >
            <slot name="title">{{ title }}</slot>
          </h1>
          <h2
            class="max-w-screen-lg mb-10 text-lg font-medium sm:text-2xl sm:leading-10 sm:mb-11"
            v-if="hasSubtitleSlot || subtitle"
          >
            <slot name="subtitle">
              {{ subtitle }}
            </slot>
          </h2>
        </div>

        <div class="hero-foot">
          <slot name="actions" />
          <PageNavbar />
        </div>
      </div>
    </header>

    <slot />

    <footer v-if="hasFooterSlot">
      <slot name="footer" />
    </footer>
  </section>
</template>
