<template>
  <form :novalidate="!isIE11" @submit.prevent="submit">
    <div class="pb-4 mx-4 md:mx-0">
      <div class="pb-10 mb-10 border-b student-info">
        <div class="max-w-md md:mx-auto">
          <div class="mb-8 add-photo">
            <div class="flex items-center justify-start">
              <AvatarImage
                :src="avatarSrc"
                :should-emit="true"
                alt="Edit Participant Profile Image"
                class="cursor-pointer"
                @open="openDashboardPhotoUpload"
                @click.prevent="openDashboardPhotoUpload"
              />

              <button
                class="ml-3 rounded-full button is-secondary"
                @click.prevent="openDashboardPhotoUpload"
              >
                {{ $t('upload_photo') }}
              </button>
            </div>
          </div>

          <h2 class="mb-4 text-lg font-semibold">
            {{ $t('form_title') }}
          </h2>

          <BaseInput
            v-model.trim="form.firstName"
            :v="$v.form.firstName"
            :label="$t('first_name_label')"
            :placeholder="$t('first_name_placeholder')"
            required
          />

          <BaseInput
            v-model.trim="form.lastName"
            :v="$v.form.lastName"
            :label="$t('last_name')"
            :placeholder="$t('last_name_placeholder')"
            required
          />

          <div class="field">
            <label class="">{{ $t('classroom_label') }}</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select
                  v-model="form.classroom.id"
                  name="classroom"
                  class="select"
                  required
                >
                  <template v-for="(grade, label) in classroomsSorted">
                    <template v-if="label == 'Other'">
                      <option
                        v-for="classroom in grade"
                        :key="classroom.id"
                        :value="classroom.id"
                      >
                        {{ classroom.name }}
                      </option>
                    </template>
                    <template v-else>
                      <optgroup :label="label" :key="label">
                        <option
                          v-for="classroom in grade"
                          :key="classroom.id"
                          :value="classroom.id.toString()"
                        >
                          {{ classroom.name }}
                        </option>
                      </optgroup>
                    </template>
                  </template>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="displayFamilyPledging"
        class="pb-10 mb-10 border-b family-pledging"
      >
        <div class="max-w-md md:mx-auto">
          <div class="flex items-center mb-6">
            <h2 class="mr-6 text-lg font-semibold">
              {{ $t('edit_participant.family_pledging_header') }}
            </h2>
            <img
              src="/v3-assets/dashboard/images/family-pledging.png"
              style="width: 36px; height: 36px"
              alt=""
            />
          </div>

          <div class="field">
            <BSwitch v-model="form.familyPledgingEnabled" type="is-tertiary" />
          </div>

          <p class="text-sm">
            {{ $t('edit_participant.family_pledging_message') }}
          </p>
        </div>
      </div>

      <div class="pb-10 mb-10 border-b pledge-goal">
        <div class="max-w-md md:mx-auto">
          <h2 v-if="isFlat" class="mb-4 text-lg font-semibold">
            {{ $t('pledge_goal') }}
          </h2>
          <h2 v-else class="mb-4 text-lg font-semibold capitalize">
            {{ $t('pledge_goal') }}
            <span v-if="!isFlat"
              >: {{ form.unit.modifier }} {{ form.unit.name }}</span
            >
          </h2>
          <div class="field">
            <label class="text-sm" for="goal-amount">
              {{ $t('goal_amount') }}
            </label>
            <div class="control">
              <div class="flex items-center">
                <div>
                  <input
                    id="goal-amount"
                    v-model="$v.form.pledgeGoal.$model"
                    step="1"
                    min="0"
                    type="number"
                    class="w-16 font-bold input sm:w-32"
                  />
                </div>
                <div v-if="!isFlat" class="flex items-center">
                  <div class="px-2 text-lg font-bold sm:px-4">=</div>
                  <div class="leading-none">
                    <span class="text-lg font-bold">
                      ${{
                        (form.pledge_goal * form.unitRangeLow) | currency
                      }}
                      to ${{
                        (form.pledge_goal * form.unitRangeHigh) | currency
                      }}
                    </span>
                    <br />
                    <span class="text-xs">
                      $1
                      <span class="capitalize"
                        >{{ form.unit.modifier }} {{ form.unit.name }}</span
                      >
                      = ${{ form.unitRangeLow }} to ${{ form.unitRangeHigh }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p
              v-if="$v.form.pledge_goal.$invalid"
              class="pl-2 text-xs text-red-500 help is-danger"
            >
              {{ $t('goal_amount') }} {{ $t('is_required') }}
            </p>
          </div>
        </div>
      </div>

      <div class="mb-10 pledge-page-message">
        <div class="max-w-md md:mx-auto">
          <h2 class="mb-2 text-lg font-semibold">
            {{ $t('pledge_message') }}
          </h2>

          <div class="editor">
            <EditorMenuBar :editor="editor">
              <div
                slot-scope="{commands, isActive}"
                class="field has-addons"
                style="margin-bottom: -1px"
              >
                <p class="control">
                  <button
                    :class="['button', {'is-active': isActive.bold()}]"
                    @click.prevent="commands.bold"
                  >
                    <span class="icon is-small">
                      <FontAwesomeIcon :icon="['fas', 'bold']" />
                    </span>
                    <span>{{ $t('bold') }}</span>
                  </button>
                </p>

                <p class="control">
                  <button
                    :class="['button', {'is-active': isActive.italic()}]"
                    @click.prevent="commands.italic"
                  >
                    <span class="icon is-small">
                      <FontAwesomeIcon :icon="['fas', 'italic']" />
                    </span>
                    <span>{{ $t('italic') }}</span>
                  </button>
                </p>

                <p class="control">
                  <button
                    :class="['button', {'is-active': isActive.underline()}]"
                    @click.prevent="commands.underline"
                  >
                    <span class="icon is-small">
                      <FontAwesomeIcon :icon="['fas', 'underline']" />
                    </span>
                    <span>{{ $t('underline') }}</span>
                  </button>
                </p>
              </div>
            </EditorMenuBar>

            <EditorContent
              :editor="editor"
              class="p-2 mb-10 border editor__content"
            />
          </div>
        </div>
      </div>

      <div class="pb-10 mb-10 text-center">
        <div class="max-w-md md:mx-auto">
          <div class="flex flex-col items-center justify-start">
            <button
              :disabled="$v.$invalid"
              class="inline-block w-full py-2 mb-4 text-lg font-semibold leading-none text-white rounded-full shadow-md sm:w-64 focus:outline-none focus:shadow-outline bg-secondary"
            >
              {{ $t('save') }}
            </button>
            <a
              href="/v3/home/dashboard"
              class="inline-block w-full py-2 mb-4 text-lg font-semibold leading-none bg-white border rounded-full shadow-md sm:w-64 focus:outline-none focus:shadow-outline text-secondary hover:text-secondary-light border-secondary hover:border-secondary-light"
            >
              {{ $t('cancel') }}
            </a>
          </div>

          <a class="inline-block mb-4" href="/v3/terms#" target="_new">
            {{ $t('view_agreement') }} </a
          ><br />
          <button
            v-tooltip="deleteTooltip"
            :disabled="false"
            class="text-red"
            href="#"
            @click.prevent="deleteStudent"
          >
            {{ $t('delete') }}
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import {Editor, EditorContent, EditorMenuBar} from 'tiptap'
import {Bold, Italic, Link, Underline} from 'tiptap-extensions'
import required from 'vuelidate/lib/validators/required'

const DEFAULT_IMAGE = '/v3-assets/dashboard/images/dashboard-avatar.svg'
const isIE =
  '-ms-scroll-limit' in document.documentElement.style &&
  '-ms-ime-align' in document.documentElement.style
const isEdge =
  '-ms-scroll-limit' in document.documentElement.style &&
  '-ms-ime-align' in document.documentElement.style &&
  !window.navigator.msPointerEnabled

export default {
  name: 'EditParticipantForm',
  status: 'prototype',
  release: '1.0.0',
  components: {
    EditorContent,
    EditorMenuBar,
  },
  props: {
    participant: {
      type: Object,
      default: null,
    },
    classrooms: {
      type: Array,
      default: () => [],
    },
    settings: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    isIE11: isIE && !isEdge,
    form: {
      firstName: '',
      lastName: '',
      familyPledgingEnabled: '',
      pledgeGoal: '',
      pledgePageText: '',
      classrooms: [],
      classroom: {},
      unit: {},
      unitRangeLow: null,
      unitRangeHigh: null,
      imageName: '',
    },
    editor: null,
    tempUploadedPhoto: null,
    hasPhotoBeenRemoved: null,
  }),
  validations: {
    form: {
      firstName: {required},
      lastName: {required},
      pledgeGoal: {required},
    },
  },
  computed: {
    ...mapState(['newUserPhoto', 'newUserPhotoFile']),
    ...mapGetters(['avatarPath', 'programParticipantCount']),
    program() {
      return this.participant.participant_info.classroom.group.program
    },
    avatarSrc() {
      if (this.tempUploadedPhoto) {
        return this.tempUploadedPhoto
      }
      if (this.participant.profile.image_name === null) {
        return DEFAULT_IMAGE
      }
      return this.avatarPath + this.form.image_name
    },
    classroomsByGrade() {
      return this.classrooms
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
    classroomsGroupAndSorted() {
      return Object.keys(this.classroomsByGrade).sort()
    },
    classroomsSorted() {
      return this.classrooms
        .filter(classroom => !classroom.deleted)
        .map(classroom => ({
          id: classroom.id,
          name: classroom.name,
          gradeId: classroom.grade.id,
          gradeName: classroom.grade.name,
          gradeDisplayName: classroom.grade.display_name,
        }))
      // .sort((a, b) => {
      //   if (a.gradeId > b.gradeId) return 1
      //   if (a.gradeId < b.gradeId) return -1
      //   if (a.name > b.name) return 1
      //   if (a.name < b.name) return -1
      // })
      // .reduce((classrooms, classroom) => {
      //   const grade =
      //     classroom.gradeId > 0
      //       ? `${classroom.gradeName} ${this.$t('edit_participant.grade')}`
      //       : classroom.gradeName
      //   if (!classrooms[grade]) {
      //     classrooms[grade] = []
      //   }
      //   classrooms[grade].push(classroom)
      //   return classrooms
      // }, {})
    },
    isProgramFamilyPledgingEnabled() {
      return this.program.program_pledge_setting.family_pledging_enabled === 1
    },
    displayFamilyPledging() {
      if (this.$store.state.user.is_teacher_user) {
        return false
      }
      const isProgramFamilyPledgingEnabled =
        this.program.program_pledge_setting.family_pledging_enabled === 1
      const hasMultipleParticipantInProgram =
        this.programParticipantCount(this.program.id) > 1
      return isProgramFamilyPledgingEnabled && hasMultipleParticipantInProgram
    },
    isFlat() {
      return this.program.program_pledge_setting.flat_donate_only === 1
    },
    deleteTooltip() {
      return {
        classes: ['info'],
        content: this.$t('delete_tooltip'),
        placement: 'auto',
        trigger: 'hover click focus',
      }
    },
    editorContent() {
      if (this.emptyEditorText) {
        return this.defaultPledgePageText
      }

      return this.form.pledge_page_text
    },
    emptyEditorText() {
      // Use regex in replace() to remove whitespace characters in the pledge page text.
      return (
        this.form.pledgePageText.replace(/\s+/g, '') === '<p></p>' ||
        this.form.pledgePageText === ''
      )
    },
    defaultPledgePageText() {
      return this.parseLanguage(
        this.$t('edit_participant.default_pledge_page_message'),
        {
          funds_raised_for: this.participant.participant_info.classroom.group
            .program.microsite.funds_raised_for,
          event_date: this.formatEventDate(
            this.participant.participant_info.classroom.group.program.fun_run,
          ),
          unit_type: this.settings.unit.name_plural,
          event_name: this.participant.participant_info.classroom.group.program
            .event_name,
          link:
            '/v3/tkdashboard/?redirect=' +
            encodeURI(
              'auth/login/' +
                this.participant.fr_code +
                '/view-participant/pledge',
            ),
        },
      )
    },
  },
  mounted() {
    const {firstName, lastName} = this.participant
    const {classroom, familyPledgingEnabled} = this.participant.participant_info
    const {pledgeGoal, pledgePageText, imageName} = this.participant.profile
    const {unit, unitRangeLow, unitRangeHigh} = this.settings

    this.form = {
      firstName,
      lastName,
      classroom,
      familyPledgingEnabled: !!familyPledgingEnabled,
      pledgeGoal: this.$options.filters.Currency(pledgeGoal),
      pledgePageText,
      unit,
      unitRangeLow,
      unitRangeHigh,
      imageName,
    }

    this.editor = new Editor({
      extensions: [new Bold(), new Italic(), new Link(), new Underline()],
      content: this.editorContent,
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  methods: {
    ...mapMutations(['SET_PHOTO_DIRTY']),
    ...mapActions(['refreshUser']),
    formatEventDate(date) {
      const year = date.slice(2, 4)
      const month = date.slice(5, 7)
      const day = date.slice(8, 10)
      return month + '/' + day + '/' + year
    },
    getSubmitData() {
      this.form.pledge_page_text = this.editor.getHTML()

      const formData = new FormData()

      formData.append('participant_id', this.participant.id)
      formData.append('first_name', this.form.firstName)
      formData.append('last_name', this.form.lastName)
      formData.append('classroom_id', this.form.classroom.id)
      formData.append(
        'family_pledging_enabled',
        this.form.family_pledging_enabled ? 1 : 0,
      )
      formData.append('pledge_goal', this.form.pledgeGoal)
      formData.append('pledge_page_text', this.form.pledgePageText)

      if (this.hasPhotoBeenRemoved) {
        formData.append('deleteFile', 1)
      } else if (this.newUserPhotoFile) {
        formData.append('photoFile', this.newUserPhotoFile)
      }

      return formData
    },
    submit() {
      this.$v.$touch()
      this.$forceUpdate()

      // if (this.$v.$invalid) return
      // const submitData = this.getSubmitData()
      // axios
      //   .post('/v3/participant/update', submitData, {
      //     headers: {'Content-Type': 'multipart/form-data'},
      //   })
      //   .then(response => {
      //     this.refreshUser()
      //     if (this.$store.state.photoDirty) {
      //       this.gaEvent(
      //         'Parent Dashboard',
      //         'Edit Participant Form',
      //         'Upload Photo',
      //       )
      //       this.SET_PHOTO_DIRTY(false)
      //     }

      //     this.$v.$reset()
      //     this.SET_PHOTO_DIRTY(false)

      //     if (this.emptyEditorText) {
      //       this.editor.destroy()
      //       this.editor = new Editor({
      //         extensions: [
      //           new Bold(),
      //           new Italic(),
      //           new Link(),
      //           new Underline(),
      //         ],
      //         content: this.editorContent,
      //       })
      //     }

      //     this.$modal.open({
      //       parent: this,
      //       component: SaveSuccessModal,
      //       scroll: 'keep',
      //       hasModalCard: true,
      //       canCancel: false,
      //       props: {
      //         title: this.$t('edit_participant.saved_successfully'),
      //         reload: true,
      //       },
      //     })
      //   })
    },
    deleteStudent() {
      // this.$dialog.confirm({
      //   title: 'Deleting Student',
      //   message: `You are about to delete this participant? Are you sure you want to continue?`,
      //   cancelText: 'No',
      //   confirmText: 'Yes',
      //   type: 'is-danger',
      //   hasIcon: true,
      //   onConfirm: () =>
      //     this.$toast.open({
      //       duration: 3000,
      //       message: `Student has been deleted`,
      //       position: 'is-top',
      //       type: 'is-danger',
      //     }),
      // })
    },
    openDashboardPhotoUpload() {
      // const cacheBust = '?' + Date.now()
      // let isDefaultImage = this.avatarSrc === DEFAULT_IMAGE
      // let initialImage = this.avatarSrc + cacheBust
      // if (this.tempUploadedPhoto && this.hasPhotoBeenRemoved) {
      //   isDefaultImage = true
      // }
      // if (this.tempUploadedPhoto) {
      //   initialImage = this.avatarSrc
      // }
      // this.$modal.open({
      //   parent: this,
      //   component: UploadPhotoForm,
      //   hasModalCard: false,
      //   width: 'auto',
      //   onCancel: this.unBlur,
      //   canCancel: ['escape', 'outside'],
      //   events: {
      //     close: evt => {
      //       this.unBlur()
      //     },
      //     'photo-changed': evt => {
      //       this.tempUploadedPhoto = this.newUserPhoto
      //       this.SET_PHOTO_DIRTY(true)
      //     },
      //     'photo-removed': evt => {
      //       this.tempUploadedPhoto = null
      //       this.SET_PHOTO_DIRTY(true)
      //     },
      //     'is-photo-default': isPhotoDefault => {
      //       this.hasPhotoBeenRemoved = isPhotoDefault
      //     },
      //   },
      //   props: {
      //     lang: this.lang,
      //     startingImage: initialImage,
      //     isDefaultImage,
      //     defaultImage: DEFAULT_IMAGE,
      //     ssvDisabled: !!this.program.ssv_disabled,
      //   },
      // })
      // this.blur()
    },
  },
}
</script>
