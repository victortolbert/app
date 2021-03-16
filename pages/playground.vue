<template>
  <article class="p-8 prose-sm">
    <nav class="bg-gray-800">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex items-center mr-2 -ml-2 md:hidden">
              <!-- Mobile menu button -->
              <button
                class="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-expanded="false"
              >
                <span class="sr-only">Open main menu</span>
                <!-- Icon when menu is closed. -->
                <!--
        Heroicon name: menu

        Menu open: "hidden", Menu closed: "block"
        -->
                <svg
                  class="block w-6 h-6"
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
                <!--
        Heroicon name: x

        Menu open: "block", Menu closed: "hidden"
        -->
                <svg
                  class="hidden w-6 h-6"
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
            <div class="flex items-center flex-shrink-0">
              `
              <!-- Default_navbar_brand_link -->
              <a
                class="flex items-center flex-shrink-0"
                href="http://designcoder.test/"
              >
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
              </a>
            </div>
            <div class="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <a
                href="#"
                class="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md"
                >Dashboard</a
              >
              <a
                href="#"
                class="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                >Team</a
              >
              <a
                href="#"
                class="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                >Projects</a
              >
              <a
                href="#"
                class="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                >Calendar</a
              >
            </div>
          </div>
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <button
                type="button"
                class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary-500"
              >
                <!-- Heroicon name: plus -->
                <svg
                  class="w-5 h-5 mr-2 -ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>New Job</span>
              </button>
            </div>
            <div
              class="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center"
            >
              <button
                class="p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span class="sr-only">View notifications</span>
                <!-- Heroicon name: bell -->
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

              <!-- Profile dropdown -->
              <div class="relative hidden ml-3">
                <div>
                  <button
                    id="user-menu"
                    class="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    aria-haspopup="true"
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="w-8 h-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                      alt=""
                    />
                  </button>
                </div>
                <!--
        Profile dropdown panel, show/hide based on dropdown state.

        Entering: "transition ease-out duration-200"
          From: "transform opacity-0 scale-95"
          To: "transform opacity-100 scale-100"
        Leaving: "transition ease-in duration-75"
          From: "transform opacity-100 scale-100"
          To: "transform opacity-0 scale-95"
        -->
                <div
                  class="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
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
      </div>

      <!--
    Mobile menu, toggle classes based on menu state.

    Menu open: "block", Menu closed: "hidden"
  -->
      <div class="hidden md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
          <a
            href="#"
            class="block px-3 py-2 text-base font-medium text-white bg-gray-900 rounded-md"
            >Dashboard</a
          >
          <a
            href="#"
            class="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
            >Team</a
          >
          <a
            href="#"
            class="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
            >Projects</a
          >
          <a
            href="#"
            class="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
            >Calendar</a
          >
        </div>
        <div class="pt-4 pb-3 border-t border-gray-700">
          <div class="flex items-center px-5 sm:px-6">
            <div class="flex-shrink-0">
              <img
                class="w-10 h-10 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                alt=""
              />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-white">Tom Cook</div>
              <div class="text-sm font-medium text-gray-400">
                tom@example.com
              </div>
            </div>
            <button
              class="flex-shrink-0 p-1 ml-auto text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span class="sr-only">View notifications</span>
              <!-- Heroicon name: bell -->
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
          <div class="px-2 mt-3 sm:px-3">
            <a
              href="#"
              class="block px-3 py-2 space-y-1 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700"
              >Your Profile</a
            >
            <a
              href="#"
              class="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700"
              >Settings</a
            >
            <a
              href="#"
              class="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700"
              >Sign out</a
            >
          </div>
        </div>
      </div>
    </nav>

    <section class="mt-4 prose">
      <table>
        <thead>
          <tr>
            <th class="rsg--cellHeading-36 whitespace-nowrap">Prop name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>active</code></td>
            <td><span>string</span></td>
            <td><span>Required</span></td>
            <td><span>true</span></td>
            <td>
              <div>
                State which tab is active when initiated (using name of the
                component).
              </div>
            </td>
          </tr>
          <tr>
            <td><code>navItems</code></td>
            <td><span>array</span></td>
            <td><span>Required</span></td>
            <td><span>true</span></td>
            <td>
              <div>Menu items to be displayed on the nav bar.</div>
            </td>
          </tr>
          <tr>
            <td><code>type</code></td>
            <td><span>string</span></td>
            <td><code>nav</code></td>
            <td>
              <div />
            </td>
            <td>
              <div>The html element name used for the nav bar.</div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </article>
</template>
