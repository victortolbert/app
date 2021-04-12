<template>
  <PageWrapper>
    <PageHeading> {{ $t('announcements') }} </PageHeading>

    <SectionWrapper class="mt-8 bg-white rounded-lg shadow">
      <ul class="divide-y divide-gray-200">
        <li
          class="relative px-4 py-5 bg-white hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600"
        >
          <div class="flex justify-between space-x-3">
            <div class="flex-1 min-w-0">
              <a href="#" class="block focus:outline-none">
                <span class="absolute inset-0" aria-hidden="true" />
                <p class="text-sm font-medium text-gray-900 truncate">
                  Gloria Roberston
                </p>
                <p class="text-sm text-gray-500 truncate">
                  Velit placeat sit ducimus non sed
                </p>
              </a>
            </div>
            <time
              datetime="2021-01-27T16:35"
              class="flex-shrink-0 text-sm text-gray-500 whitespace-nowrap"
            >
              1d ago
            </time>
          </div>
          <div class="mt-1">
            <p class="text-sm text-gray-600 line-clamp-2">
              Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in
              a rerum natus facere. Enim rerum eaque qui facilis. Numquam
              laudantium sed id dolores omnis in. Eos reiciendis deserunt
              maiores et accusamus quod dolor.
            </p>
          </div>
        </li>

        <!-- More items... -->
      </ul>
    </SectionWrapper>

    <SectionWrapper class="mt-8 bg-white rounded-lg shadow">
      <div class="px-4 py-5 bg-white sm:px-6">
        <div class="flex space-x-3">
          <div class="flex-shrink-0">
            <img
              class="w-10 h-10 rounded-full"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
              alt=""
            />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900">
              <a href="#" class="hover:underline">Chelsea Hagon</a>
            </p>
            <p class="text-sm text-gray-500">
              <a href="#" class="hover:underline">December 9 at 11:43 AM</a>
            </p>
          </div>
          <div class="flex self-center flex-shrink-0">
            <div class="relative z-30 inline-block text-left">
              <div>
                <button
                  id="menu-1"
                  type="button"
                  class="flex items-center p-2 -m-2 text-gray-400 rounded-full hover:text-gray-600"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span class="sr-only">Open options</span>
                  <!-- Heroicon name: solid/dots-vertical -->
                  <svg
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                    />
                  </svg>
                </button>
              </div>

              <!--
          Dropdown menu, show/hide based on menu state.

          Entering: "transition ease-out duration-100"
            From: "transform opacity-0 scale-95"
            To: "transform opacity-100 scale-100"
          Leaving: "transition ease-in duration-75"
            From: "transform opacity-100 scale-100"
            To: "transform opacity-0 scale-95"
        -->
              <div
                class="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-1"
              >
                <div class="py-1">
                  <a
                    href="#"
                    class="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    <!-- Heroicon name: solid/star -->
                    <svg
                      class="w-5 h-5 mr-3 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <span>Add to favorites</span>
                  </a>
                  <a
                    href="#"
                    class="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    <!-- Heroicon name: solid/code -->
                    <svg
                      class="w-5 h-5 mr-3 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span>Embed</span>
                  </a>
                  <a
                    href="#"
                    class="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    <!-- Heroicon name: solid/flag -->
                    <svg
                      class="w-5 h-5 mr-3 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span>Report content</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  </PageWrapper>
</template>
