<template>
  <div>
    <div v-if="error">{{ error }}</div>
    <AsyncUser v-else v-for="user in users.data" :key="user.id" :user="user" />
  </div>
</template>

<script>
import {defineAsyncComponent} from '@nuxtjs/composition-api'

import Loading from '@/components/Loading.vue'
import useUsers from '@/composables/useUsers'

const AsyncUser = defineAsyncComponent({
  loader: () => import('@/pages/user.vue' /* webpackChunkName: "user" */),
  loadingComponent: Loading,
  delay: 200,
  suspensible: false,
})

export default {
  name: 'Users',

  async setup() {
    const {users, error, load} = useUsers()

    await load()

    return {users, error}
  },
  components: {
    AsyncUser,
  },
}
</script>

<style></style>
