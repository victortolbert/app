<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      user: null,
    }
  },
  methods: {
    signOut(e) {
      e.stopPropagation()
      firebase.auth().signOut()
      this.$router.push({
        name: 'Login',
      })
    },
  },
}
</script>

<template>
  <nav>
    <ul>
      <li v-show="!user">
        <router-link to="/login">Login</router-link>
      </li>
      <li v-show="user">
        <router-link to="/profile">Profile</router-link>
      </li>
      <li v-show="user"><a @click="signoutButtonPressed">Logout</a></li>
      <li>
        <a @click="signoutButtonPressed">Logout</a>
      </li>
    </ul>
  </nav>
</template>
