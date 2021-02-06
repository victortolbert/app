<template>
  <section class="h-full p-8">
    <div class="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 md:grid-cols-3">
      <div v-for="home in homes" :key="home.objectID">
        <NuxtLink :to="localePath({path: `/home/${home.objectID}/`})" prefetch>
          <HomeCard :home="home" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script>
import homes from '~/data/homes'

export default {
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
