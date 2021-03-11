<script>
export default {
  props: {
    cardList: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  setup(props, ctx) {
    const selectCard = payload => {
      ctx.emit('flip-card', payload)
    }

    return {
      selectCard,
    }
  },
}
</script>

<template>
  <div>
    <transition-group tag="section" class="game-board" name="shuffle-card">
      <GameCard
        v-for="card in cardList"
        :key="`${card.value}-${card.variant}`"
        :matched="card.matched"
        :value="card.value"
        :visible="card.visible"
        :position="card.position"
        @select-card="selectCard"
      />
    </transition-group>
    <h2 class="status">
      {{ status }}
    </h2>
  </div>
</template>
