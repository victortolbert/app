<template>
  <section aria-labelledby="volunteer-information-title">
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h2
          id="volunteer-information-title"
          class="text-lg font-medium leading-6 text-gray-900"
        >
          Volunteer Information
        </h2>
        <p class="max-w-2xl mt-1 text-sm text-gray-500">
          Personal details and application.
        </p>
      </div>
      <div class="px-4 py-5 border-t border-gray-200 sm:px-6">
        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Application for</dt>
            <dd class="mt-1 text-sm text-gray-900">Backend Developer</dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Email address</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ $auth.user.email }}
            </dd>
          </div>
          <!-- <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Salary expectation
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">$120,000</dd>
                  </div> -->
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Phone</dt>
            <dd class="mt-1 text-sm text-gray-900">+1 555-555-5555</dd>
          </div>
          <div class="sm:col-span-2">
            <dt class="text-sm font-medium text-gray-500">About</dt>
            <dd class="mt-1 text-sm text-gray-900">
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
              incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
              consequat sint. Sit id mollit nulla mollit nostrud in ea officia
              proident. Irure nostrud pariatur mollit ad adipisicing
              reprehenderit deserunt qui eu.
            </dd>
          </div>
          <div class="sm:col-span-2">
            <dt class="text-sm font-medium text-gray-500">Attachments</dt>
            <dd class="mt-1 text-sm text-gray-900">
              <ul
                class="border border-gray-200 divide-y divide-gray-200 rounded-md"
              >
                <li
                  class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                >
                  <div class="flex items-center flex-1 w-0">
                    <!-- Heroicon name: solid/paper-clip -->
                    <svg
                      class="flex-shrink-0 w-5 h-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="flex-1 w-0 ml-2 truncate">
                      resume_back_end_developer.pdf
                    </span>
                  </div>
                  <div class="flex-shrink-0 ml-4">
                    <a
                      href="#"
                      class="font-medium text-primary-600 hover:text-primary-500"
                    >
                      Download
                    </a>
                  </div>
                </li>
                <li
                  class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                >
                  <div class="flex items-center flex-1 w-0">
                    <!-- Heroicon name: solid/paper-clip -->
                    <svg
                      class="flex-shrink-0 w-5 h-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="flex-1 w-0 ml-2 truncate">
                      coverletter_back_end_developer.pdf
                    </span>
                  </div>
                  <div class="flex-shrink-0 ml-4">
                    <a
                      href="#"
                      class="font-medium text-primary-600 hover:text-primary-500"
                    >
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
      <div>
        <a
          href="#"
          class="block px-4 py-4 text-sm font-medium text-center text-gray-500 bg-gray-50 hover:text-gray-700 sm:rounded-b-lg"
          >Read full application</a
        >
      </div>
    </div>
  </section>
</template>
