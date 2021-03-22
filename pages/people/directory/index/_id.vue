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
      <div class="relative overflow-hidden">
        <!-- <img
          class="object-cover w-full h-32 lg:h-48"
          src="https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
          alt=""
        /> -->
        <SvgLiquidCheese class="absolute object-cover h-32 bg-cover lg:h-48" />
      </div>

      <SectionWrapper :padded="false" class="bg-gray-500">
        <div class="w-full">
          <SvgLiquidCheese class="object-cover w-full h-32 lg:h-48" />
        </div>
      </SectionWrapper>

      <div class="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div class="flex">
            <img
              class="w-24 h-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
              :src="person.avatarUrl"
              alt=""
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

    <SectionWrapper class="prose">
      <!-- <span>{{ person.email }}</span> -->
      <span>{{ person.phone }}</span>
      <p>{{ person.bio }}</p>
      <!-- <p>by Person with id {{ person.id }}</p> -->
    </SectionWrapper>
  </PageWrapper>
</template>
