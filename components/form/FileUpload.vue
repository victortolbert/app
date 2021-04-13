<script>
import {defineComponent} from '@nuxtjs/composition-api'
import AWS from 'aws-sdk'
import { nanoid } from 'nanoid'
import required from 'vuelidate/lib/validators/required'
import NProgress from 'nprogress'

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'AKIAXGYXHSXXHYBR5HOE',
  secretAccessKey: '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',
})

export default defineComponent({
  data() {
    return {
      error: null,
      location: '',
      isUploading: false,
      selectedFile: null,
      form: {
        folderName: 'album2',
        fileName: '',
      },
    }
  },
  validations: {
    form: {
      fileName: { required },
    },
  },
  computed: {
    newFileName() {
      return `${nanoid(11)}-${this.form.fileName}`
      // return `${uuidv4()}-${this.selectedFile.name}`
      // return `${Math.random().toString().slice(2, 5)}-${this.selectedFile.name}`
      // return `${Math.random().toString().slice(2, 5)}-${this.selectedFile.name}`
    },
  },
  methods: {
    onSelectFile() {
      this.$refs.fileInput.click()
      this.location = ''
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
      this.form.fileName = this.selectedFile.name
      // this.$refs.fileName.$el.focus()
      // this.$nextTick(() => this.$refs.fileName.focus().select())
    },
    onUpload() {
      this.isUploading = true
      let decimal = 0.0
      NProgress.set(decimal)

      const upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: 'td-aws-bucket',
          Key: `${this.form.folderName}/${this.form.fileName}`,
          Body: this.selectedFile,
          Metadata: {
            foo: 'bar',
          },
        },
        tags: [{ Key: 'tag1', Value: 'value1' }],
      })

      const promise = upload.promise()

      promise.then(
        data => (this.location = data.Location),
        error => (this.error = error),
      )

      promise.finally(() => {
        this.isUploading = false
        this.selectedFile = null
      })

      upload.on('httpUploadProgress', ({ loaded, total }) => {
        const progressPercentage = Math.round((loaded / total) * 100)
        decimal = parseFloat(progressPercentage) / 100.0

        NProgress.set(decimal)

        this.$refs.progressBar.style.width = progressPercentage + '%'

        if (progressPercentage < 100) {
          this.fileUpload.progressStatus = progressPercentage
        } else if (progressPercentage === 100) {
          this.fileUpload.progressStatus = progressPercentage
          this.fileUpload.status = 'Uploaded'
        }
      })
    },
    success(data) {
      // console.log(data)
      this.location = data.Location
    },
  },
})
</script>


<template>
  <form class="max-w-screen-sm" enctype="multipart/form-data">
    <h2 class="text-lg font-medium text-gray-600">File Upload</h2>

    <div v-if="location" class="p-4 rounded-md bg-green-50">
      <div class="flex">
        <div class="flex-shrink-0">
          <!-- Heroicon name: check-circle -->
          <svg
            class="w-5 h-5 text-green-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-green-800">Successfully uploaded</p>
        </div>
        <div class="pl-3 ml-auto">
          <div class="-mx-1.5 -my-1.5">
            <button
              class="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
            >
              <span class="sr-only">Dismiss</span>
              <!-- Heroicon name: x -->
              <svg
                class="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <input @change="onFileSelected" type="file" style="display: none" ref="fileInput" />

    <div class="mt-4" v-if="selectedFile">
      <label
        for="file-name"
        class="block text-xs font-medium tracking-wider text-gray-700 uppercase"
      >File Name</label>
      <input
        id="file-name"
        name="file_name"
        type="text"
        v-model.trim="form.fileName"
        placeholder="File Name"
        ref="fileName"
        @focus="$event.target.select()"
        autocomplete="off"
        class="block w-full border-gray-300 rounded-md select-all focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
      />

      <p class="mt-2 text-sm">{{ newFileName }}</p>
    </div>

    <div class="flex items-center mt-4 space-x-2">
      <button
        v-if="!selectedFile"
        @click="onSelectFile"
        type="button"
        class="inline-flex items-center px-6 py-3 text-base font-medium border border-transparent rounded-md shadow-sm bg-primary-100 text-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >Select file</button>

      <button
        @click="onUpload"
        v-if="selectedFile"
        type="button"
        :class="[
          { 'cursor-not-allowed disabled:opacity-50': isUploading },
          'inline-flex items-center px-6 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
        ]"
        :disabled="isUploading"
      >
        <svg
          :class="[
            'w-5 h-5 mr-2 -ml-1 text-white',
            { 'animate-spin': isUploading },
          ]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path v-if="isUploading" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
          <path v-else d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" />
        </svg>
        Upload
      </button>
    </div>

    <a
      v-if="location"
      class="block px-3 py-2 mt-4 text-blue-500 underline border"
      :href="location"
    >{{ location }}</a>
  </form>
</template>


<style>
#myProgress {
  width: 100%;
  background-color: grey;
}
#myBar {
  width: 1%;
  height: 30px;
  background-color: green;
}

/* Make clicks pass-through */
#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: #29d;

  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;

  width: 100%;
  height: 2px;
}

/* Fancy blur effect */
#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px #29d, 0 0 5px #29d;
  opacity: 1;

  -webkit-transform: rotate(3deg) translate(0px, -4px);
  -ms-transform: rotate(3deg) translate(0px, -4px);
  transform: rotate(3deg) translate(0px, -4px);
}

/* Remove these to get rid of the spinner */
#nprogress .spinner {
  display: block;
  position: fixed;
  z-index: 1031;
  top: 15px;
  right: 15px;
}

#nprogress .spinner-icon {
  width: 18px;
  height: 18px;
  box-sizing: border-box;

  border: solid 2px transparent;
  border-top-color: #29d;
  border-left-color: #29d;
  border-radius: 50%;

  -webkit-animation: nprogress-spinner 400ms linear infinite;
  animation: nprogress-spinner 400ms linear infinite;
}

.nprogress-custom-parent {
  overflow: hidden;
  position: relative;
}

.nprogress-custom-parent #nprogress .spinner,
.nprogress-custom-parent #nprogress .bar {
  position: absolute;
}

@-webkit-keyframes nprogress-spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes nprogress-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
