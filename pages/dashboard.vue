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

    <!--
     https://twitter.com/intent/tweet
      ?text=Check%20out%20Heroicons%20by%20%40steveschoger%20and%20the%20%40tailwindcss%20team%20%F0%9F%98%8D
      &amp;url=https%3A%2F%2Fheroicons.com
    -->

    <pre class="text-sm">
      {{ $auth.user }}
    </pre>

    <!-- this.$auth.setUser(user) -->
    <!-- this.$auth.setUserToken(token, refreshToken).then(() => this.$toast.success('User set!')) -->
    <!-- await this.$auth.logout(/* .... */) -->
    <!-- await this.$auth.fetchUser() -->
    <!-- this.$auth.hasScope('admin') -->
    <!-- this.$auth.refreshTokens() -->

    <SectionWrapper>
      <BaseStepNavigation class="max-w-2xl p-8 bg-white rounded shadow" />
    </SectionWrapper>

    <SectionWrapper class="prose">
      <ComponentPropsTable />
    </SectionWrapper>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          {{ $t('payment_method') }}
        </h3>
        <div class="mt-5">
          <div
            class="px-6 py-5 rounded-md bg-gray-50 sm:flex sm:items-start sm:justify-between"
          >
            <h4 class="sr-only">Visa</h4>
            <div class="sm:flex sm:items-start">
              <svg
                class="w-auto h-8 sm:flex-shrink-0 sm:h-6"
                viewBox="0 0 36 24"
                aria-hidden="true"
              >
                <rect width="36" height="24" fill="#224DBA" rx="4" />
                <path
                  fill="#fff"
                  d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                />
              </svg>
              <div class="mt-3 sm:mt-0 sm:ml-4">
                <div class="text-sm font-medium text-gray-900">
                  Ending with 4242
                </div>
                <div class="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                  <div>Expires 12/20</div>
                  <span class="hidden sm:mx-2 sm:inline" aria-hidden="true">
                    &middot;
                  </span>
                  <div class="mt-1 sm:mt-0">Last updated on 22 Aug 2017</div>
                </div>
              </div>
            </div>
            <div class="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {{ $t('edit') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-gray-50 sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Need more bandwidth?
        </h3>
        <div class="max-w-xl mt-2 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus praesentium tenetur pariatur.
          </p>
        </div>
        <div class="mt-5">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Contact sales
          </button>
        </div>
      </div>
    </div>

    <!--
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
-->
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          {{ $t('update_your_email') }}
        </h3>
        <div class="max-w-xl mt-2 text-sm text-gray-500">
          <p>{{ $t('change_associated_email') }}</p>
        </div>
        <form class="mt-5 sm:flex sm:items-center">
          <div class="w-full max-w-xs">
            <label for="email" class="sr-only">{{ $t('email') }}</label>
            <input
              id="email"
              type="text"
              name="email"
              class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            class="inline-flex items-center justify-center w-full px-4 py-2 mt-3 font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            {{ $t('email') }}
          </button>
        </form>
      </div>
    </div>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3
          id="renew-headline"
          class="text-lg font-medium leading-6 text-gray-900"
        >
          {{ $t('renew_subscription_automatically') }}
        </h3>
        <div class="mt-2 sm:flex sm:items-start sm:justify-between">
          <div class="max-w-xl text-sm text-gray-500">
            <p id="renew-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              totam non cumque deserunt officiis ex maiores nostrum.
            </p>
          </div>
          <div
            class="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center"
          >
            <!-- On: "bg-primary-600", Off: "bg-gray-200" -->
            <button
              type="button"
              aria-pressed="false"
              aria-labelledby="renew-headline"
              class="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out bg-gray-200 border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <span class="sr-only">{{ $t('use_setting') }}</span>
              <!-- On: "translate-x-5", Off: "translate-x-0" -->
              <span
                aria-hidden="true"
                class="inline-block w-5 h-5 transition duration-200 ease-in-out transform translate-x-0 bg-white rounded-full shadow ring-0"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <div class="sm:flex sm:items-start sm:justify-between">
          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              {{ $t('manage_subscription') }}
            </h3>
            <div class="max-w-xl mt-2 text-sm text-gray-500">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae voluptatibus corrupti atque repudiandae nam.
              </p>
            </div>
          </div>
          <div
            class="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center"
          >
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {{ $t('change_plan') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          {{ $t('manage_subscription') }}
        </h3>
        <div class="mt-2 sm:flex sm:items-start sm:justify-between">
          <div class="max-w-xl text-sm text-gray-500">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Recusandae voluptatibus corrupti atque repudiandae nam.
            </p>
          </div>
          <div
            class="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center"
          >
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {{ $t('change_plan') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Continuous Integration
        </h3>
        <div class="max-w-xl mt-2 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            totam at reprehenderit maxime aut beatae ad.
          </p>
        </div>
        <div class="mt-3 text-sm">
          <a
            href="#"
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            Learn more about our CI features
            <span aria-hidden="true">&rarr;</span></a
          >
        </div>
      </div>
    </div>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Delete your account
        </h3>
        <div class="max-w-xl mt-2 text-sm text-gray-500">
          <p>
            Once you delete your account, you will lose all data associated with
            it.
          </p>
        </div>
        <div class="mt-5">
          <button
            type="button"
            class="inline-flex items-center justify-center px-4 py-2 font-medium text-red-700 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
          >
            Delete account
          </button>
        </div>
      </div>
    </div>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="flex items-center justify-between">
      <span id="toggleLabel" class="flex flex-col flex-grow">
        <span class="text-sm font-medium text-gray-900">Available to hire</span>
        <span class="text-sm leading-normal text-gray-500"
          >Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.</span
        >
      </span>
      <!-- On: "bg-primary-600", Off: "bg-gray-200" -->
      <button
        type="button"
        aria-pressed="false"
        aria-labelledby="toggleLabel"
        class="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out bg-gray-200 border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <span class="sr-only">Use setting</span>
        <!-- On: "translate-x-5", Off: "translate-x-0" -->
        <span
          aria-hidden="true"
          class="inline-block w-5 h-5 transition duration-200 ease-in-out transform translate-x-0 bg-white rounded-full shadow pointer-events-none ring-0"
        />
      </button>
    </div>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="flex items-center">
      <!-- On: "bg-primary-600", Off: "bg-gray-200" -->
      <button
        type="button"
        aria-pressed="false"
        aria-labelledby="toggleLabel"
        class="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out bg-gray-200 border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <span class="sr-only">Use setting</span>
        <!-- On: "translate-x-5", Off: "translate-x-0" -->
        <span
          aria-hidden="true"
          class="inline-block w-5 h-5 transition duration-200 ease-in-out transform translate-x-0 bg-white rounded-full shadow pointer-events-none ring-0"
        />
      </button>
      <span id="toggleLabel" class="ml-3">
        <span class="text-sm font-medium text-gray-900">Annual billing </span>
        <span class="text-sm text-gray-500">(Save 10%)</span>
      </span>
    </div>

    <button class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
      <svg
        class="w-5 h-5"
        x-description="Heroicon name: solid/share"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"
        ></path>
      </svg>
      <span class="font-medium text-gray-900">Share</span>
    </button>

    <div class="flex items-center space-x-2">
      <svg
        class="w-5 h-5 text-gray-400"
        x-description="Heroicon name: solid/collection"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
        ></path>
      </svg>
      <span class="text-sm font-medium text-gray-500">8 Projects</span>
    </div>

    <span
      class="inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700"
    >
      Large
      <button
        type="button"
        class="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
      >
        <span class="sr-only">Remove large option</span>
        <svg
          class="w-2 h-2"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 8 8"
        >
          <path
            stroke-linecap="round"
            stroke-width="1.5"
            d="M1 1l6 6m0-6L1 7"
          />
        </svg>
      </button>
    </span>

    <div
      x-data="{ open: false }"
      @keydown.escape.stop="open = false"
      @click.away="open = false"
      class="relative flex items-center justify-end"
    >
      <button
        type="button"
        class="inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        id="project-options-menu-0"
        @click="open = !open"
        aria-haspopup="true"
        x-bind:aria-expanded="open"
      >
        <span class="sr-only">Open options</span>
        <svg
          class="w-5 h-5"
          x-description="Heroicon name: solid/dots-vertical"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
          ></path>
        </svg>
      </button>

      <div
        x-description="Dropdown menu, show/hide based on menu state."
        x-show="open"
        x-transition:enter="transition ease-out duration-100"
        x-transition:enter-start="transform opacity-0 scale-95"
        x-transition:enter-end="transform opacity-100 scale-100"
        x-transition:leave="transition ease-in duration-75"
        x-transition:leave-start="transform opacity-100 scale-100"
        x-transition:leave-end="transform opacity-0 scale-95"
        class="absolute top-0 z-10 w-48 mx-3 mt-1 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg right-7 ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="project-options-menu-0"
        style="display: none"
      >
        <div class="py-1" role="none">
          <a
            href="#"
            class="flex items-center px-4 py-2 text-sm text-gray-700 group hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            <svg
              class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
              x-description="Heroicon name: solid/pencil-alt"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
              ></path>
              <path
                fill-rule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Edit
          </a>
          <a
            href="#"
            class="flex items-center px-4 py-2 text-sm text-gray-700 group hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            <svg
              class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
              x-description="Heroicon name: solid/duplicate"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"
              ></path>
              <path
                d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z"
              ></path>
            </svg>
            Duplicate
          </a>
          <a
            href="#"
            class="flex items-center px-4 py-2 text-sm text-gray-700 group hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            <svg
              class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
              x-description="Heroicon name: solid/user-add"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
              ></path>
            </svg>
            Share
          </a>
        </div>
        <div class="py-1" role="none">
          <a
            href="#"
            class="flex items-center px-4 py-2 text-sm text-gray-700 group hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            <svg
              class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
              x-description="Heroicon name: solid/trash"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Delete
          </a>
        </div>
      </div>
    </div>

    <div class="flex items-center">
      <h1 class="flex-1 text-lg font-medium">Projects</h1>
      <div
        x-data="{ open: false }"
        @keydown.escape.stop="open = false"
        @click.away="open = false"
        class="relative"
      >
        <button
          type="button"
          class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="sort-menu"
          @click="open = !open"
          aria-haspopup="true"
          x-bind:aria-expanded="open"
        >
          <svg
            class="w-5 h-5 mr-3 text-gray-400"
            x-description="Heroicon name: solid/sort-ascending"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z"
            ></path>
          </svg>
          Sort
          <svg
            class="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400"
            x-description="Heroicon name: solid/chevron-down"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          x-show="open"
          x-description="Dropdown menu, show/hide based on menu state."
          class="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="sort-menu"
          style="display: none"
        >
          <div class="py-1" role="none">
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              >Name</a
            >
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              >Date modified</a
            >
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              >Date created</a
            >
          </div>
        </div>
      </div>
    </div>

    <SectionWrapper>
      <BaseActivityFeed />
    </SectionWrapper>

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
