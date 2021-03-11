import {useFetch, useContext, ref, computed} from '@nuxtjs/composition-api'
import {strip} from '~/helpers'

export default function usePeople() {
  const {$api, route} = useContext()

  const people = ref([])
  const checked = ref([])
  const isCheckAll = ref(false)

  useFetch(async () => {
    people.value = await $api.people.index()
  })

  const filteredPeople = computed(() => {
    if (route.value.params.tag) {
      return people.value.filter(person =>
        person.tags.includes(route.value.params.tag),
      )
    }
    return people.value
  })

  const tags = computed(() =>
    people.value
      .map(person => person.tags)
      .flat()
      .reduce((obj, tag) => {
        if (!obj[tag]) {
          obj[tag] = 0
        }
        obj[tag]++
        return obj
      }, {}),
  )

  function removeMessage(index) {
    people.value.splice(index, 1)
  }

  function removePeople() {
    people.value = []
  }

  function markAllRead() {
    people.value.forEach(person => (person.hasBeenRead = true))
  }

  function checkAll() {
    isCheckAll.value = !isCheckAll.value
    checked.value = []

    if (isCheckAll.value) {
      for (const key in people.value) {
        checked.value.push(people.value[key])
      }
    }
  }

  function updateCheckAll() {
    if (checked.value.length === people.value.length) {
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
    people,
    checked,
    isCheckAll,
    tags,
    checkAll,
    updateCheckAll,
    truncate,
    formatDate,
    removeMessage,
    removePeople,
    filteredPeople,
    markAllRead,
  }
}
