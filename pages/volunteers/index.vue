<!-- @vue-ignore -->
<script>
import Person from '~/models/Person'

export default {
  async fetch() {
    const people = await Person.page(this.currentPage).get()
    this.people = this.people.concat(people)
  },
  data() {
    return {
      currentPage: 1,
      people: [],
    }
  },
  computed: {
    _people() {
      return this.people.map(person => new Person(person))
    },
  },
  mounted() {
    this.$jam('works in mounted')
  },
  methods: {
    lazyLoadPersons(isVisible) {
      if (isVisible) {
        if (this.currentPage < 5) {
          this.currentPage++
          this.$fetch()
        }
      }
    },
  },
  head() {
    return {
      title: 'New Nuxt.js people',
    }
  },
}
</script>

<template>
  <div>
    <div v-if="people.length">{{ people }}</div>
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
  </div>
</template>
