<script>
import {homes} from '~/__mocks__'

export default {
  // layout: 'homes',
  head() {
    return {
      title: 'Homepage',
      meta: [
        {
          name: 'description',
          content: 'This is a homepage!',
          hid: 'description',
        },
      ],
    }
  },
  data() {
    return {
      homes: homes.slice(0, 3),
    }
  },
}
</script>

<template>
  <div>
    <div
      v-for="home in homes"
      :key="home.objectID"
      style="float: left; margin: 10px"
    >
      <NuxtLink :to="`/home/${home.objectID}/`" prefetch>
        <HomeCard :home="home" />
      </NuxtLink>
    </div>
  </div>
</template>
