<script>
export default {
  props: {
    resource: {
      type: String,
      default: 'people',
    },
    person: {
      type: Object,
      default() {
        return {
          id: 1,
          firstName: 'victor',
          lastName: 'Tolbert',
          title: 'Lead UI Architect',
        }
      },
    },
  },
  computed: {
    avatarURL() {
      return `https://cominex.net/assets/img/people/${this.person.firstName.toLowerCase()}.jpeg`
    },
    fullName() {
      return `${this.person.firstName} ${this.person.lastName}`
    },
  },
}
</script>

<template>
  <ul class="relative z-0 divide-y divide-gray-200">
    <li class="bg-white">
      <div
        class="relative flex items-center px-6 py-5 space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500"
      >
        <div class="flex-shrink-0">
          <img
            class="w-10 h-10 rounded-full"
            :src="avatarURL"
            :alt="person.firstName"
            style="filter: grayscale()"
          />
        </div>
        <div class="flex-1 min-w-0">
          <NuxtLink
            :to="`/${resource}/directory/${person.id}/`"
            class="focus:outline-none"
          >
            <!-- Extend touch target to entire panel -->
            <span class="absolute inset-0" aria-hidden="true" />
            <p class="text-sm font-medium text-gray-900">{{ fullName }}</p>
            <p class="text-sm text-gray-500 truncate">
              {{ person.title }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </li>
  </ul>
</template>
