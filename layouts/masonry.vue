<template>
  <div>
    <div class="flex justify-center py-3 border-b-2">
      <NuxtLink to="/masonry-home">Home</NuxtLink>
      <NuxtLink to="/regular-nuxt">Regular Nuxt</NuxtLink>
      <NuxtLink to="/composition-api-v1">Composition API v1</NuxtLink>
      <NuxtLink to="/composition-api-v2">Composition API v2</NuxtLink>
      <NuxtLink to="/composition-api-v3">Composition API v3</NuxtLink>
    </div>
    <Nuxt />
  </div>
</template>

<style>
a {
  @apply px-2 text-center text-sm;
}

.NuxtLink-exact-active {
  @apply text-green-600;
}

/* Global Transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>

<style scoped lang="scss">
img {
  transition: all ease 0.3s;
  opacity: 0;
  &[lazy="loading"] {
    opacity: 1;
    filter: blur(15px);
  }
  &[lazy="loaded"] {
    opacity: 1;
  }
}
</style>
