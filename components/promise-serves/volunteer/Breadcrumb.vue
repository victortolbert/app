<template>
  <div>
    <nav class="sm:hidden" aria-label="Back">
      <NuxtLink to="/" class="flex items-center text-sm font-medium">
        <BaseIconSolid name="chevron-left" />
        {{ $t('back') }}
      </NuxtLink>
    </nav>
    <nav class="hidden sm:flex" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-4">
        <li>
          <div>
            <NuxtLink to="/" class="text-sm font-medium">
              {{ $t('home') }}
            </NuxtLink>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <BaseIconSolid
              name="chevron-right"
              class="flex-shrink-0 text-gray-400"
            />
            <NuxtLink to="/dashboard/" class="ml-4 text-sm font-medium">
              {{ $t('dashboard') }}
            </NuxtLink>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <BaseIconSolid
              name="chevron-right"
              class="flex-shrink-0 text-gray-400"
            />
            <NuxtLink
              to="/volunteers/"
              aria-current="page"
              class="ml-4 text-sm font-medium"
            >
              {{ $t('volunteers') }}
            </NuxtLink>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</template>
