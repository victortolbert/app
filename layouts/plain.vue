<template>
  <div
    class="flex flex-col w-full min-h-screen bg-primary-200 dark:bg-primary-800 dark:text-primary-100"
  >
    <Nuxt keep-alive :key="$route.params.id" />

    <PortalTarget name="overlays" />
    <SvgSprite />
  </div>
</template>
