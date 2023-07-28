<script lang="ts" setup>
const items = [
  [
    {
      label: 'Input',
      to: 'https://ui.nuxtlabs.com/forms/input',
      target: '_blank',
    },
    {
      label: 'Textarea',
      to: 'https://ui.nuxtlabs.com/forms/textarea',
      target: '_blank',
    },
    {
      label: 'Select',
      to: 'https://ui.nuxtlabs.com/forms/select',
      target: '_blank',
    },
    {
      label: 'Select Menu',
      to: 'https://ui.nuxtlabs.com/forms/select-menu',
      target: '_blank',
    },
    {
      label: 'Checkbox',
      to: 'https://ui.nuxtlabs.com/forms/checkbox',
      target: '_blank',
    },
    {
      label: 'Radio',
      to: 'https://ui.nuxtlabs.com/forms/radio',
      target: '_blank',
    },
    {
      label: 'Toggle',
      to: 'https://ui.nuxtlabs.com/forms/toggle',
      target: '_blank',
    },
    {
      label: 'Range',
      to: 'https://ui.nuxtlabs.com/forms/range',
      target: '_blank',
    },
    {
      label: 'Form Group',
      to: 'https://ui.nuxtlabs.com/forms/form-group',
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
        label="Forms"
        trailing-icon="i-heroicons-chevron-down-20-solid"
      />
    </UDropdown>
  </nav>
</template>

input
textarea
select
select-menu
checkbox
radio
toggle
range
form-group
