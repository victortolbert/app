<script>
export default {
  async asyncData({$axios}) {
    return {
      resources: await $axios.$get('https://api.victortolbert.com/resources'),
    }
  },
}
</script>
<template>
  <PageWrapper>
    <SectionWrapper>
      <pre class="text-2xs">
        {{ resources }}
      </pre>
    </SectionWrapper>
  </PageWrapper>
</template>
