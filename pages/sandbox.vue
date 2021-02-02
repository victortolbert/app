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
                    {{ page.title }}
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
                {{ page.title }}
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

    <section class="p-8 mt-8">
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
          >
            <div
              class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Role
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 w-10 h-10">
                          <img
                            class="w-10 h-10 rounded-full"
                            src="/img/avatars/andy.jpg"
                            alt="Andy Cook"
                          />
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            Andy Cook
                          </div>
                          <div class="text-sm text-gray-500">
                            andy@promise686.org
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">President and CEO</div>
                      <div class="text-sm text-gray-500">Promise 686</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
                      >
                        Active
                      </span>
                    </td>
                    <td
                      class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                    >
                      Admin
                    </td>
                    <td
                      class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"
                    >
                      <a
                        href="#"
                        class="text-primary-600 hover:text-primary-900"
                        >Edit</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 w-10 h-10">
                          <img
                            class="w-10 h-10 rounded-full"
                            src="/img/avatars/jeremy.jpg"
                            alt="Jeremy Doublestein"
                          />
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            Jeremy Doublestein
                          </div>
                          <div class="text-sm text-gray-500">
                            jdoublestein@promise686.org
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        Director of Promise Serves
                      </div>
                      <div class="text-sm text-gray-500">Promise 686</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
                      >
                        Active
                      </span>
                    </td>
                    <td
                      class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                    >
                      Admin
                    </td>
                    <td
                      class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"
                    >
                      <a
                        href="#"
                        class="text-primary-600 hover:text-primary-900"
                        >Edit</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 w-10 h-10">
                          <img
                            class="w-10 h-10 rounded-full"
                            src="/img/avatars/victor.jpg"
                            alt="Victor Tolbert"
                          />
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            Victor Tolbert
                          </div>
                          <div class="text-sm text-gray-500">
                            victor@tolbert.design
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        Principal User Interface Engineer
                      </div>
                      <div class="text-sm text-gray-500">
                        Tolbert Design, VTi Consulting
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
                      >
                        Active
                      </span>
                    </td>
                    <td
                      class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                    >
                      Admin
                    </td>
                    <td
                      class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"
                    >
                      <a
                        href="#"
                        class="text-primary-600 hover:text-primary-900"
                        >Edit</a
                      >
                    </td>
                  </tr>

                  <!-- More rows... -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
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
