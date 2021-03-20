<script>
// import {groupByAlphabet} from '~/helpers'
export default {
  layout: 'plain',
  props: {
    people: {
      type: Array,
      default() {
        return [
          {id: 1, firstName: 'Victor', lastName: 'Tolbert', title: 'Volunteer'},
          {
            id: 2,
            firstName: 'Reginald',
            lastName: 'Tolbert',
            title: 'Volunteer',
          },
          {
            id: 3,
            firstName: 'Victor',
            lastName: 'Rodriquez',
            title: 'Volunteer',
          },
          {id: 4, firstName: 'Ron', lastName: 'Johnson', title: 'Volunteer'},
        ]
      },
    },
  },
  computed: {
    peopleSortedByLastName() {
      return [...this.people].sort((a, b) => {
        // then check their last names
        if (a.lastName < b.lastName) return -1
        if (a.lastName > b.lastName) return 1
        // then check their first names
        if (a.firstName < b.firstName) return -1
        if (a.firstName > b.firstName) return 1
        return 0
      })
    },
    peopleGroupedByLetter() {
      return this.peopleSortedByLastName.reduce((result, person) => {
        let alphabet = person.lastName[0]

        // if there is no property in the accumulator with this letter, create it
        if (!result[alphabet]) result[alphabet] = {alphabet, people: [person]}
        // ...if there is, push current element to children array for that letter
        else result[alphabet].people.push(person)

        // return accumulator
        return result
      }, {})
    },
  },
}
</script>
<template>
  <div class="flex h-screen overflow-hidden bg-white">
    <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
    <div class="lg:hidden">
      <div class="fixed inset-0 z-40 flex">
        <!--
        Off-canvas menu overlay, show/hide based on off-canvas menu state.

        Entering: "transition-opacity ease-linear duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "transition-opacity ease-linear duration-300"
          From: "opacity-100"
          To: "opacity-0"
      -->
        <div class="fixed inset-0">
          <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
        <!--
        Off-canvas menu, show/hide based on off-canvas menu state.

        Entering: "transition ease-in-out duration-300 transform"
          From: "-translate-x-full"
          To: "translate-x-0"
        Leaving: "transition ease-in-out duration-300 transform"
          From: "translate-x-0"
          To: "-translate-x-full"
      -->
        <div
          tabindex="0"
          class="relative flex flex-col flex-1 w-full max-w-xs bg-white focus:outline-none"
        >
          <div class="absolute top-0 right-0 pt-2 -mr-12">
            <button
              type="button"
              class="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span class="sr-only">{{ $t('close_sidebar') }}</span>
              <BaseIconOutlined name="x" class="text-white" />
            </button>
          </div>
          <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div class="flex items-center flex-shrink-0 px-4">
              <BaseLogo name="gasps" />
            </div>

            <nav aria-label="Sidebar" class="mt-5">
              <div class="px-2 space-y-1">
                <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
                <a
                  href="#"
                  class="flex items-center px-2 py-2 text-base font-medium text-gray-900 bg-gray-100 rounded-md group"
                >
                  <!-- Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" -->
                  <BaseIconOutlined name="home" class="mr-4 text-gray-500" />
                  {{ $t('dashboard') }}
                </a>
                <a
                  href="#"
                  class="flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
                >
                  <BaseIconOutlined
                    name="calendar"
                    class="mr-4 text-gray-400 group-hover:text-gray-500"
                  />
                  {{ $t('calendar') }}
                </a>

                <a
                  href="#"
                  class="flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
                >
                  <BaseIconOutlined
                    name="user-group"
                    class="mr-4 text-gray-400 group-hover:text-gray-500"
                  />
                  {{ $t('teams') }}
                </a>

                <a
                  href="#"
                  class="flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
                >
                  <BaseIconOutlined
                    name="search-circle"
                    class="mr-4 text-gray-400 group-hover:text-gray-500"
                  />
                  {{ $t('directory') }}
                </a>

                <a
                  href="#"
                  class="flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
                >
                  <BaseIconOutlined
                    name="speaker-phone"
                    class="mr-4 text-gray-400 group-hover:text-gray-500"
                  />
                  {{ $t('announcements') }}
                </a>

                <a
                  href="#"
                  class="flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
                >
                  <BaseIconOutlined
                    name="map"
                    class="mr-4 text-gray-400 group-hover:text-gray-500"
                  />
                  {{ $t('office_map') }}
                </a>
              </div>
              <hr class="my-5 border-t border-gray-200" aria-hidden="true" />
              <div class="px-2 space-y-1">
                <a
                  href="#"
                  class="flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
                >
                  <BaseIconOutlined
                    name="view-grid-add"
                    class="mr-4 text-gray-400 group-hover:text-gray-500"
                  />
                  {{ $t('apps') }}
                </a>

                <a
                  href="#"
                  class="flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
                >
                  <BaseIconOutlined
                    name="cog"
                    class="mr-4 text-gray-400 group-hover:text-gray-500"
                  />
                  {{ $t('settings') }}
                </a>
              </div>
            </nav>
          </div>
          <div class="flex flex-shrink-0 p-4 border-t border-gray-200">
            <a href="#" class="flex-shrink-0 block group">
              <div class="flex items-center">
                <div>
                  <img
                    class="inline-block w-10 h-10 rounded-full"
                    src="https://cominex.net/assets/img/people/marcus.jpeg"
                    alt=""
                  />
                </div>
                <div class="ml-3">
                  <p
                    class="text-base font-medium text-gray-700 group-hover:text-gray-900"
                  >
                    Marcus Bouligny
                  </p>
                  <p
                    class="text-sm font-medium text-gray-500 group-hover:text-gray-700"
                  >
                    {{ $t('view_profile') }}
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="flex-shrink-0 w-14" aria-hidden="true">
          <!-- Force sidebar to shrink to fit close icon -->
        </div>
      </div>
    </div>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:flex lg:flex-shrink-0">
      <div class="flex flex-col w-64">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div
          class="flex flex-col flex-1 h-0 bg-gray-100 border-r border-gray-200"
        >
          <div class="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
            <div class="flex items-center flex-shrink-0 px-4">
              <BaseLogo name="gasps" class="w-auto h-8" />
            </div>
            <nav class="flex-1 mt-5" aria-label="Sidebar">
              <div class="px-2 space-y-1">
                <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
                <a
                  href="#"
                  class="flex items-center px-2 py-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-md group"
                >
                  <!-- Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" -->
                  <BaseIconOutlined
                    name="home"
                    class="mr-3 text-gray-400 group-hover:text-gray-500"
                  />
                  {{ $t('dashboard') }}
                </a>

                <a
                  href="#"
                  class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
                >
                  <BaseIconOutlined
                    name="calendar"
                    class="mr-3 text-gray-400 group-hover:text-gray-500"
                  />
                  {{ $t('calendar') }}
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
      </div>
    </div>
    <div class="flex flex-col flex-1 min-w-0 overflow-hidden">
      <div class="lg:hidden">
        <div
          class="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5"
        >
          <div>
            <BaseLogo name="gasps" class="w-auto h-8" />
          </div>
          <div>
            <button
              type="button"
              class="inline-flex items-center justify-center w-12 h-12 -mr-3 text-gray-500 rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-600"
            >
              <span class="sr-only">{{ $t('open_sidebar') }}</span>
              <BaseIconOutlined name="menu" />
            </button>
          </div>
        </div>
      </div>
      <div class="relative z-0 flex flex-1 overflow-hidden">
        <main
          class="relative z-0 flex-1 overflow-y-scroll focus:outline-none xl:order-last"
          tabindex="0"
        >
          <!-- Breadcrumb -->
          <nav
            class="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden"
            aria-label="Breadcrumb"
          >
            <a
              href="#"
              class="inline-flex items-center space-x-3 text-sm font-medium text-gray-900"
            >
              <BaseIconSolid name="chevron-left" class="-ml-2 text-gray-400" />
              <span>{{ $t('directory') }}</span>
            </a>
          </nav>

          <article>
            <NuxtChild :key="$route.path" />
          </article>
        </main>

        <aside
          class="flex-shrink-0 hidden border-r border-gray-200 xl:order-first xl:flex xl:flex-col w-96"
        >
          <div class="px-6 pt-6 pb-4">
            <h2 class="text-lg font-medium text-gray-900">
              {{ $t('directory') }}
            </h2>
            <p class="mt-1 text-sm text-gray-600">
              {{ $t('search_directory_message', {count: 10}) }}
            </p>
            <form class="flex mt-6 space-x-4" action="#">
              <div class="flex-1 min-w-0">
                <label for="search" class="sr-only">{{ $t('search') }}</label>
                <div class="relative rounded-md shadow-sm">
                  <div
                    class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                  >
                    <BaseIconSolid name="search" class="text-gray-400" />
                  </div>
                  <input
                    type="search"
                    name="search"
                    id="search"
                    class="block w-full pl-10 border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Search"
                  />
                </div>
              </div>
              <button
                type="submit"
                class="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <BaseIconSolid name="filter" class="text-gray-400" />
                <span class="sr-only">{{ $t('search') }}</span>
              </button>
            </form>
          </div>

          <!-- Directory list -->
          <nav class="relative h-full overflow-y-auto" aria-label="Directory">
            <div v-for="(group, key) in peopleGroupedByLetter">
              <div
                class="sticky top-0 z-10 px-6 py-1 text-sm font-medium text-gray-500 border-t border-b border-gray-200 bg-gray-50"
              >
                <h3>{{ key }}</h3>
              </div>

              <DirectoryListItem
                v-for="person in group.people"
                :person="person"
                :key="person.id"
              />
            </div>
          </nav>
        </aside>
      </div>
    </div>
  </div>
</template>
<!--
<style>
.o-tabs__nav-item-default--active {
  border-bottom-width: 4px;
}
</style> -->
