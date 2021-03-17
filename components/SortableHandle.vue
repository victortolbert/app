<script>
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  inject: ['sortableListHandleClass'],
  mounted() {
    this.$el.classList.add(this.sortableListHandleClass)
  },
  render() {
    return this.$slots.default[0]
  },
})
</script>
