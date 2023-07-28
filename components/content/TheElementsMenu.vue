<script lang="ts" setup>
const items = [
  [
    {
      label: 'Avatar',
      to: 'https://ui.nuxtlabs.com/elements/avatar',
      target: '_blank',
    },
    {
      label: 'Badge',
      to: 'https://ui.nuxtlabs.com/elements/badge',
      target: '_blank',
    },
    {
      label: 'Button',
      to: 'https://ui.nuxtlabs.com/elements/button',
      target: '_blank',
    },
    {
      label: 'Dropdown',
      to: 'https://ui.nuxtlabs.com/elements/dropdown',
      target: '_blank',
    },
    {
      label: 'Accordion',
      to: 'https://ui.nuxtlabs.com/elements/accordion',
      target: '_blank',
    },
    {
      label: 'Collapse',
      to: 'https://vue-collapsed.netlify.app/',
      target: '_blank',
    },
    {
      label: 'Icon',
      to: 'https://ui.nuxtlabs.com/elements/icon',
      target: '_blank',
    },
    {
      label: 'Kbd',
      to: 'https://ui.nuxtlabs.com/elements/kbd',
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
        label="Elements"
        trailing-icon="i-heroicons-chevron-down-20-solid"
      />
    </UDropdown>
  </nav>
</template>
