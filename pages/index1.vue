<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {INITIAL_EVENTS, createEventId} from '@/helpers/event-utils'
import {defineComponent} from '@nuxtjs/composition-api'
// import Directory from '@/components/Directory.vue'

export default defineComponent({
  // layout: 'plain',
  setup() {},
  components: {
    FullCalendar,
    // Directory,
  },
  async asyncData({$content, $axios}) {
    const affiliates = await $axios.$get('affiliates')
    return {
      affiliates,
    }
  },
  data() {
    return {
      count: 1,
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        initialView: 'dayGridMonth',
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
      message: {
        id: 2,
        subject: 'Tech Conferences',
      },
      video_ids: [
        'dFoLwGNWl98',
        // 'crSUWtRYw-M'
      ],
      slides: [
        {
          youtube_id: 'MF0jFKvS4SI',
          speaker: 'Adam Wathan',
          talk: 'Cruddy by Design',
          description:
            'Learn how to refactor ugly controllers by keeping things cruddy',
          conference: 'Laracon US',
          code_url: '',
          slides_url:
            'https://github.com/adamwathan/laracon2017/pulls?q=is%3Apr+sort%3Aupdated-desc+is%3Aclosed',
          year: 2017,
          reference_urls: [
            'http://transmission.vehikl.com/theres-a-model-hiding-in-your-rest-api/',
          ],
        },
        {
          youtube_id: 'dFoLwGNWl98',
          speaker: 'Adam Wathan',
          talk: 'Curing the common loop',
          description: '',
          conference: 'Laracon EU',
          code_url: '',
          slides_url:
            'https://speakerdeck.com/adamwathan/curing-the-common-loop',
          year: 2016,
        },
        {
          youtube_id: 'crSUWtRYw-M',
          speaker: 'Ryan Singer',
          talk: 'Design Case Study',
          conference: 'Laracon EU',
          slides_url:
            'https://speakerdeck.com/adamwathan/curing-the-common-loop',
          year: 2016,
        },
      ],
    }
  },
  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },

    handleDateSelect(selectInfo) {
      const title = prompt('Please enter a new title for your event')
      const calendarApi = selectInfo.view.calendar
      calendarApi.unselect() // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        })
      }
    },

    handleEventClick(clickInfo) {
      if (
        confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`,
        )
      ) {
        clickInfo.event.remove()
      }
    },

    handleEvents(events) {
      this.currentEvents = events
    },
  },
})
</script>

<template>
  <div>
    <PageHeading />

    <!--  -->
    <section
      class="flex flex-col items-center justify-center flex-1 w-full min-h-screen p-8"
    >
      <!-- class="grid grid-flow-row-dense grid-cols-2 grid-rows-3 gap-4 auto-cols-min" -->
      <div class="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
        <div
          class="col-span-2 p-4 pr-6 space-y-2 bg-white border-l-8 border-transparent rounded-md shadow-md dark:bg-gray-900"
        >
          <section>
            <!-- Section Header -->
            <header class="px-4 py-5 border-b border-gray-200 sm:px-6">
              <div
                class="flex flex-wrap items-center justify-between -mt-4 -ml-4 sm:flex-nowrap"
              >
                <div class="mt-4 ml-4">
                  <h3 class="text-lg font-medium leading-6">
                    {{ $t('upcoming_items') }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    No relevant upcoming items in the next 30 days.
                  </p>
                </div>
                <div class="flex-shrink-0 mt-4 ml-4">
                  <button class="skeuomorph-flat">Action</button>
                </div>
              </div>
            </header>

            <!-- FullCalendar -->
            <article class="mt-8">
              <h2 class="text-xl font-bold">{{ $t('calendar_title') }}</h2>

              <div class="demo-app-sidebar-section">
                <label>
                  <input
                    type="checkbox"
                    :checked="calendarOptions.weekends"
                    @change="handleWeekendsToggle"
                  />
                  toggle weekends
                </label>
              </div>

              <div class="demo-app-sidebar-section">
                <h2>All Events ({{ currentEvents.length }})</h2>

                <ul>
                  <li v-for="event in currentEvents" :key="event.id">
                    <b>{{ event.startStr }}</b>
                    <i>{{ event.title }}</i>
                  </li>
                </ul>
              </div>

              <FullCalendar
                class="demo-app-calendar"
                :options="calendarOptions"
              >
                <template #eventContent="arg">
                  <b>{{ arg.timeText }}</b>
                  <i>{{ arg.event.title }}</i>
                </template>
              </FullCalendar>
            </article>

            <article class="mt-8">
              <header class="px-4 py-5 border-b border-gray-200 sm:px-6">
                <div
                  class="flex flex-wrap items-center justify-between -mt-4 -ml-4 sm:flex-nowrap"
                >
                  <div class="mt-4 ml-4">
                    <h3 class="text-lg font-medium leading-6">
                      {{ $t('upcoming_items') }}
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">
                      This list contains the active care communities that are
                      assigned to me as the supervising advocate.
                    </p>

                    <button v-tooltip="'You have ' + count + ' new messages.'">
                      Button with tooltip
                    </button>
                  </div>

                  <div class="flex-shrink-0 mt-4 ml-4">
                    <button
                      type="button"
                      class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Actions?
                    </button>
                  </div>
                </div>
              </header>
              <!-- <ExampleSelect /> -->
            </article>

            <!-- ExampleMultiselect -->
            <article class="mt-8">
              <ExampleMultiselect />
            </article>

            <!-- ExampleTable -->
            <article class="mt-8">
              <!-- <ExampleTable /> -->
            </article>

            <!-- PeopleTable -->
            <article class="mt-8">
              <!-- <PeopleTable /> -->
            </article>
          </section>
        </div>

        <div class="grid gap-8 px-8 lg:grid-cols-1">
          <!-- <SteppedProgress /> -->
          <!-- <FeaturedVideo /> -->
          <!-- <ButtonGroupDateRange /> -->
          <!-- <Disclosure /> -->
        </div>

        <!-- Cases -->
        <div
          class="space-y-2 overflow-hidden bg-white border-transparent rounded-md shadow-md dark:bg-gray-900"
        >
          <!-- Cases -->
          <article class="mt-8">
            <header>
              <h2 class="text-lg font-semibold leading-6">
                {{ $t('cases') }}
              </h2>

              <p>
                {{ $t('cases_description') }}
              </p>
            </header>
          </article>

          <!-- <FamiliesAwaitingCommunities /> -->
          <article class="mt-8">
            <header class="px-4 py-5 border-b border-gray-200 sm:px-6">
              <div
                class="flex flex-wrap items-center justify-between -mt-4 -ml-4 sm:flex-nowrap"
              >
                <div class="mt-4 ml-4">
                  <h3 class="text-lg font-medium leading-6">
                    Families Awaiting Communities
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    No relevant upcoming items in the next 30 days.
                  </p>
                </div>

                <div class="flex-shrink-0 mt-4 ml-4">
                  <button
                    type="button"
                    class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Create new job
                  </button>
                </div>
              </div>
            </header>
          </article>

          <!-- FeaturedVideo -->
          <article class="mt-8">
            <!-- <FeaturedVideo /> -->
          </article>

          <!-- Actions Button -->
          <div>
            <button
              type="button"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <svg
                class="w-5 h-5 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              {{ $t('actions') }}
            </button>
          </div>

          <!-- SimpleFeed -->
          <article class="mt-8">
            <!-- <SimpleFeed /> -->
          </article>

          <!-- Directory -->
          <article class="mt-8 h-96">
            <!-- <Directory /> -->
          </article>
        </div>

        <!-- Upcoming Items -->
        <article class="mt-8">
          <div
            class="p-4 pr-6 space-y-2 bg-white border-l-8 rounded-md shadow-md border-brand dark:bg-gray-900"
          >
            <h2 class="text-lg font-bold leading-6">
              {{ $t('upcoming_items') }}
            </h2>

            <p>{{ $t('upcoming_items_blank_state_message') }}</p>

            <ul>
              <li><NuxtLink to="/articles/">Articles</NuxtLink></li>
              <li><NuxtLink to="/products/">Products</NuxtLink></li>
            </ul>
          </div>
        </article>

        <!-- SteppedProgress -->
        <div
          class="col-span-2 space-y-2 bg-white border-l-8 border-white rounded-md shadow-md dark:border-gray-900 dark:bg-gray-900"
        >
          <!-- <SteppedProgress /> -->

          <!-- <ActionButton /> -->

          <!-- <ButtonAction /> -->

          <h2>Meet the team</h2>

          <!-- ShortcutCombo -->
          <span class="shortcut-combo">
            <span class="shortcut">shift</span>
            <span class="shortcut-joiner">+</span>
            <span class="shortcut">?</span>
          </span>
        </div>
      </div>
    </section>
  </div>
</template>



<style>
button.skeuomorph-flat {
  outline: none;
  margin: 0;
  border: 0;
  border-radius: 0.25em;
  background: #e0e0e0;
  cursor: pointer;
  padding: 0.4em 0.8em;
  text-rendering: optimizeLegibility;
  font-size: inherit;
  font-family: inherit;
  font-weight: 300;
  color: inherit;
  box-shadow: 0 0.2em #888;
  -webkit-transform: translateY(-0.2em);
  -moz-transform: translateY(-0.2em);
  transform: translateY(-0.2em);
}

button.skeuomorph-flat:hover,
button.skeuomorph-flat.hover {
  background: #e6e6e6;
}

button.skeuomorph-flat:active,
button.skeuomorph-flat.active {
  box-shadow: none;
  background: #e0e0e0;
  -webkit-transform: translateY(0);
  -moz-transform: translateY(0);
  transform: translateY(0);
}
</style>
