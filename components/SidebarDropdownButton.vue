<template>
  <div>
    <button
      type="button"
      class="group w-full rounded-md px-3.5 py-2 text-sm leading-5 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-500 focus:outline-none focus:bg-gray-200 focus:border-blue-300 active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
      id="options-menu"
      aria-haspopup="true"
      aria-expanded="true"
    >
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center justify-between min-w-0 space-x-3">
          <img
            class="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full"
            src="/img/avatar.jpg"
            alt=""
          />
          <div class="flex-1 min-w-0">
            <h2 class="text-sm font-medium leading-5 text-gray-900 truncate">
              Victor Tolbert
            </h2>
            <p class="text-sm leading-5 text-gray-500 truncate">
              @victortolbert
            </p>
          </div>
        </div>
        <!-- Heroicon name: selector -->
        <svg
          class="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </button>
  </div>
</template>
