<!-- @vue-ignore -->
<script>
export default {
  data() {
    return {
      advocates: [],
    }
  },
  async asyncData({app}) {
    return {
      advocates: await app.$advocateRepository.index(),
    }
  },
  computed: {
    slicedAdvocates() {
      return this.advocates.slice(-20)
    },
  },
  methods: {
    async createAdvocate() {
      const result = await this.$advocateRepository.create({
        firstName: 'Victor',
        lastName: 'Tolbert',
        email: 'victor@example.com',
        avatarUrl: 'https://cominex.net/assets/img/people/victor.jpeg',
        homeChurch: 'Friendship Baptist Church',
        phone: '6786133400',
      })
      console.log(result)
      // Fix ids to be unique
      this.advocates.push({
        ...result,
        id: Number(this.advocates.slice(-1)[0].id) + 1,
      })
    },
  },
}
</script>

<template>
  <SectionWrapper>
    <ul>
      <li :key="id" v-for="{id, firstName} in slicedAdvocates">
        <NuxtLink
          v-if="firstName !== 'foo'"
          :to="localePath(`/advocates/${id}`)"
        >
          {{ firstName }}
        </NuxtLink>
        <p v-else>{{ firstName }}</p>
      </li>
    </ul>

    <div class="links">
      <button @click="createAdvocate" class="button--grey">
        Create a advocate (send POST request)
      </button>
    </div>
  </SectionWrapper>
</template>
