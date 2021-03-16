<script>
export default {
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
}
</script>

<template>
  <article class="w-full">
    <BaseHero title="Title or headline" subtitle="Subtitle or tagline">
      <template #footer>
        <PageNavbar />
      </template>
    </BaseHero>

    <img src="https://cominex.net/assets/img/affiliates/40/logo_large.png" />

    <div class="buttons">
      <!-- <div v-intro="'The content of tooltip'">Hello</div> -->
      <OButton variant="primary" @click="goToDocs">Documentation</OButton>
      <OButton variant="info" @click="goToGithub">GitHub</OButton>

      <OTooltip position="bottom" multiline>
        <OButton>Html Content</OButton>
        <template v-slot:content>
          <b>Lorem ipsum dolor sit amet</b>, consectetur warning elit.
          <i>Fusce id fermentum quam</i>.
        </template>
      </OTooltip>
    </div>
  </article>
</template>
