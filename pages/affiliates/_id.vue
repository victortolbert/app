<!-- @vue-ignore -->
<script>
import {computed, defineComponent, ref, useFetch, useRoute} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const affiliate = ref({})
    const route = useRoute()
    const id = computed(() => route.value.params.id)

    const {fetch: fetchAffiliate} = useFetch(async () =>
      fetch(`https://api.victortolbert.com/affiliates/${id.value}`)
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
