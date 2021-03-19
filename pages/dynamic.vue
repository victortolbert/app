<script>
const Guest = () => import('~/components/Guest')
const Member = () => import('~/components/Member')
const User = () => import('~/components/User')

export default {
  data() {
    return {
      user: null,
    }
  },
  computed: {
    userComponent() {
      if (!this.user) return Guest
      if (this.user && !this.user.subscription) return User
      if (this.user && this.user.subscription) return Member
    },
  },
}
</script>

<template>
  <div>
    <keep-alive>
      <component :is="userComponent" />
    </keep-alive>

    <SectionWrapper class="mt-4">
      <button @click="user = null">Guest</button>
      <button @click="user = {}">User</button>
      <button @click="user = {subscription: true}">Member</button>
    </SectionWrapper>
  </div>
</template>
