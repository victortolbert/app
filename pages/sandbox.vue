<script>
export default {
  async asyncData({store, $axios, params, error}) {
    return $axios
      .get(`${store.state.api}/wp/v2/catalog`, {
        params: {
          _embed: true,
          slug: params.slug,
        },
      })
      .then(item => {
        if (item.data.length === 0)
          throw {statusCode: 404, message: 'Post not found'}
        return {item: item.data[0]}
      })
      .catch(e => {
        error(e)
      })
  },
}
</script>
