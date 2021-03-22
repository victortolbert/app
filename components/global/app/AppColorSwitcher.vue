<template>
  <span class="inline-flex">
    <button
      class="transition duration-150 ease-in-out rounded-md hover:text-primary-500 focus:outline-none"
      aria-label="Color Mode"
      @click="
        $colorMode.value === 'dark'
          ? ($colorMode.preference = 'light')
          : ($colorMode.preference = 'dark')
      "
    >
      <ClientOnly>
        <IconSun v-if="$colorMode.value === 'light'" class="w-6 h-6" />
        <IconMoon v-else class="w-6 h-6" />
      </ClientOnly>
    </button>
  </span>
</template>
