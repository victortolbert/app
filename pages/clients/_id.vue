<!-- @vue-ignore -->
<script>
import {defineComponent, ref, useFetch} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const client = ref({})

    const {fetch: fetchClient} = useFetch(async () =>
      fetch(`https://api.victolbert.com/clients/1`)
        .then(response => response.json())
        .then(json => (client.value = json)),
    )
    return {
      client,
      fetchClient,
    }
  },
})
</script>

<template>
  <div>
    {{ client }}
  </div>
</template>
