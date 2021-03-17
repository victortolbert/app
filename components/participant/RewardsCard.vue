<template>
  <button
    :class="[
      'card-container p-2 px-0 w-full',
      isFullWidth ? '' : 'sm:w-1/2 md:w-1/3 lg:w-1/4',
      reward.prize.video.toString().length === 0 ? 'cursor-not-allowed' : '',
    ]"
  >
    <div
      :class="[
        'card border-2 rounded overflow-hidden',
        colorClassFor(reward.status),
      ]"
    >
      <header class="font-semibold card-header">
        <div
          v-if="reward.status === 'unassigned'"
          :title="
            '$' +
            getAmountRemaining(reward) +
            ' ' +
            program.unit.modifier +
            ' ' +
            program.unit.name +
            ' ' +
            $t('more')
          "
          class="w-full p-4 text-white capitalize truncate bg-red"
        >
          <span v-if="displayPrice">
            ${{ getAmountRemaining(reward)
            }}<span v-if="!isFlatOnly">
              {{ program.unit.modifier }} {{ program.unit.name }}</span
            >
            {{ $t('more') }}
          </span>
          <span v-else>
            {{ reward.prizeBound.display_name }}
          </span>
        </div>
        <div
          v-if="reward.status === 'pending'"
          :title="$t('pending')"
          class="w-full p-4 text-white capitalize truncate bg-orange"
        >
          {{ $t('pending') }}
        </div>
        <div
          v-if="reward.status === 'giveaway'"
          :title="$t('giveaway')"
          class="w-full p-4 text-white capitalize truncate bg-secondary"
        >
          {{ $t('giveaway') }}
        </div>
        <div
          v-if="reward.status === 'delivered'"
          :title="$t('delivered')"
          class="w-full p-4 text-white capitalize truncate bg-primary"
        >
          {{ $t('delivered') }}
        </div>
      </header>
      <div class="p-0 card-content">
        <div class="card-image">
          <figure class="image is-4by3">
            <img
              :src="getPictureUrl(reward)"
              :alt="reward.prizeBound.display_name"
              class="object-contain"
            />
            <div
              v-if="reward.prize.video.toString().length > 0"
              class="play-icon"
            >
              <svg viewBox="0 0 34 34" class="block w-8 h-8 lg:w-10 lg:h-10">
                <path
                  d="M17 33.8624C26.3888 33.8624 34 26.282 34 16.9312C34 7.58035 26.3888 0 17 0C7.61116 0 0 7.58035 0 16.9312C0 26.282 7.61116 33.8624 17 33.8624Z"
                  fill="#384351"
                  fill-opacity="0.866593"
                />
                <path
                  d="M27.6301 16.587C28.027 16.8134 28.027 17.1839 27.6301 17.4103L12.0634 26.2911C11.6665 26.5175 11.3418 26.3323 11.3418 25.8794V8.11769C11.3418 7.66484 11.6665 7.47959 12.0634 7.70601L27.6301 16.587Z"
                  fill="white"
                />
              </svg>
            </div>
          </figure>
        </div>
      </div>
      <footer class="block card-footer bg-grey-lightest">
        <div class="p-4 text-center">
          <h2
            v-if="displayPrice && isFlatOnly"
            :title="'$' + getDisplayAmount(reward)"
            class="capitalize truncate"
          >
            ${{ getDisplayAmount(reward) }}
          </h2>
          <h2
            v-else-if="displayPrice"
            :title="
              '$' +
              getDisplayAmount(reward) +
              ' ' +
              program.unit.modifier +
              ' ' +
              program.unit.name
            "
            class="capitalize truncate"
          >
            ${{ getDisplayAmount(reward) }} {{ program.unit.modifier }}
            {{ program.unit.name }}
          </h2>
          <h3
            :title="reward.prizeBound.display_name"
            class="font-semibold truncate"
          >
            {{ reward.prizeBound.display_name }}
          </h3>
        </div>
      </footer>
    </div>
  </button>
</template>

<script>
export default {
  name: 'ParticipantRewardsCard',
  props: {
    sumPledgesFlat: {
      type: Number,
      default: 0,
    },
    reward: {
      type: Object,
      default() {
        return {}
      },
    },
    program: {
      type: Object,
      default: null,
    },
    isFullWidth: {
      type: Boolean,
      default: false,
    },
    displayPrice: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isFlatOnly() {
      return this.program.program_pledge_setting.flat_donate_only !== '0'
    },
  },
  methods: {
    getDisplayAmount(reward) {
      let amount = reward.prizeBound.actual_amount
      if (!this.isFlatOnly) {
        amount =
          reward.prizeBound.display_amount / this.program.unit_flat_conversion
      }
      return parseFloat(amount).toFixed(2).replace('.00', '')
    },
    getAmountRemaining(reward) {
      let amount = reward.prizeBound.actual_amount
      if (!this.isFlatOnly) {
        amount = reward.prizeBound.display_amount
      }
      let amountRemaining = parseFloat(amount - this.sumPledgesFlat)
      if (!this.isFlatOnly) {
        amountRemaining /= this.program.unit_flat_conversion
      }
      amountRemaining = Math.max(0, amountRemaining)
      return parseFloat(amountRemaining).toFixed(2).replace('.00', '')
    },
    getPictureUrl(reward) {
      return (
        'https://' +
        this.$store.state.s3Bucket +
        '.s3.amazonaws.com/prizes/' +
        reward.prize.picture
      )
    },
    colorClassFor(status) {
      if (status === 'unassigned') {
        return 'border-red'
      } else if (status === 'pending') {
        return 'border-orange'
      } else if (status === 'giveaway') {
        return 'border-blue'
      } else if (status === 'delivered') {
        return 'border-green'
      }
      return 'black'
    },
  },
}
</script>
