<script>
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    person: {
      type: Object,
      required: true,
    },
  },
  computed: {
    fullName() {
      return `${this.person.firstName} ${this.person.lastName}`
    },
  },
})
</script>

<template>
  <NuxtLink class="person-link" :to="`/people/${person.id}/`">
    <div class="person-card">
      <img class="w-16 h-16 rounded-full" :src="person.avatarUrl" />
    </div>
  </NuxtLink>
</template>
