<template>
  <nav
    class="hidden bg-white border-b border-gray-200 lg:flex"
    aria-label="Breadcrumb"
  >
    <ol
      class="flex w-full max-w-screen-xl px-4 mx-auto space-x-4 sm:px-6 lg:px-8"
    >
      <li class="flex">
        <div class="flex items-center">
          <NuxtLink to="/" class="text-gray-400 hover:text-gray-500">
            <BaseIconSolid name="home" class="flex-shrink-0" />
            <span class="sr-only">{{ $t('home') }}</span>
          </NuxtLink>
        </div>
      </li>

      <li class="flex">
        <div class="flex items-center">
          <svg
            class="flex-shrink-0 w-6 h-full text-gray-200"
            preserverAspectRatio="none"
            viewBox="0 0 24 44"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <NuxtLink
            to="/dashboards/"
            class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            Dashboards
          </NuxtLink>
        </div>
      </li>
      <li class="flex">
        <div class="flex items-center">
          <svg
            class="flex-shrink-0 w-6 h-full text-gray-200"
            preserverAspectRatio="none"
            viewBox="0 0 24 44"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <a
            href="#"
            aria-current="page"
            class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            Volunteer Dashboard
          </a>
        </div>
      </li>
    </ol>
  </nav>
</template>
