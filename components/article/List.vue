<script>
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    articles: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
  },
})
</script>

<template>
  <div>
    <ul class="max-w-5xl mx-auto text-gray-500">
      <li
        v-for="article of articles"
        :key="article.slug"
        class="p-5 mb-12 bg-white rounded shadow"
      >
        <NuxtLink
          :to="{name: 'articles-slug', params: {slug: article.slug}}"
          class="md:grid md:gap-4 md:grid-cols-2"
        >
          <img
            v-if="article.image"
            :src="article.image"
            alt=""
            class="mb-4 border rounded"
          />
          <div>
            <h2 class="mb-2 text-2xl font-bold text-gray-900">
              {{ article.title }}
            </h2>
            <p class="text-lg">{{ article.description }}</p>
            <p class="mt-2 font-bold text-indigo-600">
              {{ $t('read_more') }}
              <span class="text-indigo-600">&hellip;</span>
            </p>
          </div>
        </NuxtLink>
      </li>
    </ul>
    <div v-if="total" class="max-w-5xl mx-auto my-5 constainer">
      <ArticlePagination v-if="total > 5" :total="total" />
    </div>
  </div>
</template>
