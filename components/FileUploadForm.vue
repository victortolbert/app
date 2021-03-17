<script>
import S3 from 'aws-s3'
import required from 'vuelidate/lib/validators/required'
import validations from '~/helpers/validations'

export default {
  data() {
    return {
      form: {
        firstName: null,
        fileName: '',
      },
      endpoint: '',
      fileName: null,
      formData: null,
      selectedFile: {},
      valid: false,
      config: {
        bucketName: 'myBucket',
        dirName: 'photos',
        region: 'eu-west-1',
        accessKeyId: 'ANEIFNENI4324N2NIEXAMPLE',
        secretAccessKey: 'cms21uMxçduyUxYjeg20+DEkgDxe6veFosBT7eUgEXAMPLE',
        s3Url: 'https://my-s3-url.com/',
      },
      ...validations,
    }
  },
  validations: {
    form: {
      fileName: {required},
    },
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
      this.form.fileName = this.selectedFile.name
      console.log(this.form.fileName)
    },
    onUpload() {
      const client = new S3(this.config)
      let formData = new FormData()

      formData.append('image', this.selectedFile, this.selectedFile.name)

      client
        .uploadFile(this.selectedFile, this.newFileName)
        .then(data => console.log(data))
        .catch(err => console.error(err))

      // this.$axios
      //   .post(this.endpoint, formData, {
      //     onUploadProgress: uploadEvent => {
      //       console.log(
      //         'Upload progress: ' +
      //           Math.round((uploadEvent.loaded / uploadEvent.total) * 100) +
      //           '%',
      //       )
      //     },
      //   })
      //   .then(response => {
      //     console.log(response)
      //   })
    },
    uploadFile(fieldName, files) {
      let file = files[0]
      // TODO: Upload it to S3
      // TODO: Get the URL for the file
      this.video[fieldName] = file.name
      //   debugger
    },
  },
}
</script>

<template>
  <form>
    <input
      class="hidden"
      type="file"
      @change="onFileSelected"
      ref="fileInput"
    />

    <div>
      <label for="filename" class="block text-sm font-medium text-gray-700">
        Filename
      </label>
      <input
        class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        id="filename"
        v-if="form.fileName"
        v-model="form.fileName"
        placeholder="Enter filename"
      />
    </div>

    <div class="flex items-center mt-4 space-x-2">
      <button
        v-if="!form.fileName"
        @click="$refs.fileInput.click()"
        type="button"
        class="inline-flex items-center px-6 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Select File
      </button>

      <div v-if="form.fileName" class="flex items-center space-x-4">
        <button class="underline" @click="form.fileName = ''">
          Reselect File
        </button>
        <button
          @click="onUpload"
          type="button"
          class="inline-flex items-center px-6 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Upload File
          <svg
            class="w-5 h-5 ml-3 -mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </form>
</template>

/** * { * Response: { * bucket: "your-bucket-name", * key: "photos/image.jpg", *
location: "https://your-bucket.s3.amazonaws.com/photos/image.jpg" * } * } */
