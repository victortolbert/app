<template>
  <main class="flex-1 w-full bg-gray-100">
    <BasePageHeading> {{ t('volunteers') }}</BasePageHeading>
  </main>
</template>

<script>
export default {
  name: 'VolunteersView',
  page() {
    return {
      title: 'Volunteers',
    }
  },
}
</script>
