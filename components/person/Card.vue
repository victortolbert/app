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
  <NuxtLink class="person-link" :to="localePath(`/people/${person.id}`)">
    <div class="person-card">
      <img class="rounded-full h-16 w-16" :src="person.avatarUrl" />
    </div>
  </NuxtLink>
</template>
