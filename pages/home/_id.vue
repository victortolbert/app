<script>
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  // layout: 'homes',
  head() {
    return {
      title: this.home.title,
    }
  },
  async asyncData({params, $dataApi, error}) {
    const responses = await Promise.all([
      $dataApi.getHome(params.id),
      $dataApi.getReviewsByHomeId(params.id),
      $dataApi.getUserByHomeId(params.id),
    ])
    const badResponse = responses.find(response => !response.ok)
    if (badResponse)
      return error({
        statusCode: badResponse.status,
        message: badResponse.statusText,
      })
    return {
      home: responses[0].json,
      reviews: responses[1].json.hits,
      user: responses[2].json.hits[0],
    }
  },
})
</script>

<template>
  <div class="app-container">
    <SectionWrapper>
      <PropertyGallery :images="home.images" />
    </SectionWrapper>

    <SectionWrapper>
      <PropertyDetails :home="home" />
    </SectionWrapper>

    <SectionWrapper>
      <PropertyDescription :home="home" />
    </SectionWrapper>

    <SectionWrapper>
      <PropertyMap :home="home" />
    </SectionWrapper>

    <SectionWrapper>
      <PropertyReviews :reviews="reviews" />
    </SectionWrapper>

    <SectionWrapper>
      <PropertyHost :user="user" />
    </SectionWrapper>
  </div>
</template>
