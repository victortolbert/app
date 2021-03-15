<template>
  <div>
    <ul class="mt-3 border-t border-gray-200 divide-y divide-gray-100">
      <li v-for="message in filteredMessages" :key="message.id">
        <NuxtLink
          :to="`/messages/${message.id}`"
          class="flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6"
        >
          <div class="flex items-center space-x-3 truncate">
            <!-- <div class="bg-pink-600"></div> -->

            <p class="text-sm font-medium leading-6 truncate">
              <span>{{ message.subject }}</span>
              <span
                class="inline-block mx-1 w-2.5 h-2.5 flex-shrink-0 rounded-full"
                :key="tag"
                :class="tag"
                v-for="tag in message.tags"
              />
              <span class="font-normal text-gray-500 truncate">{{
                truncate(message.body)
              }}</span>
            </p>
          </div>

          <!-- Heroicon name: chevron-right -->
          <svg
            class="w-5 h-5 ml-4 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-500 group-focus:text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
import {defineComponent} from '@nuxtjs/composition-api'
import useMessages from '~/composables/useMessages'

export default defineComponent({
  name: 'MessageList',
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
