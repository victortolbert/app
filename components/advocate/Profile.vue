<template>
  <form class="space-y-8 divide-y divide-gray-200">
    <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div>
        <div>
          <h3 class="text-lg font-medium leading-6 text-gray-900">Profile</h3>
          <p class="max-w-2xl mt-1 text-sm text-gray-500">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>

        <div class="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
          <div
            class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              for="username"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Username
            </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <div class="flex max-w-lg rounded-md shadow-sm">
                <span
                  class="inline-flex items-center px-3 text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 sm:text-sm"
                >
                  workcation.com/
                </span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autocomplete="username"
                  class="flex-1 block w-full min-w-0 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div
            class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              for="about"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              About
            </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <textarea
                id="about"
                name="about"
                rows="3"
                class="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
              <p class="mt-2 text-sm text-gray-500">
                Write a few sentences about yourself.
              </p>
            </div>
          </div>

          <div
            class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label for="photo" class="block text-sm font-medium text-gray-700">
              Photo
            </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <div class="flex items-center">
                <span
                  class="w-12 h-12 overflow-hidden bg-gray-100 rounded-full"
                >
                  <svg
                    class="w-full h-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </span>
                <button
                  type="button"
                  class="px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Change
                </button>
              </div>
            </div>
          </div>

          <div
            class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              for="cover_photo"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Cover photo
            </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <div
                class="flex justify-center max-w-lg px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
              >
                <div class="space-y-1 text-center">
                  <svg
                    class="w-12 h-12 mx-auto text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label
                      for="file-upload"
                      class="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        class="sr-only"
                      />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
        <div>
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Personal Information
          </h3>
          <p class="max-w-2xl mt-1 text-sm text-gray-500">
            Use a permanent address where you can receive mail.
          </p>
        </div>
        <div class="space-y-6 sm:space-y-5">
          <div
            class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              for="first_name"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              First name
            </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="first_name"
                id="first_name"
                autocomplete="given-name"
                class="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
              />
            </div>
          </div>

          <div
            class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              for="last_name"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Last name
            </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="last_name"
                id="last_name"
                autocomplete="family-name"
                class="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
              />
            </div>
          </div>

          <div
            class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Email address
            </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                class="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div
            class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              for="country"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Country / Region
            </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <select
                id="country"
                name="country"
                autocomplete="country"
                class="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>

          <div
            class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              for="street_address"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Street address
            </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="street_address"
                id="street_address"
                autocomplete="street-address"
                class="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div
            class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              for="city"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              City
            </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="city"
                id="city"
                class="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
              />
            </div>
          </div>

          <div
            class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              for="state"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              State / Province
            </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="state"
                id="state"
                class="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
              />
            </div>
          </div>

          <div
            class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              for="zip"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              ZIP / Postal
            </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="zip"
                id="zip"
                autocomplete="postal-code"
                class="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="pt-8 space-y-6 divide-y divide-gray-200 sm:pt-10 sm:space-y-5"
      >
        <div>
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Notifications
          </h3>
          <p class="max-w-2xl mt-1 text-sm text-gray-500">
            We'll always let you know about important changes, but you pick what
            else you want to hear about.
          </p>
        </div>
        <div class="space-y-6 divide-y divide-gray-200 sm:space-y-5">
          <div class="pt-6 sm:pt-5">
            <div role="group" aria-labelledby="label-email">
              <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                <div>
                  <div
                    class="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                    id="label-email"
                  >
                    By Email
                  </div>
                </div>
                <div class="mt-4 sm:mt-0 sm:col-span-2">
                  <div class="max-w-lg space-y-4">
                    <div class="relative flex items-start">
                      <div class="flex items-center h-5">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="comments" class="font-medium text-gray-700"
                          >Comments</label
                        >
                        <p class="text-gray-500">
                          Get notified when someones posts a comment on a
                          posting.
                        </p>
                      </div>
                    </div>
                    <div>
                      <div class="relative flex items-start">
                        <div class="flex items-center h-5">
                          <input
                            id="candidates"
                            name="candidates"
                            type="checkbox"
                            class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                        </div>
                        <div class="ml-3 text-sm">
                          <label
                            for="candidates"
                            class="font-medium text-gray-700"
                            >Candidates</label
                          >
                          <p class="text-gray-500">
                            Get notified when a candidate applies for a job.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="relative flex items-start">
                        <div class="flex items-center h-5">
                          <input
                            id="offers"
                            name="offers"
                            type="checkbox"
                            class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                        </div>
                        <div class="ml-3 text-sm">
                          <label for="offers" class="font-medium text-gray-700"
                            >Offers</label
                          >
                          <p class="text-gray-500">
                            Get notified when a candidate accepts or rejects an
                            offer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="pt-6 sm:pt-5">
            <div role="group" aria-labelledby="label-notifications">
              <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                <div>
                  <div
                    class="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                    id="label-notifications"
                  >
                    Push Notifications
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <div class="max-w-lg">
                    <p class="text-sm text-gray-500">
                      These are delivered via SMS to your mobile phone.
                    </p>
                    <div class="mt-4 space-y-4">
                      <div class="flex items-center">
                        <input
                          id="push_everything"
                          name="push_notifications"
                          type="radio"
                          class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <label
                          for="push_everything"
                          class="block ml-3 text-sm font-medium text-gray-700"
                        >
                          Everything
                        </label>
                      </div>
                      <div class="flex items-center">
                        <input
                          id="push_email"
                          name="push_notifications"
                          type="radio"
                          class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <label
                          for="push_email"
                          class="block ml-3 text-sm font-medium text-gray-700"
                        >
                          Same as email
                        </label>
                      </div>
                      <div class="flex items-center">
                        <input
                          id="push_nothing"
                          name="push_notifications"
                          type="radio"
                          class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <label
                          for="push_nothing"
                          class="block ml-3 text-sm font-medium text-gray-700"
                        >
                          No push notifications
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-5">
      <div class="flex justify-end">
        <button
          type="button"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </div>
    </div>
  </form>
</template>
