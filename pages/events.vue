<template>
  <main class="flex-1">
    <BasePageHeading>{{ $t('events') }}</BasePageHeading>
    <section class="p-8">
      <div class="events">
        <EventCard v-for="event in events" :key="event.id" :event="event" />
        <!--
        <div class="pagination">
          <NuxtLink
            id="page-prev"
            :to="{path: '/events/', query: {page: page - 1}}"
            rel="prev"
            v-if="page != 1"
          >
            &#60; {{ $t('previous') }}
          </NuxtLink>

          <NuxtLink
            id="page-next"
            :to="{path: '/events/', query: {page: page + 1}}"
            rel="next"
            v-if="hasNextPage"
          >
            {{ $t('next') }} &#62;
          </NuxtLink>
        </div>
        -->
      </div>
    </section>

    <div>
      <ul>
        <li><b>Event</b></li>
        <li><a href="#">Edit</a></li>
        <li><button>Delete</button></li>
        <li><b>RSVPs</b></li>
        <li><a href="#">Test RSVP</a></li>
        <li><button>Copy RSVP Link</button></li>
        <li><a href="#">View RSVPs</a></li>
        <li><button>Msg RVPSs</button></li>
        <li><b>Responses</b></li>
        <li><a href="#">Test Response Card</a></li>
        <li><button>Copy Event Response Link</button></li>
        <li><a href="#">View Non-Responders</a></li>
        <li><a href="#">View Responders</a></li>
        <li><button>Msg Responders</button></li>
        <li><a href="#">View No Shows</a></li>
      </ul>
    </div>
  </main>
</template>

<script>
// import EventService from '@/services/EventService'
import {defineComponent, watchEffect} from '@nuxtjs/composition-api'
import useEvents from '~/composables/useEvents'

export default defineComponent({
  name: 'EventsView',
  props: ['page'],
  setup() {
    const {
      events,
      tags,
      checked,
      checkAll,
      updateCheckAll,
      isCheckAll,
      truncate,
      formatDate,
      filteredEvents,
    } = useEvents()

    return {
      events,
      tags,
      checked,
      checkAll,
      updateCheckAll,
      isCheckAll,
      truncate,
      formatDate,
      filteredEvents,
    }
  },
  // data() {
  //   return {
  //     // events: null,
  //     totalEvents: 0,
  //   }
  // },
  // created() {
  //   watchEffect(() => {
  //     this.events = null
  //     EventService.get('events', 2, this.page)
  //       .then(response => {
  //         this.events = response.data
  //         this.totalEvents = response.headers['x-total-count']
  //       })
  //       .catch(() => {
  //         this.$router.push({name: 'NetworkError'})
  //       })
  //   })
  // },
  // computed: {
  //   hasNextPage() {
  //     const totalPages = Math.ceil(this.totalEvents / 2)

  //     return this.page < totalPages
  //   },
  // },
})
</script>
