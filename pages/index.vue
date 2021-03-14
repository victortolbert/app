<!-- @vue-ignore -->
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  asyncData({$demo}) {
    $demo('$demo plugin works in asyncData')
  },
  data() {
    return {
      volunteer: {},
    }
  },
  // mounted() {
  //   // this.$intro().start() // start the guide
  //   // this.$intro().showHints() // show hints
  //   // window.introJs().start()
  //   // window.introJs().showHints()
  // },
  methods: {
    goToDocs() {
      console.log('https://oruga.io/documentation/')
    },
    goToGithub() {
      console.log('https://github.com/oruga-ui/oruga')
    },
  },
})
</script>

<template>
  <div class="w-full">
    <BaseHero title="Title or headline" subtitle="Subtitle or tagline" />
    <img src="https://cominex.net/assets/img/affiliates/40/logo_large.png" />
    <div class="buttons">
      <!-- <div v-intro="'The content of tooltip'">Hello</div> -->
      <o-button variant="primary" @click="goToDocs">Documentation</o-button>
      <o-button variant="info" @click="goToGithub">GitHub</o-button>
      <o-tooltip position="bottom" multiline>
        <o-button>Html Content</o-button>
        <template v-slot:content>
          <b>Lorem ipsum dolor sit amet</b>, consectetur warning elit.
          <i>Fusce id fermentum quam</i>.
        </template>
      </o-tooltip>
    </div>
  </div>
</template>
