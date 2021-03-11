<template>
  <footer
    class="relative z-20 w-full h-16 bg-white border-t dark:border-gray-800 dark:bg-gray-900"
  >
    <div
      class="container flex items-center justify-between w-full h-full px-4 mx-auto lg:px-8"
    >
      <div class="flex items-end">
        <a href="https://nuxtjs.org" target="_blank" rel="noopener">
          <BuiltWithNuxtLight class="h-4 light-img" />
          <BuiltWithNuxtDark class="h-4 dark-img" />
        </a>
      </div>
      <div class="flex items-center space-x-4">
        <AppColorSwitcher />
      </div>
    </div>
  </footer>
</template>
