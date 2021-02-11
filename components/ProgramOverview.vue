<template>
  <section class="program-overview">
    <!-- eslint-disable-next-line -->
    <header class="mb-8 markdown" v-html="programDescription" />

    <FeaturedVideo
      v-if="$store.state.featuredVideo"
      :source="$store.state.featuredVideo.source"
      :id="$store.state.featuredVideo.hash"
    />
  </section>
</template>

<script>
export default {
  name: 'ProgramOverview',
  props: {
    program: {
      type: Object,
      default: () => {},
    },
    overrideText: {
      type: String,
      default: null,
    },
  },
  computed: {
    programDescription() {
      if (this.hasProgramOverviewText) {
        return this.programOverviewText
      }

      return this.defaultTextOverride
    },
    hasProgramOverviewText() {
      return (
        typeof this.programOverviewText === 'string' &&
        this.programOverviewText.trim() !== ''
      )
    },
    programOverviewText() {
      return this.program.microsite.overview_text_override
    },
    defaultTextOverride() {
      return this.parseLanguage(this.overrideText, {
        event_name: this.program.event_name,
        unit_plural: this.program.unit.name_plural,
      })
    },
    featuredVideo() {
      if (!this.$store.state.featuredVideo) return

      return this.$store.state.featuredVideo.hash
    },
  },
  methods: {
    parseLanguage(lang, vals) {
      for (const value in vals) {
        lang = lang.replace(new RegExp(`:${value}`, 'g'), vals[value])
      }

      return lang
    },
  },
}
</script>
