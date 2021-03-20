<template>
  <section aria-labelledby="payment_details_heading">
    <form action="#" method="POST">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-6 bg-white sm:p-6">
          <div>
            <h2
              id="payment_details_heading"
              class="text-lg font-medium leading-6 text-gray-900"
            >
              Payment details
            </h2>
            <p class="mt-1 text-sm text-gray-500">
              Update your billing information. Please note that updating your
              location could affect your tax rates.
            </p>
          </div>

          <div class="grid grid-cols-4 gap-6 mt-6">
            <div class="col-span-4 sm:col-span-2">
              <label
                for="first_name"
                class="block text-sm font-medium text-gray-700"
                >First name</label
              >
              <input
                type="text"
                name="first_name"
                id="first_name"
                autocomplete="cc-given-name"
                class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>

            <div class="col-span-4 sm:col-span-2">
              <label
                for="last_name"
                class="block text-sm font-medium text-gray-700"
                >Last name</label
              >
              <input
                type="text"
                name="last_name"
                id="last_name"
                autocomplete="cc-family-name"
                class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>

            <div class="col-span-4 sm:col-span-2">
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

            <div class="col-span-4 sm:col-span-1">
              <label
                for="expiration_date"
                class="block text-sm font-medium text-gray-700"
                >Expration date</label
              >
              <input
                type="text"
                name="expiration_date"
                id="expiration_date"
                autocomplete="cc-exp"
                class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="MM / YY"
              />
            </div>

            <div class="col-span-4 sm:col-span-1">
              <label
                for="security_code"
                class="flex items-center text-sm font-medium text-gray-700"
              >
                <span>Security code</span>
                <!-- Heroicon name: question-mark-circle -->
                <svg
                  class="flex-shrink-0 w-5 h-5 ml-1 text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </label>
              <input
                type="text"
                name="security_code"
                id="security_code"
                autocomplete="cc-csc"
                class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>

            <div class="col-span-4 sm:col-span-2">
              <label
                for="country"
                class="block text-sm font-medium text-gray-700"
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

            <div class="col-span-4 sm:col-span-2">
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
  </section>
</template>
