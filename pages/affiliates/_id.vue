<!-- @vue-ignore -->
<script>
import {defineComponent, ref, useFetch} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const affiliate = ref({})

    const {fetch: fetchAffiliate} = useFetch(async () =>
      fetch(`https://api.victolbert.com/affiliates/1`)
        .then(response => response.json())
        .then(json => (affiliate.value = json)),
    )
    return {
      affiliate,
      fetchAffiliate,
    }
  },
})
</script>

<template>
  <div>
    {{ affiliate }}
  </div>
</template>
