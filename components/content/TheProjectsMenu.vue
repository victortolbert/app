<script lang="ts" setup>
const items = [
  [
    {
      label: 'Schedule a Claim',
      to: '/hancock/claims/create',
    },
  ],
]
</script>

<template>
  <nav class="flex items-center gap-4">
    <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
      <UButton
        variant="ghost"
        label="Projects"
        trailing-icon="i-heroicons-chevron-down-20-solid"
      />
    </UDropdown>
  </nav>
</template>
