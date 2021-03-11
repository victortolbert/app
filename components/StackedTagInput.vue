<template>
  <RenderlessTagInput
    :tags="tags"
    :remove-on-backspace="false"
    @update="newTags => $emit('update', newTags)"
  >
    <div
      slot-scope="{tags, addTag, removeButtonEvents, inputProps, inputEvents}"
      class="stacked-tag-input"
    >
      <div class="stacked-tag-input-form">
        <input
          class="form-input"
          placeholder="Add tag..."
          v-bind="inputProps"
          v-on="inputEvents"
        />
        <button
          class="px-4 py-2 text-white bg-indigo-400 btn btn-indigo hover:bg-indigo-500"
          @click="addTag"
        >
          Add Tag
        </button>
      </div>
      <ul class="stacked-tag-list">
        <li v-for="tag in tags" :key="tag">
          {{ tag }}
          <button
            type="button"
            class="stacked-tag-link"
            v-on="removeButtonEvents(tag)"
          >
            Remove
          </button>
        </li>
      </ul>
    </div>
  </RenderlessTagInput>
</template>

<script>
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'StackedTagInput',
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
  },
  data() {
    return {}
  },
  methods: {},
})
</script>
