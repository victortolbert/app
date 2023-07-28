<script setup lang="ts">
import { appName } from '~/constants'

const colorMode = useColorMode()

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())

provide('navigation', navigation)

// Computed

const color = computed(() => colorMode.value === 'dark' ? '#18181b' : 'white')

// Head

useHead({
  htmlAttrs: {
    class: 'overflow-y-scroll',
  },
  titleTemplate: (titleChunk: string) => {
    return titleChunk ? `${titleChunk} - ${appName}` : appName
  },
  // titleTemplate: title => title && title.includes(appName) ? title : `${title} - ${appName}`,
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Space+Mono:ital,wght@0,400;0,700&family=Balsamiq+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Flow+Circular&family=Bungee&family=Inter:wght@100..900&display=swap',
    },
  ],
  bodyAttrs: {
    class: 'antialiased font-sans bg-gray-200 text-gray-600 dark:text-gray-200 dark:bg-gray-950',
  },
})

// useSeoMeta({
//   ogImage: '/social-preview.jpg',
//   twitterImage: '/social-preview.jpg',
//   twitterCard: 'summary_large_image',
// })
</script>

<template>
  <div>
    <VitePwaManifest />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>

<style>
html, body, #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

label {
  @apply block font-semibold;
}

a {
  color: #3e8ed0;
  transition: color 0.3s ease;
}

a:hover {
  color: #2d628f;
}

::selection {
  background: #8884;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}

.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.4s;
}

.rotate-enter-from,
.rotate-leave-to {
  opacity: 0;
  transform: rotate3d(1, 1, 1, 15deg);
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.2s;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translate(50px, 0);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translate(-50px, 0);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translate(-50px, 0);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translate(50px, 0);
}
</style>
