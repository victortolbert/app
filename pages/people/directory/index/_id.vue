<!-- @vue-ignore -->
<script>
export default {
  data() {
    return {
      person: {},
    }
  },
  async asyncData({app, params}) {
    return {
      person: await app.$personRepository.show(params.id),
    }
  },
}
</script>

<template>
  <PageWrapper>
    <!-- Profile header -->
    <header>
      <SectionWrapper :padded="false" class="bg-gray-500">
        <div class="w-full">
          <SvgLiquidCheese
            :colors="$store.getters.primaryColors"
            class="object-cover w-full h-32 lg:h-48"
          />
        </div>
      </SectionWrapper>

      <div class="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div class="flex">
            <img
              class="w-24 h-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
              :src="person.avatarUrl"
              :alt="person.name"
              style="filter: grayscale(1)"
            />
          </div>
          <div
            class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
          >
            <div class="flex-1 min-w-0 mt-6 sm:hidden 2xl:block">
              <h1 class="text-2xl font-bold text-gray-900 truncate">
                {{ person.firstName }} {{ person.lastName }}
              </h1>
            </div>
            <div
              class="flex flex-col mt-6 space-y-3 justify-stretch sm:flex-row sm:space-y-0 sm:space-x-4"
            >
              <button
                type="button"
                class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <!-- Heroicon name: solid/mail -->
                <BaseIconSolid name="mail" class="mr-2 -ml-1 text-gray-400" />
                <span>{{ $t('message') }}</span>
              </button>
              <button
                type="button"
                class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <BaseIconSolid name="phone" class="mr-2 -ml-1 text-gray-400" />
                <span>{{ $t('call') }}</span>
              </button>
            </div>
          </div>
        </div>
        <div class="flex-1 hidden min-w-0 mt-6 sm:block 2xl:hidden">
          <h1 class="text-2xl font-bold text-gray-900 truncate">
            {{ person.firstName }} {{ person.lastName }}
          </h1>
        </div>
      </div>
    </header>

    <div class="mt-6 sm:mt-2 2xl:mt-5">
      <div class="border-b border-gray-200">
        <div class="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
          <nav class="flex -mb-px space-x-8" aria-label="Tabs">
            <!-- Current: "border-pink-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
            <NuxtLink
              :to="`/people/directory/${person.id}/`"
              class="px-1 py-4 text-sm font-medium text-gray-900 border-b-2 border-primary-500 whitespace-nowrap"
              aria-current="page"
            >
              {{ $t('profile') }}
            </NuxtLink>
            <NuxtLink
              v-if="false"
              :to="`/people/directory/${person.id}/calendar/`"
              class="px-1 py-4 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 whitespace-nowrap"
            >
              {{ $t('calendar') }}
            </NuxtLink>
            <NuxtLink
              v-if="false"
              :to="`/people/directory/${person.id}/recognition/`"
              class="px-1 py-4 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 whitespace-nowrap"
            >
              {{ $t('recognition') }}
            </NuxtLink>
          </nav>
        </div>
      </div>
    </div>

    <NuxtChild :person="person" />
  </PageWrapper>
</template>
