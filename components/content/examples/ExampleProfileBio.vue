<script setup>
</script>

<template>
  <div class="mt-6 flex flex-col lg:flex-row">
    <div class="flex-grow space-y-6">
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Username
        </label>
        <div class="mt-1 flex rounded-md shadow-sm">
          <span
            class="inline-flex items-center border border-r-0 border-gray-300 rounded-l-md bg-gray-50 p-2 px-3 text-gray-500 dark:border-gray-700 dark:bg-gray-900 sm:text-sm dark:text-gray-400"
          >
            hancockclaims.com/
          </span>
          <input
            id="username"
            type="text"
            name="username"
            autocomplete="username"
            class="focus:ring-primary-500 focus:border-primary-500 block min-w-0 w-full flex-grow border border-gray-300 rounded-none rounded-r-md dark:border-gray-600 dark:bg-gray-800 sm:text-sm"
            value="vtolbert"
          >
        </div>
      </div>

      <div>
        <UFormGroup name="about" label="About" help="Brief description for your profile. URLs are hyperlinked.">
          <UTextarea
            id="about"
          />
        </UFormGroup>
      </div>
    </div>

    <div class="mt-6 flex-grow lg:ml-6 lg:mt-0 lg:flex-shrink-0 lg:flex-grow-0">
      <p class="text-sm font-medium text-gray-700 dark:text-gray-200" aria-hidden="true">
        Photo
      </p>
      <div class="mt-1 lg:hidden">
        <div class="flex items-center">
          <div
            class="inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full"
            aria-hidden="true"
          >
            <img
              class="h-full w-full rounded-full grayscale"
              src="/assets/img/users/victor-tolbert.jpeg"
              alt=""
            >
          </div>
          <div class="ml-5 rounded-md shadow-sm">
            <div
              class="group focus-within:ring-primary-500 relative flex items-center justify-center border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2"
            >
              <label
                for="user_photo"
                class="pointer-events-none relative text-sm font-medium leading-4 text-gray-700"
              >
                <span>Change</span>
                <span class="sr-only"> user photo</span>
              </label>
              <input
                id="user_photo"
                name="user_photo"
                type="file"
                class="absolute h-full w-full cursor-pointer border-gray-300 rounded-md opacity-0"
              >
            </div>
          </div>
        </div>
      </div>

      <div class="relative hidden overflow-hidden rounded-full lg:block">
        <img
          class="relative h-40 w-40 rounded-full grayscale"
          src="/assets/img/users/victor-tolbert.jpeg"
          alt=""
        >
        <label
          for="user-photo"
          class="absolute inset-0 h-full w-full flex items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
        >
          <span>Change</span>
          <span class="sr-only"> user photo</span>
          <input
            id="user-photo"
            type="file"
            name="user-photo"
            class="absolute inset-0 h-full w-full cursor-pointer border-gray-300 rounded-md opacity-0"
          >
        </label>
      </div>
    </div>
  </div>
</template>
