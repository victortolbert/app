<script lang="ts">
import {defineComponent, watchEffect} from '@nuxtjs/composition-api'
import {PersonItem} from '~/types'
import PersonService from '~/services/PersonService'

export default defineComponent({
  layout: 'plain',
  middleware: 'auth',
  props: {
    page: {
      type: Number,
      default: 1,
    },
    affiliate: {
      type: Object,
      default: () => ({
        name: 'vticonsulting',
      }),
    },
  },
  data() {
    return {
      people: [] as PersonItem[],
      totalPeople: 0,
      nestedRoutes: [],
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

    this.$router.options.routes.forEach(routeOption => {
      if (routeOption.path.startsWith(this.$route.path)) {
        this.nestedRoutes.push({
          name: routeOption.name,
          path: routeOption.path,
        })
      }
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
            <div
              v-if="$store.state.affiliate.name"
              class="flex items-center flex-shrink-0 px-4"
            >
              <BaseLogo :name="$store.state.affiliate.name" />
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
                <a
                  href="#"
                  class="flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
                >
                  <BaseIconOutlined
                    name="chat"
                    class="mr-4 text-gray-400 group-hover:text-gray-500"
                  />
                  {{ $t('messages') }}
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
            <!-- Profile Link -->
            <a href="#" class="flex-shrink-0 block group">
              <div class="flex items-center">
                <div>
                  <img
                    class="inline-block w-10 h-10 rounded-full"
                    :src="$auth.user.profile_photo_url"
                    alt=""
                  />
                </div>
                <div class="ml-3">
                  <p
                    class="text-base font-medium text-gray-700 group-hover:text-gray-900"
                  >
                    {{ $auth.user.name }}
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
        <AppSidebar />
      </div>
    </div>
    <div class="flex flex-col flex-1 min-w-0 overflow-hidden">
      <div class="lg:hidden">
        <div
          class="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5"
        >
          <div v-if="affiliate">
            <BaseLogo :name="$store.state.affiliate.name" class="w-auto h-8" />
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
        <nuxt />
      </div>
    </div>
  </div>
</template>
