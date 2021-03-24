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
    <div class="h-screen">
      <BaseHero
        halfheight
        cover-url="https://cominex.net/assets/img/background.jpeg"
        title="Welcome to the Georgia Strategic Prevention Services Hubsite"
      />
      <SectionWrapper class="grid grid-cols-3 gap-1">
        <span
          class="relative z-10 flex items-center justify-center w-8 h-8 bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400"
        >
          <span
            class="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"
          />
        </span>
        <span
          class="relative z-10 flex items-center justify-center w-8 h-8 bg-white border-2 rounded-full border-primary-600"
        >
          <span class="h-2.5 w-2.5 bg-primary-600 rounded-full"></span>
        </span>
        <span class="flex items-center h-9">
          <span
            class="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-primary-600 group-hover:bg-primary-800"
          >
            <BaseIconSolid name="check" class="text-white" />
          </span>
        </span>
      </SectionWrapper>
    </div>
  </PageWrapper>
</template>
