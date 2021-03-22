<template>
  <article>
    <TheHeader
      :user="user"
      @login="$emit('login')"
      @logout="$emit('logout')"
      @createAccount="$emit('createAccount')"
    />

    <section>
      <h2>Pages in Storybook</h2>
    </section>
  </article>
</template>

<script>
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'HomePage',
  props: {
    user: {
      type: Object,
    },
  },

  emits: ['login', 'logout', 'createAccount'],
})
</script>
