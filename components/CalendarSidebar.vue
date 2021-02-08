<template>
  <div class="p-8 calendar-sidebar">
    <section class="events-list">
      <h4 class="text-lg font-medium">Upcoming Events ({{ events.length }})</h4>

      <ul class="mt-4 space-y-4 text-sm">
        <li v-for="event in events" :key="event.id">
          <h5>{{ getFormattedDate(event) }}</h5>
          <p>{{ event.title }}</p>
        </li>
      </ul>
    </section>

    <section class="p-3 mt-8 text-xs rounded bg-secondary-50 instructions">
      <h3 class="font-medium">Instructions</h3>

      <ul class="mt-1 ml-4 list-disc">
        <li>Select dates and you will be prompted to create a new event</li>
        <li>Drag, drop, and resize events</li>
        <li>Click an event to delete it</li>
      </ul>
    </section>
  </div>
</template>

<script>
// import {format} from 'date-fns'
import {formatDate} from '@fullcalendar/vue'

export default {
  props: {
    events: {
      type: Array,
      required: true,
    },
  },
  computed: {
    weekendsVisibleCheckbox: {
      get() {
        return this.weekendsVisible
      },
      set(value) {
        return this.$emit('set-weekends-visible', value)
      },
    },
  },
  methods: {
    isAllDay(event) {
      return event.allDay !== undefined ? event.allDay : false
    },
    getFormattedDate(event) {
      const date = event.date || event.start

      if (date === undefined) {
        return ''
      }

      return formatDate(date, {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
      })

      // return format(date, 'MMM d, yyyy')
      // return date
    },
  },
}
</script>
