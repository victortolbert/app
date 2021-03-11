<script>
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'RenderlessTagInput',
  model: {
    prop: 'tags',
    event: 'update',
  },
  props: {
    tags: {
      type: Array,
      default: () => [],
      required: true,
    },
    removeOnBackspace: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      input: '',
    }
  },
  computed: {
    newTag() {
      return this.input.trim()
    },
  },
  methods: {
    removeTag(tag) {
      this.$emit(
        'update',
        this.tags.filter(t => t !== tag),
      )
    },
    addTag() {
      if (this.newTag.length === 0 || this.tags.includes(this.newTag)) {
        return
      }
      this.$emit('update', [...this.tags, this.newTag])
      this.clearInput()
    },
    clearInput() {
      this.input = ''
    },
    handleBackspace(event) {
      if (this.newTag.length === 0) {
        this.$emit('update', this.tags.slice(0, -1))
      }
    },
  },
  render() {
    return this.$scopedSlots.default({
      tags: this.tags,
      removeTag: this.removeTag,
      addTag: this.addTag,

      removeButtonEvents: tag => ({
        click: () => {
          this.removeTag(tag)
        },
      }),
      inputProps: {
        value: this.input,
      },
      inputEvents: {
        input: event => (this.input = event.target.value),
        keydown: event => {
          if (event.key === 'Backspace' && this.removeOnBackspace) {
            this.handleBackspace()
          }
          if (event.key === 'Enter') {
            event.preventDefault()
            this.addTag()
          }
        },
      },
    })
  },
})
</script>
