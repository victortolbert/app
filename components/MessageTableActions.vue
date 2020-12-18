<template>
  <div
    class="flex items-center h-10 pl-6 space-x-2 text-2xl text-gray-500 border-b"
  >
    <input
      class="w-5 h-5 text-gray-500 form-checkbox"
      type="checkbox"
      @click="checkAll"
      v-model="isCheckAll"
    />
    <button
      v-if="[checked.length ? 'hidden' : 'flex']"
      type="button"
      title="Refresh"
    >
      <SvgIcon icon="refresh" />
    </button>

    <div v-show="checked.length" class="flex items-center space-x-2">
      <button type="button">
        <SvgIcon icon="package-down" />
      </button>

      <button type="button">
        <SvgIcon icon="alert-octagon" />
      </button>

      <button title="Delete">
        <SvgIcon icon="delete" />
      </button>

      <button type="button">
        <SvgIcon icon="email-mark-as-unread" />
      </button>

      <button type="button">
        <SvgIcon icon="clock" />
      </button>
    </div>

    <button type="button">
      <SvgIcon icon="dots-vertical" />
    </button>
  </div>
</template>

<script>
import {defineComponent} from '@nuxtjs/composition-api'
import useMessages from '@/composables/useMessages'

export default defineComponent({
  setup(props, context) {
    const {
      messages,
      tags,
      checked,
      checkAll,
      updateCheckAll,
      isCheckAll,
      truncate,
      formatDate,
    } = useMessages()

    return {
      messages,
      tags,
      checked,
      checkAll,
      updateCheckAll,
      isCheckAll,
      truncate,
      formatDate,
    }
  },
})
</script>
