<script>
export default {
  // layout: 'plain',
  computed: {
    username() {
      // We will see what `params` is shortly
      return this.$route.params.username
    },
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
  },
}
</script>

<template>
  <section
    class="flex flex-col items-center justify-center flex-1 min-h-screen bg-gray-100"
  >
    <div
      class="flex items-center justify-center w-full min-h-screen bg-primary-500"
    >
      <div class="flex-1 p-8">
        <!-- class="grid grid-flow-row-dense grid-cols-2 grid-rows-3 gap-4 auto-cols-min" -->
        <div class="grid grid-cols-3 gap-4">
          <!-- Dashboard Panel -->
          <div
            class="col-span-2 p-4 pr-6 space-y-2 bg-white border-l-8 border-transparent rounded-md shadow-md dark:text-white dark:bg-gray-800"
          >
            <header class="flex items-center justify-between">
              <h2 class="text-xl font-bold">{{ $t('dashboard') }}</h2>

              <!-- DateRangeButtonGroup -->
              <span class="relative z-0 inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  Years
                </button>
                <button
                  type="button"
                  class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  Months
                </button>
                <button
                  type="button"
                  class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  Days
                </button>
              </span>
            </header>

            {{ $t('calendar') }}

            <h2>Affiliate</h2>

            <h3 class="font-bold">Roles</h3>
            <ul class="flex space-x-2">
              <li>Staff</li>
              <li>Advocate</li>
              <li>Admin</li>
              <li>Community Volunteer</li>
              <li>Prospect</li>
              <li>Church</li>
              <li>Community</li>
              <li>Super Admin</li>
            </ul>
          </div>

          <div
            class="p-4 pr-6 space-y-2 bg-white border-l-8 border-transparent rounded-md shadow-md"
          >
            <h2 class="text-lg font-semibold leading-6">Cases</h2>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              atque temporibus sit sed ut perspiciatis neque quisquam
            </p>

            <!-- Getting Started Section -->
            <section>
              <h2 class="text-lg font-semibold leading-6">Getting started</h2>

              <p>
                Everything you need to know to get started and get to work in
                Promise Serves.
              </p>
            </section>

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
                Actions
              </button>
            </div>
          </div>

          <div
            class="p-4 pr-6 space-y-2 bg-white border-l-8 border-teal-400 rounded-md shadow-md"
          >
            <h2 class="text-lg font-bold leading-6">Next Action Steps</h2>

            <p>No relevant upcoming items in the next 30 days</p>

            <details>
              <summary>
                I have keys but no doors. I have space but no room. You can
                enter but can’t leave. What am I?
              </summary>
              A keyboard.
            </details>
          </div>

          <div
            class="p-4 pr-6 space-y-2 bg-white border-l-8 border-teal-400 rounded-md shadow-md"
          >
            <h2 class="text-lg font-bold leading-6">Upcoming Items</h2>
            <p>No relevant upcoming items in the next 30 days</p>
          </div>
          <div
            class="p-4 pr-6 space-y-2 bg-white border-l-8 border-transparent rounded-md shadow-md"
          >
            <SteppedProgress />
          </div>
        </div>
      </div>
    </div>
    <div class="grid gap-8 px-8 lg:grid-cols-1">
      <TrainingStepProgress />

      <!--  3u_vIdnJYLc
            CruddyByDesign: MF0jFKvS4SI
      -->
      <figure class="aspect-w-16 aspect-h-9">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/?controls=0&amp;start=30"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </figure>
    </div>
  </section>
</template>
