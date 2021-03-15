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
      const size = 10;
      return this.people.slice(0, size)
      // return this.people.slice(-size)
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
  <SectionWrapper>
    <ul v-if="people.length">
      <li v-for="person in slicedPeople" :key="person.id">
        <NuxtLink
          :to="localePath({
            path: `/volunteers/${person.id}/`,
            query: {
              lang: 'en',
              plan: 'private'
            }
          })"
        >
          {{person.firstName}}
        </NuxtLink>
      </li>
    </ul>
    <div v-else>
      <svg
        class="animate-spin -ml-1 mr-3 h-11 w-11 text-black"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  </SectionWrapper>
</template>
