<template>
  <div>
    <IconBase
      v-for="n in rating"
      icon-name="full star"
      color="orangered"
      :key="n"
    >
      <IconStarFull />
    </IconBase>

    <IconBase
      v-for="x in maxRating"
      icon-name="empty star"
      color="orangered"
      :key="x + 5"
    >
      <IconStarEmpty />
    </IconBase>
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number,
      default: 4,
    },
  },
  computed: {
    maxRating() {
      return 5 - this.rating
    },
  },
}
</script>
