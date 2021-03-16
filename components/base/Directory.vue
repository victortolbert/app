<script>
  export default {
    props: {
      people: {
        type: Array,
        default() {
          return [
            {
              id: 1,
              firstName: 'Victor',
              lastName: 'Tolbert'
            }
          ]
        }
      }
    }
  }
</script>

<template>
  <nav class="relative h-full overflow-y-auto" aria-label="Directory">
    <DirectoryListItem v-for="person in people" :person="person" :key="person.id"/>
  </nav>
</template>
