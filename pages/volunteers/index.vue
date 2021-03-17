<!-- @vue-ignore -->
<script>
export default {
  data() {
    return {
      volunteers: [],
    }
  },
  async asyncData({app}) {
    return {
      volunteers: await app.$volunteerRepository.index(),
    }
  },
  computed: {
    slicedPeople() {
      const size = 10
      return this.volunteers.slice(0, size)
      // return this.volunteers.slice(-size)
    },
  },
  methods: {
    async createPerson() {
      const result = await this.$volunteerRepository.create({
        firstName: 'Victor',
        lastName: 'Tolbert',
        email: 'victor@example.com',
        avatarUrl: 'https://cominex.net/assets/img/people/victor.jpeg',
        homeChurch: 'Friendship Baptist Church',
        phone: '6786133400',
      })
      console.log(result)
      // Fix ids to be unique
      this.volunteers.push({
        ...result,
        id: Number(this.volunteers.slice(-1)[0].id) + 1,
      })
    },
  },
}
</script>
<template>
  <SectionWrapper>
    <ul v-if="volunteers.length">
      <li v-for="volunteer in slicedPeople" :key="volunteer.id">
        <NuxtLink
          :to="
            localePath({
              path: `/volunteers/${volunteer.id}/`,
              query: {
                lang: 'en',
                plan: 'private',
              },
            })
          "
        >
          {{ volunteer.firstName }}
        </NuxtLink>
      </li>
    </ul>
    <div v-else>
      <svg
        class="mr-3 -ml-1 text-black animate-spin h-11 w-11"
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
