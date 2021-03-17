<script>
import {mapActions} from 'vuex'

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components: {
    FullCalendar,
  },
  props: {
    events: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    calendarOptions() {
      return {
        ...this.configOptions,
        ...this.eventHandlers,
      }
    },

    configOptions() {
      return {
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        events: this.events,
        weekends: this.weekendsVisible,
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        // initialView: 'dayGridWeek',
      }
    },

    eventHandlers() {
      return {
        dateClick: this.onDateClick,
        eventClick: this.onEventClick,
        eventDrop: this.onEventDrop,
        eventResize: this.onEventDrop,
        select: this.onDateSelect,
      }
    },
  },
  methods: {
    ...mapActions(['createEvent', 'updateEvent', 'deleteEvent']),

    onDateClick(payload) {
      const title = prompt('Please enter a new title for your event')

      if (!title) {
        return
      }

      const id = (this.events.length + 1) * 10
      const {start, end, date, allDay} = payload

      return this.createEvent({
        id,
        title,
        date,
        start,
        end,
        allDay,
      })
    },

    onDateSelect(payload) {
      return this.onDateClick(payload)
    },

    onEventClick({event}) {
      const confirmed = confirm(
        `Are you sure you want to delete the event '${event.title}'?`,
      )

      if (!confirmed) {
        return
      }

      return this.deleteEvent(event.id)
    },

    onEventDrop({event}) {
      return this.updateEvent(event)
    },
  },
}
</script>

<template>
  <FullCalendar :options="calendarOptions" />
</template>
