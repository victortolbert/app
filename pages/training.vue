<template>
  <article class="overflow-hidden bg-white rounded-lg shadow">
    <header class="px-4 sm:p-6">
      <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
        <div
          class="flex flex-wrap items-center justify-between -mt-2 -ml-4 sm:flex-nowrap"
        >
          <div class="mt-2 ml-4">
            <h3
              class="flex items-center text-2xl font-medium leading-6 text-gray-900"
            >
              <svg
                class="w-10 h-10 mr-1 text-primary-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"
                />
              </svg>
              <span>{{ $t('training') }}</span>
            </h3>
          </div>
          <div class="flex-shrink-0 mt-2 ml-4">
            <button
              type="button"
              class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <span>Thinkrific</span>
              <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
                />
                <path
                  d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
    <div class="px-4 sm:px-6">
      <div class="px-4 py-5 sm:px-6">
        <nav aria-label="Progress">
          <ol class="overflow-hidden">
            <li class="relative pb-10">
              <!-- Complete Step -->
              <div
                class="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-primary-600"
                aria-hidden="true"
              />
              <a href="#" class="relative flex items-start group">
                <span class="flex items-center h-9">
                  <span
                    class="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-primary-600 group-hover:bg-primary-800"
                  >
                    <!-- Heroicon name: check -->
                    <svg
                      class="w-5 h-5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </span>
                <span class="flex flex-col min-w-0 ml-4">
                  <span class="text-xs font-semibold tracking-wide uppercase">
                    Module One
                  </span>
                  <span class="text-sm text-gray-500">
                    Vitae sed mi luctus laoreet.
                  </span>
                </span>
              </a>
            </li>

            <li class="relative pb-10">
              <!-- Current Step -->
              <div
                class="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                aria-hidden="true"
              />
              <a
                href="#"
                class="relative flex items-start group"
                aria-current="step"
              >
                <span class="flex items-center h-9" aria-hidden="true">
                  <span
                    class="relative z-10 flex items-center justify-center w-8 h-8 bg-white border-2 rounded-full border-primary-600"
                  >
                    <span class="h-2.5 w-2.5 bg-primary-600 rounded-full" />
                  </span>
                </span>
                <span class="flex flex-col min-w-0 ml-4">
                  <span
                    class="text-xs font-semibold tracking-wide uppercase text-primary-600"
                  >
                    Module Two
                  </span>
                  <span class="text-sm text-gray-500">
                    Cursus semper viverra facilisis et et some more.
                  </span>
                </span>
              </a>
            </li>

            <li class="relative pb-10">
              <div
                class="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                aria-hidden="true"
              />
              <a href="#" class="relative flex items-start group">
                <span class="flex items-center h-9" aria-hidden="true">
                  <span
                    class="relative z-10 flex items-center justify-center w-8 h-8 bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400"
                  >
                    <span
                      class="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"
                    />
                  </span>
                </span>
                <span class="flex flex-col min-w-0 ml-4">
                  <span
                    class="text-xs font-semibold tracking-wide text-gray-500 uppercase"
                  >
                    Module 3
                  </span>
                  <span class="text-sm text-gray-500">
                    Penatibus eu quis ante.
                  </span>
                </span>
              </a>
            </li>

            <li class="relative pb-10">
              <div
                class="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                aria-hidden="true"
              />
              <a href="#" class="relative flex items-start group">
                <span class="flex items-center h-9" aria-hidden="true">
                  <span
                    class="relative z-10 flex items-center justify-center w-8 h-8 bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400"
                  >
                    <span
                      class="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"
                    />
                  </span>
                </span>
                <span class="flex flex-col min-w-0 ml-4">
                  <span
                    class="text-xs font-semibold tracking-wide text-gray-500 uppercase"
                  >
                    Module 4
                  </span>
                  <span class="text-sm text-gray-500">
                    Faucibus nec enim leo et.
                  </span>
                </span>
              </a>
            </li>

            <li class="relative">
              <a href="#" class="relative flex items-start group">
                <span class="flex items-center h-9" aria-hidden="true">
                  <span
                    class="relative z-10 flex items-center justify-center w-8 h-8 bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400"
                  >
                    <span
                      class="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"
                    />
                  </span>
                </span>
                <span class="flex flex-col min-w-0 ml-4">
                  <span
                    class="text-xs font-semibold tracking-wide text-gray-500 uppercase"
                  >
                    Module Five
                  </span>
                  <span class="text-sm text-gray-500">
                    Iusto et officia maiores porro ad non quas.
                  </span>
                </span>
              </a>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  </article>
</template>
