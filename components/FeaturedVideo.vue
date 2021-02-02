<template>
  <figure class="aspect-w-16 aspect-h-9">
    <iframe
      :src="src"
      title="Featured Video"
      width="560"
      height="315"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      allowtransparency="true"
    ></iframe>
    <figcaption
      x-text="image.caption"
      class="text-xs pointer-events-none text-primary-50"
    >
      20160729 Laracon US Ryan Singer
    </figcaption>
  </figure>
</template>

<script>
export default {
  data() {
    return {
      video_ids: [
        'dFoLwGNWl98',
        // 'crSUWtRYw-M'
        // MF0jFKvS4SI
        // 3u_vIdnJYLc
      ],
    }
  },
  computed: {
    src() {
      return `https://www.youtube.com/embed/${this.video_ids[0]}`
      // return 'https://fast.wistia.net/embed/iframe/g630i8kd4b'
    },
  },
}
</script>
