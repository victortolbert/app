<template>
  <div class="flex flex-col flex-1 h-0 bg-gray-100 border-r border-gray-200">
    <div class="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
      <div class="flex items-center flex-shrink-0 px-4">
        <BaseLogo name="booster" class="w-auto h-8" />
      </div>
      <nav class="flex-1 mt-5 space-y-1" aria-label="Sidebar">
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
