<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import useUser from '~/composables/useUser'

export default defineComponent({
  setup() {
    const { isLoggedIn, login } = useUser()
    const showMenu = ref(false)
    const showNewProjectView = ref(false)
    const showProfile = ref(false)
    const showVolunteerView = ref(false)
    const isAdmin = ref(false)
    const fullwidth = ref(false)

    return {
      isLoggedIn,
      login,
      isAdmin,
      fullwidth,
      showMenu,
      showNewProjectView,
      showProfile,
      showVolunteerView,
    }
  },
  computed: {
    routes() {
      return [
        {
          name: 'SPF Overview',
          label: this.$t('spf_overview'),
          path: '/spf-overview/',
        },
        {
          name: 'resources',
          label: this.$t('resources'),
          path: '/resources/',
        },
        {
          name: 'media',
          label: this.$t('media'),
          path: '/media/',
        },
        {
          name: 'calendar',
          label: this.$t('calendar'),
          path: '/calendar/',
        },
      ]
    },
  },
  methods: {
    show(path) {
      this.$router.push(this.localePath(`/${path}/`))
    },
    handleRightClick(event) {
      event.preventDefault()
      this.$oruga.modal.open('testing')
    },

    goToDocs() {
      this.$sounds.back.play()
      window.location = 'https://oruga.io/documentation/#nuxt-module'
    },

    goToGithub() {
      window.location = 'https://github.com/oruga-ui/oruga'
    },
  },
})
</script>

<template>
  <nav
    :class="[
      $store.state.affiliate.theme.nav.class,
      {
        'fixed top-0 z-40': false,
      },
      'w-full shadow border-b',
    ]"
  >
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between w-full h-16 mx-auto max-w-7xl">
        <div class="flex">
          <div class="flex items-center mr-2 -ml-2 md:hidden">
            <!-- Mobile menu button -->
            <button
              class="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded="false"
              @click="showMenu = !showMenu"
            >
              <span class="sr-only">{{ $t('open_main_menu') }}</span>
              <BaseIconOutlined :name="showMenu ? 'x' : 'menu'" class="block" />
            </button>
          </div>

          <div class="flex items-center flex-shrink-0">
            <NuxtLink
              class="flex items-center justify-center"
              to="/"
              @contextmenu.native="handleRightClick"
            >
              <BaseLogo class="text-primary-500" :name="$store.state.theme" />
            </NuxtLink>
          </div>

          <div class="items-center flex-1 hidden md:ml-6 md:flex md:space-x-8">
            <BaseMenu :options="[{ id: 1, name: 'Testing' }]">Affiliates</BaseMenu>

            <BaseMenu :paths="['about', 'contact', 'georgia_seow']">{{ $t('about') }}</BaseMenu>

            <EccoMenu>
              <span>{{ $t('new_to_ecco') }}</span>
            </EccoMenu>

            <NuxtLink
              v-for="(route, index) in routes"
              :key="index"
              :to="route.path"
              active-class="font-bold"
            >{{ route.label }}</NuxtLink>
          </div>
        </div>

        <div class="flex items-center space-x-3">
          <div class="space-x-3 md:ml-4 md:flex-shrink-0 md:flex md:items-center">
            <div class="flex items-center space-x-1">
              <OButton
                class="px-4 text-sm uppercase"
                tag="a"
                href="https://www.georgiamds.uga.edu/PublicHome/Index"
                target="_blank"
              >MDS</OButton>

              <OButton
                class="px-4 text-sm uppercase"
                variant="secondary"
                tag="a"
                href="http://ecco.ga-sps.org/login.php"
                target="_blank"
              >ecco</OButton>
            </div>
            <OButton @click="$sounds.back.play">{{ $t('back') }}</OButton>
            <OButton variant="light" @click="goToDocs">{{ $t('documentation') }}</OButton>
            <OButton variant="dark" @click="goToGithub">GitHub</OButton>

            <!-- Help dropdown -->
            <!-- <BaseHelpDropdownButton /> -->

            <!-- Profile dropdown -->
            <!-- <BaseProfileDropdownButton /> -->
            <!-- <NuxtLink  v-if="!isLoggedIn" :to="localePath('/login/')">
              {{ $t('login')}}
            </NuxtLink>-->
            <div class="hidden space-x-3 lg:block">
              <div class="space-x-3" v-if="$auth.loggedIn">
                <ProfileDropdown :person="$auth.user" />
                <!-- <NuxtLink to="/profile/" id="profile" active-class="font-bold">
                  {{ $t('my_profile') }}
                </NuxtLink>-->
                <!-- <button @click="$auth.logout()">
                  {{ $t('logout') }}
                </button>-->
              </div>

              <div class="flex items-center space-x-3" v-else>
                <NuxtLink to="/login/">{{ $t('login') }}</NuxtLink>
                <GithubLoginLink v-if="false" />
              </div>

              <NuxtLink
                v-if="isAdmin"
                :to="localePath({ path: '/admin/' })"
                id="admin"
              >{{ $t('admin') }}</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showMenu" class="md:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <!-- Current: "bg-primary-50 border-primary-500 text-primary-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
        <NuxtLink
          to="/"
          class="block py-2 pl-3 pr-4 text-base font-medium border-l-4 bg-primary-50 border-primary-500 text-primary-700 sm:pl-5 sm:pr-6"
        >{{ $t('dashboard') }}</NuxtLink>
      </div>

      <div class="pt-4 pb-3 border-t border-gray-200">
        <div class="flex items-center px-4 sm:px-6">
          <div class="flex-shrink-0">
            <img
              style="filter: grayscale(1)"
              class="w-10 h-10 rounded-full"
              :src="person.profile_photo_url"
              :alt="person.name"
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">{{ person.name }}</div>
            <div class="text-sm font-medium text-gray-500">{{ person.email }}</div>
          </div>

          <button
            class="flex-shrink-0 p-1 ml-auto text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <span class="sr-only">{{ $t('view_notifications') }}</span>
            <BaseIconOutlined name="bell" />
          </button>
        </div>

        <div class="mt-3 space-y-1" />
      </div>
    </div>

    <OSidebar
      v-model:open="showVolunteerView"
      :fullwidth="fullwidth"
      fullheight
      right
      position="fixed"
      :overlay="false"
      mobile="fullwidth"
    >
      <section class="flex flex-col h-full bg-white divide-y divide-gray-200 shadow-xl">
        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <section
              class="absolute inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16"
              aria-labelledby="slide-over-heading"
            >
              <!--
        Slide-over panel, show/hide based on slide-over state.

        Entering: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-full"
          To: "translate-x-0"
        Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-0"
          To: "translate-x-full"
              -->
              <div class="w-screen max-w-md">
                <div class="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
                  <!-- Header -->
                  <div class="p-6">
                    <div class="flex items-start justify-between">
                      <h2
                        id="slide-over-heading"
                        class="text-lg font-medium text-gray-900"
                      >{{ $t('volunteers') }}</h2>
                      <div class="flex items-center ml-3 h-7">
                        <button @click="showVolunteerView = false">
                          <BaseIconSolid name="x" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Tabs -->
                  <div class="border-b border-gray-200">
                    <div class="px-6">
                      <nav class="flex -mb-px space-x-6">
                        <!-- Current: "border-primary-500 text-primary-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
                        <a
                          href="#"
                          class="px-1 pb-4 text-sm font-medium border-b-2 border-primary-500 text-primary-600 whitespace-nowrap"
                          aria-current="page"
                        >{{ $t('all') }}</a>

                        <a
                          href="#"
                          class="px-1 pb-4 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 whitespace-nowrap"
                        >{{ $t('certified') }}</a>

                        <a
                          href="#"
                          class="px-1 pb-4 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 whitespace-nowrap"
                        >{{ $t('in_training') }}</a>
                      </nav>
                    </div>
                  </div>

                  <!-- List -->
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </OSidebar>

    <div v-if="showNewProjectView" class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <!--
      Background overlay, show/hide based on slide-over state.

      Entering: "ease-in-out duration-500"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in-out duration-500"
        From: "opacity-100"
        To: "opacity-0"
        -->
        <Transition
          enter-class="opacity-0"
          enter-active-class="duration-500 ease-in-out transition-medium"
          enter-to-class="opacity-100"
          leave-class="opacity-100"
          leave-active-class="duration-500 ease-in-out transition-medium"
          leave-to-class="opacity-0"
          appear
        >
          <div
            v-show="showNewProjectView"
            class="absolute inset-0 transition-opacity bg-gray-500 bg-opacity-75"
            aria-hidden="true"
          />
        </Transition>

        <section
          class="absolute inset-y-0 right-0 flex max-w-full pl-10"
          aria-labelledby="slide-over-heading"
        >
          <!--
        Slide-over panel, show/hide based on slide-over state.

        Entering: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-full"
          To: "translate-x-0"
        Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-0"
          To: "translate-x-full"
          -->
          <Transition
            enter-active-class="transition duration-500 ease-in-out transform sm:duration-700"
            enter-class="translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transition duration-500 ease-in-out transform sm:duration-700"
            leave-class="translate-x-0"
            leave-to-class="translate-x-full"
            appear
            mode="in-out"
          >
            <div v-show="showNewProjectView" class="w-screen max-w-md">
              <div class="flex flex-col h-full py-6 overflow-y-scroll bg-white shadow-xl">
                <div class="px-4 sm:px-6">
                  <div class="flex items-start justify-between">
                    <h2
                      id="slide-over-heading"
                      class="text-lg font-medium text-gray-900"
                    >Panel title</h2>
                    <div class="flex items-center ml-3 h-7">
                      <button
                        class="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        @click.stop="showNewProjectView = false"
                      >
                        <span class="sr-only">{{ $t('close_panel') }}</span>
                        <!-- Heroicon name: x -->
                        <svg
                          class="w-6 h-6"
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative flex-1 px-4 mt-6 sm:px-6">
                  <!-- Replace with your content -->
                  <div class="absolute inset-0 px-4 sm:px-6">
                    <div class="h-full border-gray-200 border-dashed" aria-hidden="true" />
                  </div>
                  <!-- /End replace -->
                </div>
              </div>
            </div>
          </Transition>
        </section>
      </div>
    </div>
  </nav>
</template>
