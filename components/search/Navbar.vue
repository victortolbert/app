<template>
  <nav
    class="relative z-10 bg-transparent border-b border-teal-500 border-opacity-25 lg:bg-transparent lg:border-none"
  >
    <div class="px-2 mx-auto sm:px-4 lg:px-8">
      <div
        class="relative flex items-center justify-between h-16 lg:border-b lg:border-primary-800"
      >
        <div class="flex items-center px-2 lg:px-0">
          <div class="flex-shrink-0">
            <img
              class="block w-auto h-8"
              src="https://tailwindui.com/img/logos/workflow-mark-teal-400.svg"
              alt="Workflow"
            />
          </div>
          <div class="hidden lg:block lg:ml-6 lg:space-x-4">
            <div class="flex">
              <!-- Current: "bg-black bg-opacity-25", Default: "hover:bg-primary-800" -->
              <a
                href="#"
                class="px-3 py-2 text-sm font-medium text-white bg-black bg-opacity-25 rounded-md"
                aria-current="page"
                >Dashboard</a
              >

              <a
                href="#"
                class="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-primary-800"
                >Jobs</a
              >

              <a
                href="#"
                class="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-primary-800"
                >Applicants</a
              >

              <a
                href="#"
                class="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-primary-800"
                >Company</a
              >
            </div>
          </div>
        </div>
        <div class="flex justify-center flex-1 px-2 lg:ml-6 lg:justify-end">
          <div class="w-full max-w-lg lg:max-w-xs">
            <label for="search" class="sr-only">Search</label>
            <div class="relative text-primary-100 focus-within:text-gray-400">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              >
                <BaseIconSolid name="search" class="flex-shrink-0" />
              </div>
              <input
                id="search"
                name="search"
                class="block w-full py-2 pl-10 pr-3 leading-5 bg-opacity-50 border border-transparent rounded-md bg-primary-700 placeholder-primary-100 focus:outline-none focus:bg-white focus:ring-white focus:border-white focus:placeholder-gray-500 focus:text-gray-900 sm:text-sm"
                placeholder="Search"
                type="search"
              />
            </div>
          </div>
        </div>
        <div class="flex lg:hidden">
          <!-- Mobile menu button -->
          <button
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-primary-200 hover:text-white hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <!--
                Icon when menu is closed.

                Heroicon name: outline/menu

                Menu open: "hidden", Menu closed: "block"
              -->
            <svg
              class="flex-shrink-0 block w-6 h-6"
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
            <!--
                Icon when menu is open.

                Heroicon name: outline/x

                Menu open: "block", Menu closed: "hidden"
              -->
            <svg
              class="flex-shrink-0 hidden w-6 h-6"
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
        <div class="hidden lg:block lg:ml-4">
          <div class="flex items-center">
            <button
              class="flex-shrink-0 p-1 rounded-full text-primary-200 hover:bg-primary-800 hover:text-white focus:outline-none focus:bg-primary-900 focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-white"
            >
              <span class="sr-only">View notifications</span>
              <BaseIconOutlined name="bell" />
            </button>
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="bg-primary-900 lg:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <!-- Current: "bg-black bg-opacity-25", Default: "hover:bg-primary-800" -->
        <a
          href="#"
          class="block px-3 py-2 text-base font-medium text-white bg-black bg-opacity-25 rounded-md"
          aria-current="page"
          >Dashboard</a
        >

        <a
          href="#"
          class="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-primary-800"
          >Jobs</a
        >

        <a
          href="#"
          class="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-primary-800"
          >Applicants</a
        >

        <a
          href="#"
          class="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-primary-800"
          >Company</a
        >
      </div>
      <div class="pt-4 pb-3 border-t border-primary-800">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img
              class="w-10 h-10 rounded-full"
              src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=iXNbLPGHnb&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80h"
              alt=""
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-white">Debbie Lewis</div>
            <div class="text-sm font-medium text-primary-200">
              debbielewis@example.com
            </div>
          </div>
          <button
            class="flex-shrink-0 p-1 ml-auto rounded-full text-primary-200 hover:bg-primary-800 hover:text-white focus:outline-none focus:bg-primary-900 focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-white"
          >
            <span class="sr-only">View notifications</span>
            <!-- Heroicon name: outline/bell -->
            <svg
              class="w-6 h-6"
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
        <div class="px-2 mt-3">
          <a
            href="#"
            class="block px-3 py-2 text-base font-medium rounded-md text-primary-200 hover:text-white hover:bg-primary-800"
            >Your Profile</a
          >

          <a
            href="#"
            class="block px-3 py-2 text-base font-medium rounded-md text-primary-200 hover:text-white hover:bg-primary-800"
            >Settings</a
          >

          <a
            href="#"
            class="block px-3 py-2 text-base font-medium rounded-md text-primary-200 hover:text-white hover:bg-primary-800"
            >Sign out</a
          >
        </div>
      </div>
    </div>
  </nav>
</template>
