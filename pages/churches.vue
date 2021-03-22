<script>
import {defineComponent, watchEffect} from '@nuxtjs/composition-api'
import ChurchService from '~/services/ChurchService'

export default defineComponent({
  props: {
    page: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      churches: [],
      totalChurches: 0,
      perPage: 40,
    }
  },
  computed: {
    hasNextPage() {
      const totalPages = Math.ceil(this.totalChurches / this.perPage)

      return this.page < totalPages
    },
  },
  created() {
    watchEffect(() => {
      this.churches = null
      ChurchService.getChurches(this.perPage, this.page)
        .then(response => {
          this.churches = response.data
          this.totalChurches = response.headers['x-total-count']
        })
        .catch(() => {
          this.$router.push(this.localePath('/network-error/'))
        })
    })
  },
})
</script>

<template>
  <PageWrapper>
    <PageHeading> {{ $t('churches') }} </PageHeading>

    <SectionWrapper class="tabs">
      <div>
        <div class="sm:hidden">
          <label for="tabs" class="sr-only">Select a tab</label>
          <select
            id="tabs"
            name="tabs"
            class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          >
            <option selected>My Account</option>
            <option>Company</option>
            <option>Team Members</option>
            <option>Billing</option>
          </select>
        </div>
        <div class="hidden sm:block">
          <nav
            class="relative z-0 flex divide-x divide-gray-200 rounded-lg shadow"
            aria-label="Tabs"
          >
            <a
              href="#"
              aria-current="page"
              class="relative flex-1 min-w-0 px-4 py-4 overflow-hidden text-sm font-medium text-center text-gray-900 bg-white rounded-l-lg group hover:bg-gray-50 focus:z-10"
            >
              <span>My Account</span>
              <span
                aria-hidden="true"
                class="bg-primary-500 absolute inset-x-0 bottom-0 h-0.5"
              />
            </a>
            <a
              href="#"
              aria-current="false"
              class="relative flex-1 min-w-0 px-4 py-4 overflow-hidden text-sm font-medium text-center text-gray-500 bg-white hover:text-gray-700 group hover:bg-gray-50 focus:z-10"
            >
              <span>Company</span>
              <span
                aria-hidden="true"
                class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"
              />
            </a>
            <a
              href="#"
              aria-current="false"
              class="relative flex-1 min-w-0 px-4 py-4 overflow-hidden text-sm font-medium text-center text-gray-500 bg-white hover:text-gray-700 group hover:bg-gray-50 focus:z-10"
            >
              <span>Team Members</span>
              <span
                aria-hidden="true"
                class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"
              />
            </a>
            <a
              href="#"
              aria-current="false"
              class="relative flex-1 min-w-0 px-4 py-4 overflow-hidden text-sm font-medium text-center text-gray-500 bg-white rounded-r-lg hover:text-gray-700 group hover:bg-gray-50 focus:z-10"
            >
              <span>Billing</span>
              <span
                aria-hidden="true"
                class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"
              />
            </a>
          </nav>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <article>
        <div class="flex justify-between w-full text-right border">
          <NuxtLink
            v-if="page != 1"
            id="page-prev"
            :to="localePath({path: '/churches/', query: {page: page - 1}})"
            rel="prev"
          >
            &#60; {{ $t('previous') }}
          </NuxtLink>

          <NuxtLink
            v-if="hasNextPage"
            id="page-next"
            class="inline-block"
            :to="localePath({path: '/churches/', query: {page: page + 1}})"
            rel="next"
          >
            {{ $t('next') }} &#62;
          </NuxtLink>
        </div>

        <div class="overflow-hidden border-b border-gray-200">
          <div class="grid grid-cols-2 gap-8 md:grid-cols-3">
            <NuxtLink
              v-for="church in churches"
              :key="church.id"
              class="flex justify-center col-span-1 px-8 py-8 shadow bg-gray-50"
              :to="localePath(`/churches/${church.id}/`)"
            >
              {{ church.church_name }}
            </NuxtLink>
          </div>
        </div>
      </article>
    </SectionWrapper>
  </PageWrapper>
</template>
