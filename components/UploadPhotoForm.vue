<template>
  <div
    style="max-width: 452px"
    class="relative p-4 mx-auto mb-2 bg-white shadow-md rounded-xl"
  >
    <header class="px-4 shadow-none card-header">
      <p
        class="flex items-center justify-between text-center text-white modal-card-title"
      >
        <span style="width: 24px; height: 48px" />
        <a
          class="relative self-start text-black cursor-pointer"
          style="width: 24px; height: 48px"
          @click="$emit('close')"
        >
          <span class="icon">
            <FontAwesomeIcon :icon="['fas', 'times']" size="xs" />
          </span>
        </a>
      </p>
    </header>
    <div class="text-center modal-body">
      <h2 class="text-3xl font-normal">{{ $t('upload_photo') }}</h2>
      <p v-if="ssvDisabled" class="w-2/3 pb-6 mx-auto mb-4 text-sm font-light">
        {{ $t('upload_photo_desc_disabled_ssv') }}
      </p>
      <p v-else class="w-2/3 pb-6 mx-auto mb-4 text-sm font-light">
        {{ $t('upload_photo_desc') }}
      </p>
      <div>
        <croppa
          v-model="myCroppa"
          :zoom-speed="15"
          :width="150"
          :height="150"
          :show-remove-button="false"
          :placeholder="''"
          :initial-image="initialImage"
          class="relative mx-auto my-2 cursor-pointer croppa-image"
          @new-image-drawn="newImageDrawn"
          @new-image="newImage"
          @draw="drawCount++"
        />
      </div>
      <button
        class="px-6 mb-2 rounded-full shadow button is-secondary"
        @click.prevent="myCroppa.chooseFile"
      >
        <input name="profile_image" hidden />
        {{ $t('upload_photo') }}
      </button>
      <div>
        <a
          :class="{invisible: !shouldShowDelete}"
          class="relative mb-2 is-danger"
          @click.prevent="deleteImage"
        >
          {{ $t('delete_photo') }}
        </a>
      </div>

      <div
        class="inline-flex content-center justify-start mx-auto mt-2 buttons w-150px"
      >
        <button
          style="width: 25px; height: 25px"
          class="button is-default image-control"
          @click="rotateCounterClockWise"
        >
          <FontAwesomeIcon :icon="['fas', 'undo']" class="text-2xs" />
        </button>
        <button
          style="width: 25px; height: 25px"
          class="button is-default image-control"
          @click="zoomOut"
        >
          <FontAwesomeIcon :icon="['fas', 'minus']" class="text-2xs" />
        </button>
        <button
          style="width: 25px; height: 25px"
          class="button is-default image-control"
          @click="resetImage"
        >
          <FontAwesomeIcon
            :icon="['fas', 'expand-arrows-alt']"
            class="text-2xs"
          />
        </button>
        <button
          style="width: 25px; height: 25px"
          class="button is-default image-control"
          @click="zoomIn"
        >
          <FontAwesomeIcon :icon="['fas', 'plus']" class="text-2xs" />
        </button>
        <button
          style="width: 25px; height: 25px"
          class="button is-default image-control"
          @click="rotateClockWise"
        >
          <FontAwesomeIcon :icon="['fas', 'redo']" class="text-2xs" />
        </button>
      </div>
      <br />
      <button
        :disabled="!isSavable"
        class="px-4 mx-auto mb-3 text-lg rounded-full shadow image-upload-save-btn button is-secondary"
        data-dismiss="modal"
        @click="saveImage"
      >
        {{ $t('edit_participant.save') }}
      </button>
      <p
        v-if="shouldShowDelete && !ssvDisabled"
        class="px-16 -mt-1 text-sm leading-tight text-gray"
      >
        {{ $t('edit_participant.student_star_wait') }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardUploadPhotoForm',
  props: {
    startingImage: {
      // This is the image that will show when the form first displays. This could be the defaultImage or a custom image.
      type: String,
      default: null,
    },
    isDefaultImage: {
      type: Boolean,
      default: false,
    },
    defaultImage: {
      // This is the image that will show if a custom image is deleted. Think of this as the placeholder image.
      type: String,
      default: '',
    },
    ssvDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      myCroppa: null,
      initialMetadata: null,
      initialImageUrl: null,
      initialImageFile: null,
      drawCount: 0,
      shouldShowDelete: false,
      initialImage: this.startingImage, // Required to be named as "initialImage" by Croppa
    }
  },
  computed: {
    hasImage() {
      if (this.myCroppa) {
        return this.myCroppa.hasImage()
      }
      return false
    },
    isSavable() {
      if (this.myCroppa && this.drawCount) {
        return this.initialImageUrl !== this.myCroppa.generateDataUrl()
      }
      return false
    },
  },
  mounted() {
    this.shouldShowDelete = !this.isDefaultImage
    this.initialImageUrl = this.myCroppa.generateDataUrl()
    // subscription used to refresh on second participant
    this.$store.subscribe((event, payload) => {
      if (event.type === 'new_participant') {
        this.myCroppa.remove()
        this.initialImageUrl = this.myCroppa.generateDataUrl()
      }
    })
  },
  methods: {
    resetImage() {
      this.gaEvent('Parent Dashboard', 'Photo Upload Form', 'Reset Image')
      this.myCroppa.applyMetadata(this.initialMetadata)
      this.$emit('is-photo-default', false)
    },
    newImageDrawn() {
      this.initialMetadata = this.myCroppa.getMetadata()
    },
    newImage() {
      this.shouldShowDelete = true
      this.$store.commit('SET_PHOTO_DIRTY', true)
      this.$emit('is-photo-default', false)
    },
    async saveImage() {
      this.gaEvent('Titan Edit Participant', 'Photo Upload Form', 'Save Image')
      this.initialImageUrl = this.myCroppa.generateDataUrl()
      this.initialImageFile = await this.myCroppa.promisedBlob()
      this.$store.dispatch(
        'setUserPhoto',
        this.initialImageUrl ? this.initialImageUrl : undefined,
      )
      this.$store.dispatch(
        'setUserPhotoFile',
        this.initialImageFile ? this.initialImageFile : undefined,
      )
      this.$store.commit('SET_PHOTO_DIRTY', true)
      this.$emit('photo-changed')
      this.$emit('close')
    },
    deleteImage() {
      this.shouldShowDelete = false
      this.myCroppa.remove()
      this.initialImage = this.defaultImage
      this.myCroppa.refresh()
      this.$store.dispatch('setUserPhoto', undefined)
      this.$store.dispatch('setUserPhotoFile', undefined)

      this.gaEvent('Parent Dashboard', 'Photo Upload Form', 'Delete Image')
      this.$emit('photo-removed')
      this.$emit('is-photo-default', true)
    },
    rotateCounterClockWise() {
      this.myCroppa.rotate(-1)
      this.gaEvent(
        'Parent Dashboard',
        'Photo Upload Form',
        'Rotate Counter Clockwise',
      )
      this.$emit('is-photo-default', false)
    },
    rotateClockWise() {
      this.myCroppa.rotate(1)
      this.gaEvent('Parent Dashboard', 'Photo Upload Form', 'Rotate Clockwise')
      this.$emit('is-photo-default', false)
    },
    zoomOut() {
      this.myCroppa.zoomOut()
      this.gaEvent('Parent Dashboard', 'Photo Upload Form', 'Zoom Out')
      this.$emit('is-photo-default', false)
    },
    zoomIn() {
      this.myCroppa.zoomIn()
      this.gaEvent('Parent Dashboard', 'Photo Upload Form', 'Zoom In')
      this.$emit('is-photo-default', false)
    },
  },
}
</script>

<style scoped>
.buttons {
  margin-bottom: 1.5rem;
}

.modal-body div:first-child {
  width: 150px;
  height: 150px;
}

.is-danger {
  color: #de3618;
}

.is-default {
  color: #333;
  background-color: #eee;
  border-color: #ccc;
}

.image-control {
  line-height: 11px;
  padding: 6px 7px;
}

.image-upload-save-btn {
  width: 200px;
}

.default-profile-image {
  height: 150px;
  width: 150px;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}
.croppa-image {
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
}
.croppa-image >>> canvas {
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
}
</style>
