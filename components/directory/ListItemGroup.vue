<template>
  <div>
    <div
      class="sticky top-0 z-10 px-6 py-1 text-sm font-medium text-gray-500 border-t border-b border-gray-200 bg-gray-50"
    >
      <h3>Y</h3>
    </div>
    <slot />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        people: [
          {
            id: 1,
            firstName: 'Victor'
          },
          {
            id: 2,
            firstName: 'Reginald'
          },
          {
            id: 3,
            firstName: 'Vincent'
          },
        ]
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
    }
  }
</script>
