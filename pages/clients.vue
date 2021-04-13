<template>
  <div>
    <p v-if="error">Error: {{ error.message }}</p>
    <p v-else-if="isLoading && isDelayElapsed">Loading...</p>
    <ul v-else-if="!isLoading">
      <li v-for="user in data">{{ user.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,
    error: null,
    data: null,
    isDelayElapsed: false,
  }),

  methods: {
    fetchUsers() {
      this.error = null
      this.isLoading = true
      this.isDelayElapsed = false
      getUsers()
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

  created() {
    this.fetchUsers()
  },
}
</script>
