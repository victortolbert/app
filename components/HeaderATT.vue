<template>
  <header x-data="{ open: false }" class="bg-white shadow">
    <div class="px-2 mx-auto sm:px-4 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex px-2 lg:px-0">
          <!-- Logo -->
          <div class="flex items-center flex-shrink-0">
            <NuxtLink
              class="flex items-center flex-shrink-0 m-2"
              :to="localePath('/')"
            >
              <LogoATT />
              <!-- <span class="hidden font-black sm:block"> Promise Serves </span> -->
            </NuxtLink>
          </div>

          <!-- Navbar Links -->
          <nav
            aria-label="Global"
            class="hidden lg:ml-6 lg:flex lg:items-center lg:space-x-4"
          >
            <a href="#" class="px-3 py-2 text-sm font-medium text-gray-900">
              All Affiliates
            </a>

            <a href="#" class="px-3 py-2 text-sm font-medium text-gray-900">
              Ema
            </a>
            <a href="#" class="px-3 py-2 text-sm font-medium text-gray-900">
              Events
            </a>
            <a href="#" class="px-3 py-2 text-sm font-medium text-gray-900">
              Resources
            </a>
          </nav>
        </div>

        <div
          class="flex items-center justify-center flex-1 px-2 lg:ml-6 lg:justify-end"
        >
          <div class="w-full max-w-lg lg:max-w-xs">
            <label for="search" class="sr-only">Search</label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              >
                <svg
                  class="w-5 h-5 text-gray-400"
                  x-description="Heroicon name: search"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                id="search"
                name="search"
                class="block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-500 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                placeholder="Search"
                type="search"
              />
            </div>
          </div>
        </div>

        <div class="flex items-center lg:hidden">
          <!-- Mobile menu button -->
          <button
            type="button"
            @click="open = !open"
            class="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            x-bind:aria-expanded="open"
          >
            <span class="sr-only">Open main menu</span>
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
              ></path>
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
              ></path>
            </svg>
          </button>
        </div>

        <div class="hidden lg:ml-4 lg:flex lg:items-center">
          <button
            type="button"
            class="flex-shrink-0 p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span class="sr-only">View notifications</span>
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

          <!-- Profile dropdown -->
          <div
            v-click-away="(open = false)"
            class="relative flex-shrink-0 ml-4"
            x-data="{ open: false }"
          >
            <div>
              <button
                type="button"
                @click="open = !open"
                class="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                id="user-menu"
                aria-haspopup="true"
                x-bind:aria-expanded="open"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="w-8 h-8 rounded-full"
                  src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=8&amp;w=256&amp;h=256&amp;q=80"
                  alt=""
                />
              </button>
            </div>
            <div
              x-show="open"
              x-description="Profile dropdown panel, show/hide based on dropdown state."
              x-transition:enter="transition ease-out duration-100"
              x-transition:enter-start="transform opacity-0 scale-95"
              x-transition:enter-end="transform opacity-100 scale-100"
              x-transition:leave="transition ease-in duration-75"
              x-transition:leave-start="transform opacity-100 scale-100"
              x-transition:leave-end="transform opacity-0 scale-95"
              class="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
              style="display: none"
            >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                >Your Profile</a
              >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                >Settings</a
              >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                >Sign out</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Breadcrumbs -->
    <div class="px-4 mx-auto">
      <div class="py-3 border-t border-gray-200 sm:px-6">
        <nav class="flex" aria-label="Breadcrumb">
          <div class="flex sm:hidden">
            <a
              href="#"
              class="inline-flex space-x-3 text-sm font-medium text-gray-500 group hover:text-gray-700"
            >
              <svg
                class="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-600"
                x-description="Heroicon name: arrow-narrow-left"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>Back to Applicants</span>
            </a>
          </div>

          <div class="hidden sm:block">
            <ol class="flex items-center space-x-4">
              <li>
                <div>
                  <a href="#" class="text-gray-400 hover:text-gray-500">
                    <svg
                      class="flex-shrink-0 w-5 h-5"
                      x-description="Heroicon name: home"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                      ></path>
                    </svg>
                    <span class="sr-only">Home</span>
                  </a>
                </div>
              </li>
              <li>
                <div class="flex items-center">
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"
                    ></path>
                  </svg>
                  <a
                    href="#"
                    class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    Dashboard
                  </a>
                </div>
              </li>
              <li>
                <div class="flex items-center">
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"
                    ></path>
                  </svg>
                  <a
                    href="#"
                    aria-current="page"
                    class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    Front End Developer
                  </a>
                </div>
              </li>
              <li>
                <div class="flex items-center">
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"
                    ></path>
                  </svg>
                  <a
                    href="#"
                    aria-current="page"
                    class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    Applicants
                  </a>
                </div>
              </li>
            </ol>
          </div>
        </nav>
      </div>
    </div>

    <div
      x-description="Mobile menu overlay, show/hide based on mobile menu state."
      x-show="open"
      x-transition:enter="duration-150 ease-out"
      x-transition:enter-start="opacity-0"
      x-transition:enter-end="opacity-100"
      x-transition:leave="duration-150 ease-in"
      x-transition:leave-start="opacity-100"
      x-transition:leave-end="opacity-0"
      class="fixed inset-0 z-20 bg-black bg-opacity-25 lg:hidden"
      aria-hidden="true"
      style="display: none"
    ></div>

    <div
      x-description="Mobile menu, show/hide based on mobile menu state."
      x-show="open"
      x-transition:enter="duration-150 ease-out"
      x-transition:enter-start="opacity-0 scale-95"
      x-transition:enter-end="opacity-100 scale-100"
      x-transition:leave="duration-150 ease-in"
      x-transition:leave-start="opacity-100 scale-100"
      x-transition:leave-end="opacity-0 scale-95"
      class="absolute top-0 right-0 z-30 w-full p-2 transition origin-top transform max-w-none lg:hidden"
      style="display: none"
    >
      <div
        class="bg-white divide-y divide-gray-200 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
      >
        <div class="pt-3 pb-2">
          <div class="flex items-center justify-between px-4">
            <div>
              <img
                class="w-auto h-8"
                src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
                alt="Workflow"
              />
            </div>
            <div class="-mr-2">
              <button
                @click="open = false"
                type="button"
                class="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span class="sr-only">Close menu</span>
                <svg
                  class="w-6 h-6"
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
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="px-2 mt-3 space-y-1">
            <a
              href="#"
              class="block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100 hover:text-gray-800"
              >Dashboard</a
            >
            <a
              href="#"
              class="block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100 hover:text-gray-800"
              >Jobs</a
            >
            <a
              href="#"
              class="block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100 hover:text-gray-800"
              >Applicants</a
            >
            <a
              href="#"
              class="block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100 hover:text-gray-800"
              >Company</a
            >
          </div>
        </div>
        <div class="pt-4 pb-2">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img
                class="w-10 h-10 rounded-full"
                src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=8&amp;w=256&amp;h=256&amp;q=80"
                alt=""
              />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800">
                Whitney Francis
              </div>
              <div class="text-sm font-medium text-gray-500">
                whitney@example.com
              </div>
            </div>
            <button
              class="flex-shrink-0 p-1 ml-auto text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span class="sr-only">View notifications</span>
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
          <div class="px-2 mt-3 space-y-1">
            <a
              href="#"
              class="block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100 hover:text-gray-800"
              >Your Profile</a
            >
            <a
              href="#"
              class="block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100 hover:text-gray-800"
              >Settings</a
            >
            <a
              href="#"
              class="block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100 hover:text-gray-800"
              >Sign out</a
            >
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
