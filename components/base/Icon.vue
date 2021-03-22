<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconPath() {
      return require(`~/assets/icons/${this.name}.svg`)
    },
  },
}
</script>

<template>
  <img :src="iconPath" :alt="`${name} icon`" />
</template>
