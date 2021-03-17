<template>
  <div class="mx-auto">
    <div
      class="grid grid-cols-1 gap-1 mt-1 lg:mt-4 lg:gap-4 sm:grid-cols-2 lg:grid-cols-3"
      x-max="1"
    >
      <!-- Card -->

      <div
        class="overflow-hidden bg-white shadow dark:bg-gray-700 lg:rounded-lg"
      >
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="w-6 h-6 text-gray-400"
                x-description="Heroicon name: scale"
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
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                ></path>
              </svg>
            </div>
            <div class="flex-1 w-0 ml-5">
              <dl>
                <dt
                  class="text-sm font-medium text-gray-500 truncate dark:text-gray-400"
                >
                  {{ $t('account_balance') }}
                </dt>
                <dd>
                  <div
                    class="text-lg font-medium text-gray-900 dark:text-gray-50"
                  >
                    $30,659.45
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="px-5 py-3 bg-gray-50 dark:bg-gray-800">
          <div class="text-sm">
            <a href="#" class="font-medium text-cyan-700 hover:text-cyan-900">
              {{ $t('view_all') }}
            </a>
          </div>
        </div>
      </div>

      <div
        class="overflow-hidden bg-white shadow dark:bg-gray-700 lg:rounded-lg"
      >
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="w-6 h-6 text-gray-400"
                x-description="Heroicon name: refresh"
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <div class="flex-1 w-0 ml-5">
              <dl>
                <dt
                  class="text-sm font-medium text-gray-500 truncate dark:text-gray-400"
                >
                  {{ $t('pending') }}
                </dt>
                <dd>
                  <div
                    class="text-lg font-medium text-gray-900 dark:text-gray-50"
                  >
                    -$19,500.00
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="px-5 py-3 bg-gray-50 dark:bg-gray-800">
          <div class="text-sm">
            <a href="#" class="font-medium text-cyan-700 hover:text-cyan-900">
              {{ $t('view_all') }}
            </a>
          </div>
        </div>
      </div>

      <div
        class="overflow-hidden bg-white shadow dark:bg-gray-700 lg:rounded-lg"
      >
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="w-6 h-6 text-gray-400"
                x-description="Heroicon name: check-circle"
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div class="flex-1 w-0 ml-5">
              <dl>
                <dt
                  class="text-sm font-medium text-gray-500 truncate dark:text-gray-400"
                >
                  {{ $t('processed') }} (last 30 days)
                </dt>
                <dd>
                  <div
                    class="text-lg font-medium text-gray-900 dark:text-gray-50"
                  >
                    $20,000
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="px-5 py-3 bg-gray-50 dark:bg-gray-800">
          <div class="text-sm">
            <a href="#" class="font-medium text-cyan-700 hover:text-cyan-900">
              {{ $t('view_all') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
