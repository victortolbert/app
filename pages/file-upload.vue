<template>
  <section>
    <form class="flex flex-col items-center justify-center">
      <FilePond allow-multiple="true" />
    </form>
  </section>
</template>

<script>
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'

import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

export default {
  components: {
    FilePond: vueFilePond(FilePondPluginImagePreview),
  },
  async asyncData({app, req, res, params, store, error}) {
    try {
      await store.dispatch('getPost', params.category)
    } catch (error) {
      return error({
        message: error.message,
        statusCode: error.response.status,
      })
    }
  },
  data: () => ({
    form: {
      fileName: null,
    },
    selectedFile: null,
  }),
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
      this.form.fileName = this.selectedFile.name

      console.log(this.form)
    },
    onUpload() {
      const formData = new FormData()
      formData.append('image', this.selectedFile, this.selectedFile.name)

      console.log({formData})
    },
  },
}
</script>
