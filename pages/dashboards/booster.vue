<template>
  <ul class="min-h-screen">
    <li v-for="(activeProgram, index) in activePrograms" :key="index">
      <section
        v-show="$store.state.activeTab == index"
        :class="[
          'min-h-screen',
          activeProgram.microsite.microsite_color_theme.theme_name,
        ]"
      >
        <AppHeader :programs="activePrograms" :index="index">
          <ProgramHeader :program="activeProgram" />
        </AppHeader>

        <DashboardLayout :program="activeProgram" />
      </section>
    </li>
  </ul>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters('program', {
      activePrograms: 'activePrograms',
    }),
  },
  // head() {
  //   return {
  //     title:
  //       this.$store.state.activeEventName || this.activePrograms[0].event_name,
  //   }
  // },
}
</script>
