<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'

import {
  usePreferredDark,
  useLocalStorage,
  useBrowserLocation,
} from '@vueuse/core'

export default defineComponent({
  setup() {
    const location = useBrowserLocation()

    // is user prefers dark theme
    const isDark = usePreferredDark()

    // persist state in localStorage
    const store = useLocalStorage('my-storage', {
      name: 'Apple',
      color: 'red',
    })

    // changes will write to localStorage with a throttled 1s
    const storage = useLocalStorage('my-key', {foo: 'bar'})

    return {
      isDark,
      store,
      storage,
      location,
    }
  },
})
</script>

<template>
  <section class="p-8 bg-primary-700 text-primary-50">
    <header class="md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <h2
          class="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate"
        >
          <span
            class="text-transparent bg-gradient-to-r bg-clip-text from-white to-white"
          >
            <slot />
          </span>
        </h2>
      </div>

      <!-- Actions -->
      <div class="flex flex-shrink-0 mt-4 space-x-2 md:mt-0 md:ml-4">
        <slot name="actions">
          <!-- <OptionsMenuButton /> -->
          <a
            href=""
            class="flex items-center space-x-2 font-semibold text-white transition-colors duration-150 hover:text-purple-200"
          >
            <BaseIconBrand
              name="twitter"
              class="w-6 h-6 text-white opacity-40"
            />
            <p>Share<span class="sr-only sm:not-sr-only"> on Twitter</span></p>
          </a>
        </slot>
      </div>
    </header>
  </section>
</template>
