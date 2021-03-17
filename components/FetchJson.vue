<script>
export default {
  name: 'FetchJson',
  props: {
    url: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      response: null,
      loading: true,
    }
  },
  created() {
    fetch(this.url)
      .then(response => response.json())
      .then(response => {
        this.response = response
        this.loading = false
      })
  },
  render() {
    return this.$scopedSlots.default({
      response: this.response,
      loading: this.loading,
    })
  },
}
</script>
