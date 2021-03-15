<!-- @vue-ignore -->
<script>
import {defineComponent, computed, ref} from '@vue/composition-api'

export default defineComponent({
  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  setup({user}) {
    const fullName = computed(() => `${user.firstName} ${user.lastName}`)
    const message = ref('This is a message')

    return {
      fullName,
      message,
    }
  },
  mounted() {
    console.log(this.user)
  },
})
</script>

<template>
  <div>
    {{ fullName }}
  </div>
</template>
