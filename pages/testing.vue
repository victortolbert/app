<script>
// const posts = await fetch(`${env.baseURL}/posts`)
// const posts = await fetch(`${baseURL}/posts`)
// export default {
//   async asyncData({$config: {baseURL}}) {
//     const posts = await fetch(`${baseURL}/posts`).then(res => res.json())
//     return {
//       posts,
//     }
//   },
// }
const MyList = {
  template: `
    <div>
      <h1>My List</h1>
      <ul><li v-for="item in list" :key="item">{{ item }}</li></ul>
    </div>
  `,
  data: () => ({list: [1, 2, 3]}),
}
export default {
  components: {MyList},
  data: () => ({count: 0}),
}
</script>

<template>
  <div>
    <p>{{ count }}</p>
    <MyList :class="$style.list" />
    <p>Our baseURL is: {{ $config.baseURL }}</p>
    <p>Our assetsURL is: {{ $config.assetsURL }}</p>
  </div>
</template>

<style module>
.list {
  border: 1px solid red;
}
</style>
