<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { Promised } from 'vue-promised'
import UserService from '~/services/UserService'
import { getRandomJoke } from '~/api/jokes.js'

export default defineComponent({
  components: { Promised },
  props: {
    page: {
      type: Number,
      default: 1,
    },
  },
  // setup() {
  //   const usersPromise = ref(fetchUsers())
  //   const promised = usePromise(usersPromise)
  //   return {
  //     ...promised
  //     // spreads the following properties:
  //     // data, isPending, isDelayElapsed, error
  //   }
  // },
  data: () => ({
    promise: null,
    state: 'waiting',
    usersPromise: null,
    perPage: 40,
    isLoading: false,
    error: null,
    data: null,
    isDelayElapsed: false,
  }),

  created() {
    this.usersPromise = UserService.getUsers(this.perPage, this.page)
    console.log(this.usersPromise)
  },
  methods: {
    getRandomJoke() {
      this.state = 'loading'
      this.promise = getRandomJoke()
      this.promise.finally(() => {
        this.state = 'waiting'
      })
    },
    trySuccess() {
      this.getRandomJoke()
    },
    tryError() {
      this.state = 'ready'
      this.promise = delay(500).then(() => {
        return Promise.reject(new Error('🔥'))
      })
    },
    fetchUsers() {
      this.error = null
      this.isLoading = true
      this.isDelayElapsed = false
      UserService.getUsers(this.perPage, this.page)
        .then((users) => {
          this.data = users
        })
        .catch((error) => {
          this.error = error
        })
        .finally(() => {
          this.isLoading = false
        })
      setTimeout(() => {
        this.isDelayElapsed = true
      }, 200)
    },
  },
})
</script>

<template>
  <Promised :promise="usersPromise">
    <!-- Use the "pending" slot to display a loading message -->
    <template v-slot:pending>
      <p>Loading...</p>
    </template>
    <!-- The default scoped slot will be used as the result -->
    <template v-slot="data">
      <ul>
        <li v-for="user in data">{{ user }}</li>
      </ul>
    </template>

    <!-- The "rejected" scoped slot will be used if there is an error -->
    <template v-slot:rejected="error">
      <p>Error: {{ error.message }}</p>
    </template>
  </Promised>
</template>
