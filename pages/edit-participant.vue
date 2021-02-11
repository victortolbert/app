<template>
  <section
    :class="program.microsite.microsite_color_theme.theme_name"
    class="min-h-screen page"
  >
    <AppHeader>
      <PageHeader>Edit Student</PageHeader>
    </AppHeader>
    <div class="pt-24 pb-4 mx-4 md:mx-0 lg:pt-40">
      <div class="max-w-md md:mx-auto">
        <EditParticipantForm
          ref="editParticipantForm"
          :participant="participant"
          :classrooms="classrooms"
          :settings="settings"
        />
      </div>
    </div>
  </section>
</template>

<script>
import FamilyPledging from '@/utilities/FamilyPledging'
import {mapState} from 'vuex'

export default {
  name: 'EditParticipantView',
  computed: {
    ...mapState(['photoDirty']),
    lang() {
      return this.$store.state.lang
    },
    settings() {
      return {
        unit: this.program.unit,
        unitRangeLow: this.program.unit_range_low,
        unitRangeHigh: this.program.unit_range_high,
      }
    },
    program() {
      let participantProgram = {}
      this.$store.state.User.programs.forEach(program => {
        program.participants.forEach(participant => {
          if (participant.id === this.id) {
            participantProgram = program
          }
        })
      })

      return participantProgram
    },
    id() {
      return parseInt(this.$route.params.id) || 1
    },
    participant() {
      return new FamilyPledging(
        this.$store.state.User.programs,
        parseInt(this.id),
      ).currentParticipant
    },
    classrooms() {
      return this.program.classrooms
    },
  },
  mounted() {
    window.addEventListener(
      'beforeunload',
      e => {
        const editProfileForm = this.$refs.editParticipantForm
        if (editProfileForm.$v.$anyDirty || this.$store.state.photoDirty) {
          e.preventDefault()
          e.returnValue = ''
        }
      },
      false,
    )
  },
  methods: {
    letUserLeave(next, modalActive) {
      if (modalActive) {
        document.querySelector('.modal.is-active').classList.remove('is-active')
        document.getElementById('app').removeAttribute('style')
      }
      next()
    },
  },
  beforeRouteLeave(to, from, next) {
    const modalActive = !!document.querySelector('.modal.is-active')
    const editProfileForm = this.$refs.editParticipantForm

    if (editProfileForm.$v.$anyDirty || this.$store.state.photoDirty) {
      const answer = window.confirm(this.lang.edit_participant.confirm_leave)
      if (answer) {
        this.letUserLeave(next, modalActive)
      }
      next(false)
    } else {
      this.letUserLeave(next, modalActive)
    }
  },
  metaInfo: {
    title: 'Edit Participant',
  },
}
</script>
