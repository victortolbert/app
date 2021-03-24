<script>
export default {
  data() {
    return {
      data: [],
      keepFirst: false,
      openOnFocus: false,
      name: '',
      selected: null,
      minutesGranularity: 15,
      hoursGranularity: 2,
      file: null,
      dropFiles: [],
      isLoading: false,
      isFetching: false,
      recipe: {
        title: null,
        author: null,
        time: 5,
        image: null,
        servings: 1,
        difficulty: 'easy',
        procedure: '',
      },
      errors: {
        title: null,
        author: null,
        image: null,
        procedure: null,
        time: null,
        servings: null,
      },
      page: 1,
      totalPages: 1,
    }
  },
  watch: {
    file(newFile) {
      this.recipe.image = window.URL.createObjectURL(newFile)
    },
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1)
    },
    handleIconClick() {
      // console.log('handleIconClick')
    },
    handleIconRightClick() {
      // console.log('handleIconRightClick')
    },
  },
}
</script>


<template>
  <PageWrapper>
    <PageHeading>{{ $t('settings') }}</PageHeading>

    <p>
      {{ $t('edit_volunteer') }} / {{ $t('edit_advocate') }} |
      {{ $t('edit_family_members') }}
    </p>

    <SectionWrapper>
      <div class="lg:grid lg:grid-cols-12 lg:gap-x-5">
        <aside class="px-2 py-6 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
          <nav class="space-y-1">
            <!-- Current: "bg-gray-50 text-primary-700 hover:text-primary-700 hover:bg-white", Default: "text-gray-900 hover:text-gray-900 hover:bg-gray-50" -->
            <a
              href="#profile"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconOutlined
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="user-circle"
              />
              <span class="truncate">{{ $t('profile') }}</span>
            </a>

            <a
              href="#personal-info"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
              aria-current="page"
            >
              <!-- Current: "text-primary-500 group-hover:text-primary-500", Default: "text-gray-400 group-hover:text-gray-500" -->
              <BaseIconOutlined
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="identification"
              />
              <span class="truncate"> {{ $t('personal_information') }} </span>
            </a>

            <a
              href="#family"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
              aria-current="page"
            >
              <!-- Current: "text-primary-500 group-hover:text-primary-500", Default: "text-gray-400 group-hover:text-gray-500" -->
              <BaseIconSolid
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="family-restroom"
              />
              <span class="truncate"> {{ $t('family') }} </span>
            </a>

            <a
              href="#volunteer-profile"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
              aria-current="page"
            >
              <!-- Current: "text-primary-500 group-hover:text-primary-500", Default: "text-gray-400 group-hover:text-gray-500" -->
              <BaseIconSolid
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="volunteer-activism"
              />
              <span class="truncate"> {{ $t('volunteer_profile') }} </span>
            </a>

            <a
              v-if="false"
              href="#password"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconOutlined
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="key"
              />
              <span class="truncate"> {{ $t('password') }} </span>
            </a>

            <a
              v-if="false"
              href="#plans-and-billing"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconOutlined
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="credit-card"
              />
              <span class="truncate"> {{ $t('plan_and_billing') }} </span>
            </a>

            <a
              v-if="false"
              href="#team"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconOutlined
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="user-group"
              />
              <span class="truncate"> {{ $t('team') }} </span>
            </a>

            <a
              href="#roles"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconOutlined
                name="user-group"
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                fixed
              />

              <span class="truncate"> {{ $t('roles') }} </span>
            </a>

            <a
              v-if="false"
              href="#integrations"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconOutlined
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="view-grid-add"
              />
              <span class="truncate"> {{ $t('integrations') }} </span>
            </a>

            <a
              href="#assignments"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconOutlined
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="inbox-in"
              />
              <span class="truncate">{{ $t('assignments') }}</span>
            </a>

            <a
              v-if="false"
              href="#members"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconOutlined
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="annotation"
              />
              <span class="truncate">{{ $t('members') }}</span>
            </a>

            <a
              href="#notes"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconOutlined
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="pencil"
              />
              <span class="truncate"> {{ $t('notes') }}</span>
            </a>

            <a
              href="#agreements"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconSolid
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="handshake"
              />
              <span class="truncate"> {{ $t('agreements') }} </span>
            </a>

            <!--
              <a
                href="#staff-roles"
                class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
              >
                <BaseIconOutlined
                  class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                  name="annotation"
                />
                <span class="truncate">Staff Roles</span>
              </a>
            -->

            <!--
              <a
                href="#church-roles"
                class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
              >
                <BaseIconOutlined
                  class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                  name="annotation"
                />
                <span class="truncate">Church Roles</span>
              </a>
            -->

            <!--
              <a
                href="#care-community-volunteer-roles"
                class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
              >
                <BaseIconOutlined
                  class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                  name="annotation"
                />
                <span class="truncate">Care community Volunteer roles</span>
              </a>
            -->

            <a
              href="#care-communities"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconOutlined
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="support"
              />
              <span class="truncate">{{ $t('care_communities') }}</span>
            </a>

            <a
              href="#history"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconSolid
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="history"
              />
              <span
                class="truncate"
              >{{ $t('history') }} / {{ $t('timeline') }}</span>
            </a>

            <a
              href="#contact-log"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-50 group"
            >
              <BaseIconOutlined
                class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-gray-500"
                name="clipboard-list"
              />
              <span class="truncate">{{ $t('contact_log') }}</span>
            </a>
          </nav>
        </aside>

        <div class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
          <form id="profile" action="#" method="POST">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
              <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
                <div>
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    {{ $t('profile') }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ $t('profile_description') }}
                  </p>
                </div>

                <div class="grid grid-cols-3 gap-6">
                  <div class="col-span-3 sm:col-span-2">
                    <label
                      for="username"
                      class="block text-sm font-medium text-gray-700"
                    >
                      {{ $t('username') }}
                    </label>

                    <div class="flex mt-1 rounded-md shadow-sm">
                      <span
                        class="inline-flex items-center px-3 text-gray-500 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md sm:text-sm"
                      >
                        designcoder.net/
                      </span>
                      <input
                        id="username"
                        type="text"
                        name="username"
                        autocomplete="username"
                        class="flex-grow block w-full min-w-0 border-gray-300 rounded-none focus:ring-primary-500 focus:border-primary-500 rounded-r-md sm:text-sm"
                      >
                    </div>
                  </div>

                  <div class="col-span-3">
                    <label
                      for="about"
                      class="block text-sm font-medium text-gray-700"
                    >
                      {{ $t('about') }}
                    </label>
                    <div class="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows="3"
                        class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        placeholder="you@example.com"
                      />
                    </div>
                    <p class="mt-2 text-sm text-gray-500">
                      {{ $t('about_description') }}
                    </p>
                  </div>

                  <div class="col-span-3">
                    <label class="block text-sm font-medium text-gray-700">
                      {{ $t('photo') }}
                    </label>
                    <div class="flex items-center mt-1">
                      <span
                        class="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full"
                      >
                        <svg
                          class="w-full h-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </span>
                      <button
                        type="button"
                        class="px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        {{ $t('change') }}
                      </button>
                    </div>
                  </div>

                  <div class="col-span-3">
                    <label class="block text-sm font-medium text-gray-700">
                      {{ $t('cover_photo') }}
                    </label>
                    <div
                      class="flex justify-center px-6 pt-5 pb-6 mt-2 border-2 border-gray-300 border-dashed rounded-md"
                    >
                      <div class="space-y-1 text-center">
                        <svg
                          class="w-12 h-12 mx-auto text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <div class="flex text-sm text-gray-600">
                          <label
                            for="file-upload"
                            class="relative font-medium bg-white rounded-md cursor-pointer text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                          >
                            <span>{{ $t('upload_a_file') }}</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              class="sr-only"
                            >
                          </label>
                          <p class="pl-1">
                            {{ $t('or_drag_and_drop') }}
                          </p>
                        </div>
                        <p class="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
                <button
                  type="submit"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {{ $t('save') }}
                </button>
              </div>
            </div>
          </form>

          <form id="personal-info" action="#" method="POST">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
              <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
                <div>
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    {{ $t('personal_information') }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ $t('personal_information_description') }}
                  </p>
                </div>

                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="first_name"
                      class="block text-sm font-medium text-gray-700"
                    >
                      {{ $t('first_name') }}
                    </label>
                    <input
                      id="first_name"
                      type="text"
                      name="first_name"
                      autocomplete="given-name"
                      class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="last_name"
                      class="block text-sm font-medium text-gray-700"
                    >
                      {{ $t('last_name') }}
                    </label>
                    <input
                      id="last_name"
                      type="text"
                      name="last_name"
                      autocomplete="family-name"
                      class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                  </div>

                  <div class="col-span-6 sm:col-span-4">
                    <label
                      for="email_address"
                      class="block text-sm font-medium text-gray-700"
                    >
                      {{ $t('email_address') }}
                    </label>
                    <input
                      id="email_address"
                      type="text"
                      name="email_address"
                      autocomplete="email"
                      class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="country"
                      class="block text-sm font-medium text-gray-700"
                    >
                      {{ $t('country') }} / {{ $t('region') }}
                    </label>
                    <select
                      id="country"
                      name="country"
                      autocomplete="country"
                      class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>

                  <div class="col-span-6">
                    <label
                      for="street_address"
                      class="block text-sm font-medium text-gray-700"
                    >
                      {{ $t('street_address') }}
                    </label>
                    <input
                      id="street_address"
                      type="text"
                      name="street_address"
                      autocomplete="street-address"
                      class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                  </div>

                  <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      for="city"
                      class="block text-sm font-medium text-gray-700"
                    >
                      {{ $t('city') }}
                    </label>
                    <input
                      id="city"
                      type="text"
                      name="city"
                      class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                  </div>

                  <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      for="state"
                      class="block text-sm font-medium text-gray-700"
                    >
                      {{ $t('state') }} / {{ $t('province') }}
                    </label>
                    <input
                      id="state"
                      type="text"
                      name="state"
                      class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                  </div>

                  <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      for="postal_code"
                      class="block text-sm font-medium text-gray-700"
                    >
                      {{ $t('zip_code') }}
                    </label>
                    <input
                      id="postal_code"
                      type="text"
                      name="postal_code"
                      autocomplete="postal-code"
                      class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                  </div>
                </div>

                <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
                  <h3 class="text-lg font-medium">
                    {{ $t('contact_info') }}
                  </h3>

                  <OButton>{{ $t('change_profile_picture') }}</OButton>

                  <OField :label="$t('first_name')">
                    <OInput
                      value=""
                      input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </OField>

                  <OField :label="$t('last_name')">
                    <OInput
                      value=""
                      input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </OField>

                  <OField :label="$t('status')">
                    <OSelect :placeholder="$t('select_status')" expanded>
                      <option value="1">
                        Serving
                      </option>
                      <option value="2">
                        Option 2
                      </option>
                    </OSelect>
                  </OField>

                  <OField :label="$t('home_church')">
                    <OInput
                      value=""
                      input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </OField>

                  <OField :label="$t('assigned_church')">
                    <OSelect
                      :placeholder="$t('select_assigned_church')"
                      expanded
                    >
                      <option value="1">
                        12Stone - Snellville - Snellvill, GA - Active
                      </option>
                      <option value="2">
                        Option 2
                      </option>
                    </OSelect>
                  </OField>

                  <OField :label="$t('primary_email')">
                    <OInput
                      input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      type="email"
                      value="john@"
                      maxlength="30"
                    />
                  </OField>

                  <OField :label="$t('secondary_email')">
                    <OInput
                      type="email"
                      value="john@"
                      input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      :placeholder="$t('enter_secondary_email')"
                      maxlength="30"
                    />
                  </OField>

                  <OField :label="$t('mobile_phone')">
                    <OInput
                      value=""
                      input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </OField>

                  <OField :label="$t('home_phone')">
                    <OInput
                      value=""
                      :placeholder="$t('enter_home_phone')"
                      input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </OField>

                  <OField :label="$t('work_phone')">
                    <OInput
                      value=""
                      input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </OField>

                  <OField :label="$t('occupation')">
                    <OInput
                      value=""
                      :placeholder="$t('occupation')"
                      input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </OField>

                  <OField :label="$t('address')">
                    <OInput
                      value=""
                      input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </OField>

                  <OField :label="$t('apartment_or_unit_number')">
                    <OInput
                      value=""
                      placeholder="Suite, apartment number, or unit"
                      input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </OField>

                  <OField :label="$t('city')">
                    <OInput
                      value=""
                      input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </OField>

                  <OField :label="$t('state')">
                    <OInput
                      value=""
                      input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </OField>

                  <OField :label="$t('zip_code')">
                    <OInput
                      value=""
                      input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </OField>

                  <OField :label="$t('country')">
                    <OInput
                      value=""
                      input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </OField>
                </div>
              </div>
              <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
                <button
                  type="submit"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {{ $t('save') }}
                </button>
              </div>
            </div>
          </form>

          <form id="family" action="#" method="POST">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
              <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
                <div>
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    {{ $t('family_photo') }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ $t('family_photo_description') }}
                  </p>
                </div>
              </div>

              <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
                <!-- Family Info -->
                <h4 class="text-lg font-medium">
                  {{ $t('family_info') }}
                </h4>

                <OField :label="$t('family_name')">
                  <OInput
                    value=""
                    input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </OField>

                <OField :label="$t('family_status')">
                  <OSelect :placeholder="$t('select_family_status')" expanded>
                    <option value="1">
                      Closed
                    </option>
                    <option value="2">
                      Option 2
                    </option>
                  </OSelect>
                </OField>

                <OField :label="$t('home_type')">
                  <OSelect :placeholder="$t('select_home_type')" expanded>
                    <option value="1">
                      Traditional Home - Foster
                    </option>
                    <option value="2">
                      Option 2
                    </option>
                  </OSelect>
                </OField>

                <OField :label="$t('family_structure')">
                  <OSelect
                    :placeholder="$t('select_family_structure')"
                    expanded
                  >
                    <option value="1">
                      Single Mother
                    </option>
                    <option value="2">
                      Option 2
                    </option>
                  </OSelect>
                </OField>

                <OField :label="$t('agency')">
                  <OSelect :placeholder="$t('select_agency')" expanded>
                    <option value="1">
                      Gwinett County DFCS (Lawrenceville, GA)
                    </option>
                    <option value="2">
                      Option 2
                    </option>
                  </OSelect>
                </OField>

                <OField :label="$t('family_language')">
                  <OSelect :placeholder="$t('select_language')" expanded>
                    <option value="1">
                      English Only
                    </option>
                    <option value="2">
                      Option 2
                    </option>
                  </OSelect>
                </OField>

                <!-- Family Address -->
                <h4 class="text-lg font-medium">
                  {{ $t('family_address') }}
                </h4>

                <OField :label="$t('address')">
                  <OInput
                    value=""
                    input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </OField>

                <OField :label="$t('apartment_or_unit_number')">
                  <OInput
                    value=""
                    input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </OField>

                <OField :label="$t('city')">
                  <OInput
                    value=""
                    input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </OField>
              </div>

              <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
                <button
                  type="submit"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {{ $t('save') }}
                </button>
              </div>
            </div>
          </form>

          <form id="notifications" action="#" method="POST">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
              <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
                <div>
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    {{ $t('notifications') }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ $t('notifications_description') }}
                  </p>
                </div>

                <fieldset>
                  <legend class="text-base font-medium text-gray-900">
                    {{ $t('by_email') }}
                  </legend>
                  <div class="mt-4 space-y-4">
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          class="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                        >
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="comments" class="font-medium text-gray-700">
                          {{ $t('comments') }}
                        </label>
                        <p class="text-gray-500">
                          {{ $t('comments_description') }}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div class="flex items-start">
                        <div class="flex items-center h-5">
                          <input
                            id="candidates"
                            name="candidates"
                            type="checkbox"
                            class="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                          >
                        </div>
                        <div class="ml-3 text-sm">
                          <label
                            for="candidates"
                            class="font-medium text-gray-700"
                          >
                            {{ $t('candidates') }}
                          </label>
                          <p class="text-gray-500">
                            {{ $t('candidates_description') }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="flex items-start">
                        <div class="flex items-center h-5">
                          <input
                            id="offers"
                            name="offers"
                            type="checkbox"
                            class="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                          >
                        </div>
                        <div class="ml-3 text-sm">
                          <label for="offers" class="font-medium text-gray-700">
                            {{ $t('offers') }}
                          </label>
                          <p class="text-gray-500">
                            {{ $t('offers_description') }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset class="mt-6">
                  <legend class="text-base font-medium text-gray-900">
                    {{ $t('push_notifications') }}
                  </legend>
                  <p class="text-sm text-gray-500">
                    {{ $t('push_notifications_description') }}
                  </p>
                  <div class="mt-4 space-y-4">
                    <div class="flex items-center">
                      <input
                        id="push_everything"
                        name="push_notifications"
                        type="radio"
                        class="w-4 h-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                      >
                      <label for="push_everything" class="ml-3">
                        <span class="block text-sm font-medium text-gray-700">
                          {{ $t('everything') }}
                        </span>
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input
                        id="push_email"
                        name="push_notifications"
                        type="radio"
                        class="w-4 h-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                      >
                      <label for="push_email" class="ml-3">
                        <span class="block text-sm font-medium text-gray-700">
                          {{ $t('same_as_email') }}
                        </span>
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input
                        id="push_nothing"
                        name="push_notifications"
                        type="radio"
                        class="w-4 h-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                      >
                      <label for="push_nothing" class="ml-3">
                        <span class="block text-sm font-medium text-gray-700">
                          {{ $t('no_push_notifications') }}
                        </span>
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
                <button
                  type="submit"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
                >
                  {{ $t('save') }}
                </button>
              </div>
            </div>
          </form>

          <form id="roles" action="#" method="POST">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
              <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
                <div>
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    {{ $t('roles') }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ $t('roles_description') }}
                  </p>
                </div>
              </div>

              <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
                <!-- Roles & Assignments -->
                <h3 class="text-lg font-medium">
                  {{ $t('roles_and_assignments') }}
                </h3>
                <!--
                  - Group
                  - Role
                  - Status
                -->
                <h4>{{ $t('staff_roles') }}</h4>

                <!--
                  - Actions
                  - Affiliate
                  - Role
                  - Status
                -->

                <h4>{{ $t('church_roles') }}</h4>

                <!--
                  - Actions
                  - Church
                  - Role
                  - Status
                -->

                <h4>{{ $t('care_community_volunteer_roles') }}</h4>

                <!--
                  - Actions
                  - Care Community
                  - Iteration
                  - Role
                  - Status
                -->

                <h4>{{ $t('family_roles') }}</h4>

                <!--
                  - Family
                  - Role
                  - Status
                -->

                <h4>{{ $t('events') }}</h4>

                <!--
                  - Event
                  - Event Date
                  - Status
                -->

                <h4>{{ $t('groups') }}</h4>
              </div>
              <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
                <button
                  type="submit"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {{ $t('save') }}
                </button>
              </div>
            </div>
          </form>

          <form id="volunteer-profile" action="#" method="POST">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
              <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
                <div>
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    {{ $t('volunteer_profile') }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ $t('volunteer_profile_description') }}
                  </p>
                </div>
              </div>

              <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
                <!-- Volunteer Eligibility -->
                <h4 class="text-lg font-medium">
                  {{ $t('volunteer_eligibility') }}
                </h4>

                - {{ $t('signed_agreement_on') }}:

                <button>{{ $t('view_print_agreement') }}</button>

                <OField>
                  <OSwitch>{{ $t('has_church_volunteer_approval') }}</OSwitch>
                </OField>

                <button>{{ $t('cancel') }}</button>
                <button>{{ $t('save') }}</button>

                <!-- Volunteer Compliance -->
                <h4 class="text-lg font-medium">
                  {{ $t('volunteer_compliance') }}
                </h4>

                <OField :label="$t('affiliate_training_completed')">
                  <ODatepicker
                    icon="calendar"
                    input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </OField>

                <OField :label="$t('agency_training_completed')">
                  <ODatepicker
                    icon="calendar"
                    input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </OField>

                <OField :label="$t('church_training_completed')">
                  <ODatepicker
                    icon="calendar"
                    input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </OField>

                <OField :label="$t('agency_background_check_completed')">
                  <ODatepicker
                    icon="calendar"
                    input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </OField>

                <OField :label="$t('church_background_check_completed')">
                  <ODatepicker
                    icon="calendar"
                    input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </OField>

                <OField :label="$t('fingerprints_completed')">
                  <ODatepicker
                    icon="calendar"
                    input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </OField>

                <OField :label="$t('cpr_expiration')">
                  <ODatepicker
                    icon="calendar"
                    input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </OField>

                <OField>
                  <OSwitch>{{ $t('approved_to_babysit') }}</OSwitch>
                </OField>

                <OField :label="$t('which_agency')">
                  <OSelect :placeholder="$t('select_an_agency')" expanded>
                    <option value="1">
                      Option 1
                    </option>
                    <option value="2">
                      Option 2
                    </option>
                  </OSelect>
                </OField>

                <OField :label="$t('church')">
                  <OSelect :placeholder="$t('select_church')" expanded>
                    <option value="1">
                      Staff Only
                    </option>
                    <option value="2">
                      Option 2
                    </option>
                  </OSelect>
                </OField>

                <OField :label="$t('role')">
                  <OSelect :placeholder="$t('select_role')" expanded>
                    <option value="1">
                      Staff Only
                    </option>
                    <option value="2">
                      Option 2
                    </option>
                  </OSelect>
                </OField>
              </div>
              <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
                <button
                  type="submit"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {{ $t('save') }}
                </button>
              </div>
            </div>
          </form>

          <form id="assignments" action="#" method="POST">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
              <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
                <div>
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    {{ $t('assignments') }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ $t('assignments_description') }}
                  </p>
                </div>
              </div>
              <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
                <button
                  type="submit"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {{ $t('save') }}
                </button>
              </div>
            </div>
          </form>

          <form id="interests" action="#" method="POST">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
              <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
                <div>
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    {{ $t('interests') }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ $t('interests_description') }}
                  </p>
                </div>
              </div>

              <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
                <OField>
                  <OSwitch>{{ $t('has_church_volunteer_approval') }}</OSwitch>
                </OField>

                <OField>
                  <OSwitch>{{ $t('helping_in_a_care_community') }}</OSwitch>
                </OField>

                <OField>
                  <OSwitch>{{ $t('care_community_team_leader') }}</OSwitch>
                </OField>

                <OField>
                  <OSwitch>{{ $t('care_community_family_helper') }}</OSwitch>
                </OField>

                <OField>
                  <OSwitch>{{ $t('care_community_child_mentor') }}</OSwitch>
                </OField>

                <OField>
                  <OSwitch>{{ $t('interim_care_giver') }}</OSwitch>
                </OField>

                <OField>
                  <OSwitch>{{ $t('becoming_a_foster_family') }} </OSwitch>
                </OField>

                <OField>
                  <OSwitch>
                    {{
                      $t('becoming_a_respite_foster_family')
                    }}
                  </OSwitch>
                </OField>

                <OField>
                  <OSwitch>{{ $t('joining_the_advocate_team') }}</OSwitch>
                </OField>

                <OField>
                  <OSwitch>CarePortal</OSwitch>
                </OField>

                <OField>
                  <OSwitch>Loaves and Fishes (12Stone Church Central)</OSwitch>
                </OField>
              </div>
              <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
                <button
                  type="submit"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {{ $t('save') }}
                </button>
              </div>
            </div>
          </form>

          <form id="notes" action="#" method="POST">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
              <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
                <div>
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    {{ $t('notes') }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ $t('notes_description') }}
                  </p>
                </div>
              </div>

              <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
                <em>{{ $t('only_advocates_and_staff_can_view') }}</em>

                <OButton>{{ $t('add') }}</OButton>

                <!--
                  - From
                  - Note
                  - Status
                -->
                <p>{{ $t('no_matching_results') }}</p>

                <OField :label="$t('who_can_view_this_note')">
                  <OSelect :placeholder="$t('select_an_agency')" expanded>
                    <option value="1">
                      Staff Only
                    </option>
                    <option value="2">
                      Option 2
                    </option>
                  </OSelect>
                </OField>

                <!--
                  - Author
                  - Note
                  - Date
                -->
              </div>
              <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
                <button
                  type="submit"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {{ $t('save') }}
                </button>
              </div>
            </div>
          </form>

          <form id="agreements" action="#" method="POST">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
              <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
                <div>
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    {{ $t('agreements') }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ $t('agreements_description') }}
                  </p>
                </div>
              </div>

              <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
                <!-- Agreements -->
                <h3 class="text-lg font-medium">
                  {{ $t('agreements') }}
                </h3>

                <h4>{{ $t('family_agreements') }}</h4>

                {{ $t('no_agreements_found') }}
              </div>
              <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
                <button
                  type="submit"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {{ $t('save') }}
                </button>
              </div>
            </div>
          </form>

          <form id="care-communities" action="#" method="POST">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
              <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
                <div>
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    {{ $t('care_communities') }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ $t('care_communities_description') }}
                  </p>
                </div>
              </div>
              <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
                <button
                  type="submit"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {{ $t('save') }}
                </button>
              </div>
            </div>
          </form>

          <form id="history" action="#" method="POST">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
              <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
                <div>
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    {{ $t('history') }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ $t('history_description') }}
                  </p>
                </div>
              </div>
              <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
                <button
                  type="submit"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {{ $t('save') }}
                </button>
              </div>
            </div>
          </form>

          <form id="contact-log" action="#" method="POST">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
              <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
                <div>
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    {{ $t('contact_log') }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ $t('contact_log_description') }}
                  </p>
                </div>
              </div>

              <div class="px-4 py-6 space-y-6 bg-white sm:p-6">
                <h3 class="text-lg font-medium">
                  {{ $t('contact_log') }}
                </h3>

                <!--
                  - Type
                  - Staff Member
                  - Contact(s)
                  - Note
                  - Date
                -->

                <OButton>{{ $t('add_log_entry') }}</OButton>
              </div>

              <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
                <button
                  type="submit"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {{ $t('save') }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </SectionWrapper>
  </PageWrapper>
</template>
