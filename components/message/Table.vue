<script>
import {defineComponent} from '@nuxtjs/composition-api'
import useMessages from '~/composables/useMessages'

export default defineComponent({
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    const {
      tags,
      checked,
      checkAll,
      updateCheckAll,
      isCheckAll,
      truncate,
      formatDate,
      removeMessage,
      filteredMessages,
      removeMessages,
      markAllRead,
    } = useMessages()

    return {
      tags,
      checked,
      checkAll,
      updateCheckAll,
      isCheckAll,
      truncate,
      formatDate,
      removeMessage,
      filteredMessages,
      removeMessages,
      markAllRead,
    }
  },
})
</script>

<template>
  <div>
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
        <BaseIconSolid name="refresh" />
      </button>

      <div v-show="checked.length" class="flex items-center space-x-2">
        <button type="button">
          <BaseIconSolid name="folder-download" />
        </button>

        <button type="button">
          <BaseIconSolid name="exclamation-circle" />
        </button>

        <button @click="removeMessages" title="Delete">
          <BaseIconSolid name="trash" />
        </button>

        <button @click="markAllRead" type="button">
          <BaseIconSolid name="mail-open" />
        </button>

        <button type="button">
          <BaseIconSolid name="clock" />
        </button>
      </div>

      <button type="button">
        <BaseIconSolid name="dots-vertical" />
      </button>
    </div>

    <table class="w-full">
      <tbody>
        <tr
          v-for="(message, index) in filteredMessages"
          :key="message.id"
          class="text-gray-500 border-b cursor-pointer group hover:bg-gray-100 hover:shadow"
        >
          <td class="py-2 pl-6 whitespace-no-wrap align-top">
            <input
              class="w-5 h-5 text-gray-500 form-checkbox"
              type="checkbox"
              :value="message"
              v-model="checked"
              @change="updateCheckAll"
            />

            <NuxtLink class="pl-2" :to="localePath(`/messages/${message.id}/`)">
              {{ message.sender }}
            </NuxtLink>
          </td>

          <td class="py-2 pl-6 align-top">
            <span
              class="inline-flex items-center px-2 py-0.5 rounded mr-1 capitalize text-xs font-medium leading-4 bg-gray-100 text-gray-800"
              :key="tag"
              :class="tag"
              v-for="tag in message.tags"
            >
              {{ tag }}
            </span>
            <NuxtLink class="font-bold" :to="localePath(`/messages/${message.id}/`)">
              {{ message.subject }}
            </NuxtLink>
            <NuxtLink
              class="hidden md:inline-block"
              :to="localePath(`/messages/${message.id}/`)"
            >
              {{ truncate(message.body) }}
            </NuxtLink>
          </td>

          <td class="py-2 text-sm text-right whitespace-no-wrap align-top">
            <NuxtLink :to="localePath(`/messages/${message.id}/`)">
              {{ formatDate(message.date) }}
            </NuxtLink>
          </td>

          <td class="py-2 pl-6 whitespace-no-wrap actions">
            <button
              :aria-label="`Delete message ${index}`"
              type="button"
              @click="removeMessage(index)"
            >
              <BaseIconSolid name="delete" />
            </button>

            <button
              v-if="false"
              class="relative"
              @click="archive(message.id)"
              type="button"
            >
              <BaseIconSolid name="dots-vertical" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
