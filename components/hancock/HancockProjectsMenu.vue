<script lang="ts" setup>
const items = [
  [
    {
      label: 'List',
      to: '/hancock/projects',
      icon: 'i-carbon-list',
    },
    {
      label: 'Add',
      to: '/hancock/projects/add',
      icon: 'i-carbon-add',
    },
    {
      label: 'Edit',
      to: '/hancock/projects/1154912/edit',
      icon: 'i-carbon-edit',
    },
    {
      label: 'PIF',
      to: '/hancock/projects/1154912/pif',
      icon: 'i-carbon-inspection',
    },
    {
      label: 'PIF Report',
      to: '/hancock/projects/1154912/report',
      icon: 'i-carbon-inspection',
    },
    {
      label: 'Communication',
      to: '/hancock/projects/1154912/communication',
      icon: 'i-carbon-chat',
    },
  ],
]
</script>

<template>
  <nav class="flex items-center gap-4">
    <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
      <button class="flex items-center gap-2 text-sm text-gray-300 hover:text-white">
        <span>Projects</span>
        <UIcon name="i-carbon-chevron-down" />
      </button>
    </UDropdown>
  </nav>
</template>
