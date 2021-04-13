<script>
import { defineComponent, useMeta } from '@nuxtjs/composition-api'
import InfiniteLoading from 'vue-infinite-loading'
import useInfiniteMasonry from '~/composables/useInfiniteMasonry'

export default defineComponent({
  components: {
    InfiniteLoading,
  },
  head: {},
  setup() {
    const { items, infiniteHandler } = useInfiniteMasonry({
      path: 'articles',
      limit: 3,
    })
    useMeta({ title: 'v3 - Composition API' })
    return { items, infiniteHandler }
  },
})
</script>

<template>
  <div class="max-w-4xl p-4 mx-auto">
    <PageTitle title="Nuxt Composition API v3 - with Usables" />

    <div class="py-5">
      In this example, we have created reusable components (Composables) with
      Composition API.
    </div>

    <ClientOnly>
      <masonry :cols="{ default: 3, 1000: 3, 400: 1 }" :gutter="20">
        <Card
          v-for="(article, index) in items"
          :key="index"
          :padding="5"
          :border-width="8"
          border-radius="2xl"
          data-aos="flip-up"
          class="mb-5"
        >
          <CardContent gradient>
            <PageSubtitle class="uppercase font-title" :title="article.title"></PageSubtitle>
          </CardContent>

          <CardFooter
            left
            class="text-gray-800"
            v-if="article.image"
            :category="article.description"
          ></CardFooter>
        </Card>
      </masonry>
    </ClientOnly>

    <ClientOnly>
      <infinite-loading @infinite="infiniteHandler">
        <template slot="spinner">Loading...</template>
        <div slot="no-more">--- End ---</div>
        <div slot="no-results">No results message</div>
      </infinite-loading>
    </ClientOnly>
  </div>
</template>
