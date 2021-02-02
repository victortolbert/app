<template>
  <form class="max-w-screen-sm p-8">
    <input
      @change="onFileSelected"
      type="file"
      style="display: none"
      ref="file"
    />

    <CoreInput
      v-if="selectedFile"
      v-model.trim="form.fileName"
      label="File name"
      placeholder="File Name"
    />

    <div class="flex items-center mt-2 space-x-2">
      <button
        @click="$refs.file.click()"
        type="button"
        class="inline-flex items-center px-6 py-3 text-base font-medium border border-transparent rounded-md shadow-sm text-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Select file
      </button>

      <button
        @click="onUpload"
        v-if="selectedFile"
        type="button"
        class="inline-flex items-center px-6 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Upload
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
          />
        </svg>
      </button>
    </div>
  </form>
</template>

<script>
import AWS from 'aws-sdk'
import required from 'vuelidate/lib/validators/required'

AWS.config.region = 'us-east-1'
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1:93b05872-6fbf-4f30-98f4-c1e89698c55c',
})

AWS.config.update({
  region: 'us-east-1',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:93b05872-6fbf-4f30-98f4-c1e89698c55c',
  }),
})

const client = new AWS.S3({apiVersion: '2006-03-01'})

export default {
  data: () => ({
    signurl: '',
    awss3: {
      signingURL: 'http://url-signer.test/',
      headers: {},
      params: {},
      sendFileToServer: true,
      withCredentials: false,
    },
    form: {
      firstName: null,
      fileName: null,
      newFileName: null,
    },
    endpoint: '',
    fileName: null,
    formData: null,
    selectedFile: null,
    valid: false,
  }),
  validations: {
    form: {
      fileName: {required},
    },
  },
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
      console.log({client})

      const uploadParams = {
        Bucket: 'td-aws-bucket',
        Key: 'album2/',
        Body: this.selectedFile,
      }

      client.upload(uploadParams, function (err, data) {
        if (err) {
          console.log('Error', err)
        }
        if (data) {
          console.log('Upload Success', data.Location)
        }
      })
    },
    sendingEvent(file, xhr, formData) {
      formData.append('paramName', 'some value or other')
    },
    s3UploadError(errorMessage) {
      console.log(errorMessage)
      // ...
    },
    s3UploadSuccess(s3ObjectLocation) {
      console.log(s3ObjectLocation)
      // ...
    },
    uploadFiles() {
      if (this.signurl) {
        this.$refs.myVueDropzone.setAWSSigningURL(this.signurl)
        this.$refs.myVueDropzone.processQueue()
      } else {
        this.$refs.urlsigner.focus()
        alert('Enter your signing URL')
      }
    },
    upload() {
      const params = {
        localFile: 'some/local/file',
        s3Params: {
          Bucket: 's3 bucket name',
          Key: 'some/remote/file',
        },
      }

      const uploader = client.uploadFile(params)

      uploader.on('error', function (err) {
        console.error('unable to upload:', err.stack)
      })

      uploader.on('progress', function () {
        console.log(
          'progress',
          uploader.progressMd5Amount,
          uploader.progressAmount,
          uploader.progressTotal,
        )
      })

      uploader.on('end', function () {
        console.log('done uploading')
      })
    },

    delete() {
      client
        .deleteFile(this.form.fileName)
        .then(response => console.log(response))
        .catch(err => console.error(err))
    },
  },
  mounted() {
    // const instance = this.$refs.foo.dropzone

    console.log({
      // instance,
      client,
    })
  },
}
</script>
