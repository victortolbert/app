<script>
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
})
</script>

<template>
  <section class="post">
    <h3>{{ post.title }}</h3>
    <p>{{ post.created.format('MMM Do, YYYY') }}</p>
    <div v-html="post.html" />
  </section>
</template>
