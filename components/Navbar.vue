<script>
export default {
  data: () => ({
    open: false,
    person: {
      firstName: 'Andy',
      lastName: 'Cook',
      email: 'andy@promiseserves.org',
    },
    navbarLinks: [
      {
        label: 'Affiliates',
        path: 'affiliates',
      },
      {
        label: 'My Organization',
        path: 'organizations',
        id: 1,
      },
      {
        label: 'People',
        path: 'people',
      },
      {
        label: 'Events',
        path: 'events',
      },
      {
        label: 'Needs',
        path: 'needs',
      },
      {
        label: 'Resources',
        path: 'resources',
      },
    ],
  }),
  computed: {
    personInitials() {
      return `
        ${this.person.firstName.charAt(0)} ${this.person.firstName.charAt(0)}
      `.toUpperCase()
    },
  },
}
</script>

<template>
  <nav class="bg-white shadow-lg">
    <!-- Desktop_view -->
    <div class="px-4 mx-auto sm:px-6 lg:px-8">
      <!-- Navbar_O1_navbar_links_container -->
      <div class="flex justify-between h-16">
        <!-- Primary_navbar_links -->
        <div class="flex">
          <!-- Mobile_menu_button -->
          <div class="flex items-center mr-2 -ml-2 md:hidden">
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
          <div class="flex items-center flex-shrink-0">
            <NuxtLink class="flex items-center flex-shrink-0" to="/">
              <svg
                class="w-10 h-10 text-primary-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.7198 20.1C16.8531 18.4666 17.3198 16.3 17.9198 14.5333C18.4864 12.9666 18.8531 11.6 18.7864 11.5C18.4531 11.2 15.5864 17.8 15.1864 19.7666L14.7864 21.8L14.0198 20.6333C12.0198 17.7666 12.4531 14.9 15.2531 12.1333C16.7198 10.7 20.5864 8.1333 21.3198 8.1333C21.3864 8.1333 21.4531 9.2333 21.4864 10.5333C21.4864 11.8666 21.6198 14.4666 21.7531 16.3C21.9198 18.5 21.8864 19.9333 21.6531 20.5333C21.1864 21.7666 19.4198 22.8 17.8198 22.8H16.5198L16.7198 20.1Z"
                  fill="currentColor"
                />
                <path
                  d="M8.01988 21.1665C1.58655 18.9332 0.21988 12.3665 4.35321 3.4665L5.65321 0.666504L6.61988 2.3665C7.18655 3.33317 9.01988 5.3665 10.9199 7.13317L14.2199 10.1998L12.9532 11.8665C11.6199 13.6665 10.9532 15.3665 10.9532 17.1665C10.9199 18.2665 10.9199 18.2665 10.4199 17.6332C9.45321 16.3998 7.71988 12.6665 6.78655 9.8665C6.28655 8.33317 5.78655 7.1665 5.71988 7.2665C5.41988 7.5665 6.98655 14.2665 7.95321 16.7332C8.45321 18.0665 9.28655 19.6665 9.75321 20.2998C11.0865 22.0665 10.8865 22.1665 8.01988 21.1665Z"
                  fill="currentColor"
                />
              </svg>
              <span class="ml-2"> Every Mother's Advocate </span>
            </NuxtLink>
          </div>
        </div>
        <!-- Secondary_navbar_links -->
        <div class="hidden md:ml-6 md:flex md:items-center md:space-x-2">
          <NuxtLink
            :to="link.path"
            v-for="link in navbarLinks"
            :key="link.path"
          >
            {{ link.label }}
          </NuxtLink>
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
            <span class="sr-only">{{ $t('View notifications') }}</span>
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
