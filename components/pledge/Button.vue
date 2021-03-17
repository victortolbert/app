<script>
export default {
  name: 'PledgeButton',
  props: {
    participants: {
      type: Array,
      default: () => [],
    },
    gaData: {
      type: Object,
      default: null,
    },
  },
  computed: {
    frCode() {
      return this.participants.find(participant => participant.deleted !== 1)
        .fr_code
    },
  },
}
</script>

<template>
  <RoundedButton
    :link="`/v3/tkdashboard/?redirect=auth/login/${frCode}/view-participant/pledge`"
    :text="$t('enter_pledge')"
    :ga-data="gaData"
    class="is-primary"
  />
</template>
