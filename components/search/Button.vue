<template>
  <button
    type="button"
    class="flex items-center w-full px-3 py-2 text-sm text-left text-gray-500 align-middle transition duration-150 ease-in-out border rounded-lg group hover:text-gray-600 hover:border-gray-300 pointer bg-gray-50 whitespace-nowrap"
  >
    <svg
      width="1em"
      height="1em"
      class="flex-shrink-0 mr-3 text-gray-600 align-middle group-hover:text-gray-700"
      style="margin-bottom: 2px"
      viewBox="0 0 20 20"
    >
      <path
        d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
        stroke="currentColor"
        fill="none"
        stroke-width="2"
        fill-rule="evenodd"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    Search Resources
    <span class="invisible ml-auto lg:visible">
      <kbd
        class="inline-flex items-center justify-center p-0 mr-1 text-xs text-center align-middle transition duration-150 ease-in-out bg-gray-100 border border-gray-300 rounded group-hover:border-gray-300"
        style="min-width: 1.8em"
      >
        ⌘
      </kbd>
      <kbd
        class="inline-flex items-center justify-center p-0 ml-auto mr-0 text-xs text-center align-middle transition duration-150 ease-in-out bg-gray-100 border border-gray-300 rounded group-hover:border-gray-300"
        style="min-width: 1.8em"
      >
        K
      </kbd>
    </span>
  </button>
</template>
