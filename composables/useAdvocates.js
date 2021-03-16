import {ref, useFetch, useContext} from '@nuxtjs/composition-api'

export const useAdvocate = id => {
  const advocate = ref({})
  const {$axios} = useContext()

  const toExecute = []

  const {fetch: fetchAdvocate} = useFetch(async () => {
    advocate.value = await $axios.$get(
      'https://api.victortolbert.com/advocates/' + id,
    )
    await Promise.all(toExecute.map(cb => cb()))
  })

  return {
    advocate,
    fetchAdvocate,
    onFetchAdvocate: fn => toExecute.push(fn),
  }
}
