<script lang="ts">
import {defineComponent, computed, reactive} from '@nuxtjs/composition-api'

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
    coverURL: {
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
    const affiliate = reactive({coverURL: 'https://cominex.net/assets/img/people/victor.jpeg'})
    const backgroundImage = computed(() => {
      return props.coverURL ? `url(${props.coverURL})` : 'none'
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
      'md:flex md:flex-col md:items-center md:justify-center': false,
    }"
    class="relative w-full bg-repeat"
  >
    <header
      class="w-full relative z-10"
      :class="{
        'max-w-screen-lg xl:max-w-screen-xl': false,
      }"
      v-if="hasTitleSlot || title"
    >
      <div class="flex-1 min-w-0">
        <BaseLogo v-if="logo" :name="logo" class="w-auto h-7 sm:h-8" />

        <div class="hero-body">
          <div>
            <h1
              :class="[
                {'text-gray-900': false},
                {'mt-10 mb-8 sm:mt-14 sm:mb-10': false},
                {'text-4xl font-extrabold sm:text-6xl lg:text-7xl': false},
              ]"
              class="leading-none tracking-tight"
            >
              <slot name="title">{{ title }}</slot>
            </h1>
            <h2
              :class="{
                'max-w-screen-lg': false,
                'mb-10 sm:mb-11': false,
                'text-lg font-medium sm:leading-10 sm:text-2xl': false,
              }"
              v-if="hasSubtitleSlot || subtitle"
            >
              <slot name="subtitle">
                {{ subtitle }}
              </slot>
            </h2>
          </div>

          <div>
            <slot name="actions" />
          </div>
        </div>
      </div>
    </header>

    <slot />

    <footer v-if="hasFooterSlot">
      <slot name="footer" />
    </footer>
  </section>
</template>
