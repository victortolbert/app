import {ref, useFetch, useContext} from '@nuxtjs/composition-api'

export const usePerson = id => {
  const person = ref({})
  const {$axios} = useContext()

  const toExecute = []

  const {fetch: fetchPerson} = useFetch(async () => {
    person.value = await $axios.$get(
      'https://api.victortolbert.com/people/' + id,
    )
    await Promise.all(toExecute.map(cb => cb()))
  })

  return {
    person,
    fetchPerson,
    onFetchPerson: fn => toExecute.push(fn),
  }
}
