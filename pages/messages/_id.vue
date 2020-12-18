<template>
  <div class="mx-16 my-8 prose">
    <template v-if="$fetchState.pending">
      <ContentPlaceholders>
        <ContentPlaceholdersHeading />
        <ContentPlaceholdersText :lines="10" />
      </ContentPlaceholders>
    </template>

    <template v-else-if="$fetchState.error">
      <h1>Message #{{ $route.params.id }} not found</h1>
    </template>

    <template v-else>
      <h2>
        <NuxtLink to="/messages"> &larr; Inbox </NuxtLink>
      </h2>

      <h1>{{ message.subject }}</h1>

      <span class="text-gray-700">
        <span class="block text-xs tracking-wider uppercase">From</span>
        <b>{{ message.sender }}</b>
      </span>

      <div v-html="message.body" />
    </template>
  </div>
</template>

<script>
import {
  defineComponent,
  useFetch,
  useContext,
  ref,
} from '@nuxtjs/composition-api'
import {strip} from '@/helpers'

export default defineComponent({
  name: 'MessagePage',
  setup() {
    const message = ref()

    const truncate = html => {
      return `${strip(html).substr(0, 50)}...`
    }

    const {$axios, params} = useContext()

    useFetch(async () => {
      message.value = await $axios.$get(`messages/${params.value.id}`)
    })

    return {message, truncate}
  },
})
</script>
