<template>
  <nav
    class="flex w-full px-8 py-1 space-x-3 text-xs font-bold tracking-wider text-white uppercase bg-black"
  >
    <NuxtLink :to="localePath('/docs/')">Docs</NuxtLink>
    <KeyboardShortcut />
  </nav>
</template>
