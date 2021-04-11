<script>
import {
  defineComponent,
  ref,
  useFetch,
  useContext,
  useMeta,
} from '@nuxtjs/composition-api'

import SvgOne from '~/components/svg/One.vue'
import SvgTwo from '~/components/svg/Two.vue'
import SvgThree from '~/components/svg/Three.vue'

export default defineComponent({
  layout: 'masonry',
  components: {
    SvgOne,
    SvgTwo,
    SvgThree,
  },
  head: {},
  setup() {
    const colorMap = [
      { bg: 'light-blue', text: 'gray-800' },
      { bg: 'light-purple', text: 'white' },
      { bg: 'melon-red', text: 'white' },
      { bg: 'yellow', text: 'gray-800' },
      { bg: 'dark-purple', text: 'white' },
      { bg: 'lime-green', text: 'gray-800' },
      { bg: 'juicy-orange', text: 'gray-800' },
      { bg: 'light-purple', text: 'white' },
      { bg: 'melon-red', text: 'white' },
      { bg: 'yellow', text: 'gray-800' },
      { bg: 'light-blue', text: 'gray-800' },
    ]

    const { $content } = useContext()
    const articles = ref([])
    const limit = ref(4)
    const page = ref(0)

    function fetchData() {
      return $content('articles')
        .limit(limit.value)
        .skip(limit.value * page.value)
        .sortBy('createdAt', 'desc')
        .fetch()
    }

    function infiniteHandler($state) {
      setTimeout(async () => {
        page.value += 1
        let additionalItems = await fetchData()

        if (additionalItems.length > 0) {
          articles.value.push(...additionalItems)
          $state.loaded()
        } else {
          $state.complete()
        }
      }, 500)
    }

    useFetch(async () => {
      articles.value = await fetchData()
    })

    useMeta({ title: 'v2 - Composition API' })
    return { articles, infiniteHandler, colorMap }
  },
})
</script>

<template>
  <div class="max-w-4xl p-4 mx-auto">
    <PageTitle title="Composition API v2" />
    <div class="py-5">
      This is an example where you can build out entire component in a single
      file using Composition API.
    </div>
    <ClientOnly>
      <masonry :cols="{ default: 3, 1000: 3, 700: 2, 400: 1 }" :gutter="20">
        <Card
          v-for="(article, index) in articles"
          :key="index"
          :padding="1"
          :primary-color="colorMap[index].bg"
          secondary-color="gray-300"
          :border-width="2"
          border-radius="3xl"
          class="mb-5"
          data-aos="fade-up"
        >
          <CardContent>
            <Component :is="article.component" :color="colorMap[index].bg"></Component>
          </CardContent>

          <CardFooter :name="article.title"></CardFooter>
        </Card>
      </masonry>
    </ClientOnly>
    <ClientOnly>
      <infinite-loading @infinite="infiniteHandler">
        <template slot="spinner" class="text-muted small-text">Loading...</template>
        <div slot="no-more" class="text-muted small-text">--- End ---</div>
        <div slot="no-results" class="text-muted small-text">No results message</div>
      </infinite-loading>
    </ClientOnly>
  </div>
</template>
