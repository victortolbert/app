<!-- @vue-ignore -->
<script>
import {
  computed,
  defineComponent,
  ref,
  useFetch,
  useRoute,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const dashboard = ref({})
    const route = useRoute()
    const id = computed(() => route.value.params.id)

    const {fetch: fetchDashboard} = useFetch(async () =>
      fetch(`https://api.victortolbert.com/dashboards/${id.value}`)
        .then(response => response.json())
        .then(json => (dashboard.value = json)),
    )
    return {
      dashboard,
      fetchDashboard,
    }
  },
})
</script>

<template>
  <div>
    {{ dashboard }}
  </div>
</template>
