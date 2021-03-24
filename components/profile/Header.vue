<script>
import {defineComponent} from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    person: {
      type: Object,
      default: () => ({
        name: '',
        profilePhotoUrl: '',
      }),
    },
  },
})
</script>
<template>
  <div>
    <div>
      <img
        class="object-cover w-full h-32 lg:h-48"
        src="https://images.unsplash.com/photo-1430826473320-fc1ccf2ce791?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;crop=focalpoint&amp;fp-x=.5&amp;fp-y=.4&amp;fp-z=.5&amp;fp-debug=&amp;facepad=8&amp;w=2880&amp;h=384&amp;q=80"
        alt=""
      />
    </div>
    <div class="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
      <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
        <div class="flex">
          <img
            class="w-24 h-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
            :src="person.profile_photo_url"
            alt=""
          />
        </div>
        <div
          class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
        >
          <div class="flex-1 min-w-0 mt-6 sm:hidden md:block">
            <h1 class="text-2xl font-bold text-gray-900 truncate">
              {{ person.name }}
            </h1>
          </div>
          <div
            class="flex flex-col mt-6 space-y-3 justify-stretch sm:flex-row sm:space-y-0 sm:space-x-4"
          >
            <button
              type="button"
              class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              <BaseIconSolid name="mail" class="mr-2 -ml-1 text-gray-400" />
              <span>{{ $t('message') }}</span>
            </button>
            <button
              type="button"
              class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              <BaseIconSolid name="phone" class="mr-2 -ml-1 text-gray-400" />
              <span>{{ $t('call') }}</span>
            </button>
          </div>
        </div>
      </div>
      <div class="flex-1 hidden min-w-0 mt-6 sm:block md:hidden">
        <h1 class="text-2xl font-bold text-gray-900 truncate">
          {{ person.name }}
        </h1>
      </div>
    </div>
  </div>
</template>
