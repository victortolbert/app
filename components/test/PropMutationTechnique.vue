<!-- https://github.com/sagalbot/vue-mutable -->
<script>
export default {
  props: {
    options: {
      default: [],
    },
  },
  data() {
    return {
      _options: [],
    }
  },
  created() {
    this.$data._options = this.options
  },
  watch: {
    options(newVal, oldVal) {
      console.log(newVal, oldVal)
      this.$data._options = newVal
    },
  },
}
</script>
