<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import {
  usePreferredDark,
  useLocalStorage,
  useBrowserLocation,
} from '@vueuse/core'

export default defineComponent({
  setup() {
    const location = useBrowserLocation()
    const isDark = usePreferredDark()
    const store = useLocalStorage('my-storage', {
      name: 'Apple',
      color: 'red',
    })
    const storage = useLocalStorage('my-key', { foo: 'bar' })

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
    <header class="w-full max-w-7xl mx-auto md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <h2 class="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
          <span class="text-transparent bg-gradient-to-r bg-clip-text from-white to-white">
            <slot />
          </span>
        </h2>
      </div>

      <!-- Actions -->
      <div class="flex flex-shrink-0 mt-4 space-x-2 md:mt-0 md:ml-4">
        <slot name="actions"></slot>
      </div>
    </header>
  </section>
</template>
