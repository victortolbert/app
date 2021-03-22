<!-- @vue-ignore -->
<script>
import EventService from '~/services/EventService'

export default {
  name: 'EventsView',
  props: ['page'],
  async fetch() {
    const events = await this.$eventRepository.index()
    this.events = this.events.concat(events)
  },
  data() {
    return {
      events: [],
    }
  },
}
</script>

<template>
  <article class="flex-1">
    <PageHeading>
      <h1 class="text-3xl">{{ $t('events') }}</h1>
    </PageHeading>

    <section class="p-8">
      <div class="events">
        <EventCard v-for="event in events" :key="event.id" :event="event" />

        <BaseCalendar :events="$store.state.events" />
      </div>
    </section>
  </article>
</template>
