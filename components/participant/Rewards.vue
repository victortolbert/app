<template>
  <section class="participant-rewards">
    <Transition name="fade">
      <article v-if="show" class="py-8">
        <a
          class="float-right text-2xl text-black"
          @click="toggleRewards(participant.id)"
        >
          <i class="fal fa-times" />
        </a>
        <h1 class="text-2xl font-bold">
          {{ $t('rewards') }}
        </h1>
        <h2
          v-if="program.program_pledge_setting.flat_donate_only === '0'"
          class="mb-4"
        >
          ${{ program.unit_flat_conversion }} {{ $t('flat_donation') }} = $1
          {{ program.unit.modifier }} {{ program.unit.name }}
        </h2>

        <div class="mb-4 sm:block">
          <ParticipantRewardsCard
            v-for="reward in rewards"
            :key="reward.id"
            :reward="reward"
            :program="program"
            :sum-pledges-flat="sumPledgesFlat"
          />
        </div>

        <div class="pb-4 mb-6 text-center sm:hidden border-grey">
          <a class="text-blue hover:text-blue-dark">
            {{ $t('view') }} {{ viewMore ? $t('less') : $t('more') }}
          </a>
        </div>

        <div
          class="flex items-center justify-center pb-6 border-b lg:border-none"
        >
          <button
            class="px-8 py-2 text-sm font-semibold text-white rounded-full shadow bg-secondary focus:outline-none focus:shadow-outline"
          >
            <span>{{ $t('close') }} {{ $t('rewards') }}</span>
          </button>
        </div>
      </article>
    </Transition>
  </section>
</template>

<script>
export default {
  name: 'ParticipantRewards',
  props: {
    program: {
      type: Object,
      default: null,
    },
    participant: {
      type: Object,
      default: null,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
