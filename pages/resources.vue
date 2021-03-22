<script>
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  middleware: 'auth',
})
</script>
<template>
  <PageWrapper>
    <PageHeading> {{ $t('resources') }} </PageHeading>

    <PageBreadcrumb class="mt-2" />

    <NuxtChild />
  </PageWrapper>
</template>
