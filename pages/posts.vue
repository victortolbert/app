<template>
  <section>
    <main>
      {{ posts }}
    </main>
  </section>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
    }
  },
  async asyncData(ctx) {
    return {
      posts: await ctx.app.$postRepository.index(),
    }
  },
}
</script>
