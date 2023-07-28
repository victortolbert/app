<script lang="ts" setup>
import { useAuthStore } from '~/stores/useAuthStore'

const auth = useAuthStore()

async function handleLogout() {
  await auth.logout()
}
</script>

<template>
  <header class="dark:bg-primary-900 sticky top-0 z-30 bg-white py-2 shadow">
    <UContainer>
      <nav class="flex items-center justify-between gap-4 text-sm">
        <div class="flex items-center gap-8">
          <NuxtLink class="flex items-center gap-2" to="/dashboard">
            <LogoUxlab class="h-8 w-auto" />
            <span class="whitespace-nowrap border-b border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white">
              UI/UX Labs
            </span>
          </NuxtLink>

          <div class="hidden gap-2 sm:flex">
            <div v-if="auth.isLoggedIn" class="flex items-center gap-4">
              <!-- <NuxtLink to="/dashboard">
                Dashboard
              </NuxtLink> -->

              <TheProjectsMenu class="hidden sm:block" />
            </div>

            <!-- <NuxtLink v-else to="/welcome">
              Welcome
            </NuxtLink> -->

            <!-- <TheElementsMenu />
            <TheFormsMenu />
            <TheDataMenu />
            <TheNavigationMenu />
            <TheOverlaysMenu /> -->
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div v-if="!auth.isLoggedIn" class="flex items-center gap-4">
            <NuxtLink to="/login">
              Login
            </NuxtLink>

            <NuxtLink to="/register">
              Register
            </NuxtLink>
          </div>

          <div v-else class="flex items-center gap-4">
            <button @click="handleLogout">
              Logout
            </button>
          </div>
        </div>
      </nav>
    </UContainer>
  </header>
</template>
