<script setup>
const sortAscending = ref(false)
</script>

<template>
  <div class="relative bg-white shadow-md sm:rounded-lg dark:bg-gray-800">
    <div class="flex flex-col items-center justify-between p-4 md:flex-row space-y-3 md:space-x-4 md:space-y-0">
      <div class="w-full flex flex-col gap-4 gap-4 md:w-3/5 md:flex-row">
        <form class="flex flex-1 items-center">
          <label for="simple-search" class="sr-only">Search</label>
          <div class="relative w-full">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg aria-hidden="true" class="h-5 w-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input id="simple-search" type="text" class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full border border-gray-300 rounded-lg bg-gray-50 p-2 pl-10 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" placeholder="Search" required>
          </div>
        </form>
        <div class="flex flex-col gap-4 md:flex-row md:items-end">
          <UFormGroup>
            <UInput size="lg" type="date" value="2023-07-05" />
          </UFormGroup>
          <UFormGroup>
            <UInput size="lg" type="date" value="2023-07-07" />
          </UFormGroup>
        </div>
      </div>

      <div class="w-full flex flex-shrink-0 flex-col items-stretch justify-end md:w-auto md:flex-row md:items-center space-y-2 md:space-x-3 md:space-y-0">
        <!-- <button type="button" class="bg-primary-700 focus:ring-primary-300 hover:bg-primary-800 dark:bg-primary-600 dark:focus:ring-primary-800 dark:hover:bg-primary-700 flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-4">
          <svg class="mr-2 h-3.5 w-3.5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
          </svg>
          Add product
        </button> -->
        <span>Sort by <button class="underline" @click="sortAscending = !sortAscending">Date {{ sortAscending ? 'ascending' : 'descending' }}</button></span>
        <div class="w-full flex items-center md:w-auto space-x-3">
          <!-- <button id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown" class="hover:text-primary-700 w-full flex items-center justify-center border border-gray-200 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 focus:z-10 md:w-auto dark:border-gray-600 dark:bg-gray-800 hover:bg-gray-100 dark:text-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700" type="button">
            <svg class="mr-1.5 h-5 w-5 -ml-1" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
            Actions
          </button> -->
          <!-- <div id="actionsDropdown" class="z-10 hidden w-44 rounded bg-white shadow divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600">
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mass Edit</a>
              </li>
            </ul>
            <div class="py-1">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Delete all</a>
            </div>
          </div> -->

          <div class="flex items-end gap-4">
            Filter:
            <IconEnvelope class="h-5 w-5 text-blue-500" />
            <IconSms class="h-5 w-5 text-green-500" />
          </div>

          <!-- <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" class="hover:text-primary-700 w-full flex items-center justify-center border border-gray-200 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 focus:z-10 md:w-auto dark:border-gray-600 dark:bg-gray-800 hover:bg-gray-100 dark:text-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="mr-2 h-4 w-4 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
            </svg>
            Filter
            <svg class="ml-1.5 h-5 w-5 -mr-1" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </button> -->
          <!-- Dropdown menu -->
          <div id="filterDropdown" class="z-10 hidden w-48 rounded-lg bg-white p-3 shadow dark:bg-gray-700">
            <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">
              Category
            </h6>
            <ul class="text-sm space-y-2" aria-labelledby="dropdownDefault">
              <li class="flex items-center">
                <input
                  id="apple" type="checkbox" value=""
                  class="focus:ring-primary-500 text-primary-600 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 rounded bg-gray-100 dark:border-gray-500 dark:bg-gray-600 focus:ring-2 dark:ring-offset-gray-700"
                >
                <label for="apple" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Apple (56)
                </label>
              </li>
              <li class="flex items-center">
                <input
                  id="fitbit" type="checkbox" value=""
                  class="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 rounded bg-gray-100 dark:border-gray-500 dark:bg-gray-600 focus:ring-2 dark:ring-offset-gray-700"
                >
                <label for="fitbit" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Fitbit (56)
                </label>
              </li>
              <li class="flex items-center">
                <input
                  id="dell" type="checkbox" value=""
                  class="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 rounded bg-gray-100 dark:border-gray-500 dark:bg-gray-600 focus:ring-2 dark:ring-offset-gray-700"
                >
                <label for="dell" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Dell (56)
                </label>
              </li>
              <li class="flex items-center">
                <input
                  id="asus" type="checkbox" value="" checked
                  class="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 rounded bg-gray-100 dark:border-gray-500 dark:bg-gray-600 focus:ring-2 dark:ring-offset-gray-700"
                >
                <label for="asus" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Asus (97)
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
