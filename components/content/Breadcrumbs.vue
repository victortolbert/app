<script setup>
const props = defineProps({
  breadcrumbs: {
    type: Array,
    required: true,
  },
})
const NuxtLink = resolveComponent('NuxtLink')

const dropdownOpened = ref(false)

function close() {
  dropdownOpened.value = false
}

function toggle() {
  dropdownOpened.value = !dropdownOpened.value
}
</script>

<template>
  <div>
    <nav class="sm:hidden" aria-label="Back">
      <NuxtLink to="/dashboard" class="flex items-center text-sm font-medium text-gray-300 hover:text-gray-100">
        <UIcon
          name="i-carbon-arrow-left"
          class="mr-1 h-5 w-5 flex-shrink-0 text-sm text-gray-200 -ml-1"
        />
        Back
      </NuxtLink>
    </nav>

    <nav class="hidden sm:flex" aria-label="Breadcrumb">
      <ol role="list" class="flex items-center space-x-4">
        <li
          v-for="(item, index) in breadcrumbs"
          :key="item.name"
          class="flex items-center"
        >
          <NuxtLink
            v-if="index === 0"
            :to="item.path"
            class="outline-secondary-600 inline-flex whitespace-nowrap text-sm text-gray-400 no-underline active:underline hover:underline"
          >
            <UIcon name="i-heroicons-home" class="h-5 w-5" />
          </NuxtLink>

          <div v-else class="flex items-center">
            <UIcon name="i-heroicons-chevron-right-20-solid" class="h-5 w-5 flex-shrink-0 text-sm text-gray-400" />
            <NuxtLink
              :to="item.path"
              class="ml-4 text-sm font-medium text-gray-400 hover:text-gray-300"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</template>
