<script>
export default {
  async asyncData({$content}) {
    const page = await $content('about').fetch()

    return {page}
  },
  data() {
    return {
      people: [
        {
          id: 1,
          firstName: 'Victor',
        },
        {
          id: 2,
          firstName: 'Reginald',
        },
        {
          id: 3,
          firstName: 'Vincent',
        },
      ],
    }
  },
  computed: {
    group() {
      const _group = {}

      this.people.forEach(person => {
        const firstLetter = person.firstName.charAt(0)

        if (_group[firstLetter] == undefined) {
          _group[firstLetter] = []
        }
        _group[firstLetter].push(person)
      })

      return _group
    },
  },
  mounted() {
    console.log(this.group)
  },
}
</script>

<template>
  <PageWrapper>
    <SectionWrapper class="content">
      <NuxtContent :document="page" />
    </SectionWrapper>
  </PageWrapper>
</template>
