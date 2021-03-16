
<template>
  <PageWrapper>
    <PageHeading>{{ $t('requests') }}</PageHeading>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <nav class="space-y-1" aria-label="Sidebar">
      <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
      <a
        href="#"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-md group"
        aria-current="page"
      >
        <!-- Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" -->
        <!-- Heroicon name: home -->
        <svg
          class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-500"
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
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span class="truncate"> Dashboard </span>

        <!-- Current: "bg-white", Default: "bg-gray-100 group-hover:bg-gray-200" -->
        <span
          class="bg-white ml-auto inline-block py-0.5 px-3 text-xs rounded-full"
        >
          5
        </span>
      </a>

      <a
        href="#"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
      >
        <!-- Heroicon name: users -->
        <svg
          class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
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
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <span class="truncate"> Team </span>
      </a>

      <a
        href="#"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
      >
        <!-- Heroicon name: folder -->
        <svg
          class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
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
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
        <span class="truncate"> Projects </span>

        <span
          class="bg-gray-100 group-hover:bg-gray-200 ml-auto inline-block py-0.5 px-3 text-xs rounded-full"
        >
          19
        </span>
      </a>

      <a
        href="#"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
      >
        <!-- Heroicon name: calendar -->
        <svg
          class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span class="truncate"> Calendar </span>

        <span
          class="bg-gray-100 group-hover:bg-gray-200 ml-auto inline-block py-0.5 px-3 text-xs rounded-full"
        >
          20+
        </span>
      </a>

      <a
        href="#"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
      >
        <!-- Heroicon name: inbox -->
        <svg
          class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
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
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <span class="truncate"> Documents </span>
      </a>

      <a
        href="#"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
      >
        <!-- Heroicon name: chart-bar -->
        <svg
          class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <span class="truncate"> Reports </span>
      </a>
    </nav>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <nav class="space-y-1" aria-label="Sidebar">
      <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
      <a
        href="#"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-md group"
        aria-current="page"
      >
        <span class="truncate"> Dashboard </span>

        <!-- Current: "bg-white", Default: "bg-gray-100 group-hover:bg-gray-200" -->
        <span
          class="bg-white ml-auto inline-block py-0.5 px-3 text-xs rounded-full"
        >
          5
        </span>
      </a>

      <a
        href="#"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
      >
        <span class="truncate"> Team </span>
      </a>

      <a
        href="#"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
      >
        <span class="truncate"> Projects </span>

        <span
          class="bg-gray-100 group-hover:bg-gray-200 ml-auto inline-block py-0.5 px-3 text-xs rounded-full text-gray-600"
        >
          19
        </span>
      </a>

      <a
        href="#"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
      >
        <span class="truncate"> Calendar </span>

        <span
          class="bg-gray-100 group-hover:bg-gray-200 ml-auto inline-block py-0.5 px-3 text-xs rounded-full text-gray-600"
        >
          20+
        </span>
      </a>

      <a
        href="#"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
      >
        <span class="truncate"> Documents </span>
      </a>

      <a
        href="#"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
      >
        <span class="truncate"> Reports </span>
      </a>
    </nav>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <nav class="space-y-1" aria-label="Sidebar">
      <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
      <a
        href="#"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-md"
        aria-current="page"
      >
        <span class="truncate"> Dashboard </span>
      </a>

      <a
        href="#"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
      >
        <span class="truncate"> Team </span>
      </a>

      <a
        href="#"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
      >
        <span class="truncate"> Projects </span>
      </a>

      <a
        href="#"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
      >
        <span class="truncate"> Calendar </span>
      </a>

      <a
        href="#"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
      >
        <span class="truncate"> Documents </span>
      </a>

      <a
        href="#"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
      >
        <span class="truncate"> Reports </span>
      </a>
    </nav>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <nav class="space-y-1" aria-label="Sidebar">
      <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
      <a
        href="#"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-md"
        aria-current="page"
      >
        <!-- Current: "text-gray-500", Default: "text-gray-400" -->
        <!-- Heroicon name: home -->
        <svg
          class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-500"
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
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span class="truncate"> Dashboard </span>

        <!-- Current: "bg-gray-50", Default: "bg-gray-200 text-gray-600" -->
        <span
          class="bg-gray-50 ml-auto inline-block py-0.5 px-3 text-xs rounded-full"
        >
          5
        </span>
      </a>

      <a
        href="#"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
      >
        <!-- Heroicon name: users -->
        <svg
          class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400"
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
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <span class="truncate"> Team </span>
      </a>

      <a
        href="#"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
      >
        <!-- Heroicon name: folder -->
        <svg
          class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400"
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
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
        <span class="truncate"> Projects </span>

        <span
          class="bg-gray-200 text-gray-600 ml-auto inline-block py-0.5 px-3 text-xs rounded-full"
        >
          19
        </span>
      </a>

      <a
        href="#"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
      >
        <!-- Heroicon name: calendar -->
        <svg
          class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400"
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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span class="truncate"> Calendar </span>

        <span
          class="bg-gray-200 text-gray-600 ml-auto inline-block py-0.5 px-3 text-xs rounded-full"
        >
          20+
        </span>
      </a>

      <a
        href="#"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
      >
        <!-- Heroicon name: inbox -->
        <svg
          class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400"
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
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <span class="truncate"> Documents </span>
      </a>

      <a
        href="#"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
      >
        <!-- Heroicon name: chart-bar -->
        <svg
          class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400"
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <span class="truncate"> Reports </span>
      </a>
    </nav>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Payment method
        </h3>
        <div class="mt-5">
          <div
            class="px-6 py-5 rounded-md bg-gray-50 sm:flex sm:items-start sm:justify-between"
          >
            <h4 class="sr-only">
              Visa
            </h4>
            <div class="sm:flex sm:items-start">
              <svg
                class="w-auto h-8 sm:flex-shrink-0 sm:h-6"
                viewBox="0 0 36 24"
                aria-hidden="true"
              >
                <rect width="36" height="24" fill="#224DBA" rx="4" />
                <path
                  fill="#fff"
                  d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                />
              </svg>
              <div class="mt-3 sm:mt-0 sm:ml-4">
                <div class="text-sm font-medium text-gray-900">
                  Ending with 4242
                </div>
                <div class="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                  <div>Expires 12/20</div>
                  <span class="hidden sm:mx-2 sm:inline" aria-hidden="true">
                    &middot;
                  </span>
                  <div class="mt-1 sm:mt-0">
                    Last updated on 22 Aug 2017
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-gray-50 sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Need more bandwidth?
        </h3>
        <div class="max-w-xl mt-2 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus praesentium tenetur pariatur.
          </p>
        </div>
        <div class="mt-5">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Contact sales
          </button>
        </div>
      </div>
    </div>

    <!--
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
-->
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Update your email
        </h3>
        <div class="max-w-xl mt-2 text-sm text-gray-500">
          <p>Change the email address you want associated with your account.</p>
        </div>
        <form class="mt-5 sm:flex sm:items-center">
          <div class="w-full max-w-xs">
            <label for="email" class="sr-only">Email</label>
            <input
              id="email"
              type="text"
              name="email"
              class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="you@example.com"
            >
          </div>
          <button
            type="submit"
            class="inline-flex items-center justify-center w-full px-4 py-2 mt-3 font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Save
          </button>
        </form>
      </div>
    </div>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3
          id="renew-headline"
          class="text-lg font-medium leading-6 text-gray-900"
        >
          Renew subscription automatically
        </h3>
        <div class="mt-2 sm:flex sm:items-start sm:justify-between">
          <div class="max-w-xl text-sm text-gray-500">
            <p id="renew-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              totam non cumque deserunt officiis ex maiores nostrum.
            </p>
          </div>
          <div
            class="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center"
          >
            <!-- On: "bg-primary-600", Off: "bg-gray-200" -->
            <button
              type="button"
              aria-pressed="false"
              aria-labelledby="renew-headline"
              class="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out bg-gray-200 border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <span class="sr-only">Use setting</span>
              <!-- On: "translate-x-5", Off: "translate-x-0" -->
              <span
                aria-hidden="true"
                class="inline-block w-5 h-5 transition duration-200 ease-in-out transform translate-x-0 bg-white rounded-full shadow ring-0"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <div class="sm:flex sm:items-start sm:justify-between">
          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Manage subscription
            </h3>
            <div class="max-w-xl mt-2 text-sm text-gray-500">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae voluptatibus corrupti atque repudiandae nam.
              </p>
            </div>
          </div>
          <div
            class="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center"
          >
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Change plan
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Manage subscription
        </h3>
        <div class="mt-2 sm:flex sm:items-start sm:justify-between">
          <div class="max-w-xl text-sm text-gray-500">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Recusandae voluptatibus corrupti atque repudiandae nam.
            </p>
          </div>
          <div
            class="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center"
          >
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Change plan
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Continuous Integration
        </h3>
        <div class="max-w-xl mt-2 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            totam at reprehenderit maxime aut beatae ad.
          </p>
        </div>
        <div class="mt-3 text-sm">
          <a
            href="#"
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            Learn more about our CI features
            <span aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
    </div>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Delete your account
        </h3>
        <div class="max-w-xl mt-2 text-sm text-gray-500">
          <p>
            Once you delete your account, you will lose all data associated with
            it.
          </p>
        </div>
        <div class="mt-5">
          <button
            type="button"
            class="inline-flex items-center justify-center px-4 py-2 font-medium text-red-700 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
          >
            Delete account
          </button>
        </div>
      </div>
    </div>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="flex items-center justify-between">
      <span id="toggleLabel" class="flex flex-col flex-grow">
        <span class="text-sm font-medium text-gray-900">Available to hire</span>
        <span
          class="text-sm leading-normal text-gray-500"
        >Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.</span>
      </span>
      <!-- On: "bg-primary-600", Off: "bg-gray-200" -->
      <button
        type="button"
        aria-pressed="false"
        aria-labelledby="toggleLabel"
        class="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out bg-gray-200 border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <span class="sr-only">Use setting</span>
        <!-- On: "translate-x-5", Off: "translate-x-0" -->
        <span
          aria-hidden="true"
          class="inline-block w-5 h-5 transition duration-200 ease-in-out transform translate-x-0 bg-white rounded-full shadow pointer-events-none ring-0"
        />
      </button>
    </div>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="flex items-center">
      <!-- On: "bg-primary-600", Off: "bg-gray-200" -->
      <button
        type="button"
        aria-pressed="false"
        aria-labelledby="toggleLabel"
        class="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out bg-gray-200 border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <span class="sr-only">Use setting</span>
        <!-- On: "translate-x-5", Off: "translate-x-0" -->
        <span
          aria-hidden="true"
          class="inline-block w-5 h-5 transition duration-200 ease-in-out transform translate-x-0 bg-white rounded-full shadow pointer-events-none ring-0"
        />
      </button>
      <span id="toggleLabel" class="ml-3">
        <span class="text-sm font-medium text-gray-900">Annual billing </span>
        <span class="text-sm text-gray-500">(Save 10%)</span>
      </span>
    </div>
  </PageWrapper>
</template>
