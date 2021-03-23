<template>
  <div class="min-h-screen bg-gray-100">
    <main v-if="$auth.loggedIn" class="py-10">
      <header
        class="max-w-3xl px-4 mx-auto sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8"
      >
        <div class="flex items-center space-x-5">
          <div class="flex-shrink-0">
            <div class="relative">
              <img
                class="w-16 h-16 rounded-full"
                :src="$auth.user.profile_photo_url"
                alt=""
              />
              <span
                class="absolute inset-0 rounded-full shadow-inner"
                aria-hidden="true"
              ></span>
            </div>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">
              {{ $auth.user.name }}
            </h1>
            <!-- <p class="text-sm font-medium text-gray-500">
              Applied for
              <a href="#" class="text-gray-900">Front End Developer</a> on
              <time datetime="2020-08-25">August 25, 2020</time>
            </p> -->
          </div>
        </div>
        <div
          class="flex flex-col-reverse mt-6 space-y-4 space-y-reverse justify-stretch sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3"
        >
          <button
            type="button"
            class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary-500"
          >
            Disqualify
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary-500"
          >
            Certify
          </button>
        </div>
      </header>

      <section
        class="grid max-w-3xl grid-cols-1 gap-6 mx-auto mt-8 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3"
      >
        <div class="space-y-6 lg:col-start-1 lg:col-span-2">
          <VolunteerInformation />
          <VolunteerNotes />
        </div>

        <AdvocateCertificationSteps />
        <VolunteerActivityTimeline />
      </section>
    </main>
  </div>
</template>
