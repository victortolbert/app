<!-- @vue-ignore -->
<script>
import EventService from '~/services/EventService'
import {defineComponent, watchEffect} from '@nuxtjs/composition-api'
// import useEvents from '~/composables/useEvents'
import Event from '~/models/Event'

export default defineComponent({
  name: 'EventsView',
  props: ['page'],
  // setup() {
  //   const {
  //     events,
  //     tags,
  //     checked,
  //     checkAll,
  //     updateCheckAll,
  //     isCheckAll,
  //     truncate,
  //     formatDate,
  //     filteredEvents,
  //   } = useEvents()

  //   return {
  //     events,
  //     tags,
  //     checked,
  //     checkAll,
  //     updateCheckAll,
  //     isCheckAll,
  //     truncate,
  //     formatDate,
  //     filteredEvents,
  //   }
  // },
  async fetch() {
    const events = await Event.page(this.currentPage).get()
    this.events = this.events.concat(events)
  },
  data() {
    return {
      currentPage: 1,
      events: [],
      totalEvents: 0,
    }
  },
  // created() {
  //   watchEffect(() => {
  //     this.events = null
  //     EventService.index('events')
  //       .then(response => {
  //         this.events = response.data
  //         this.totalEvents = response.headers['x-total-count']
  //       })
  //       .catch(() => {
  //         this.$router.push(this.localePath({path: '/network-error/'}))
  //       })
  //   })
  // },
  computed: {
    hasNextPage() {
      const totalPages = Math.ceil(this.totalEvents / 2)

      return this.page < totalPages
    },
  },
})
</script>

<template>
  <main class="flex-1">
    <BaseHero>
      <h1 class="text-3xl">Events</h1>
      <template #footer>
        <NavbarSecondary />
      </template>
    </BaseHero>
    <section class="p-8">
      <div class="events">
        <EventCard v-for="event in events" :key="event.id" :event="event" />
        <BaseCalendar :events="$store.state.events" />

        <!-- <div class="pagination">
          <nuxt-link
            id="page-prev"
            :to="{path: '/events/', query: {page: page - 1}}"
            rel="prev"
            v-if="page != 1"
          >
            &#60; {{ $t('previous') }}
          </nuxt-link>

          <nuxt-link
            id="page-next"
            :to="{path: '/events/', query: {page: page + 1}}"
            rel="next"
            v-if="hasNextPage"
          >
            {{ $t('next') }} &#62;
          </nuxt-link>
        </div> -->
      </div>
    </section>
  </main>
</template>
