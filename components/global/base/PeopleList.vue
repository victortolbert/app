<template>
  <ul class="mt-4 list-none">
    <li v-for="(person, i) in people" :key="i" class="flex mt-3">
      <IconCheck class="flex-shrink-0 w-6 h-6 mt-px mr-3" />
      {{ person.first_name }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    people: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
