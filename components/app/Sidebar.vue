<template>
  <div class="flex flex-col flex-1 h-0 bg-gray-100 border-r border-gray-200">
    <div class="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
      <div class="flex items-center flex-shrink-0 px-4">
        <NuxtLink to="/">
          <AppLogo
            :name="$store.state.affiliate.name"
            class="w-auto h-8 text-primary-500"
          />
        </NuxtLink>
      </div>

      <nav class="flex-1 mt-5 space-y-1" aria-label="Sidebar">
        <div class="px-2 space-y-1">
          <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
          <!-- Nav -->
        </div>

        <hr class="my-5 border-t border-gray-200" aria-hidden="true" />

        <div class="flex-1 px-2 space-y-1">
          <!-- Below Divider -->
        </div>
      </nav>
    </div>
    <div class="flex flex-shrink-0 p-4 border-t border-gray-200">
      <NuxtLink to="/profile/" class="flex-shrink-0 block w-full group">
        <div class="flex items-center">
          <div>
            <img
              class="inline-block rounded-full h-9 w-9"
              :src="$auth.user.profile_photo_url"
              alt=""
              style="filter: grayscale(1)"
            />
          </div>
          <div class="ml-3">
            <p
              class="text-sm font-medium text-gray-700 group-hover:text-gray-900"
            >
              {{ $auth.user.name }}
            </p>
            <p
              class="text-xs font-medium text-gray-500 group-hover:text-gray-700"
            >
              {{ $t('view_profile') }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
