<script>
export default {
  data() {
    return {
      links: [
        {
          label: 'Welcome to ECCO',
          url:
            'http://resources.ga-sps.org/content/resources/welcome-to-ecco-pdf/welcome-to-ecco-1-2.pdf',
        },
        {
          label: 'Intro to SPF',
          url:
            'http://resources.ga-sps.org/content/resources/spf-intro/spf-intro.mp4',
        },
        {
          label: 'Users Manual w/ Progress Reporting',
          url: 'http://resources.ga-sps.org/resources/ecco-users-manual',
        },
        {
          label: 'Briefcase Dashboard',
          url:
            'http://resources.ga-sps.org/resources/briefcase-dashboard/briefcase-dashboard.mp4',
        },
        {
          label: 'Pulling Reports',
          url:
            'http://resources.ga-sps.org/content/resources/pulling-reports/pulling-reports.mp4',
        },
        {
          label: 'Help Dashboard',
          url:
            'http://resources.ga-sps.org/resources/help-dashboard/help-dashboard.mp4',
        },
        {
          label: 'TA & Updates',
          url:
            'http://resources.ga-sps.org/resources/ecco-overview-ta-entry-and-updates',
        },
        {
          label: 'Entering Process Level Data',
          url:
            'http://resources.ga-sps.org/content/resources/entering-process-data/entering_process_data.mp4',
        },
        {
          label: 'Adding Intervention Profile',
          url:
            'http://resources.ga-sps.org/content/resources/creating-an-intervention-profile/creating_an_intervention_profile.mp4',
        },
        {
          label: 'ECCO MDS Data Entry Guidance Document',
          url:
            'http://resources.ga-sps.org/resources/ecco-mds-data-entry-guidance-document',
        },
      ],
    }
  },
  methods: {
    goTo(url) {
      window.open(url, '_blank')
    },
  },
}
</script>
<template>
  <ODropdown aria-role="list">
    <div class="whitespace-nowrap" slot="trigger">
      <slot />
    </div>
    <ODropdownItem
      v-for="link in links"
      :key="link.label"
      @click="goTo(link.url)"
    >
      {{ link.label }}
    </ODropdownItem>
  </ODropdown>
</template>

<style>
:root {
  --oruga-dropdown-menu-width: 20rem;
}
</style>
