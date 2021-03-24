<template>
  <PageWrapper>
    <PageHeading>{{ page.title }}</PageHeading>

    <SectionWrapper class="prose">
      <NuxtContent :document="page" />
    </SectionWrapper>
  </PageWrapper>
</template>

<script>
export default {
  async asyncData({$content, params, error}) {
    const slug = params.slug || 'index'
    const page = await $content(slug)
      .fetch()
      .catch(err => {
        error({statusCode: 404, message: 'Page not found'})
      })

    return {
      page,
    }
  },
}
</script>
