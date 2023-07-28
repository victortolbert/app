<script lang="ts" setup>
const items = [
  [
    {
      label: 'Vertical Navigation',
      to: 'https://ui.nuxtlabs.com/elements/vertical-navigation',
      target: '_blank',
    },
    {
      label: 'Command Palette',
      to: 'https://ui.nuxtlabs.com/elements/command-palette',
      target: '_blank',
    },
    {
      label: 'Pagination',
      to: 'https://ui.nuxtlabs.com/elements/pagination',
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
        label="Navigation"
        trailing-icon="i-heroicons-chevron-down-20-solid"
      />
    </UDropdown>
  </nav>
</template>
