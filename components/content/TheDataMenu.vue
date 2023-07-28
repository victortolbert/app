<script lang="ts" setup>
const items = [
  [
    {
      label: 'Table',
      to: 'https://ui.nuxtlabs.com/data/table',
      target: '_blank',
    },
  ],
]
</script>

<template>
  <nav class="flex items-center gap-4">
    <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
      <UButton
        variant="ghost"
        label="Data"
        trailing-icon="i-heroicons-chevron-down-20-solid"
      />
    </UDropdown>
  </nav>
</template>
