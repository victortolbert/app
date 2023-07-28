<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
</script>

<template>
  <footer class="sticky bottom-0 mt-4 border-t bg-white px-4 py-2 shadow dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200">
    <UContainer>
      <div class="flex items-center justify-between text-xs">
        <div>
          <slot>
            Made with ❤️ by <NuxtLink to="/resume" class="hover:underline" target="_blank">
              Victor Tolbert
            </NuxtLink>
          </slot>
        </div>

        <div class="flex items-center gap-8">
          <div class="flex items-center gap-4">
            <NuxtLink to="/colophon" class="hover:underline">
              Colophon
            </NuxtLink>
            <NuxtLink to="/contribute" class="hover:underline">
              Contribute
            </NuxtLink>
            <NuxtLink to="/changelog" class="hover:underline">
              Changelog
            </NuxtLink>

            <ClientOnly>
              <UButton
                :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'"
                :color="isDark ? 'white' : 'black'"
                variant="link"
                aria-label="Theme"
                @click="isDark = !isDark"
              />
              <template #fallback>
                <div class="h-8 w-8" />
              </template>
            </ClientOnly>
          </div>
        </div>
      </div>
    </UContainer>
  </footer>
</template>
