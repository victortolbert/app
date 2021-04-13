<script>
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  data() {
    return {
      firstName: '',
      lastName: '',
      classroom: null,
      terms: false,
      photo: null,
      photoFile: null,
      photoText: '',
      showOptional: true,
      errors: null,
      submitting: false,
      checkboxRequired: false,
    }
  },
  computed: {
    school() {
      return this.user.participants[this.participantNumber - 1].school
    },
    ssvDisabled() {
      return this.school.ssv_disabled
    },
    classroomsByGrade() {
      return this.school.classrooms
        .filter(classroom => !classroom.deleted)
        .reduce((classrooms, classroom) => {
          const grade =
            classroom.grade.id > 0
              ? `${classroom.grade.name} Grade`
              : classroom.grade.name
          if (!classrooms[grade]) {
            classrooms[grade] = []
          }
          classrooms[grade].push(classroom)
          return classrooms
        }, {})
    },
    participantNumber() {
      return this.user.participants.length
    },
    user() {
      return this.$store.state.user
    },
  },
  mounted() {
    this.hjTag('Participant Registration')
    this.hjTrigger('dash-register-participant')
    // $('#uploadPhotoModal').on('shown.bs.modal', () => {
    //   this.hjTrigger('dash-upload-photo-form')
    // })
    this.showUploadText()
    this.photo = this.photoUrl()
    this.photoFile = this.getPhotoFile()
    this.$store.subscribe((event, payload) => {
      if (event.type === 'SET_USER_PHOTO') {
        this.photo = this.photoUrl()
      }
    })

    this.$store.subscribe((event, payload) => {
      if (event.type === 'SET_USER_PHOTO_FILE') {
        this.photoFile = this.getPhotoFile()
      }
    })
  },
  methods: {
    handleSubmit(e) {
      if (this.submitting) {
        return
      }

      // Enable checkbox to be required
      this.checkboxRequired = true

      // Have to wait before running submission because DOM update can take a bit of time
      this.$nextTick(() => {
        this.$refs.trueSubmitButton.click()
      })
    },
    resetSubmitButton() {
      this.submitting = false
    },
    submit() {
      this.submitting = true
      const formData = new FormData()

      formData.append('firstName', this.firstName)
      formData.append('lastName', this.lastName)
      formData.append('classroomId', this.classroom)
      formData.append('isAgreed', this.terms)
      if (this.photoFile !== null) {
        formData.append('imageFile', this.photoFile)
      }

      this.$axios
        .post('/v3/register/participant', formData, {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(response => {
          const participant = {
            index: this.participantNumber - 1,
            data: response.data,
          }
          this.$store.commit('UPDATE_PARTICIPANT', participant)

          if (formData.imageB64Url !== this.$store.state.defaultUserImage) {
            this.gaEvent(
              'Titan Registration',
              'Parent Registration',
              'Student Photo',
            )
          } else {
            this.gaEvent(
              'Titan Registration',
              'Parent Registration',
              'Student No Photo',
            )
          }
          if (
            this.user.participants.length > 1 &&
            !formData.isFamilyPledgingEnabled
          ) {
            this.gaEvent(
              'Titan Registration',
              'Parent Registration',
              'No Family Pledge',
            )
          }
          this.$emit('participant-registered')
        })
        .catch(error => {
          this.errors = JSON.parse(error.request.response).errors
        })
        .finally(() => {
          this.submitting = false
        })
    },
    showUploadText() {
      this.photoText = this.$t('participant_registration.upload_photo')
      this.showOptional = true
    },
    showEditText() {
      this.photoText = this.$t('participant_registration.edit_photo')
      this.showOptional = false
    },
    photoUrl() {
      if (
        this.user.participants[this.participantNumber - 1].photo_url ===
        undefined
      ) {
        this.showUploadText()
        return this.$store.state.defaultUserImage
      }
      this.showEditText()
      return this.user.participants[this.participantNumber - 1].photo_url
    },
    getPhotoFile() {
      if (
        this.user.participants[this.participantNumber - 1].photo_file ===
        undefined
      ) {
        return null
      }
      return this.User.participants[this.participantNumber - 1].photo_file
    },
    getImageBlob() {
      const block = this.photo.split(';')
      const contentType = block[0].split(':')[1]
      const realData = block[1].split(':')[1]
      const blob = this.b64toBlob(realData, contentType)
      return blob
    },
    b64toBlob(b64Data, contentType, sliceSize) {
      contentType = contentType || ''
      sliceSize = sliceSize || 512

      const byteCharacters = atob(b64Data)
      const byteArrays = []

      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize)

        const byteNumbers = new Array(slice.length)
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i)
        }

        const byteArray = new Uint8Array(byteNumbers)

        byteArrays.push(byteArray)
      }

      const blob = new Blob(byteArrays, {type: contentType})
      return blob
    },
    uploadPhoto() {
      this.gaEvent('Titan Registration', 'Participant Form', 'Upload Photo')
    },
  },
})
</script>

<template>
  <div>
    <h1 class="mt-8 mb-46px text-28 fw-200 d-block']">
      {{ $t('participant_registration.register_student') }}
    </h1>
    <form @submit.prevent="submit">
      <div
        id="upload-photo"
        :data-target="
          ssvDisabled ? '#uploadPhotoModalSsvDisabled' : '#uploadPhotoModal'
        "
        data-toggle="modal"
        class="cursor-pointer"
        @click="uploadPhoto"
      >
        <img :src="photo" class="profile-picture btn-circle" />

        <input
          class="mx-auto avatar d-block"
          name="profile_picture"
          type="file"
        />
        <label
          class="mx-auto cursor-pointer text-15 d-block font-weight-bold"
          for="profile_picture"
        >
          <u>{{ photoText }}</u>
          <p v-if="showOptional" class="text-12 fw-300">
            {{ $t('participant_registration.optional') }}
          </p>
        </label>
      </div>
      <div v-if="errors">
        <ul
          v-for="(error, key) in errors"
          :key="key"
          class="p-4 alert alert-danger"
        >
          <li
            v-for="(message, index) in error"
            :key="index"
            class="error-list-item text-danger"
          >
            {{ message }}
          </li>
        </ul>
      </div>
      <TextInput
        :label="$t('participant_registration.student_first_name')"
        v-model="firstName"
        type="text"
        name="first_name"
        required
        @invalid="resetSubmitButton"
      />
      <TextInput
        :label="$t('participant_registration.student_last_name')"
        v-model="lastName"
        class="mb-28px"
        type="text"
        name="last_name"
        required
        @invalid="resetSubmitButton"
      />

      <SelectionInput
        :default_value="null"
        :default_text="$t('participant_registration.select_classroom')"
        v-model="classroom"
        class="mb-28px blue-rounded"
        name="classroom"
        required
        @invalid="resetSubmitButton"
      >
        <template v-for="(grade, label) in classroomsByGrade">
          <template v-if="label == 'Other'">
            <option
              v-for="classroomGrade in grade"
              :key="classroomGrade.id"
              :value="classroomGrade.id"
            >
              {{ classroomGrade.name }}
            </option>
          </template>
          <template v-else>
            <optgroup :label="label" :key="label">
              <option
                v-for="classroomGrade in grade"
                :key="classroomGrade.id"
                :value="classroomGrade.id.toString()"
              >
                {{ classroomGrade.name }}
              </option>
            </optgroup>
          </template>
        </template>
      </SelectionInput>

      <input ref="trueSubmitButton" type="submit" style="display: none" />

      <input
        v-model="terms"
        :required="checkboxRequired"
        class="checkbox"
        name="participation_terms"
        type="checkbox"
        @invalid="resetSubmitButton"
      />
      <label class="text-12 mb-28px">
        {{ $t('participant_registration.participation_terms_prefix') }}
        <a id="print-terms" href="/v3/terms" target="_blank">
          {{ $t('participant_registration.participation_terms_link') }}
        </a>
      </label>
      <button
        :disabled="submitting"
        type="button"
        class="mx-auto mb-1 btn btn-primary btn-round d-block w-200px btn-drop-shadow text-18"
        @click="handleSubmit"
      >
        {{ $t('participant_registration.add_student') }}
        <i v-if="submitting" class="fa fa-spinner fa-spin" />
      </button>
    </form>
  </div>
</template>

<style scoped>
.fp-icon {
  width: 36px;
  height: 36px;
}

.fp-toggle > div {
  height: 24px;
  width: 54px;
  border-radius: 12px;
  background-color: #ff7b02;
}
.avatar {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.checkbox {
  margin-right: 6px;
  display: inline;
}
.checkbox-label {
  display: inline;
  padding: 0px;
}
.profile-picture {
  width: 100px;
  height: 100px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 4px 0px;
}
.error-list-item {
  list-style: none;
}
</style>
