<script>
export default {
  // layout: 'plain',
  data() {
    return {
      message: {
        id: 2,
        subject: 'Tech Conferences',
      },
    }
  },
}
</script>

<template>
  <section
    class="flex flex-col items-center justify-center flex-1 w-full min-h-screen p-8"
  >
    <!-- class="grid grid-flow-row-dense grid-cols-2 grid-rows-3 gap-4 auto-cols-min" -->
    <div class="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
      <div
        class="col-span-2 p-4 pr-6 space-y-2 bg-white border-l-8 border-transparent rounded-md shadow-md dark:bg-gray-900"
      >
        <h2 class="text-xl font-bold">{{ $t('calendar_title') }}</h2>

        <div
          class="mt-4 overflow-hidden border-b border-gray-200 shadow sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50 dark:bg-black">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                >
                  code
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                >
                  Status
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white dark:bg-black dark:text-white">
                <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                  ema
                </td>
                <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                  Every Mother's Advocate
                </td>
                <td class="px-6 py-4 text-sm whitespace-nowrap">Active</td>
                <td
                  class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"
                >
                  <div>
                    <button
                      type="button"
                      class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2"
                    >
                      <svg
                        class="w-5 h-5 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      {{ $t('actions') }}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        class="p-4 pr-6 space-y-2 bg-white border-l-8 border-transparent rounded-md shadow-md dark:bg-gray-900"
      >
        <h2 class="text-lg font-semibold leading-6">
          {{ $t('cases_title') }}
        </h2>

        <p>
          {{ $t('cases_description') }}
        </p>

        <div>
          <button
            type="button"
            class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg
              class="w-5 h-5 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            {{ $t('actions') }}
          </button>
        </div>
      </div>

      <!-- Upcoming Items -->
      <div
        class="p-4 pr-6 space-y-2 bg-white border-l-8 rounded-md shadow-md border-brand dark:bg-gray-900"
      >
        <h2 class="text-lg font-bold leading-6">
          {{ $t('upcoming_items_title') }}
        </h2>

        <p>{{ $t('upcoming_items_blank_state_message') }}</p>

        <ul class="list-disc list-inside">
          <li>
            <a href="http://localhost:3000/_content">
              http://localhost:3000/_content
            </a>
          </li>
          <li>
            <a href="http://localhost:3000/_tailwind">
              http://localhost:3000/_tailwind
            </a>
          </li>
          <li>
            <NuxtLink
              :to="
                localePath({
                  name: 'index',
                  path: 'dashboard',
                  params: {slug: 'ball'},
                  query: {
                    plan: 'private',
                    sort: -1,
                  },
                })
              "
            >
              Nuxt locale path link
            </NuxtLink>
          </li>
          <li>
            <a
              href="#"
              @click.prevent="
                $router.push(
                  localeRoute({
                    name: 'index',
                    path: 'dashboard',
                    params: {slug: 'ball'},
                    query: {
                      plan: 'private',
                      sort: -1,
                    },
                  }),
                )
              "
            >
              $router.push navigation
            </a>
          </li>
          <li>
            <NuxtLink to="/messages/1"> {{ message.subject }} 1 </NuxtLink>
          </li>

          <li>
            <a
              @click.prevent="
                $router.push(
                  localeRoute({
                    path: 'messages/2',
                  }),
                )
              "
              >Important Information about your account</a
            >
          </li>
        </ul>
      </div>

      <!-- SteppedProgress -->
      <div
        class="col-span-2 space-y-2 bg-white border-l-8 border-white rounded-md shadow-md dark:border-gray-900 dark:bg-gray-900"
      >
        <stepped-progress></stepped-progress>

        <action-button></action-button>

        <h2>Meet the team</h2>
      </div>
    </div>
  </section>
</template>
