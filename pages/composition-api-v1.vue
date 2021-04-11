<script>
import {
  defineComponent,
  useContext,
  ref,
  useFetch,
  useMeta,
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'masonry',
  head: {},
  setup() {
    const articles = ref([])
    const { $content } = useContext()

    useFetch(async () => {
      articles.value = await $content('articles')
        .sortBy('createdAt', 'desc')
        .fetch()
    })
    useMeta({
      title: 'v1 - Composition API',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'my website description',
        },
      ],
    })

    return { articles }
  },
})
</script>

<template>
  <div class="max-w-4xl p-4 mx-auto">
    <PageTitle title="Composition API v1" />
    <div class="py-5">
      This is an example where all articles are fetched upfront using Nuxt
      Content module.
    </div>
    <ClientOnly>
      <masonry :cols="{ default: 3, 1000: 3, 700: 2, 400: 1 }" :gutter="20">
        <div v-for="(article, index) in articles">
          <Card
            :padding="3"
            :border-width="2"
            primary-color="dark-purple"
            cardBg="white"
            border-radius="lg"
            class="mb-5"
          >
            <CardHeader class="text-gray-500">
              <span>
                <v-icon name="heart" scale="1" />
              </span>
              <span>
                <v-icon name="link" scale="1" />
              </span>
            </CardHeader>
            <CardContent>
              <CardImage v-if="article.image" :src="article.image"></CardImage>
              <span v-else class="text-sm text-gray-600">{{ article.description }}</span>
            </CardContent>
            <CardFooter left :name="article.title"></CardFooter>
          </Card>
        </div>
      </masonry>
    </ClientOnly>
  </div>
</template>
