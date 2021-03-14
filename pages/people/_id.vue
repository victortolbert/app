<!-- @vue-ignore -->
<script>
export default {
  data() {
    return {
      person: {},
    }
  },
  async asyncData({app, params}) {
    return {
      person: await app.$personRepository.show(params.id),
    }
  },
}
</script>

<template>
  <section>
    <span>{{ person.firstName }}</span>
    <span>{{ person.lastName }}</span>
    <span>{{ person.email }}</span>
    <span>{{ person.phone }}</span>
    <span>{{ person.avatarUrl }}</span>
    <p>{{ person.bio }}</p>
    <p>by Person with id {{ person.id }}</p>
  </section>
</template>
