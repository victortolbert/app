<script>
export default {
  async asyncData({$content}) {
    const posts = await $content('blog').fetch()

    return {
      posts,
    }
  },
}
</script>

<template>
  <div class="content">
    <BlogPostList :list="posts" />
  </div>
</template>
