<script lang="ts" setup>
import { names } from '~/app.config'

const assetsURL = import.meta.env.VITE_ASSETS_URL || '/assets'

const openUserMenu = ref(false)
const openMobileMenu = ref(false)
const showHelp = ref(false)
const showAlerts = ref(false)

const userMenuButton = ref(null)
onClickOutside(userMenuButton, () => openUserMenu.value = false)
const mobileMenuButton = ref(null)
onClickOutside(mobileMenuButton, () => openMobileMenu.value = false)

const links = ref([
  {
    name: 'Layout',
    path: '/guide/layout/card',
  },
  {
    name: 'Elements',
    path: '/guide/elements',
  },
  {
    name: 'Primitives',
    path: '/guide/primitives',
  },
  {
    name: 'Templates',
    path: '/guide/templates',
  },
])
const isOpen = ref(false)

const people = [
  { id: 1, label: 'Wade Cooper' },
  { id: 2, label: 'Arlene Mccoy' },
  { id: 3, label: 'Devon Webb' },
  { id: 4, label: 'Tom Cook' },
  { id: 5, label: 'Tanya Fox' },
  { id: 6, label: 'Hellen Schmidt' },
  { id: 7, label: 'Caroline Schultz' },
  { id: 8, label: 'Mason Heaney' },
  { id: 9, label: 'Claudie Smitham' },
  { id: 10, label: 'Emil Schaefer' },
]

const selected = ref([])
</script>

<template>
  <nav class="z-20 bg-gray-800">
    <div class="mx-auto px-2 lg:px-8 sm:px-4">
      <div class="relative h-16 flex items-center justify-between">
        <div class="flex items-center px-2 lg:px-0">
          <NuxtLink to="/guide" class="flex-shrink-0">
            <div class="flex items-center gap-3 text-white">
              <LogoUxlab
                class="h-8 w-auto"
                alt="UI/UX Lab"
              />

              <span class="hidden lg:block">{{ names[Math.floor(Math.random() * names.length)] }}</span>
            </div>
          </NuxtLink>

          <div class="hidden lg:ml-6 lg:block">
            <div class="flex space-x-4">
              <NuxtLink
                v-for="link in links"
                :key="link.name"
                :to="link.path"
                active-class="bg-gray-900 text-white"
                class="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                {{ link.name }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="flex flex-1 justify-center px-2 lg:ml-6 lg:items-center lg:justify-end lg:gap-3">
          <!-- <NuxtLink to="/search" class="hidden whitespace-nowrap text-xs text-white xl:block dark:text-white hover:underline">
            Advanced Search
          </NuxtLink> -->

          <div>
            <UButton variant="ghost" icon="i-carbon-search" label="Search" :ui="{ rounded: 'rounded-full' }" class="w-72 border-2 border-gray-600 dark:border-gray-800" @click="isOpen = true" />

            <UModal v-model="isOpen">
              <UCommandPalette
                v-model="selected"

                nullable multiple
                :groups="[{
                  key: 'people', commands: people,
                }]"
              />
            </UModal>
          </div>

          <!-- <div class="max-w-lg w-full lg:max-w-xs">
            <label for="search" class="sr-only">
              Search
            </label>

            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  class="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <input
                id="search"
                name="search"
                type="search"
                autocomplete="off"
                class="block w-full border-0 rounded-md bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300 focus:bg-white sm:text-sm sm:leading-6 focus:text-gray-900 placeholder:text-gray-400 focus:ring-0"
                placeholder="Search"
              >
            </div>
          </div> -->
        </div>

        <div class="flex lg:hidden">
          <!-- Mobile menu button -->
          <button
            ref="mobileMenuButton"
            type="button"
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-inset"
            aria-controls="mobile-menu"
            aria-expanded="false"
            @click="openMobileMenu = !openMobileMenu"
          >
            <span class="sr-only">
              Open main menu
            </span>

            <!--
              Icon when menu is closed.
              Menu open: "hidden", Menu closed: "block"
            -->
            <svg
              class="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>

            <!--
              Icon when menu is open.
              Menu open: "block", Menu closed: "hidden"
            -->
            <svg
              class="hidden h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="hidden lg:ml-4 lg:block">
          <div class="flex items-center gap-4">
            <!-- Alerts -->
            <!-- <button

              type="button"
              class="flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-gray-800"

              @click="showAlerts = !showAlerts"
            >
              <span class="sr-only">
                View Notifications
              </span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button> -->

            <!-- <SlideOver /> -->

            <!-- <button
              type="button"
              class="flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-gray-800"
              @click="showHelp = !showHelp"
            >
              <svg
                class="h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  class="fa-primary"
                  d="M57.4 57.4c-12.5 12.5-12.5 32.8 0 45.3l112 112c9.5-19.8 25.5-35.8 45.3-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm112 240l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c-19.8-9.5-35.8-25.5-45.3-45.3zm128 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-112-112c-9.5 19.8-25.5 35.8-45.3 45.3zm45.3-128l112-112c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-112 112c19.8 9.5 35.8 25.5 45.3 45.3z"
                />
                <path
                  class="opacity-40"
                  d="M214.7 169.5c12.5-6 26.5-9.5 41.3-9.5s28.8 3.5 41.3 9.5c-.1 .1 .1-.1 0 0L412.8 53.9C369.5 20.3 315.2 0 256 0S142.5 20.3 99.2 53.9L214.7 169.5c.1 .1-.1-.1 0 0zM169.5 297.3c-6-12.5-9.5-26.5-9.5-41.3s3.5-28.8 9.5-41.3c-.1-.1 .1 .1 0 0L53.9 99.2C20.3 142.5 0 196.8 0 256s20.3 113.5 53.9 156.8L169.5 297.3c.1-.1-.1 .1 0 0zM458.1 99.2L342.5 214.7c-.1 .1 .1-.1 0 0c6 12.5 9.5 26.5 9.5 41.3s-3.5 28.8-9.5 41.3c-.1-.1 .1 .1 0 0L458.1 412.8C491.7 369.5 512 315.2 512 256s-20.3-113.5-53.9-156.8zM297.3 342.5c-12.5 6-26.5 9.5-41.3 9.5s-28.8-3.5-41.3-9.5c-.1 .1 .1-.1 0 0L99.2 458.1C142.5 491.7 196.8 512 256 512s113.5-20.3 156.8-53.9L297.3 342.5c.1 .1-.1-.1 0 0z"
                />
              </svg>
            </button> -->

            <!-- Profile dropdown -->
            <div class="relative ml-4 flex-shrink-0">
              <div>
                <!-- <button
                  id="user-menu-button"
                  ref="userMenuButton"
                  type="button"
                  class="flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-gray-800"
                  aria-expanded="false"
                  aria-haspopup="true"
                  @click="openUserMenu = !openUserMenu"
                >
                  <span class="sr-only">
                    Open user menu
                  </span>

                <img
                  class="h-8 w-8 rounded-full"
                  :src="`${assetsURL}/img/users/placeholder.jpeg`"
                  alt=""
                >
                </button>
              </div> -->

              <!--
              Dropdown menu, show/hide based on menu state.

              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
              <!-- <div
                v-if="openUserMenu"
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-900 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                <NuxtLink
                  id="user-menu-item-0"
                  to="/guide/profile"
                  link-active-class="bg-gray-100"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                  role="menuitem"
                  tabindex="-1"
                >
                  Profile
                </NuxtLink>

                <NuxtLink
                  id="user-menu-item-1"
                  to="/guide/settings"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                  role="menuitem"
                  tabindex="-1"
                >
                  Settings
                </NuxtLink>
                <a
                  id="user-menu-item-2"
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                  role="menuitem"
                  tabindex="-1"
                >
                  Sign out
                </a>
              </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div v-if="openMobileMenu" id="mobile-menu" class="lg:hidden">
        <div class="px-2 pb-3 pt-2 space-y-1">
          <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->

          <NuxtLink
            v-for="link in links"
            :key="link.name"
            :to="link.path"
            exact-active-class="bg-gray-900 text-white"
            class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            {{ link.name }}
          </NuxtLink>
        </div>
        <div class="border-t border-gray-700 pb-3 pt-4">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img
                class="h-10 w-10 rounded-full grayscale"
                :src="`${assetsURL}/img/users/placeholder.jpeg`"
                alt=""
              >
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-white">
                Victor Tolbert
              </div>
              <div class="text-sm font-medium text-gray-400">
                vtolbert@hancockclaims.com
              </div>
            </div>

            <button
              type="button"
              class="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-gray-800"
              @click="showAlerts = !showAlerts"
            >
              <span class="sr-only">
                View notifications
              </span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>
          </div>

          <div class="mt-3 px-2 space-y-1">
            <NuxtLink
              to="/guide/profile"
              exact-active-class="bg-gray-900 text-white"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              Profile
            </NuxtLink>
            <NuxtLink
              to="/guide/settings"
              exact-active-class="bg-gray-900 text-white"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              Settings
            </NuxtLink>
            <a
              href="#"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>

      <USlideover v-model="showHelp">
        <div class="h-full flex flex-col overflow-y-scroll bg-white py-6 shadow-xl dark:bg-gray-900 dark:text-gray-300">
          <div class="px-4 sm:px-6">
            <div class="flex items-start justify-between">
              <h4 class="text-lg">
                Help
              </h4>

              <div class="ml-3 h-7 flex items-center">
                <UButton variant="link" square icon="i-carbon-close" @click="showHelp = false" />
              </div>
            </div>
          </div>
          <div class="relative mt-6 flex-1 px-4 sm:px-6">
            Content...
          </div>
        </div>
      </USlideover>

      <USlideover v-model="showAlerts">
        <div class="h-full flex flex-col overflow-y-scroll bg-white py-6 shadow-xl dark:bg-gray-900 dark:text-gray-300">
          <div class="px-4 sm:px-6">
            <div class="flex items-start justify-between">
              <h4 class="text-lg">
                Notifications
              </h4>

              <div class="ml-3 h-7 flex items-center">
                <UButton variant="link" square icon="i-carbon-close" @click="showAlerts = false" />
              </div>
            </div>
          </div>
          <div class="relative mt-6 flex-1 px-4 sm:px-6">
            <UInput placeholder="Search" />
          </div>
        </div>
      </USlideover>
    </div>
  </nav>
</template>
