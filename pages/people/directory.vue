<script lang="ts">
import {defineComponent, watchEffect} from '@nuxtjs/composition-api'
import {PersonItem} from '~/types'
import PersonService from '~/services/PersonService'

export default defineComponent({
  // layout: 'plain',
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
    <div class="flex flex-col flex-1 min-w-0 overflow-hidden">
      <div class="lg:hidden">
        <div
          class="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5"
        >
          <div v-if="affiliate">
            <BaseLogo :name="affiliate.name" class="w-auto h-8" />
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
            <NuxtChild :key="$route.fullPath" />
          </article>
        </main>

        <aside
          class="flex-shrink-0 hidden border-r border-gray-200 xl:order-first xl:flex xl:flex-col w-96"
        >
          <div class="px-6 pt-6 pb-4">
            <h2 class="text-lg font-medium text-gray-900">
              {{ $t('volunteer') }} {{ $t('directory') }}
            </h2>
            <p class="mt-1 text-sm text-gray-600">
              {{ $t('search_directory_message', {count: people.length}) }}
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
                @click.prevent=""
                type="submit"
                class="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <BaseIconSolid name="filter" class="text-gray-400" />
                <span class="sr-only">{{ $t('search') }}</span>
              </button>
            </form>
          </div>

          <DirectoryList :people="people" />

          <!-- <nav class="relative h-full overflow-y-auto" aria-label="Directory">
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
          </nav> -->
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
