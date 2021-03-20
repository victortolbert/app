<template>
  <form action="#" method="POST">
    <div class="shadow sm:rounded-md sm:overflow-hidden">
      <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
        <div>
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Notifications
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Provide basic informtion about the job. Be specific with the job
            title.
          </p>
        </div>

        <fieldset>
          <legend class="text-base font-medium text-gray-900">By Email</legend>
          <div class="mt-4 space-y-4">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="comments"
                  name="comments"
                  type="checkbox"
                  class="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="comments" class="font-medium text-gray-700"
                  >Comments</label
                >
                <p class="text-gray-500">
                  Get notified when someones posts a comment on a posting.
                </p>
              </div>
            </div>
            <div>
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="candidates"
                    name="candidates"
                    type="checkbox"
                    class="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="candidates" class="font-medium text-gray-700"
                    >Candidates</label
                  >
                  <p class="text-gray-500">
                    Get notified when a candidate applies for a job.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="offers"
                    name="offers"
                    type="checkbox"
                    class="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="offers" class="font-medium text-gray-700"
                    >Offers</label
                  >
                  <p class="text-gray-500">
                    Get notified when a candidate accepts or rejects an offer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset class="mt-6">
          <legend class="text-base font-medium text-gray-900">
            Push Notifications
          </legend>
          <p class="text-sm text-gray-500">
            These are delivered via SMS to your mobile phone.
          </p>
          <div class="mt-4 space-y-4">
            <div class="flex items-center">
              <input
                id="push_everything"
                name="push_notifications"
                type="radio"
                class="w-4 h-4 border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label for="push_everything" class="ml-3">
                <span class="block text-sm font-medium text-gray-700"
                  >Everything</span
                >
              </label>
            </div>
            <div class="flex items-center">
              <input
                id="push_email"
                name="push_notifications"
                type="radio"
                class="w-4 h-4 border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label for="push_email" class="ml-3">
                <span class="block text-sm font-medium text-gray-700"
                  >Same as email</span
                >
              </label>
            </div>
            <div class="flex items-center">
              <input
                id="push_nothing"
                name="push_notifications"
                type="radio"
                class="w-4 h-4 border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label for="push_nothing" class="ml-3">
                <span class="block text-sm font-medium text-gray-700"
                  >No push notifications</span
                >
              </label>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
        <button
          type="submit"
          class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
        >
          Save
        </button>
      </div>
    </div>
  </form>
</template>
