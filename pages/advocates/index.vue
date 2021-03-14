<!-- @vue-ignore -->
<script>
export default {
  data() {
    return {
      people: [],
    }
  },
  async asyncData({app}) {
    return {
      people: await app.$personRepository.index(),
    }
  },
  computed: {
    slicedPeople() {
      return this.people.slice(-20)
    },
  },
  methods: {
    async createPerson() {
      const result = await this.$personRepository.create({
        firstName: 'Victor',
        lastName: 'Tolbert',
        email: 'victor@example.com',
        avatarUrl: 'https://cominex.net/assets/img/people/victor.jpeg',
        homeChurch: 'Friendship Baptist Church',
        phone: '6786133400',
      })
      console.log(result)
      // Fix ids to be unique
      this.people.push({...result, id: Number(this.people.slice(-1)[0].id) + 1})
    },
  },
}
</script>

<template>
  <section>
    <main class="p-8 prose prose-sm">
      <h1 class="title">Advocates</h1>
      <ul>
        <li :key="id" v-for="{id, firstName} in slicedPeople">
          <nuxt-link v-if="firstName !== 'foo'" :to="`/people/${id}`">
            {{ firstName }}
          </nuxt-link>
          <p v-else>{{ firstName }}</p>
        </li>
      </ul>

      <div class="links">
        <button @click="createPerson" class="button--grey">
          Create a person (send POST request)
        </button>
      </div>
    </main>
  </section>
</template>
