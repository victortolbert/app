import {useFetch, useContext, ref, computed} from '@nuxtjs/composition-api'
import {strip} from '~/helpers'

export default function useAffiliates() {
  const {$api, route} = useContext()

  const affiliates = ref([])
  const checked = ref([])
  const isCheckAll = ref(false)

  useFetch(async () => {
    affiliates.value = await $api.affiliates.index()
  })

  const filteredMessages = computed(() => {
    if (route.value.params.tag) {
      return affiliates.value.filter(affiliate =>
        affiliate.tags.includes(route.value.params.tag),
      )
    }
    return affiliates.value
  })

  const tags = computed(() =>
    affiliates.value
      .map(affiliate => affiliate.tags)
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
    affiliates.value.splice(index, 1)
  }

  function removeMessages() {
    affiliates.value = []
  }

  function markAllRead() {
    affiliates.value.forEach(affiliate => (affiliate.hasBeenRead = true))
  }

  function checkAll() {
    isCheckAll.value = !isCheckAll.value
    checked.value = []

    if (isCheckAll.value) {
      for (const key in affiliates.value) {
        checked.value.push(affiliates.value[key])
      }
    }
  }

  function updateCheckAll() {
    if (checked.value.length === affiliates.value.length) {
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
    affiliates,
    checked,
    isCheckAll,
    tags,
    checkAll,
    updateCheckAll,
    truncate,
    formatDate,
    removeMessage,
    removeMessages,
    filteredMessages,
    markAllRead,
  }
}
