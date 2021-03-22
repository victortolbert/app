<!-- @vue-ignore -->
<script>
import {
  // computed,
  defineComponent,
  // useMeta,
  // useRoute,
} from '@nuxtjs/composition-api'

// import {useAdvocate} from '~/composables/useAdvocate'

export default defineComponent({
  head: {},
  // setup() {
  //   const route = useRoute()
  //   const id = computed(() => route.value.params.id)
  //   console.log(id)
  //   const {advocate, fetchAdvocate, onFetchAdvocate} = useAdvocate(id.value)
  //   const {title} = useMeta()

  //   fetchAdvocate()

  //   onFetchAdvocate(async () => {
  //     title.value = advocate.value.firstName
  //   })

  //   return {
  //     advocate,
  //   }
  // },

  async asyncData(context) {
    const id = context.params.id
    const i18n = context.app.$i18n
    const query = context.query
    const config = context.$config

    console.log({id, i18n, query, config})

    // Server-side
    if (process.server) {
      const {req, res, beforeNuxtRender} = context
    }
    // Client-side
    if (process.client) {
      const {from, nuxtState} = context
    }

    try {
      // Using the nuxtjs/http module here exposed via context.app
      const advocate = await context.app.$axios.$get(
        `https://api.victortolbert.com/advocates/${id}`,
      )
      return {advocate}
    } catch (e) {
      context.error(e) // Show the nuxt error page with the thrown error
    }
  },
})
</script>

<template>
  <SectionWrapper>
    <h1>{{ advocate.firstName }} {{ advocate.lastName }}</h1>
  </SectionWrapper>
</template>
