<script lang="ts" setup>
const items = [
  [
    {
      label: 'Modal',
      to: 'https://ui.nuxtlabs.com/overlays/modal',
      target: '_blank',
    },
    {
      label: 'Slideover',
      to: 'https://ui.nuxtlabs.com/overlays/slideover',
      target: '_blank',
    },
    {
      label: 'Popover',
      to: 'https://ui.nuxtlabs.com/overlays/popover',
      target: '_blank',
    },
    {
      label: 'Tooltip',
      to: 'https://ui.nuxtlabs.com/overlays/tooltip',
      target: '_blank',
    },
    {
      label: 'Context Menu',
      to: 'https://ui.nuxtlabs.com/overlays/context-menu',
      target: '_blank',
    },
    {
      label: 'Notification',
      to: 'https://ui.nuxtlabs.com/overlays/notification',
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
        label="Overlays"
        trailing-icon="i-heroicons-chevron-down-20-solid"
      />
    </UDropdown>
  </nav>
</template>
