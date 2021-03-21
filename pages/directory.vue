<script lang="ts">
import {defineComponent, watchEffect} from '@nuxtjs/composition-api'
import {PersonItem} from '~/types'
import PersonService from '~/services/PersonService'

export default defineComponent({
  props: {
    page: {
      type: Number,
      default: 1,
    },
    person: {
      type: Object,
      default: () => ({
        name: 'Charlee Tchividjian-Sherry',
        photoUrl: '/assets/img/people/charlee.jpeg',
        profileCover: '/assets/img/hero_families_1.jpg',
        email: 'charlee@example.com',
        title: 'Founder & CEO',
      }),
    },
  },
  data() {
    return {
      people: [] as PersonItem[],
      totalPeople: 0,
      perPage: 10,
      paginationOptions: [5, 10, 25, 75, 100, 250],
      currentPage: 1,
      checkedRows: [],
      selected: null,
    }
  },
  computed: {
    hasNextPage() {
      const totalPages = Math.ceil(this.totalPeople / 2)

      return this.page < totalPages
    },
  },
  created() {
    watchEffect(() => {
      this.people = []
      PersonService.getPeople(this.perPage, this.page)
        .then(response => {
          this.people = response.data
          this.totalPeople = response.headers['x-total-count']
        })
        .catch(() => {
          this.$router.push({name: 'network-error'})
        })
    })
  },
  methods: {
    handleFilter() {
      console.log('handle filter...')
    },
  },
})
</script>
<template>
  <PageWrapper>
    <PageHeading>{{ $t('directory') }}</PageHeading>
    <SectionWrapper class="flex h-screen overflow-hidden bg-white">
      <div v-if="false" class="lg:hidden">
        <div class="fixed inset-0 z-40 flex">
          <div class="fixed inset-0">
            <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
          </div>
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
                <BaseIconOutlined name="x" />
              </button>
            </div>
            <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div v-if="false" class="flex items-center flex-shrink-0 px-4">
                <BaseLogo name="promise-serves" />
              </div>
              <nav aria-label="Sidebar" class="mt-5">
                <div class="px-2 space-y-1">
                  <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
                  <a
                    href="#"
                    class="flex items-center px-2 py-2 text-base font-medium text-gray-900 bg-gray-100 rounded-md group"
                  >
                    <!-- Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" -->
                    <BaseIconOutlined name="home" />
                    {{ $t('dashboard') }}
                  </a>

                  <a
                    href="#"
                    class="flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
                  >
                    <BaseIconOutlined name="calendar" />

                    {{ $t('calendar') }}
                  </a>

                  <a
                    href="#"
                    class="flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
                  >
                    <BaseIconOutlined name="user-group" />
                    {{ $t('teams') }}
                  </a>

                  <a
                    href="#"
                    class="flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
                  >
                    <BaseIconOutlined name="search-circle" />
                    {{ $t('directory') }}
                  </a>

                  <a
                    href="#"
                    class="flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
                  >
                    <!-- Heroicon name: outline/speakerphone -->
                    <BaseIconOutlined name="speakerphone" />
                    {{ $t('announcements') }}
                  </a>

                  <a
                    href="#"
                    class="flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
                  >
                    <BaseIconOutlined name="map" />

                    {{ $t('office_map') }}
                  </a>
                </div>
                <hr class="my-5 border-t border-gray-200" aria-hidden="true" />
                <div class="px-2 space-y-1">
                  <a
                    href="#"
                    class="flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
                  >
                    <BaseIconOutlined name="view-grid-add" />

                    {{ $t('apps') }}
                  </a>

                  <a
                    href="#"
                    class="flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
                  >
                    <BaseIconOutlined name="cog" />
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
                      :src="person.photoUrl"
                      :alt="person.name"
                    />
                  </div>
                  <div class="ml-3">
                    <p
                      class="text-base font-medium text-gray-700 group-hover:text-gray-900"
                    >
                      {{ person.name }}
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
      <div v-if="false" class="hidden lg:flex lg:flex-shrink-0">
        <div class="flex flex-col w-64">
          <!-- Sidebar component, swap this element with another sidebar if you like -->
          <div
            class="flex flex-col flex-1 h-0 bg-gray-100 border-r border-gray-200"
          >
            <div class="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
              <div v-if="false" class="flex items-center flex-shrink-0 px-4">
                <BaseLogo name="promise-serves" />
              </div>
              <nav class="flex-1 mt-5" aria-label="Sidebar">
                <div class="px-2 space-y-1">
                  <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
                  <a
                    href="#"
                    class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
                  >
                    <!-- Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" -->
                    <BaseIconOutlined
                      name="home"
                      class="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500"
                    />
                    {{ $t('dashboard') }}
                  </a>

                  <a
                    href="#"
                    class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
                  >
                    <BaseIconOutlined
                      name="calendar"
                      class="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500"
                    />
                    {{ $t('calendar') }}
                  </a>

                  <a
                    href="#"
                    class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
                  >
                    <BaseIconOutlined
                      name="user-group"
                      class="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500"
                    />
                    {{ $t('teams') }}
                  </a>

                  <a
                    href="#"
                    class="flex items-center px-2 py-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
                  >
                    <BaseIconOutlined
                      name="search-circle"
                      class="w-6 h-6 mr-3 text-gray-500"
                    />

                    {{ $t('directory') }}
                  </a>

                  <a
                    href="#"
                    class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
                  >
                    <BaseIconOutlined
                      name="speakerphone"
                      class="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500"
                    />
                    {{ $t('announcements') }}
                  </a>

                  <a
                    href="#"
                    class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
                  >
                    <BaseIconOutlined
                      name="map"
                      class="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500"
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
                    <!-- Heroicon name: outline/view-grid-add -->
                    <BaseIconOutlined
                      name="view-grid-add"
                      class="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500"
                    />
                    {{ $t('apps') }}
                  </a>

                  <a
                    href="#"
                    class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
                  >
                    <!-- Heroicon name: outline/cog -->
                    <svg
                      class="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500"
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
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
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
                      :src="person.photoUrl"
                      alt=""
                    />
                  </div>
                  <div class="ml-3">
                    <p
                      class="text-sm font-medium text-gray-700 group-hover:text-gray-900"
                    >
                      {{ person.name }}
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
              <img
                v-if="false"
                class="w-auto h-8"
                src="https://tailwindui.com/img/logos/workflow-mark-primary-500.svg"
                alt="Workflow"
              />
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
            class="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last"
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
                <!-- Heroicon name: solid/chevron-left -->
                <svg
                  class="w-5 h-5 -ml-2 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>{{ $t('directory') }}</span>
              </a>
            </nav>

            <article>
              <!-- Profile header -->
              <div>
                <div>
                  <img
                    class="object-cover w-full h-32 lg:h-48"
                    :src="person.profileCover"
                    alt=""
                  />
                </div>
                <div class="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                  <div
                    class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5"
                  >
                    <div class="flex">
                      <img
                        class="w-24 h-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                        :src="person.photoUrl"
                        alt=""
                      />
                    </div>
                    <div
                      class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
                    >
                      <div class="flex-1 min-w-0 mt-6 sm:hidden 2xl:block">
                        <h1 class="text-2xl font-bold text-gray-900 truncate">
                          {{ person.name }}
                        </h1>
                      </div>
                      <div
                        class="flex flex-col mt-6 space-y-3 justify-stretch sm:flex-row sm:space-y-0 sm:space-x-4"
                      >
                        <button
                          type="button"
                          class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          <BaseIconSolid
                            name="mail"
                            class="w-5 h-5 mr-2 -ml-1 text-gray-400"
                          />
                          <span>{{ $t('message') }}</span>
                        </button>
                        <button
                          type="button"
                          class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          <BaseIconSolid
                            name="phone"
                            class="w-5 h-5 mr-2 -ml-1 text-gray-400"
                          />
                          <span>{{ $t('call') }}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="flex-1 hidden min-w-0 mt-6 sm:block 2xl:hidden">
                    <h1 class="text-2xl font-bold text-gray-900 truncate">
                      {{ person.name }}
                    </h1>
                  </div>
                </div>
              </div>
              <!-- <ProfileTabs /> -->
              <!-- <ProfileDetails /> -->
              <!-- <TeamGrid /> -->
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
                {{ $t('search_directory_message', {count: '3,018'}) }}
              </p>
              <form class="flex mt-6 space-x-4" action="#">
                <div class="flex-1 min-w-0">
                  <label for="search" class="sr-only">{{ $t('search') }}</label>
                  <div class="relative rounded-md shadow-sm">
                    <div
                      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                    >
                      <!-- Heroicon name: mail -->
                      <!-- Heroicon name: solid/search -->
                      <svg
                        class="w-5 h-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      name="search"
                      id="search"
                      autocomplete="off"
                      class="block w-full pl-10 border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      :placeholder="$t('search')"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  class="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <BaseIconSolid name="filter" class="w-5 h-5 text-gray-400" />
                  <span class="sr-only">Search</span>
                </button>
              </form>
            </div>

            <DirectoryList :people="people" />
          </aside>
        </div>
      </div>
    </SectionWrapper>
  </PageWrapper>
</template>
