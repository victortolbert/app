<template>
  <section>
    <img :src="image" class="img-responsive" :alt="title" />
    <h1>{{ title }}</h1>
    <p>{{ length }}</p>
    <span v-if="watched">✅</span>
  </section>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: '/images/placeholder.png',
      validator: propValue => {
        const hasImagesDirectory = propValue.includes('/images/')
        const isPNG = propValue.endsWith('.png')
        const isJPEG = propValue.endsWith('.jpeg') || propValue.endsWith('.jpg')
        const hasValidExtension = isPNG || isJPEG

        return hasImagesDirectory && hasValidExtension
      },
    },
    title: {
      type: String,
      required: true,
    },
    length: {
      type: [Number, String],
      default: 90,
    },
    watched: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped></style>
