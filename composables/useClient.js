import {ref, useFetch, useContext} from '@nuxtjs/composition-api'

export const useClient = id => {
  const client = ref({})
  const {$axios} = useContext()

  const toExecute = []

  const {fetch: fetchClient} = useFetch(async () => {
    client.value = await $axios.$get(
      'https://api.victortolbert.com/clients/' + id,
    )
    await Promise.all(toExecute.map(cb => cb()))
  })

  return {
    client,
    fetchClient,
    onFetchClient: fn => toExecute.push(fn),
  }
}
