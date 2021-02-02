<template>
  <nav
    @click="scrollToTop"
    class="fixed top-0 z-40 w-full bg-white border-b shadow dark:border-gray-800 dark:bg-gray-900"
  >
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
              <LogoTolbertDesign class="h-8 text-blue-900 dark:text-blue-50" />
              <!-- <LogoEcco class="w-8 h-8 text-blue-900 dark:text-blue-50" /> -->

              <span class="inline-block ml-1 font-black">
                &lt;DesignCoder />
              </span>
            </NuxtLink>
          </div>

          <div class="items-center hidden h-8 px-4 space-x-4 md:flex">
            <div class="relative inline-block text-left">
              <div>
                <button
                  @click="open = !open"
                  type="button"
                  class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 border-b-2 border-transparent whitespace-nowrap hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary-500"
                  id="church-menu"
                  aria-haspopup="true"
                  :aria-expanded="open"
                >
                  {{ $t('clients') }}
                  <svg
                    class="w-5 h-5 ml-2 -mr-1"
                    x-description="Heroicon name: chevron-down"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <!-- x-description="Dropdown panel, show/hide based on dropdown state."
                x-transition:enter="transition ease-out duration-100"
                x-transition:enter-start="transform opacity-0 scale-95"
                x-transition:enter-end="transform opacity-100 scale-100"
                x-transition:leave="transition ease-in duration-75"
                x-transition:leave-start="transform opacity-100 scale-100"
                x-transition:leave-end="transform opacity-0 scale-95" -->

              <div
                v-show="open"
                class="absolute left-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
              >
                <div
                  class="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <NuxtLink
                    v-for="link in navbarLinks[0].dropdown"
                    :key="link.id"
                    :to="localePath(link.path)"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    {{ link.label }}
                  </NuxtLink>
                </div>
              </div>
            </div>

            <div class="relative inline-block text-left">
              <div>
                <button
                  @click="open = !open"
                  type="button"
                  class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 border-b-2 border-transparent whitespace-nowrap hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary-500"
                  id="church-menu"
                  aria-haspopup="true"
                  :aria-expanded="open"
                >
                  Promise Serves
                  <svg
                    class="w-5 h-5 ml-2 -mr-1"
                    x-description="Heroicon name: chevron-down"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <!-- x-description="Dropdown panel, show/hide based on dropdown state."
                x-transition:enter="transition ease-out duration-100"
                x-transition:enter-start="transform opacity-0 scale-95"
                x-transition:enter-end="transform opacity-100 scale-100"
                x-transition:leave="transition ease-in duration-75"
                x-transition:leave-start="transform opacity-100 scale-100"
                x-transition:leave-end="transform opacity-0 scale-95" -->

              <div
                v-show="open"
                class="absolute left-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
              >
                <div
                  class="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <NuxtLink
                    v-for="link in navbarLinks[1].dropdown"
                    :key="link.id"
                    :to="localePath(link.path)"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    {{ link.label }}
                  </NuxtLink>
                </div>
              </div>
            </div>

            <!--  -->
            <NuxtLink
              v-for="(link, index) in navbarLinksWithoutDropdowns"
              :key="index"
              :to="localePath(link.path)"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              {{ link.label }}
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
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Navbar',
  data: () => ({
    open: false,
    person: {
      firstName: 'Victor',
      lastName: 'Tolbert',
      email: 'victor@example.com',
    },
  }),
  computed: {
    navbarLinks() {
      return [
        {
          id: 1,
          label: this.$t('clients'),
          path: '/clients/',
          hasDropdown: true,
          dropdown: [
            {
              id: 2,
              label: this.$t('dashboard'),
              path: '/admin/dashboard/',
            },
            {
              id: 33,
              label: this.$t('clients'),
              path: '/clients/',
            },
            {
              id: 4,
              label: this.$t('bnb'),
              path: '/bnb/',
            },
            {
              id: 5,
              label: this.$t('buefy'),
              path: '/buefy/',
            },
            {
              id: 6,
              label: this.$t('calendar'),
              path: '/calendar/',
            },
            {
              id: 7,
              label: this.$t('demo'),
              path: '/demo/',
            },
            {
              id: 8,
              label: this.$t('editor'),
              path: '/editor/',
            },
            {
              id: 9,
              label: this.$t('file-upload'),
              path: '/file-upload/',
            },
            {
              id: 10,
              label: this.$t('form'),
              path: '/form/',
            },
            {
              id: 11,
              label: this.$t('get-involved'),
              path: '/get-involved/',
            },
            {
              id: 12,
              label: this.$t('give'),
              path: '/give/',
            },
            {
              id: 13,
              label: this.$t('grid'),
              path: '/grid/',
            },
            {
              id: 14,
              label: this.$t('everything'),
              path: '/kitchen-sink/',
            },
          ],
        },
        {
          id: 15,
          label: 'Promise Serves',
          path: '/promise-serves/',
          isHighlighted: true,
          hasDropdown: true,
          dropdown: [
            {
              id: 20,
              label: this.$t('people'),
              path: '/people/',
            },
            {
              id: 29,
              label: 'Ema',
              path: '/ema/',
              isHighlighted: true,
            },
            {
              id: 16,
              label: this.$t('affiliates'),
              path: '/affiliates/',
            },
            {
              id: 19,
              label: this.$t('sandbox'),
              path: '/sandbox/',
            },
            {
              id: 45,
              label: this.$t('stay-informed'),
              path: '/stay-informed/',
            },
            {
              id: 21,
              label: this.$t('tailwind'),
              path: '/tailwind/',
            },

            {
              id: 23,
              label: this.$t('timeline'),
              path: '/timeline/',
            },
            {
              id: 25,
              label: this.$t('todos'),
              path: '/todos/',
            },
            {
              id: 26,
              label: this.$t('training'),
              path: '/training/',
            },
            {
              id: 27,
              label: this.$t('typescript'),
              path: '/typescript/',
            },
            {
              id: 28,
              label: this.$t('upload'),
              path: '/upload/',
            },
            {
              id: 37,
              label: 'Index 1',
              path: '/index1/',
            },
            {
              id: 39,
              label: this.$t('landing'),
              path: '/landing/',
            },
            {
              id: 41,
              label: this.$t('login'),
              path: '/login/',
            },
            {
              id: 42,
              label: this.$t('logos'),
              path: '/logos/',
            },
            {
              id: 43,
              label: this.$t('modules'),
              path: '/modules/',
            },
            {
              id: 44,
              label: this.$t('movies'),
              path: '/movies/',
            },
            {
              id: 48,
              label: this.$t('profile'),
              path: '/profile/',
            },
            // {
            //   label: 'Search',
            //   path: '/search/',
            // },
            // {
            //   label: this.$t('secondary-usage'),
            //   path: '/secondary-usage/',
            // },
            // {
            //   label: this.$t('user'),
            //   path: '/user/',
            // },
            // {
            //   label: this.$t('users'),
            //   path: '/users/',
            // },
          ],
        },
        {
          id: 22,
          label: this.$t('resume'),
          path: '/resume/',
        },
        {
          id: 32,
          label: this.$t('articles'),
          path: '/articles/',
          hasDropdown: false,
        },
        {
          id: 34,
          label: this.$t('messages'),
          path: '/messages/',
          hasDropdown: false,
        },
        // {
        //   id: 35,
        //   label: this.$t('products'),
        //   path: '/products/',
        // },
        // {
        //   label: this.$t('needs'),
        //   path: '/needs/',
        // },
        // {
        //   label: this.$t('resources'),
        //   path: '/resources/',
        // },
      ]
    },
    navbarLinksWithoutDropdowns() {
      return this.navbarLinks.filter(link => !link.hasDropdown)
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
})
</script>
