<template>
  <section>
    <form class="flex flex-col items-center justify-center">
      <VueTrix
        input-id="editor1"
        v-model="editorContent"
        placeholder="enter your content..."
      />
    </form>
  </section>
</template>

<script>
import VueTrix from 'vue-trix'

export default {
  components: {
    VueTrix,
  },
  data: () => ({
    editorContent: '<h1>Editor contents</h1>',
  }),
  methods: {
    updateEditorContent(value) {
      // Update new content into the database via state mutations.
    },
  },
  watch: {
    editorContent: {
      handler: 'updateEditorContent',
    },
  },
}
</script>
