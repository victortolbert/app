<script>
  export default {
    async asyncData({$axios}) {
      return {
        resources: await $axios.$get('https://api.victortolbert.com/resources')
      }
    },
  }
</script>
<template>
  <PageWrapper>
    <SectionWrapper>
      <ResourceFinder />
      <h2>Add your resource</h2>
      <ResourceUploader />
    </SectionWrapper>

    <SectionWrapper>
      {{ resources }}
    </SectionWrapper>
  </PageWrapper>
</template>
