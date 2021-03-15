<script>
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import CKEditor from '@ckeditor/ckeditor5-vue2'

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Markdown from '@ckeditor/ckeditor5-markdown-gfm/src/markdown'

import Multiselect from 'vue-multiselect'

export default {
  components: {
    ckeditor: CKEditor.component,
    Multiselect,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {Markdown, Essentials, Bold, Italic},
      selectOptions: [],
      selectedOption: null,
    }
  },
  methods: {},
}
</script>

<template>
  <article>
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" />
  </article>
</template>
