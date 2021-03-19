<script>
import {ref, reactive} from '@nuxtjs/composition-api'
import useUser from '~/composables/useUser'

export default {
  props: {
    affiliate: {
      type: Object,
      default: () => ({
        id: 1,
        name: 'gasps',
        links: ['about', 'resources', 'training'],
        theme: {
          nav: {
            class: 'bg-white text-gray-800',
          },
          logo_path: '',
          colors: {
            primary: '',
            secondary: '',
            danger: '',
            warning: '',
            success: '',
            info: '',
          },
        },
      }),
    },
    user: {
      type: Object,
      default: () => ({
        name: 'Tatyana McNish',
        email: 'tatyana@ema.promiseserves.org',
        avatarURL: 'https://cominex.net/assets/img/people/tatyana.jpeg',
      }),
    },
  },
  setup() {
    const {isLoggedIn, login} = useUser()
    const isAdmin = ref(false)
    const fullwidth = ref(false)
    const showAnnouncements = ref(false)
    const showMenu = ref(false)
    const showNewProjectView = ref(false)
    const showProfile = ref(false)
    const showVolunteerView = ref(false)
    const startPath = ref('/dashboard/')

    return {
      isLoggedIn,
      login,
      isAdmin,
      fullwidth,
      showAnnouncements,
      showMenu,
      showNewProjectView,
      showProfile,
      showVolunteerView,
      startPath,
    }
  },
}
</script>

<template>
  <nav
    :class="[
      affiliate.theme.nav.class,
      {
        'fixed top-0 z-40': false,
      },
      'w-full shadow',
    ]"
  >
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex items-center mr-2 -ml-2 md:hidden">
            <MobileMenuButton />
          </div>

          <div class="flex items-center flex-shrink-0">
            <NuxtLink class="flex items-center justify-center" :to="startPath">
              <BaseLogo class="text-primary-500" :name="affiliate.name" />
            </NuxtLink>
          </div>

          <div class="items-center hidden md:ml-6 md:flex md:space-x-8">
            <!-- <BaseMenu :items="['calendar', 'requests']">
              Events & Needs Requests
            </BaseMenu> -->

            <NuxtLink
              v-for="(link, index) in affiliate.links"
              :key="index"
              :to="`/${link}/`"
            >
              {{ $t(link) }}
            </NuxtLink>

            <ResourceSearchField />
          </div>
        </div>

        <div class="flex items-center space-x-3">
          <!-- <div class="flex-shrink-0">
            <OButton
              size="small"
              variant="primary"
              icon-pack="fas"
              icon-left="plus"
              @click="showNewProjectView = !showNewProjectView"
              :rounded="true"
            >
              {{ $t('new_project') }}
            </OButton>
          </div> -->

          <!-- <OptionsMenuButton>
            {{ $t('options') }}
          </OptionsMenuButton> -->

          <div class="md:ml-4 md:flex-shrink-0 md:flex md:items-center">
            <!-- NotificationsButton -->
            <span class="relative inline-flex rounded-md shadow-sm">
              <button
                class="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                @click="showAnnouncements = !showAnnouncements"
              >
                <span class="sr-only">{{ $t('view_notifications') }}</span>
                <BaseIconOutlined name="bell" />
              </button>
              <span
                class="absolute top-0 right-0 flex w-2 h-2 -mt-1 -mr-1"
                style="margin: 8px 7px 0 0"
              >
                <span
                  class="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"
                />
                <span
                  class="relative inline-flex w-2 h-2 bg-red-500 rounded-full"
                />
              </span>
            </span>

            <!-- Help dropdown -->
            <!-- <BaseHelpDropdownButton /> -->

            <!-- Profile dropdown -->
            <!-- <BaseProfileDropdownButton /> -->
            <!-- <NuxtLink  v-if="!isLoggedIn" :to="localePath('/login/')">
              {{ $t('login')}}
            </NuxtLink> -->

            <div class="hidden lg:block">
              <button v-if="!isLoggedIn" @click="login">
                {{ $t('login') }}
              </button>
              <NuxtLink v-if="isLoggedIn" :to="/profile/" id="profile">
                {{ $t('my_profile') }}
              </NuxtLink>
              <NuxtLink v-if="isAdmin" :to="/admin/" id="admin">
                {{ $t('admin') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
