<template>
  <section
    :class="participantProgram.microsite.microsite_color_theme.theme_name"
    class="min-h-screen page"
  >
    <AppHeader :program="participantProgram">
      <div class="flex flex-col">
        <PageHeader>
          {{ $t('easy_emailer') }}
        </PageHeader>
        <p class="text-white sub-header sm:text-xl md:text-2xl">
          {{ participantProgram.event_name }}
        </p>
      </div>
    </AppHeader>
    <main class="pt-24 lg:pt-40">
      <div class="max-w-lg mx-auto">
        <div class="p-8 mb-8 text-lg bg-grey-lightest md:bg-white md:text-2xl">
          <p class="mb-8">
            {{ $t('add_contacts_to_send_emails') }}
            <a class="font-semibold" @click="viewEmailTemplates">{{
              $t('view_emails_here')
            }}</a>
          </p>

          <p>
            {{ $t('send_your_own_email_intro') }}
            <br class="sm:hidden" />
            <a
              id="pre-written-template"
              :href="`mailto:?body=${getPreWrittenEmailTemplate()}&subject=${getPreWrittenEmailTemplateSubject()}`"
              class="font-semibold"
              @click="sendPreWrittenTemplateEmail"
              >{{ $t('pre_written_template') }}</a
            >
          </p>
        </div>
        <AddContactsButtons @addContactsToDisplay="addContactsToDisplay" />
        <ContactsTable
          ref="contactsTable"
          :all-selected="allSelectedTest"
          :contacts="getContacts"
          :participant-user-id="participant.participant_info.user_id"
          @toggleSelectAll="allSelected = !allSelected"
        />
      </div>
    </main>
  </section>
</template>

<script>
export default {
  props: {
    participantUserId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      active: false,
      allSelected: true,
      isEditing: false,
      hasPreviousSponsors: true,
      EMAIL: 3,
      EMAIL_VIDEO: 10,
      EMAIL_SSV_DISABLED: 22,
    }
  },
  computed: {
    tooltipOptions() {
      return {
        classes: ['info'],
        content:
          'Removing a contact will remove them from this list for the current email campaign.<br><br> Unsubscribed means a sponsor has decided to stop receiving these emails.',
        placement: 'left-start',
        trigger: 'hover click focus',
      }
    },
    allSelectedTest() {
      return this.allSelected
    },
    emailShareLink() {
      const referrerId = this.hasVideo() ? this.EMAIL_VIDEO : this.EMAIL
      const specialUrl = this.participant.special_urls.find(
        specialUrl => specialUrl.referrer.id === referrerId,
      )
      const overrideReferrerId = this.hasVideo()
        ? ''
        : '/' + this.EMAIL_SSV_DISABLED
      return (
        window.location.protocol +
        '//' +
        window.location.hostname +
        '/v3/dash/' +
        specialUrl.short_key +
        overrideReferrerId
      )
    },
    participant() {
      return this.$store.getters.participantForPreviousSponsors
    },
    participantProgram() {
      return this.$store.getters.participantProgram
    },
    getContacts() {
      const potentialSponsors = this.getPotentialSponsors(
        this.participantUserId,
      )
      const previousSponsors = this.$store.getters.getPreviousSponsors
      const currentSponsorEmails = this.$store.getters.getCurrentSponsorEmails

      const sponsors = previousSponsors.concat(potentialSponsors)

      // Set statuses & opt out
      sponsors.forEach(sponsor => {
        const isCurrentSponsor = currentSponsorEmails.includes(sponsor.email)
        const isPotentialSponsor = potentialSponsors.find(
          potentialSponsor => potentialSponsor.email === sponsor.email,
        )
        if (isPotentialSponsor) {
          sponsor.deleted = isPotentialSponsor.deleted
        }

        sponsor.isSelectable = false
        sponsor.isSelected = false

        if (sponsor.optOut) {
          sponsor.status = 'UNSUBSCRIBED'
        } else if (isCurrentSponsor) {
          sponsor.status = 'PLEDGED'
        } else if (isPotentialSponsor) {
          sponsor.status = 'ACTIVE'
        } else {
          sponsor.status = 'NOT_ENROLLED'
          sponsor.isSelectable = true
          sponsor.isSelected = true
        }
      })

      const uniqueMap = new Map()
      return sponsors
        .filter(sponsor => sponsor.deleted !== 1)
        .filter(sponsor => {
          if (!uniqueMap.has(sponsor.email)) {
            uniqueMap.set(sponsor.email, true)
            return true
          } else {
            return false
          }
        })
    },
  },

  methods: {
    hasVideo() {
      const participantCount = this.$store.getters.participants.length
      const hasVideoCount = this.$store.getters.participants.filter(
        participant => participant.profile.video_url,
      ).length
      return hasVideoCount === participantCount
    },
    addContactsToDisplay(contacts) {
      contacts.forEach(contact => {
        this.$store.dispatch('addPotentialSponsor', {
          ...contact,
          participant_user_id: parseInt(contact.participant_user_id),
          deleted: 0,
          enrollment: 1,
          day_before_run: 0,
          day_after_run: 0,
          sender_user_id: this.$store.state.User.id,
          opt_out: 0,
          email_opt_out: [],
        })
      })
    },
    viewEmailTemplates() {
      //
    },
    isPPLTemplate() {
      const participantHasLaps = this.participant.laps
      const flatOnlyProgram =
        this.participantProgram.program_pledge_setting.flat_donate_only &&
        this.participantProgram.program_pledge_setting.flat_donate_only !== '0'
      if (participantHasLaps || flatOnlyProgram) {
        return false
      }
      return true
    },
    getPreWrittenEmailTemplateSubject() {
      if (this.hasVideo()) {
        return encodeURIComponent(
          this.parseLanguage(
            this.$t('email_template_student_star_subject'),
            this.getPreWrittenEmailTemplateArgs(),
          ),
        )
      }
      return encodeURIComponent(
        this.parseLanguage(
          this.$t('email_template_subject'),
          this.getPreWrittenEmailTemplateArgs(),
        ),
      )
    },
    getPreWrittenEmailSubjectArgs() {
      const preWrittenEmailSubjectArgs = {
        participantFirstNames: this.participantDisplayNames(
          this.$store.getters.participants,
        ),
        eventName: this.participantProgram.event_name,
        areIs: this.$store.getters.participants.length > 1 ? 'are' : 'is',
      }
      return preWrittenEmailSubjectArgs
    },
    getPreWrittenEmailTemplate() {
      if (this.hasVideo()) {
        return this.getShareStudentStarEmailTemplate()
      }
      return this.getBasePreWrittenEmailTemplate()
    },
    getShareStudentStarEmailTemplate() {
      const emailTemplate = this.parseLanguage(
        this.$t('student_star_email_template'),
        this.getPreWrittenEmailTemplateArgs(),
      )
      return encodeURIComponent(emailTemplate)
    },
    getBasePreWrittenEmailTemplate() {
      const emailTemplate = this.parseLanguage(
        this.$t('email_template'),
        this.getPreWrittenEmailTemplateArgs(),
      )
      return encodeURIComponent(emailTemplate)
    },
    getPreWrittenEmailTemplateArgs() {
      const preWrittenEmailTemplateArgs = {
        participantFirstNames: this.participantDisplayNames(
          this.$store.getters.participants,
        ),
        areIs: this.$store.getters.participants.length > 1 ? 'are' : 'is',
        eventName: this.participantProgram.decoded_event_name,
        theyName:
          this.$store.getters.participants.length > 1
            ? 'they'
            : this.participant.first_name,
        shareLink: this.emailShareLink,
        fundsRaisedForText: this.getFormatedFundsRaisedFor(),
        unitExpectationLang: this.getUnitExpectationLang(),
        schoolName: this.participant.school.name,
      }
      return preWrittenEmailTemplateArgs
    },
    getFormatedFundsRaisedFor() {
      const fundsRaisedFor = this.participantProgram.microsite
        .decoded_funds_raised_for
      return fundsRaisedFor ? ' ' + this.$t('for') + ' ' + fundsRaisedFor : ''
    },
    getUnitExpectationLang() {
      if (this.isPPLTemplate()) {
        const unitExpectationLangArgs = {
          unitExpectationRange:
            this.participantProgram.unit_range_low +
            ' ' +
            this.$t('email_template_to') +
            ' ' +
            this.participantProgram.unit_range_high,
          unitPlural: this.participantProgram.unit.name_plural,
        }
        return this.parseLanguage(
          this.$t('email_template_ppl_expectation'),
          unitExpectationLangArgs,
        )
      }
      return this.$t('email_template_flat_expectation')
    },
    sendPreWrittenTemplateEmail() {
      this.gaTrack('Intro Paragraph Section', 'Pre Written Template Link')
    },
    gaTrack(label, action) {
      this.gaEvent('Easy Emailer', label, action)
    },
    getPotentialSponsors(participantUserId) {
      if (!this.participant) {
        return []
      }

      let potentialSponsors = this.$store.getters.getFamilyPledgePotentialSponsors(
        this.participantUserId,
      )

      if (
        !this.participant.participant_info.family_pledging_enabled ||
        !this.$store.getters.participantProgram.program_pledge_setting
          .family_pledging_enabled
      ) {
        potentialSponsors = potentialSponsors.filter(
          sponsor => sponsor.participant_user_id === participantUserId,
        )
      }

      return potentialSponsors.map(potentialSponsor => {
        const optOut =
          potentialSponsor.opt_out || potentialSponsor.email_opt_out.length > 0

        return {
          ...potentialSponsor,
          isSelected: false,
          isPreviousSponsor: false,
          optOut,
        }
      })
    },
  },
  metaInfo: {
    title: 'Easy Emailer',
  },
}
</script>
