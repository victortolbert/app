<script setup>
</script>

<template>
  <div class="w-full flex flex-col justify-between gap-4 border rounded bg-white p-4 shadow xl:flex-row space-x-4 dark:border-gray-700 dark:bg-gray-900">
    <div class="order-last flex flex-1 items-center justify-center gap-4 xl:order-first xl:justify-start">
      <button
        type="button"
        class="flex items-center whitespace-nowrap font-bold text-black space-x-2 dark:text-white hover:underline focus:outline-none"
      >
        <UIcon name="i-carbon-list" class="mr-1.5 h-5 w-5 text-gray-400 -ml-0.5" />
        Table View
      </button>

      <button type="button" class="flex items-center whitespace-nowrap space-x-2 hover:underline focus:outline-none">
        <UIcon name="i-carbon-grid" class="mr-1.5 h-5 w-5 text-gray-400 -ml-0.5" />
        Card View
      </button>
    </div>

    <div class="w-full flex items-center justify-center xl:justify-end">
      <div class="relative w-full xl:w-auto">
        <label for="default-search" class="sr-only mb-2 text-sm font-medium text-gray-900">
          Search
        </label>

        <div class="relative">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <UIcon name="i-carbon-search" class="h-5 w-5 text-gray-500" />
          </div>
          <input
            id="default-search"
            type="search"
            placeholder="Search"
            required
            class="focus:border-primary-500 focus:ring-primary-500 block w-full border border-gray-300 rounded bg-gray-50 p-4 pl-10 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
          >
          <button
            type="button"
            class="bg-primary-700 focus:ring-primary-300 hover:bg-primary-800 absolute bottom-2.5 right-2.5 rounded px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-4"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
