import {ref, useFetch} from '@nuxtjs/composition-api'
// import {defineComponent} from '@nuxtjs/composition-api'

function useAffiliate(id) {
  const affiliate = ref({})

  const {fetch: fetchAffiliate} = useFetch(async () =>
    fetch(`https://api.victolbert.com/affiliate/1`)
      .then(response => response.json())
      .then(json => (affiliate.value = json)),
  )

  return {
    affiliate,
    fetchAffiliate,
  }
}
