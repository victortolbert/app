<template>
  <div class="flex flex-col flex-1 h-0 bg-gray-100 border-r border-gray-200">
    <div class="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
      <div class="flex items-center flex-shrink-0 px-4">
        <BaseLogo name="promise-serves" class="w-auto h-8" />
      </div>
      <nav class="flex-1 mt-5 space-y-1" aria-label="Sidebar">
        <div class="px-2 space-y-1">
          <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->

          <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
          <a
            href="#"
            class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-md group"
            aria-current="page"
          >
            <!-- Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" -->
            <BaseIconOutlined
              name="home"
              class="flex-shrink-0 mr-3 -ml-1 text-gray-500"
            />
            <span class="truncate"> Dashboard </span>

            <!-- Current: "bg-white", Default: "bg-gray-100 group-hover:bg-gray-200" -->
            <span
              class="bg-white ml-auto inline-block py-0.5 px-3 text-xs rounded-full"
            >
              5
            </span>
          </a>

          <a
            href="#"
            class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="users"
              class="flex-shrink-0 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
            />
            <span class="truncate"> Team </span>
          </a>

          <a
            href="#"
            class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="folder"
              class="flex-shrink-0 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
            />
            <span class="truncate"> Projects </span>

            <span
              class="bg-gray-100 group-hover:bg-gray-200 ml-auto inline-block py-0.5 px-3 text-xs rounded-full"
            >
              19
            </span>
          </a>

          <a
            href="#"
            class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="calendar"
              class="flex-shrink-0 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
            />

            <span class="truncate"> Calendar </span>

            <span
              class="bg-gray-100 group-hover:bg-gray-200 ml-auto inline-block py-0.5 px-3 text-xs rounded-full"
            >
              20+
            </span>
          </a>

          <a
            href="#"
            class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="inbox"
              class="flex-shrink-0 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
            />

            <span class="truncate"> Documents </span>
          </a>

          <a
            href="#"
            class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="chart-bar"
              class="flex-shrink-0 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
            />

            <span class="truncate"> Reports </span>
          </a>

          <a
            href="#"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="user-group"
              class="mr-3 text-gray-400 group-hover:text-gray-500"
            />
            {{ $t('teams') }}
          </a>

          <a
            href="#"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="search-circle"
              class="mr-3 text-gray-400 group-hover:text-gray-500"
            />
            {{ $t('directory') }}
          </a>

          <a
            href="#"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="speaker-phone"
              class="mr-3 text-gray-400 group-hover:text-gray-500"
            />
            {{ $t('announcements') }}
          </a>

          <a
            href="#"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="map"
              class="mr-3 text-gray-400 group-hover:text-gray-500"
            />
            {{ $t('office_map') }}
          </a>

          <a
            href="#"
            class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 group"
            aria-current="false"
          >
            <BaseIconOutlined
              name="user-group"
              class="flex-shrink-0 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
            />
            <span class="truncate"> Communities </span>
          </a>
          <a
            href="#"
            class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 group"
            aria-current="false"
          >
            <svg
              class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
              x-description="Heroicon name: outline/fire"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
              ></path>
            </svg>
            <span class="truncate"> Popular </span>
          </a>

          <a
            href="#"
            class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 group"
            aria-current="false"
          >
            <svg
              class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
              x-description="Heroicon name: outline/trending-up"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
            <span class="truncate"> Trending </span>
          </a>

          <a
            href="#"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
          >
            <svg
              class="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500"
              x-description="Heroicon name: outline/view-list"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              ></path>
            </svg>
            My tasks
          </a>

          <a
            href="#"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
          >
            <svg
              class="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500"
              x-description="Heroicon name: outline/clock"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            Recent
          </a>
        </div>
        <hr class="my-5 border-t border-gray-200" aria-hidden="true" />
        <div class="flex-1 px-2 space-y-1">
          <a
            href="#"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="view-grid-add"
              class="mr-3 text-gray-400 group-hover:text-gray-500"
            />
            {{ $t('apps') }}
          </a>

          <a
            href="#"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
          >
            <BaseIconOutlined
              name="cog"
              class="mr-3 text-gray-400 group-hover:text-gray-500"
            />
            {{ $t('settings') }}
          </a>
        </div>
      </nav>
    </div>
    <div class="flex flex-shrink-0 p-4 border-t border-gray-200">
      <a href="#" class="flex-shrink-0 block w-full group">
        <div class="flex items-center">
          <div>
            <img
              class="inline-block rounded-full h-9 w-9"
              src="https://cominex.net/assets/img/people/marcus.jpeg"
              alt=""
            />
          </div>
          <div class="ml-3">
            <p
              class="text-sm font-medium text-gray-700 group-hover:text-gray-900"
            >
              Marcus Bouligny
            </p>
            <p
              class="text-xs font-medium text-gray-500 group-hover:text-gray-700"
            >
              {{ $t('view_profile') }}
            </p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
