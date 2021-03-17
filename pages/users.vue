<script>
import {defineComponent, watchEffect} from '@nuxtjs/composition-api'
import PersonService from '~/services/PersonService'

export default defineComponent({
  name: 'PersonList',
  props: {
    page: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      people: [],
      totalPeople: 0,
      perPage: 250,
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
})
</script>
<template>
  <PageWrapper>
    <PageHeading>{{ $t('people') }}</PageHeading>

    <SectionWrapper class="mx-8 mt-8 rounded-lg shadow">
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

    <SectionWrapper class="p-8 people">
      <div class="">
        <!-- <PersonCard v-for="person in people" :key="person.id" :person="person" /> -->

        <div class="flex items-center justify-between">
          <OButton
            variant="danger"
            :disabled="!selected"
            @click="selected = null"
          >
            <span>Clear selected</span>
          </OButton>

          <OSelect v-model="perPage">
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="15">15 per page</option>
            <option value="20">20 per page</option>
            <option value="250">250 per page</option>
          </OSelect>
        </div>

        <pre>{{ selected }}</pre>
        <OTable
          v-model:checked-rows="checkedRows"
          v-model:per-page="perPage"
          v-model:current-page="currentPage"
          v-model:selected="selected"
          :checkable="true"
          :header-checkable="false"
          :show-header="true"
          hoverable
          paginated
          striped
          narrowed
          :data="people"
        >
          <OTableColumn
            v-slot="props"
            searchable
            sortable
            field="id"
            label="ID"
            numeric
            width="100"
          >
            {{ props.row.id }}
          </OTableColumn>
          <OTableColumn
            v-slot="props"
            field="firstName"
            searchable
            sortable
            label="First Name"
          >
            {{ props.row.firstName }}
          </OTableColumn>
          <OTableColumn
            v-slot="props"
            field="lastName"
            searchable
            sortable
            label="Last Name"
          >
            {{ props.row.lastName }}
          </OTableColumn>
          <OTableColumn
            v-slot="props"
            field="homeChurch"
            searchable
            sortable
            label="Home Church"
          >
            {{ props.row.homeChurch }}
          </OTableColumn>
          <OTableColumn
            v-slot="props"
            field="email"
            searchable
            sortable
            label="Email"
          >
            {{ props.row.email }}
          </OTableColumn>
        </OTable>
      </div>
    </SectionWrapper>
  </PageWrapper>
</template>
