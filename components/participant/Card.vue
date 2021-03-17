<template>
  <div class="m-4">
    <div>
      <div class="relative mb-2 media lg:px-4">
        <div class="media-left">
          <a @click="editParticipant(participant)">
            <AvatarImage :alt="participant.first_name" :src="avatarSrc" />
          </a>
        </div>
        <div class="self-center media-content">
          <h2 class="inline-block mr-2 text-xl">
            {{ participant.first_name }}
          </h2>
          <a @click="editParticipant(participant)">
            <BaseIconOutlined name="pencil" />
          </a>
        </div>
      </div>
    </div>
    <section class="lg:px-4">
      <div class="mb-4 is-block">
        <ProgressMeter
          :first-meter="totalPledged"
          :second-meter="totalPending"
          :goal="participant.profile.pledge_goal"
        />

        <div class="mt-2">
          <div class="flex items-center justify-between">
            <h3 class="flex items-center font-bold">
              <svg
                class="w-4 h-4 mr-1 fill-current text-primary-500"
                viewBox="0 0 16 16"
              >
                <circle cx="8" cy="8" r="8" />
              </svg>
              <span>
                {{ $t('total_pledged') }}
                ${{ totalPledged }} {{ $t('of') }} ${{
                  participant.profile.pledge_goal
                }}
              </span>
            </h3>
            <div
              v-if="isFlat && !hasTotalPending"
              class="flex items-center justify-between"
            >
              <a
                class="text-sm font-semibold underline"
                @click="$emit('toggle', participant.id)"
              >
                {{ selected == participant.id ? $t('close') : $t('view') }}
                {{ $t('rewards') }}
              </a>
            </div>
          </div>
          <div
            v-if="!isFlat && !hasTotalPending"
            class="flex items-center justify-between"
          >
            <h4 class="inline-block text-sm capitalize">
              {{ program.unit.modifier }} {{ program.unit.name }}
            </h4>
            <a
              class="text-sm font-semibold underline"
              @click="$emit('toggle', participant.id)"
            >
              {{ selected == participant.id ? $t('close') : $t('view') }}
              {{ $t('rewards') }}
            </a>
          </div>
        </div>
        <div v-if="hasTotalPending" class="mt-2">
          <div class="flex items-center justify-between">
            <h3 class="flex items-center font-bold">
              <svg
                class="w-4 h-4 mr-1 fill-current text-tertiary"
                viewBox="0 0 16 16"
              >
                <circle cx="8" cy="8" r="8" />
              </svg>
              <span>
                {{ $t('awaiting_confirmation') }} ${{ totalPending }}
              </span>
            </h3>
          </div>
          <div class="flex items-center justify-between">
            <h4 v-if="!isFlat" class="inline-block text-sm capitalize">
              {{ program.unit.modifier }} {{ program.unit.name }}
            </h4>
            <a
              class="text-sm font-semibold underline"
              @click="$emit('toggle', participant.id)"
            >
              {{ selected == participant.id ? $t('close') : $t('view') }}
              {{ $t('rewards') }}
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ParticipantCard',

  props: {
    program: {
      type: Object,
      default: () => ({
        program_pledge_setting: {
          flat_donate_only: 0,
        },
        unit: {
          per: null,
          modifier: null,
        },
        unit_flat_conversion: null,
      }),
    },
    participant: {
      type: Object,
      default: null,
    },
    selected: {
      type: Number,
      default: 0,
    },
    group: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      pledgeStatuses: [
        {
          name: 'confirmed',
          id: 2,
        },
        {
          name: 'paid',
          id: 3,
        },
        {
          name: 'pending',
          id: 4,
        },
        {
          name: 'paymentScheduled',
          id: 8,
        },
      ],
    }
  },

  computed: {
    avatarSrc() {
      return this.participant.profile.image_name == null
        ? '/assets/img/avatar.svg'
        : this.avatarImgSrc
    },
    avatarImgSrc() {
      return (
        this.$store.getters.avatarPath + this.participant.profile.image_name
      )
    },
    editProfileLink() {
      return (
        '/v3/tkdashboard/?redirect=' +
        encodeURI(
          'auth/login/' + this.participant.fr_code + '/edit-personalize',
        )
      )
    },
    isFlat() {
      return this.program.program_pledge_setting.flat_donate_only === 1
    },
    hasRewards() {
      return this.participant.prizes && this.participant.prizes.length > 0
    },
    totalPending() {
      const statusNames = ['pending']
      const statusIds = this.pledgeStatuses
        .filter(status => statusNames.includes(status.name))
        .map(status => status.id)
      const value = this.participant.participant_info.pledges
        .filter(pledge => statusIds.includes(pledge.pledge_status_id))
        .reduce((total, pledge) => total + pledge.amount, 0)

      return parseFloat(value)
    },
    totalPledged() {
      const statusNames = ['confirmed', 'paid', 'paymentScheduled']
      const statusIds = this.pledgeStatuses
        .filter(status => statusNames.includes(status.name))
        .map(status => status.id)
      return parseFloat(this.getPledgeTotal(statusIds))
    },
    hasTotalPending() {
      return this.totalPending > 0
    },
  },

  methods: {
    getPledgeTotal() {
      return 10
    },
    editParticipant(participant) {
      this.$router.push({
        name: 'edit-participant',
        params: {
          id: participant.id,
        },
      })
    },
  },
}
</script>
