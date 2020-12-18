<template>
  <main class="flex-1">
    <header class="p-8 bg-gray-800">
      <div class="">
        <!-- breadcrumb container -->
        <div class="breadrumb">
          <nav class="sm:hidden" aria-label="Back">
            <a
              href="#"
              class="flex items-center text-sm font-medium text-gray-400 hover:text-gray-200"
            >
              <svg
                class="flex-shrink-0 w-5 h-5 mr-1 -ml-1 text-gray-500"
                x-description="Heroicon name: chevron-left"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Back
            </a>
          </nav>
          <nav class="hidden sm:flex" aria-label="Breadcrumb">
            <ol class="flex items-center space-x-4">
              <li>
                <div>
                  <a href="#" class="text-gray-400 hover:text-gray-500"> </a
                  ><a
                    href="<?= base_url('dashboard') ?>"
                    class="text-sm font-medium text-gray-400 hover:text-gray-200"
                    >Dashboard</a
                  >
                </div>
              </li>
              <li>
                <div class="flex items-center">
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-gray-500"
                    x-description="Heroicon name: chevron-right"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <a
                    href="<?= base_url('organizations') ?>"
                    class="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200"
                    >My Organization</a
                  >
                </div>
              </li>
              <li>
                <div class="flex items-center">
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-gray-500"
                    x-description="Heroicon name: chevron-right"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <a
                    href="#"
                    aria-current="page"
                    class="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200"
                  >
                    Modules
                  </a>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <!-- page title and page actions container -->
        <div class="mt-2 md:flex md:items-center md:justify-between">
          <!-- page title container -->
          <div class="flex-1 min-w-0">
            <!-- Page Title -->
            <h2
              class="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate"
            >
              <!-- Gradient Text Effect -->
              <span
                class="text-transparent bg-gradient-to-r bg-clip-text from-purple-400 to-primary-500"
              >
                Modules
              </span>
            </h2>
          </div>

          <!-- page actions container-->
          <div class="flex flex-shrink-0 mt-4 md:mt-0 md:ml-4">
            <!-- Edit Button -->
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary-500"
            >
              Edit
            </button>

            <!-- Publish Button -->
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-700 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary-500"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="p-8 mt-8">
      <article
        class="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8"
      >
        <NuxtLink
          class="p-4 text-center border rounded-md shadow-md border-primary-600 hover:bg-primary-600 hover:text-primary-100"
          :to="link.path"
          :key="index"
          v-for="(link, index) in $store.state.site.navbar.links[0].links"
        >
          {{ link.label }}
        </NuxtLink>
      </article>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      page: {
        title: 'Dashboard',
      },
    }
  },
}
</script>
