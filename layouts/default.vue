<script setup lang="ts">
import { useAuthStore } from '~/stores/useAuthStore'

const { user } = useAuthStore()
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <TheHeader />
    <!-- <HancockTopNavbar /> -->
    <!-- <TheTopNavbar /> -->

    <main class="flex-1">
      <!-- <PageHeader
        v-if="!['/', '/dashboard'].includes($route.path)"
        :title="($route.meta.title as string) || 'Untitled'"
      /> -->

      <slot />
    </main>

    <!-- <TheFooter /> -->
  </div>
</template>
