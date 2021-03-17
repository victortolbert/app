<template>
  <RenderlessTagInput
    :tags="tags"
    @update="newTags => $emit('update', newTags)"
  >
    <div
      slot-scope="{
        tags,
        removeTag,
        removeButtonEvents,
        inputProps,
        inputEvents,
      }"
      class="tag-input"
    >
      <span v-for="tag in tags" :key="tag" class="tag-input-tag">
        <span>{{ tag }}</span>
        <button
          type="button"
          class="tag-input-remove"
          v-on="removeButtonEvents(tag)"
        >
          &times;
        </button>
      </span>
      <input
        class="form-input tag-input-text"
        placeholder="Add tag..."
        v-bind="inputProps"
        v-on="inputEvents"
      />
    </div>
  </RenderlessTagInput>
</template>

<script>
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'InlineTagInput',
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
