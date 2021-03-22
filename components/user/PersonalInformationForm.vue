<template>
  <form action="#" method="POST">
    <div class="shadow sm:rounded-md sm:overflow-hidden">
      <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
        <div>
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Personal Information
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Use a permanent address where you can recieve mail.
          </p>
        </div>

        <div class="grid grid-cols-6 gap-6">
          <div class="col-span-6 sm:col-span-3">
            <label
              for="first_name"
              class="block text-sm font-medium text-gray-700"
              >First name</label
            >
            <input
              type="text"
              name="first_name"
              id="first_name"
              autocomplete="given-name"
              class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label
              for="last_name"
              class="block text-sm font-medium text-gray-700"
              >Last name</label
            >
            <input
              type="text"
              name="last_name"
              id="last_name"
              autocomplete="family-name"
              class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>

          <div class="col-span-6 sm:col-span-4">
            <label
              for="email_address"
              class="block text-sm font-medium text-gray-700"
              >Email address</label
            >
            <input
              type="text"
              name="email_address"
              id="email_address"
              autocomplete="email"
              class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label for="country" class="block text-sm font-medium text-gray-700"
              >Country / Region</label
            >
            <select
              id="country"
              name="country"
              autocomplete="country"
              class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              <option>United States</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
          </div>

          <div class="col-span-6">
            <label
              for="street_address"
              class="block text-sm font-medium text-gray-700"
              >Street address</label
            >
            <input
              type="text"
              name="street_address"
              id="street_address"
              autocomplete="street-address"
              class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>

          <div class="col-span-6 sm:col-span-6 lg:col-span-2">
            <label for="city" class="block text-sm font-medium text-gray-700"
              >City</label
            >
            <input
              type="text"
              name="city"
              id="city"
              class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>

          <div class="col-span-6 sm:col-span-3 lg:col-span-2">
            <label for="state" class="block text-sm font-medium text-gray-700"
              >State / Province</label
            >
            <input
              type="text"
              name="state"
              id="state"
              class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>

          <div class="col-span-6 sm:col-span-3 lg:col-span-2">
            <label
              for="postal_code"
              class="block text-sm font-medium text-gray-700"
              >ZIP / Postal</label
            >
            <input
              type="text"
              name="postal_code"
              id="postal_code"
              autocomplete="postal-code"
              class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
      <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
        <button
          type="submit"
          class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Save
        </button>
      </div>
    </div>
  </form>
</template>
