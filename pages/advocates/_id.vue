<!-- @vue-ignore -->
<script>
import {
  computed,
  defineComponent,
  useMeta,
  useRoute,
} from '@nuxtjs/composition-api'
import {usePerson} from '~/composables/usePeople'

export default defineComponent({
  head: {},
  setup() {
    const route = useRoute()
    const id = computed(() => route.value.params.id)
    console.log(id)
    const {person, fetchPerson, onFetchPerson} = usePerson(id.value)
    const {title} = useMeta()

    fetchPerson()

    onFetchPerson(async () => {
      title.value = person.value.firstName
    })

    return {
      person,
    }
  },
})
</script>

<template>
  <p>{{ person }}</p>
</template>
