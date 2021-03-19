<script>
import axios from 'axios'
import {
  defineComponent,
  useFetch,
  useMeta,
  useRoute,
  useRouter,
  useStore,
  computed,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  // You need to define an empty head to activate this functionality
  head: {},
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const id = computed(() => route.value.params.id)

    const name = ref('')

    const {fetch, fetchState} = useFetch(async () => {
      name.value = await axios.get('https://myapi.com/name')
    })

    // Manually trigger a refetch
    fetch()

    // Access fetch error, pending and timestamp
    fetchState

    // This will allow you to set the title in head - but won't allow you to read its state outside of this component.
    const {title} = useMeta()
    title.value = 'My page'

    // You could also provide an initial value.
    // const { title } = useMeta({ title: 'My page' })

    // ... or simply set some meta tags
    // useMeta({ title: 'My page', ... })

    // You can even pass a function to achieve a computed meta
    const message = ref('')

    useMeta(() => ({title: message.value}))

    const goHome = () => router.push('/')

    return {
      goHome,
      name,
    }
  },
})
</script>
