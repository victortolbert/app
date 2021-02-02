<script>
export default {
  data: () => ({
    open: false,
    person: {
      firstName: 'Andy',
      lastName: 'Cook',
      email: 'andy@promiseserves.org',
    },
  }),
  computed: {
    navbarLinks() {
      return [
        {
          label: this.$t('all_affiliates'),
          path: '/affiliates',
          hasDropdown: true,
        },
        {
          label: 'Ema',
          path: '/ema',
          isHighlighted: true,
          hasDropdown: true,
          id: 1,
        },
        {
          label: this.$t('people'),
          path: '/people',
        },
        {
          label: this.$t('events'),
          path: '/events',
        },
        {
          label: this.$t('needs'),
          path: '/needs',
        },
        {
          label: this.$t('resources'),
          path: '/resources',
        },
      ]
    },
    personInitials() {
      return `
        ${this.person.firstName.charAt(0)} ${this.person.firstName.charAt(0)}
      `.toUpperCase()
    },

    menu: {
      get() {
        return this.$store.state.menu.open
      },
      set(val) {
        this.$store.commit('menu/toggle', val)
      },
    },
    lastRelease() {
      return this.$store.state.releases[0]
    },
  },
  methods: {
    scrollToTop() {
      if (window.innerWidth >= 1280) {
        return
      }
      window.scrollTo(0, 0)
    },
    noop() {},
  },
}
</script>

<template>
  <nav @click="scrollToTop" class="shadow-lg">
    <!-- fixed top-0 z-40 w-full border-b dark:border-gray-800 bg-white dark:bg-gray-900 -->
    <!-- Desktop_view -->
    <div class="px-4 mx-auto sm:px-6 lg:px-8">
      <!-- Navbar_O1_navbar_links_container -->
      <div class="flex justify-between h-16">
        <!-- Primary_navbar_links -->
        <div class="flex items-center">
          <!-- Mobile_menu_button -->
          <div class="flex mr-2 -ml-2 baseline md:hidden">
            <button
              @click="open = !open"
              class="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              :aria-expanded="open"
            >
              <span class="sr-only">
                {{ $t('open_main_menu') }}
              </span>

              <!-- Icon when menu is closed. -->
              <svg
                x-state:on="Menu open"
                x-state:off="Menu closed"
                :class="{hidden: open, block: !open}"
                class="block w-6 h-6"
                x-description="Heroicon name: menu"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <!-- Icon when menu is open. -->
              <svg
                x-state:on="Menu open"
                x-state:off="Menu closed"
                :class="{hidden: !open, block: open}"
                class="hidden w-6 h-6"
                x-description="Heroicon name: x"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Branding_container -->
          <div class="flex items-center flex-shrink-0 h-8 px-4">
            <NuxtLink
              class="flex items-center flex-shrink-0 m-2"
              :to="localePath('/')"
            >
              <LogoVidea class="h-8 text-blue-900" />
            </NuxtLink>
          </div>

          <div
            class="items-center hidden h-8 px-4 space-x-4 text-xs tracking-wide uppercase md:flex"
          >
            <NuxtLink
              :to="localePath(link.path)"
              class="flex items-center space-x-1"
              :class="{
                'text-primary-500 font-bold border-transparent border-b-2':
                  link.isHighlighted,
              }"
              v-for="link in navbarLinks"
              :key="link.path"
            >
              <span
                :class="{
                  'border-primary-700': link.isHighlighted,
                }"
                >{{ link.label }}</span
              >
              <!-- IconCaretDown -->
              <svg
                v-if="link.hasDropdown"
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </NuxtLink>
          </div>
        </div>

        <!-- Secondary_navbar_links -->
        <div class="hidden md:ml-6 md:flex md:items-center md:space-x-2">
          <!-- <SearchInput /> -->
          <!-- <GivingButton class="mr-8" /> -->
          <ColorModeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </div>

    <!-- Mobile_view -->
    <div
      x-description="Mobile menu, toggle classes based on menu state."
      x-state:on="Menu open"
      x-state:off="Menu closed"
      :class="{block: open, hidden: !open}"
      class="hidden md:hidden"
    >
      <div class="pt-2 pb-3 space-y-1">
        <NuxtLink
          :to="localePath('dashboard')"
          class="block py-2 pl-3 pr-4 text-base font-medium border-l-4 text-primary-700 border-primary-500 bg-primary-50 sm:pl-5 sm:pr-6"
        >
          {{ $t('dashboard') }}
        </NuxtLink>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200">
        <div class="flex items-center px-4 sm:px-6">
          <div class="flex-shrink-0">
            <span
              class="inline-flex items-center justify-center w-10 h-10 bg-gray-500 rounded-full"
            >
              <span class="text-xl font-medium leading-none text-white">
                {{ personInitials }}
              </span>
            </span>
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">
              {{ personInitials }}
            </div>
            <div class="text-sm font-medium text-gray-500">
              {{ person.email }}
            </div>
          </div>
          <button
            class="flex-shrink-0 p-1 ml-auto text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <span class="sr-only">{{ $t('view_notifications') }}</span>
            <svg
              class="w-6 h-6"
              x-description="Heroicon name: bell"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
