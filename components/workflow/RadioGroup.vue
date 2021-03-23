<template>
  <fieldset>
    <legend id="radiogroup-label" class="sr-only">Server size</legend>
    <ul class="space-y-4" role="radiogroup" aria-labelledby="radiogroup-label">
      <li
        id="radiogroup-option-0"
        tabindex="0"
        role="radio"
        aria-checked="true"
        class="relative bg-white rounded-lg shadow-sm cursor-pointer group focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-primary-500"
      >
        <div
          class="px-6 py-4 bg-white border border-gray-300 rounded-lg hover:border-gray-400 sm:flex sm:justify-between"
        >
          <div class="flex items-center">
            <div class="text-sm">
              <p class="font-medium text-gray-900">Hobby</p>
              <div class="text-gray-500">
                <p class="sm:inline">8GB / 4 CPUs</p>
                <span class="hidden sm:inline sm:mx-1" aria-hidden="true"
                  >&middot;</span
                >
                <p class="sm:inline">160 GB SSD disk</p>
              </div>
            </div>
          </div>
          <div class="flex mt-2 text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right">
            <div class="font-medium text-gray-900">$40</div>
            <div class="ml-1 text-gray-500 sm:ml-0">/mo</div>
          </div>
        </div>
        <!-- On: "border-primary-500", Off: "border-transparent" -->
        <div
          class="absolute inset-0 border-2 rounded-lg pointer-events-none border-primary-500"
          aria-hidden="true"
        ></div>
      </li>

      <li
        id="radiogroup-option-1"
        tabindex="-1"
        role="radio"
        aria-checked="false"
        class="relative bg-white rounded-lg shadow-sm cursor-pointer group focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-primary-500"
      >
        <div
          class="px-6 py-4 bg-white border border-gray-300 rounded-lg hover:border-gray-400 sm:flex sm:justify-between"
        >
          <div class="flex items-center">
            <div class="text-sm">
              <p class="font-medium text-gray-900">Startup</p>
              <div class="text-gray-500">
                <p class="sm:inline">12GB / 6 CPUs</p>
                <span class="hidden sm:inline sm:mx-1" aria-hidden="true"
                  >&middot;</span
                >
                <p class="sm:inline">256 GB SSD disk</p>
              </div>
            </div>
          </div>
          <div class="flex mt-2 text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right">
            <div class="font-medium text-gray-900">$80</div>
            <div class="ml-1 text-gray-500 sm:ml-0">/mo</div>
          </div>
        </div>
        <!-- On: "border-primary-500", Off: "border-transparent" -->
        <div
          class="absolute inset-0 border-2 border-transparent rounded-lg pointer-events-none"
          aria-hidden="true"
        ></div>
      </li>

      <li
        id="radiogroup-option-2"
        tabindex="-1"
        role="radio"
        aria-checked="false"
        class="relative bg-white rounded-lg shadow-sm cursor-pointer group focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-primary-500"
      >
        <div
          class="px-6 py-4 bg-white border border-gray-300 rounded-lg hover:border-gray-400 sm:flex sm:justify-between"
        >
          <div class="flex items-center">
            <div class="text-sm">
              <p class="font-medium text-gray-900">Business</p>
              <div class="text-gray-500">
                <p class="sm:inline">16GB / 8 CPUs</p>
                <span class="hidden sm:inline sm:mx-1" aria-hidden="true"
                  >&middot;</span
                >
                <p class="sm:inline">512 GB SSD disk</p>
              </div>
            </div>
          </div>
          <div class="flex mt-2 text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right">
            <div class="font-medium text-gray-900">$160</div>
            <div class="ml-1 text-gray-500 sm:ml-0">/mo</div>
          </div>
        </div>
        <!-- On: "border-primary-500", Off: "border-transparent" -->
        <div
          class="absolute inset-0 border-2 border-transparent rounded-lg pointer-events-none"
          aria-hidden="true"
        ></div>
      </li>

      <li
        id="radiogroup-option-3"
        tabindex="-1"
        role="radio"
        aria-checked="false"
        class="relative bg-white rounded-lg shadow-sm cursor-pointer group focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-primary-500"
      >
        <div
          class="px-6 py-4 bg-white border border-gray-300 rounded-lg hover:border-gray-400 sm:flex sm:justify-between"
        >
          <div class="flex items-center">
            <div class="text-sm">
              <p class="font-medium text-gray-900">Enterprise</p>
              <div class="text-gray-500">
                <p class="sm:inline">32GB / 12 CPUs</p>
                <span class="hidden sm:inline sm:mx-1" aria-hidden="true"
                  >&middot;</span
                >
                <p class="sm:inline">1024 GB SSD disk</p>
              </div>
            </div>
          </div>
          <div class="flex mt-2 text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right">
            <div class="font-medium text-gray-900">$240</div>
            <div class="ml-1 text-gray-500 sm:ml-0">/mo</div>
          </div>
        </div>
        <!-- On: "border-primary-500", Off: "border-transparent" -->
        <div
          class="absolute inset-0 border-2 border-transparent rounded-lg pointer-events-none"
          aria-hidden="true"
        ></div>
      </li>
    </ul>
  </fieldset>
</template>
