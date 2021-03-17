<!-- @vue-ignore -->
<script>
export default {
  data() {
    return {
      dashboards: [],
    }
  },
  async asyncData({app}) {
    return {
      dashboards: await app.$dashboardRepository.index(),
    }
  },
  methods: {
    async createDashboard() {
      const result = await this.$dashboardRepository.create({
        firstName: 'Victor',
        lastName: 'Tolbert',
        email: 'victor@example.com',
        avatarUrl: 'https://cominex.net/assets/img/people/victor.jpeg',
        homeChurch: 'Friendship Baptist Church',
        phone: '6786133400',
      })
      console.log(result)
      // Fix ids to be unique
      this.dashboards.push({
        ...result,
        id: Number(this.dashboards.slice(-1)[0].id) + 1,
      })
    },
  },
}
</script>

<template>
  <SectionWrapper>
    <ul>
      <li :key="id" v-for="{id, firstName} in slicedDashboards">
        <NuxtLink
          v-if="firstName !== 'foo'"
          :to="localePath(`/dashboards/${id}`)"
        >
          {{ firstName }}
        </NuxtLink>
        <p v-else>{{ firstName }}</p>
      </li>
    </ul>

    <div class="links">
      <button @click="createDashboard" class="button--grey">
        Create a dashboard (send POST request)
      </button>
    </div>
  </SectionWrapper>
</template>
