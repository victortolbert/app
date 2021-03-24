<script>
export default {
  layout: 'sidebar',
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
    <PageHeading>{{ $t('profile') }}</PageHeading>

    <SectionWrapper>
      <div class="lg:grid lg:grid-cols-12 lg:gap-x-5">
        <aside class="relative px-2 py-6 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
          <nav class="sticky top-0 space-y-1">
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
           <!-- Forms  -->
        </div>
      </div>
    </SectionWrapper>
  </PageWrapper>
</template>
