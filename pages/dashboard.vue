<script>
import {defineComponent} from '@nuxtjs/composition-api'

const book = {
  title: "Old Man's War",
  author: {
    firstName: 'John',
    lastName: 'Scalzi',
  },
}

export default defineComponent({
  data: () => ({
    books: [book],
    selectedBook: book,
    Deselect: {
      render: createElement => createElement('span', '❌'),
    },
    OpenIndicator: {
      render: createElement => createElement('span', '🔽'),
    },
    options: [
      'Angular',
      'Angular 2',
      'Aurelia',
      'Backbone',
      'Ember',
      'jQuery',
      'Meteor',
      'Node.js',
      'Polymer',
      'React',
      'RxJS',
      'Svelte',
      'Vue.js',
    ],
    siteOptions: [
      {
        title: 'Read the Docs',
        icon: 'fa-book',
        url: 'https://codeclimate.com/github/sagalbot/vue-select',
      },
      {
        title: 'View on GitHub',
        icon: 'fa-github',
        url: 'https://codeclimate.com/github/sagalbot/vue-select',
      },
      {
        title: 'View on NPM',
        icon: 'fa-database',
        url: 'https://codeclimate.com/github/sagalbot/vue-select',
      },
      {
        title: 'View Codepen Examples',
        icon: 'fa-pencil',
        url: 'https://codeclimate.com/github/sagalbot/vue-select',
      },
    ],
    name: '',
    selected: null,
  }),
  computed: {
    filteredOptions() {
      return this.options.filter(option => {
        return (
          option.toString().toLowerCase().indexOf(this.name.toLowerCase()) >= 0
        )
      })
    },
  },
})
</script>
<template>
  <PageWrapper class="bg-gray-100">
    <!-- <BaseHero
      class="h-72"
      bg-cover
      :cover-url="`${$config.assetsURL}/img/backgrounds/liquid_cheese.svg`"
    /> -->
    <!-- <SvgLiquidCheese /> -->
    <!-- <BaseCard /> -->
    <SectionWrapper class="space-y-6">
      <OField label="Loading...">
        <v-select :loading="true">
          <template #spinner="{loading}">
            <div
              v-if="loading"
              style="border-left-color: rgba(88, 151, 251, 0.71)"
              class="vs__spinner"
            >
              The .vs__spinner class will hide the text for me.
            </div>
          </template>
        </v-select>
      </OField>

      <OField label="Books">
        <v-select v-model="selectedBook" :options="books" label="title">
          <template #selected-option="{title, author}">
            <div style="display: flex; align-items: baseline">
              <strong>{{ title }}</strong>
              <em style="margin-left: 0.5rem"
                >by {{ author.firstName }} {{ author.lastName }}</em
              >
            </div>
          </template>
        </v-select>
      </OField>

      <OField label="Site Options">
        <v-select :options="siteOptions" label="title">
          <!--  -->
          <template slot="option" slot-scope="option">
            <span class="fa" :class="option.icon"></span>
            {{ option.title }}
          </template>

          <!--  -->
          <template #open-indicator="{attributes}">
            <span v-bind="attributes">🔽</span>
          </template>

          <!--  -->
          <template #footer>
            <div style="opacity: 0.8">
              Bottom of the component, in the footer slot!
            </div>
          </template>
        </v-select>
      </OField>

      <OField label="Find a JS framework">
        <v-select
          transition=""
          class="style-chooser"
          :components="{Deselect, OpenIndicator}"
          :multiple="true"
          :disabled="false"
          :clearable="true"
          :searchable="true"
          :autoscroll="false"
          :append-to-body="false"
          :filterable="true"
          :taggable="false"
          :no-drop="false"
          :push-tags="true"
          :select-on-tab="false"
          :close-on-select="true"
          dir="ltr"
          :options="options"
        />
      </OField>
    </SectionWrapper>

    <SectionWrapper class="max-w-6xl">
      <SectionWrapper>
        <details class="disclosure">
          <summary>Details</summary>
          <div class="p-4 bg-primary-50">
            Something small enough to escape casual notice.
          </div>
        </details>
      </SectionWrapper>

      <SectionWrapper>
        <ExampleMultiselectField class="mt-4" />

        <OField label="Find a JS framework">
          <OAutocomplete
            expanded
            v-model="name"
            :data="filteredOptions"
            placeholder="e.g. jQuery"
            icon="search"
            icon-pack="fal"
            clearable
            @select="option => (selected = option)"
          >
            <template slot="empty">No results found</template>
          </OAutocomplete>
        </OField>
        <PersonAutocompleteField class="mt-4" />
        <MovieAutocompleteField class="mt-4" />
      </SectionWrapper>

      <SectionWrapper class="bg-white">
        <BaseMediaObject class="p-4 lg:p-0" />
      </SectionWrapper>

      <div class="mt-2 space-y-8">
        <ProjectSettings />
        <UserProfileForm />

        <form action="">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-6 bg-white sm:p-6 lg:pb-8">
              <div>
                <h2 class="text-lg font-medium leading-6 text-gray-900">
                  Profile
                </h2>
                <p class="mt-1 text-sm text-gray-500">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>
              <div class="flex flex-col mt-6 lg:flex-row">
                <div class="flex-grow space-y-6">
                  <div>
                    <label
                      for="username"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <div class="flex mt-1 rounded-md shadow-sm">
                      <span
                        class="inline-flex items-center px-3 text-gray-500 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md sm:text-sm"
                      >
                        workcation.com/
                      </span>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        autocomplete="username"
                        class="flex-grow block w-full min-w-0 border-gray-300 rounded-none focus:ring-light-blue-500 focus:border-light-blue-500 rounded-r-md sm:text-sm"
                        value="lisamarie"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      for="about"
                      class="block text-sm font-medium text-gray-700"
                    >
                      About
                    </label>
                    <div class="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows="3"
                        class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                      ></textarea>
                    </div>
                    <p class="mt-2 text-sm text-gray-500">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>
                </div>
                <div
                  class="flex-grow mt-6 lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0"
                >
                  <p
                    class="text-sm font-medium text-gray-700"
                    aria-hidden="true"
                  >
                    Photo
                  </p>
                  <div class="mt-1 lg:hidden">
                    <div class="flex items-center">
                      <div
                        class="flex-shrink-0 inline-block w-12 h-12 overflow-hidden rounded-full"
                        aria-hidden="true"
                      >
                        <img
                          class="w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=iXNbLPGHnb&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80h"
                          alt=""
                        />
                      </div>
                      <div class="ml-5 rounded-md shadow-sm">
                        <div
                          class="relative flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md group hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-light-blue-500"
                        >
                          <label
                            for="user_photo"
                            class="relative text-sm font-medium leading-4 text-gray-700 pointer-events-none"
                          >
                            <span>Change</span>
                            <span class="sr-only"> user photo</span>
                          </label>
                          <input
                            id="user_photo"
                            name="user_photo"
                            type="file"
                            class="absolute w-full h-full border-gray-300 rounded-md opacity-0 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="relative hidden overflow-hidden rounded-full lg:block"
                  >
                    <img
                      class="relative w-40 h-40 rounded-full"
                      src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=iXNbLPGHnb&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80"
                      alt=""
                    />
                    <label
                      for="user-photo"
                      class="absolute inset-0 flex items-center justify-center w-full h-full text-sm font-medium text-white bg-black bg-opacity-75 opacity-0 hover:opacity-100 focus-within:opacity-100"
                    >
                      <span>Change</span>
                      <span class="sr-only"> user photo</span>
                      <input
                        type="file"
                        id="user-photo"
                        name="user-photo"
                        class="absolute inset-0 w-full h-full border-gray-300 rounded-md opacity-0 cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-12 gap-6 mt-6">
                <div class="col-span-12 sm:col-span-6">
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-gray-700"
                    >First name</label
                  >
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    autocomplete="given-name"
                    class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                  />
                </div>
                <div class="col-span-12 sm:col-span-6">
                  <label
                    for="last_name"
                    class="block text-sm font-medium text-gray-700"
                    >Last name</label
                  >
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    autocomplete="family-name"
                    class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                  />
                </div>
                <div class="col-span-12">
                  <label
                    for="url"
                    class="block text-sm font-medium text-gray-700"
                    >URL</label
                  >
                  <input
                    type="text"
                    name="url"
                    id="url"
                    class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                  />
                </div>
                <div class="col-span-12 sm:col-span-6">
                  <label
                    for="company"
                    class="block text-sm font-medium text-gray-700"
                    >Company</label
                  >
                  <input
                    type="text"
                    name="company"
                    id="company"
                    autocomplete="organization"
                    class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        <form action="">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-6 bg-white sm:p-6 lg:pb-8">
              <div class="mt-10 divide-y divide-gray-200">
                <div class="space-y-1">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    Profile
                  </h3>
                  <p class="max-w-2xl text-sm text-gray-500">
                    This information will be displayed publicly so be careful
                    what you share.
                  </p>
                </div>
                <div class="mt-6">
                  <dl class="divide-y divide-gray-200">
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Name</dt>
                      <dd
                        class="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        <span class="flex-grow">Chelsea Hagon</span>
                        <span class="flex-shrink-0 ml-4">
                          <button
                            type="button"
                            class="font-medium text-purple-600 bg-white rounded-md hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            Update
                          </button>
                        </span>
                      </dd>
                    </div>
                    <div
                      class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5"
                    >
                      <dt class="text-sm font-medium text-gray-500">Photo</dt>
                      <dd
                        class="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        <span class="flex-grow">
                          <img
                            class="w-8 h-8 rounded-full"
                            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;ixqx=iXNbLPGHnb&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                            alt=""
                          />
                        </span>
                        <span
                          class="flex items-start flex-shrink-0 ml-4 space-x-4"
                        >
                          <button
                            type="button"
                            class="font-medium text-purple-600 bg-white rounded-md hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            Update
                          </button>
                          <span class="text-gray-300" aria-hidden="true"
                            >|</span
                          >
                          <button
                            type="button"
                            class="font-medium text-purple-600 bg-white rounded-md hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            Remove
                          </button>
                        </span>
                      </dd>
                    </div>
                    <div
                      class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5"
                    >
                      <dt class="text-sm font-medium text-gray-500">Email</dt>
                      <dd
                        class="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        <span class="flex-grow">chelsea.hagon@example.com</span>
                        <span class="flex-shrink-0 ml-4">
                          <button
                            type="button"
                            class="font-medium text-purple-600 bg-white rounded-md hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            Update
                          </button>
                        </span>
                      </dd>
                    </div>
                    <div
                      class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200"
                    >
                      <dt class="text-sm font-medium text-gray-500">
                        Job title
                      </dt>
                      <dd
                        class="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        <span class="flex-grow">Human Resources Manager</span>
                        <span class="flex-shrink-0 ml-4">
                          <button
                            type="button"
                            class="font-medium text-purple-600 bg-white rounded-md hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            Update
                          </button>
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div class="mt-10 divide-y divide-gray-200">
                <div class="space-y-1">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    Account
                  </h3>
                  <p class="max-w-2xl text-sm text-gray-500">
                    Manage how information is displayed on your account.
                  </p>
                </div>
                <div class="mt-6">
                  <dl class="divide-y divide-gray-200">
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">
                        Language
                      </dt>
                      <dd
                        class="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        <span class="flex-grow">English</span>
                        <span class="flex-shrink-0 ml-4">
                          <button
                            type="button"
                            class="font-medium text-purple-600 bg-white rounded-md hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            Update
                          </button>
                        </span>
                      </dd>
                    </div>
                    <div
                      class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5"
                    >
                      <dt class="text-sm font-medium text-gray-500">
                        Date format
                      </dt>
                      <dd
                        class="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        <span class="flex-grow">DD-MM-YYYY</span>
                        <span
                          class="flex items-start flex-shrink-0 ml-4 space-x-4"
                        >
                          <button
                            type="button"
                            class="font-medium text-purple-600 bg-white rounded-md hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            Update
                          </button>
                          <span class="text-gray-300" aria-hidden="true">
                            |
                          </span>
                          <button
                            type="button"
                            class="font-medium text-purple-600 bg-white rounded-md hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            Remove
                          </button>
                        </span>
                      </dd>
                    </div>
                    <div
                      class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5"
                    >
                      <dt
                        class="text-sm font-medium text-gray-500"
                        id="timezone-option-label"
                      >
                        Automatic timezone
                      </dt>
                      <dd
                        class="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        <button
                          type="button"
                          class="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out bg-purple-600 border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-auto"
                          aria-pressed="true"
                          x-ref="switch"
                          x-state:on="Enabled"
                          x-state:off="Not Enabled"
                          aria-labelledby="timezone-option-label"
                        >
                          <span class="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            class="inline-block w-5 h-5 transition duration-200 ease-in-out transform translate-x-5 bg-white rounded-full shadow ring-0"
                            x-state:on="Enabled"
                            x-state:off="Not Enabled"
                          ></span>
                        </button>
                      </dd>
                    </div>
                    <div
                      class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200"
                    >
                      <dt
                        class="text-sm font-medium text-gray-500"
                        id="auto-update-option-label"
                      >
                        Auto-update applicant data
                      </dt>
                      <dd
                        class="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        <button
                          type="button"
                          class="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out bg-gray-200 border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-auto"
                          aria-pressed="false"
                          x-ref="switch"
                          x-state:on="Enabled"
                          x-state:off="Not Enabled"
                          aria-labelledby="auto-update-option-label"
                        >
                          <span class="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            class="inline-block w-5 h-5 transition duration-200 ease-in-out transform translate-x-0 bg-white rounded-full shadow ring-0"
                          ></span>
                        </button>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </form>

        <UserPersonalInformationForm />
        <UserNotificationSettingsForm />
        <UserPaymentDetailsForm />
        <UserPaymentPlanForm />
        <UserBillingHistory />
        <ContactHistory />
      </div>
    </SectionWrapper>

    <SectionWrapper>
      <PromiseServesVolunteerEditButton />
    </SectionWrapper>

    <PromiseServesAdvocateDashboard />
    <!-- <PromiseServesAffiliateStaffDashboard /> -->
    <!-- <PromiseServesAffiliateDashboard /> -->
  </PageWrapper>
</template>
<style>
.vs__fade-enter-active,
.vs__fade-leave-active {
  transition: none;
}

.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  /* background: theme('colors.white');
  border: none;
  color: #394066;
  text-transform: lowercase;
  font-variant: small-caps; */
  appearance: none;
  background-color: #fff;
  border-color: #6b7280;
  border-width: 1px;
  border-radius: 0px;
  padding-top: 0.5rem;
  padding-right: 0.75rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  font-size: 1rem;
  line-height: 1.5rem;
  @apply block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #394066;
}
</style>
