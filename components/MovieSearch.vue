<template>
  <form class="search">
    <input type="text" :value="movieTitle" @keyup="handleChange" />
    <input @click="handleSubmit" type="submit" value="SEARCH" />
  </form>
</template>

<script>
import {defineComponent, ref} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Search',
  props: ['search'],
  setup({search}, {emit}) {
    const movieTitle = ref(search)

    return {
      movieTitle,
      handleSubmit(event) {
        event.preventDefault()
        emit('search', movieTitle.value)
      },
      handleChange(event) {
        movieTitle.value = event.target.value
      },
    }
  },
})
</script>
