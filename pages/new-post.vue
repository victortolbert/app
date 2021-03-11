<script lang="ts">
import moment from 'moment'
import {defineComponent} from '@nuxtjs/composition-api'
import {Post} from '~/types'

export default defineComponent({
  setup() {
    const post: Post = {
      id: -1,
      title: 'New Post',
      markdown: '# Hello\nMy new post',
      html: '',
      created: moment(),
      authorId: 0,
    }
    return {
      post,
    }
  },
})
</script>

<template>
  <div>
    <h1>New Post</h1>
    <PostEditor :post="post" />
  </div>
</template>
