<script>
export default {
  // layout: 'plain',
  middleware: 'auth',
  computed: {
    sections() {
      return [
        {
          name: 'dashboard',
          path: '/',
          title: this.$t('dashboard_title'),
          description: this.$t('dashboard_description'),
          icon: 'template',
        },
        {
          name: 'resources',
          path: '/resources/',
          title: this.$t('resources_title'),
          description: this.$t('resources_description'),
          icon: 'library',
        },
        {
          name: 'training',
          path: '/training/',
          title: this.$t('training_title'),
          description: this.$t('training_description'),
          icon: 'academic-cap',
        },
        {
          name: 'calendar',
          path: '/calendar/',
          title: this.$t('calendar_title'),
          description: this.$t('calendar_description'),
          icon: 'calendar',
        },
        {
          name: 'support',
          path: '/support/',
          title: this.$t('support_title'),
          description: this.$t('support_description'),
          icon: 'support',
        },
      ]
    },
  },
  mounted() {
    console.log(this.$markdown('## Hello'))
  },
}
</script>

<template>
  <PageWrapper>
    <PageHeading>{{ $t('dashboard') }}</PageHeading>
  </PageWrapper>
</template>
