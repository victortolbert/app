<template>
  <main class="flex-1">
    <BasePageHeading> {{ $t('calendar') }} </BasePageHeading>
    <section class="p-8">
      <BaseCalendar :events="events" />
    </section>
  </main>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['events']),
  },
}
</script>
