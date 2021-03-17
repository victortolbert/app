<script>
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
)

export default {
  components: {FilePond},
  data() {
    return {
      myFiles: ['cat.jpeg'],
    }
  },
  methods: {
    handleFilePondInit() {
      console.log('FilePond has initialized', this.$refs.pond)

      // FilePond instance methods are available on `this.$refs.pond`
    },
  },
}
</script>

<template>
  <PageWrapper class="bg-gray-100">
    <PageHeading />

    <div class="space-y-1 lg:mt-8 lg:space-y-8 lg:px-8">
      <section class="p-8 bg-white shadow lg:rounded-lg">
        <FilePond
          name="test"
          ref="pond"
          label-idle="Drop files here..."
          :allow-multiple="true"
          accepted-file-types="image/jpeg, image/png"
          server="/api"
          :files="myFiles"
          @init="handleFilePondInit"
        />
      </section>
    </div>
  </PageWrapper>
</template>
