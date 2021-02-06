<template>
  <div>
    <form @submit.prevent="userLogin">
      <div>
        <label>Username</label>
        <input type="text" v-model="login.username" />
      </div>
      <div>
        <label>Password</label>
        <input type="text" v-model="login.password" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  data() {
    return {
      login: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    async userLogin() {
      // this.$auth
      //   .loginWith('local', {
      //     data: {
      //       /* data to post to server */
      //     },
      //   })
      //   .then(() => this.$toast.success('Logged In!'))
      // this.$auth
      //   .loginWith('google', {
      //     params: {
      //       /* additional authentication parameters */
      //     },
      //   })
      //   .then(() => this.$toast.success('Logged In!'))

      try {
        // const response = await this.$auth.loginWith('local', {data: this.login})
        // const response = await this.$auth.loginWith('google', { params: { prompt: "select_account" } })
        // const response = await this.$auth.loginWith('laravelSanctum', {
        //   data: {
        //     email: '',
        //     password: '',
        //   },
        // })

        const response = await this.$auth.loginWith('github')
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
