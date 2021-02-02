<template>
  <MessageTable :data="taggedMessages" />
</template>

<script>
import {defineComponent, useContext, computed} from '@nuxtjs/composition-api'
import useMessages from '@/composables/useMessages'

export default defineComponent({
  nuxtI18n: false,
  setup() {
    const {messages} = useMessages()
    const {route} = useContext()

    const taggedMessages = computed(function () {
      return messages.value.filter(message =>
        message.tags.includes(route.value.params.tag),
      )
    })

    return {
      taggedMessages,
    }
  },
})
</script>
