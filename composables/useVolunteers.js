import {ref, useFetch, useContext} from '@nuxtjs/composition-api'

export const useVolunteer = id => {
  const volunteer = ref({})
  const {$axios} = useContext()

  const toExecute = []

  const {fetch: fetchVolunteer} = useFetch(async () => {
    volunteer.value = await $axios.$get(
      'https://api.victortolbert.com/volunteers/' + id,
    )
    await Promise.all(toExecute.map(cb => cb()))
  })

  return {
    volunteer,
    fetchVolunteer,
    onFetchVolunteer: fn => toExecute.push(fn),
  }
}
