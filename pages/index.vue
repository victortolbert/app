<script>
import {ray} from 'js-ray'

// @ts-ignore
export default {
  layout: 'plain',
  computed: {
    sections() {
      return [
        {
          name: 'dashboard',
          path: '/dashboard/',
          title: this.$t('dashboard_title'),
          description: this.$t('dashboard_description'),
          icon: 'template',
        },
        {
          name: 'resources',
          path: '/resources/',
          title: this.$t('resources_title'),
          description: this.$t('resources_description'),
          icon: 'library',
        },
        {
          name: 'training',
          path: '/training/',
          title: this.$t('training_title'),
          description: this.$t('training_description'),
          icon: 'academic-cap',
        },
        {
          name: 'calendar',
          path: '/calendar/',
          title: this.$t('calendar_title'),
          description: this.$t('calendar_description'),
          icon: 'calendar',
        },
        {
          name: 'support',
          path: '/support/',
          title: this.$t('support_title'),
          description: this.$t('support_description'),
          icon: 'support',
        },
      ]
    },
  },
  mounted() {
    ray('a string')

    ray(['an', 'array'])

    ray({text: 'an object'})

    ray('as', 'many', 'arguments', 'as', 'you', 'like')

    ray('this is blue').color('blue')

    // ray().newScreen('My debug screen')
  },
}
</script>

<template>
  <main class="flex items-center justify-center min-h-screen bg-primary-500">
    <div
      class="max-w-4xl overflow-hidden bg-gray-200 divide-y divide-gray-200 rounded-lg shadow sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px"
    >
      <div
        v-for="section in sections"
        :key="section.name"
        class="relative p-6 bg-white rounded-tl-lg rounded-tr-lg sm:rounded-tr-none group focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500"
      >
        <div>
          <span
            class="inline-flex p-3 rounded-lg text-primary-700 bg-primary-50 ring-4 ring-white"
          >
            <BaseIconOutlined :name="section.icon" />
          </span>
        </div>

        <div class="mt-8">
          <h3 class="text-lg font-medium capitalize">
            <NuxtLink
              :to="localePath({path: section.path})"
              class="focus:outline-none"
            >
              <span
                class="absolute inset-0"
                aria-hidden="true"
                x-data-description="Extends touch target to entire panel"
              />
              {{ section.title }}
            </NuxtLink>
          </h3>
          <p class="mt-2 text-sm text-gray-500">
            {{ section.description }}
          </p>
        </div>
        <span
          class="absolute text-gray-300 pointer-events-none top-6 right-6 group-hover:text-gray-400"
          aria-hidden="true"
        >
          <BaseIconSolid name="arrow-top-right" />
        </span>
      </div>

      <div
        class="relative p-6 bg-white group focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500"
      >
        <div>
          <span
            class="inline-flex p-3 rounded-lg bg-primary-50 text-primary-700 ring-4 ring-white"
          >
            <BaseIconOutlined name="users" />
          </span>
        </div>

        <div class="mt-8">
          <h3 class="text-lg font-medium">
            <a href="#" class="focus:outline-none">
              <!-- Extend touch target to entire panel -->
              <span class="absolute inset-0" aria-hidden="true"></span>
              Schedule a one-on-one
            </a>
          </h3>
          <p class="mt-2 text-sm text-gray-500">
            Doloribus dolores nostrum quia qui natus officia quod et dolorem.
            Sit repellendus qui ut at blanditiis et quo et molestiae.
          </p>
        </div>
        <span
          class="absolute text-gray-300 pointer-events-none top-6 right-6 group-hover:text-gray-400"
          aria-hidden="true"
        >
          <BaseIconSolid name="arrow-top-right" />
        </span>
      </div>
    </div>
  </main>
</template>
