<script>
import {ref, reactive} from '@nuxtjs/composition-api'
import useUser from '~/composables/useUser'

export default {
  setup() {
    const {isLoggedIn, login} = useUser()
    const isAdmin = ref(false)
    const affiliate = reactive({
      id: 1,
      name: 'Laravel',
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
    })
    const fullwidth = ref(false)
    const people = ref([
      {
        id: 1,
        name: 'Jeremy Doublestein',
        username: 'jdoublestein',
        isOnline: true,
      },
      {
        id: 2,
        name: 'Victor Tolbert',
        username: 'username',
        isOnline: false,
      },
    ])
    const showAnnouncements = ref(false)
    const showMenu = ref(false)
    const showNewProjectView = ref(false)
    const showProfile = ref(false)
    const showVolunteerView = ref(false)
    const slug = affiliate.name.toLowerCase()

    return {
      isLoggedIn,
      login,
      isAdmin,
      affiliate,
      fullwidth,
      people,
      showAnnouncements,
      showMenu,
      showNewProjectView,
      showProfile,
      showVolunteerView,
      slug,
    }
  },
  props: {
    user: {
      type: Object,
      default: () => ({
        name: 'Tatyana McNish',
        email: 'tatyana@ema.promiseserves.org',
        avatarUrl: '/assets/img/people/tatyana.jpeg',
      }),
    },
  },
  computed: {
    routes() {
      return [
        {
          name: 'resources',
          label: this.$t('resources'),
          path: '/resources/',
        },
        {
          name: 'training',
          label: this.$t('training'),
          path: '/training/',
        },
        {
          name: 'events',
          label: this.$t('events'),
          path: '/events/',
        },
      ]
    },
  },
}
</script>

<template>
  <nav :class="[affiliate.theme.nav.class, 'fixed top-0 z-40 w-full shadow']">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex mr-2 -ml-2 items-center md:hidden">
            <!-- Mobile menu button -->
            <button
              class="rounded-md p-2 text-gray-400 inline-flex items-center justify-center hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded="false"
              @click="showMenu = !showMenu"
            >
              <span class="sr-only">{{ $t('open_main_menu') }}</span>
              <BaseIconOutlined :name="showMenu ? 'x' : 'menu'" class="block" />
            </button>
          </div>

          <div class="flex flex-shrink-0 items-center">
            <NuxtLink
              class="flex items-center justify-center"
              :to="localePath({path: '/dashboard/'})"
            >
              <BaseLogo class="text-primary-500" :name="slug" />
            </NuxtLink>
          </div>

          <div class="items-center hidden md:ml-6 md:flex md:space-x-8">
            <!-- <BaseDropdownMenu
              :options="[
                {id: 1, name: 'affiliates', label: 'List Affiliates'},
                {id: 1, name: 'regions', label: 'Regions'},
                {id: 1, name: 'affiliates', label: 'Staff'},
                {id: 1, name: 'agencies', label: 'Agencies'},
                {id: 1, name: 'churches', label: 'Churches'},
              ]"
            >
              <span class="whitespace-nowrap">{{ $t('all_affiliates') }}</span>
            </BaseDropdownMenu> -->

            <!-- <BaseDropdownMenu
              :options="[
                {id: 7, name: 'advocates', label: 'Advocates'},
                {id: 7, name: 'volunteers', label: 'Volunteers'},
              ]"
            >
              {{ $t('people') }}
            </BaseDropdownMenu> -->

            <!-- <BaseDropdownMenu
              :options="[
                {id: 7, name: 'calendar', label: 'Calendar'},
                {id: 7, name: 'volunteers', label: 'FAM Events'},
              ]"
            >
              {{ $t('events') }}
            </BaseDropdownMenu> -->

            <NuxtLink
              v-for="(route, index) in routes"
              :key="index"
              :to="localePath({path: route.path})"
            >
              {{ route.label }}
            </NuxtLink>

            <NuxtLink :to="localePath({path: '/dashboard/'})" id="dashboard">
              {{ $t('home.dashboard') }}
            </NuxtLink>

            <NuxtLink
              class="flex-1"
              :to="localePath({path: '/about/'})"
              id="about"
            >
              {{ $t('home.about') }}
            </NuxtLink>

            <NuxtLink
              v-if="isLoggedIn"
              :to="localePath({path: '/profile/'})"
              id="profile"
            >
              {{ $t('home.my_profile') }}
            </NuxtLink>

            <NuxtLink
              v-if="isAdmin"
              :to="localePath({path: '/admin/'})"
              id="admin"
            >
              {{ $t('home.admin') }}
            </NuxtLink>

            <!-- <NuxtLink to="/" class="navbar-item">Home</NuxtLink>
      <NuxtLink to="/learn/" class="navbar-item">Demos</NuxtLink>
      <NuxtLink to="/blog/" class="navbar-item">Docs</NuxtLink>
      <NuxtLink to="/uses/" class="navbar-item">Support</NuxtLink>
      <NuxtLink to="/about/" class="navbar-item">Pricing</NuxtLink> -->

            <button v-if="!isLoggedIn" @click="login">
              {{ $t('home.login') }}
            </button>
          </div>
        </div>

        <div class="flex space-x-3 items-center">
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
            <span class="rounded-md shadow-sm relative inline-flex">
              <button
                class="bg-white rounded-full p-1 text-gray-400 hidden md:block hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                @click="showAnnouncements = !showAnnouncements"
              >
                <span class="sr-only">{{ $t('view_notifications') }}</span>
                <BaseIconOutlined name="bell" />
              </button>
              <span
                class="flex h-2 -mt-1 -mr-1 top-0 right-0 w-2 absolute"
                style="margin: 8px 7px 0 0"
              >
                <span
                  class="rounded-full h-full bg-red-400 w-full opacity-75 animate-ping absolute inline-flex"
                />
                <span
                  class="rounded-full bg-red-500 h-2 w-2 relative inline-flex"
                />
              </span>
            </span>

            <!-- Help dropdown -->
            <!-- <BaseHelpDropdownButton /> -->

            <!-- Profile dropdown -->
            <!-- <BaseProfileDropdownButton /> -->
          </div>
        </div>
      </div>
    </div>

    <div v-if="showMenu" class="md:hidden">
      <div class="space-y-1 pt-2 pb-3">
        <!-- Current: "bg-primary-50 border-primary-500 text-primary-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
        <NuxtLink
          :to="{name: 'dashboard'}"
          class="font-medium bg-primary-50 border-l-4 border-primary-500 text-base py-2 pr-4 pl-3 text-primary-700 block sm:pl-5 sm:pr-6"
        >
          {{ $t('dashboard') }}
        </NuxtLink>
      </div>

      <div class="border-t border-gray-200 pt-4 pb-3">
        <div class="flex px-4 items-center sm:px-6">
          <div class="flex-shrink-0">
            <img
              style="filter: grayscale(1)"
              class="rounded-full h-10 w-10"
              :src="user.avatarUrl"
              :alt="user.name"
            />
          </div>
          <div class="ml-3">
            <div class="font-medium text-base text-gray-800">
              {{ user.name }}
            </div>
            <div class="font-medium text-sm text-gray-500">
              {{ user.email }}
            </div>
          </div>

          <button
            class="bg-white rounded-full ml-auto flex-shrink-0 p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <span class="sr-only">{{ $t('view_notifications') }}</span>
            <!-- Heroicon name: bell -->
            <svg
              class="h-6 w-6"
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
        </div>

        <div class="space-y-1 mt-3" />
      </div>
    </div>

    <OSidebar
      :fullwidth="fullwidth"
      fullheight
      right
      position="fixed"
      :overlay="false"
      background-class=""
      content-class=""
      mobile="fullwidth"
      :open="showAnnouncements"
    >
      <section
        class="divide-y bg-white flex flex-col h-full divide-gray-200 shadow-xl mt-16"
      >
        <div class="flex flex-col flex-1 min-h-0 overflow-y-scroll">
          <header class="mt-4 px-4 sm:px-6">
            <div class="flex items-start justify-between">
              <h2
                id="slide-over-heading"
                class="font-medium text-lg text-gray-900"
              >
                {{ $t('announcements') }}
              </h2>
              <div class="flex h-7 ml-3 items-center">
                <button
                  class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  @click="showAnnouncements = false"
                >
                  <span class="sr-only">{{ $t('close_panel') }}</span>
                  <BaseIconOutlined name="x" />
                </button>
              </div>
            </div>
          </header>

          <article class="flex-1 mt-4 px-4 relative sm:px-6">
            <!--
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/line-clamp'),
    ]
  }
  ```
-->
            <div>
              <div class="mt-6 flow-root">
                <ul class="divide-y divide-gray-200 -my-5">
                  <li class="py-5">
                    <div
                      class="relative focus-within:ring-2 focus-within:ring-primary-500"
                    >
                      <h3 class="font-semibold text-sm text-gray-800">
                        <a href="#" class="hover:underline focus:outline-none">
                          <!-- Extend touch target to entire panel -->
                          <span class="inset-0 absolute" aria-hidden="true" />
                          Office closed on July 2nd
                        </a>
                      </h3>
                      <p class="mt-1 text-sm text-gray-600 line-clamp-2">
                        Cum qui rem deleniti. Suscipit in dolor veritatis sequi
                        aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut
                        repudiandae possimus. Nihil ex tempora neque cum
                        consectetur dolores.
                      </p>
                    </div>
                  </li>

                  <li class="py-5">
                    <div
                      class="relative focus-within:ring-2 focus-within:ring-primary-500"
                    >
                      <h3 class="font-semibold text-sm text-gray-800">
                        <a href="#" class="hover:underline focus:outline-none">
                          <!-- Extend touch target to entire panel -->
                          <span class="inset-0 absolute" aria-hidden="true" />
                          New password policy
                        </a>
                      </h3>
                      <p class="mt-1 text-sm text-gray-600 line-clamp-2">
                        Alias inventore ut autem optio voluptas et repellendus.
                        Facere totam quaerat quam quo laudantium cumque eaque
                        excepturi vel. Accusamus maxime ipsam reprehenderit
                        rerum id repellendus rerum. Culpa cum vel natus. Est sit
                        autem mollitia.
                      </p>
                    </div>
                  </li>

                  <li class="py-5">
                    <div
                      class="relative focus-within:ring-2 focus-within:ring-primary-500"
                    >
                      <h3 class="font-semibold text-sm text-gray-800">
                        <a href="#" class="hover:underline focus:outline-none">
                          <!-- Extend touch target to entire panel -->
                          <span class="inset-0 absolute" aria-hidden="true" />
                          Office closed on July 2nd
                        </a>
                      </h3>
                      <p class="mt-1 text-sm text-gray-600 line-clamp-2">
                        Tenetur libero voluptatem rerum occaecati qui est
                        molestiae exercitationem. Voluptate quisquam iure
                        assumenda consequatur ex et recusandae. Alias
                        consectetur voluptatibus. Accusamus a ab dicta et.
                        Consequatur quis dignissimos voluptatem nisi.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="mt-6">
                <a
                  href="#"
                  class="bg-white border rounded-md flex font-medium border-gray-300 shadow-sm text-sm w-full py-2 px-4 text-gray-700 items-center justify-center hover:bg-gray-50"
                >
                  View all
                </a>
              </div>
            </div>
          </article>
        </div>

        <footer v-if="false" class="flex flex-shrink-0 py-4 px-4 justify-end">
          <button
            class="bg-white border rounded-md font-medium border-gray-300 shadow-sm text-sm py-2 px-4 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            @click="showAnnouncements = false"
          >
            {{ $t('cancel') }}
          </button>
          <button
            type="submit"
            class="border border-transparent rounded-md font-medium bg-primary-600 shadow-sm text-sm text-white ml-4 py-2 px-4 inline-flex justify-center hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {{ $t('save') }}
          </button>
        </footer>
      </section>
    </OSidebar>

    <OSidebar
      v-model:open="showVolunteerView"
      :fullwidth="fullwidth"
      fullheight
      right
      position="fixed"
      :overlay="false"
      mobile="fullwidth"
    >
      <section
        class="divide-y bg-white flex flex-col h-full divide-gray-200 shadow-xl"
      >
        <div class="inset-0 fixed overflow-hidden">
          <div class="inset-0 absolute overflow-hidden">
            <section
              class="flex max-w-full pl-10 inset-y-0 right-0 absolute sm:pl-16"
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
              <div class="max-w-md w-screen">
                <div
                  class="bg-white flex flex-col h-full shadow-xl overflow-y-scroll"
                >
                  <!-- Header -->
                  <div class="p-6">
                    <div class="flex items-start justify-between">
                      <h2
                        id="slide-over-heading"
                        class="font-medium text-lg text-gray-900"
                      >
                        {{ $t('volunteers') }}
                      </h2>
                      <div class="flex h-7 ml-3 items-center">
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
                          class="font-medium border-b-2 border-primary-500 text-sm px-1 pb-4 text-primary-600 whitespace-nowrap"
                          aria-current="page"
                        >
                          {{ $t('all') }}
                        </a>

                        <a
                          href="#"
                          class="border-transparent font-medium border-b-2 text-sm px-1 pb-4 text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap"
                        >
                          {{ $t('certified') }}
                        </a>

                        <a
                          href="#"
                          class="border-transparent font-medium border-b-2 text-sm px-1 pb-4 text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap"
                        >
                          {{ $t('in_training') }}
                        </a>
                      </nav>
                    </div>
                  </div>

                  <!-- List -->
                  <ul class="divide-y divide-gray-200 overflow-y-auto">
                    <li
                      v-for="person in people"
                      :key="person.id"
                      class="py-5 px-6 relative"
                    >
                      <div class="flex items-center justify-between group">
                        <a href="#" class="-m-1 p-1 block">
                          <div
                            class="inset-0 absolute group-hover:bg-gray-50"
                            aria-hidden="true"
                          />
                          <div
                            class="flex flex-1 min-w-0 relative items-center"
                          >
                            <span class="flex-shrink-0 relative inline-block">
                              <img
                                style="filter: grayscale(1)"
                                class="rounded-full h-10 w-10"
                                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                              <span
                                :class="[
                                  person.isOnline
                                    ? 'bg-gray-300'
                                    : 'bg-green-400',
                                  'absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white',
                                ]"
                                aria-hidden="true"
                              />
                            </span>
                            <div class="ml-4 truncate">
                              <p
                                class="font-medium text-sm text-gray-900 truncate"
                              >
                                {{ person.name }}
                              </p>
                              <p class="text-sm text-gray-500 truncate">
                                @{{ person.username }}
                              </p>
                            </div>
                          </div>
                        </a>
                        <div class="text-left ml-2 relative inline-block">
                          <button
                            id="options-menu-0"
                            class="bg-white rounded-full h-8 w-8 relative inline-flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <span class="sr-only">
                              {{ $t('open_options_menu') }}
                            </span>
                            <span
                              class="rounded-full flex h-full w-full items-center justify-center"
                            >
                              <!-- Heroicon name: dots-vertical -->
                              <svg
                                class="h-5 text-gray-400 w-5 group-hover:text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                                />
                              </svg>
                            </span>
                          </button>

                          <!--
                    Dropdown panel, show/hide based on dropdown state.

                    Entering: "transition ease-out duration-100"
                      From: "transform opacity-0 scale-95"
                      To: "transform opacity-100 scale-100"
                    Leaving: "transition ease-in duration-75"
                      From: "transform opacity-100 scale-100"
                      To: "transform opacity-0 scale-95"
                  -->
                          <div
                            v-if="false"
                            class="bg-white rounded-md shadow-lg ring-black origin-top-right top-0 right-9 ring-1 ring-opacity-5 w-48 z-10 absolute"
                            aria-label="options-menu"
                          >
                            <div
                              class="py-1"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="options-menu-0"
                            >
                              <a
                                href="#"
                                class="text-sm py-2 px-4 text-gray-700 block hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                              >
                                {{ $t('view_profile') }}
                              </a>
                              <a
                                href="#"
                                class="text-sm py-2 px-4 text-gray-700 block hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                              >
                                {{ $t('send_message') }}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </OSidebar>

    <div v-if="showNewProjectView" class="inset-0 fixed overflow-hidden">
      <div class="inset-0 absolute overflow-hidden">
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
          enter-active-class="transition-medium ease-in-out duration-500"
          enter-to-class="opacity-100"
          leave-class="opacity-100"
          leave-active-class="transition-medium ease-in-out duration-500"
          leave-to-class="opacity-0"
          appear
        >
          <div
            v-show="showNewProjectView"
            class="bg-gray-500 bg-opacity-75 inset-0 transition-opacity absolute"
            aria-hidden="true"
          />
        </Transition>

        <section
          class="flex max-w-full pl-10 inset-y-0 right-0 absolute"
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
            enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
            enter-class="translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
            leave-class="translate-x-0"
            leave-to-class="translate-x-full"
            appear
            mode="in-out"
          >
            <div v-show="showNewProjectView" class="max-w-md w-screen">
              <div
                class="bg-white flex flex-col h-full shadow-xl py-6 overflow-y-scroll"
              >
                <div class="px-4 sm:px-6">
                  <div class="flex items-start justify-between">
                    <h2
                      id="slide-over-heading"
                      class="font-medium text-lg text-gray-900"
                    >
                      Panel title
                    </h2>
                    <div class="flex h-7 ml-3 items-center">
                      <button
                        class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        @click.stop="showNewProjectView = false"
                      >
                        <span class="sr-only">Close panel</span>
                        <!-- Heroicon name: x -->
                        <svg
                          class="h-6 w-6"
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
                <div class="flex-1 mt-6 px-4 relative sm:px-6">
                  <!-- Replace with your content -->
                  <div class="px-4 inset-0 absolute sm:px-6">
                    <div
                      class="border-dashed h-full border-2 border-gray-200"
                      aria-hidden="true"
                    />
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
