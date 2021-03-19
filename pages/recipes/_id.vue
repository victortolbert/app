<script>
export default {
  async asyncData({params, error}) {
    try {
      const {data} = await axios.get(
        `https://api.victortolbert.com/recipes/${params.id}`,
      )
      return {title: data.title}
    } catch (error) {
      error({statusCode: 404, message: 'Post not found'})
    }
  },
}
</script>

<template>
  <article>
    {{ title }}
  </article>
</template>
