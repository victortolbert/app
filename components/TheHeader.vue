<template>
  <header class="p-4">
    <div class="flex items-center justify-between">
      <h1>Promise Serves Support</h1>
      <a href="https://api.victortolbert.com" target="_blank">
        Component Explorer
      </a>
      <div>
        <BaseButton
          size="small"
          @click="$emit('logout')"
          label="Log out"
          v-if="user"
        />
        <BaseButton
          size="small"
          @click="$emit('login')"
          label="Log in"
          v-if="!user"
        />
        <BaseButton
          primary
          size="small"
          @click="$emit('createAccount')"
          label="Sign up"
          v-if="!user"
        />
      </div>
    </div>
  </header>
</template>

<script>
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'TheHeader',
  props: {
    user: {
      type: Object,
    },
  },
  emits: ['login', 'logout', 'createAccount'],
})
</script>
