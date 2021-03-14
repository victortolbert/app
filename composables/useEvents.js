import {useFetch, useContext, ref, computed} from '@nuxtjs/composition-api'
import {strip} from '~/helpers'

export default function useEvents() {
  const {$api, route} = useContext()

  const events = ref([])
  const checked = ref([])
  const isCheckAll = ref(false)

  useFetch(async () => {
    events.value = await $api.events.index()
  })

  const filteredEvents = computed(() => {
    if (route.value.params.tag) {
      return events.value.filter(event =>
        event.tags.includes(route.value.params.tag),
      )
    }
    return events.value
  })

  const tags = computed(() =>
    events.value
      .map(event => event.tags)
      .flat()
      .reduce((obj, tag) => {
        if (!obj[tag]) {
          obj[tag] = 0
        }
        obj[tag]++
        return obj
      }, {}),
  )

  function removeEvent(index) {
    events.value.splice(index, 1)
  }

  function removeEvents() {
    events.value = []
  }

  function markAllRead() {
    events.value.forEach(event => (event.hasBeenRead = true))
  }

  function checkAll() {
    isCheckAll.value = !isCheckAll.value
    checked.value = []

    if (isCheckAll.value) {
      for (const key in events.value) {
        checked.value.push(events.value[key])
      }
    }
  }

  function updateCheckAll() {
    if (checked.value.length === events.value.length) {
      isCheckAll.value = true
    } else {
      isCheckAll.value = false
    }
  }

  function formatDate(date) {
    const options = {year: 'numeric', month: 'short', day: 'numeric'}
    return new Date(date).toLocaleDateString('en', options)
  }

  function truncate(str) {
    return `${strip(str).substr(0, 50)}...`
  }

  return {
    events,
    checked,
    isCheckAll,
    tags,
    checkAll,
    updateCheckAll,
    truncate,
    formatDate,
    removeEvent,
    removeEvents,
    filteredEvents,
    markAllRead,
  }
}
