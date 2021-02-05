<template>
  <div>
    <p>Our Url is: {{ $config.baseURL }}</p>
    <p>{{ process.env.baseURL }}</p>
  </div>
</template>

<script>
// const posts = await fetch(`${env.baseURL}/posts`)
// const posts = await fetch(`${baseURL}/posts`)
export default {
  async asyncData({$config: {baseURL}}) {
    const posts = await fetch(`${baseURL}/posts`).then(res => res.json())
    return {
      posts,
    }
  },
}
</script>
