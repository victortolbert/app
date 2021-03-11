<template>
  <button @click="handleClick">Count Button</button>
</template>

<script>
import {defineComponent, ref} from '@nuxtjs/composition-api'

export default defineComponent({
  emits: ['count'],
  setup(props, {emit}) {
    const count = ref(0)

    const handleClick = () => {
      count.value += 1
      emit('count', count.value)
    }

    return {
      handleClick,
    }
  },
})
</script>
