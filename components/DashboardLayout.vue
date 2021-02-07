<template>
  <div class="">
    <div class="mx-4 mt-8 mb-8 bg-white border rounded-lg shadow-md">
      <div class="flex-wrap lg:flex">
        <div
          v-for="(participant, index) in participants"
          :key="index"
          class="lg:w-1/2"
        >
          <ParticipantCard
            :participant="participant"
            :program="program"
            :selected="selected"
            @toggle="toggleParticipant($event)"
          />
          <div class="px-4 lg:px-8">
            <ParticipantRewards
              :program="program"
              :participant="participant"
              :show="selected == participant.id"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    program: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      selected: null,
    }
  },
  computed: {
    participants() {
      return this.program.participants
    },
  },
  methods: {
    toggleParticipant(id) {
      if (this.selected !== id) {
        this.selected = id
      } else {
        this.selected = null
      }
    },
  },
}
</script>
