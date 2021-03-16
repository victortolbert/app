<script>
import {computed} from '@nuxtjs/composition-api'
import {useEmailSelection} from '~/composables/useEmailSelection'

export default {
  props: {
    emails: {
      type: Array,
      required: true,
    },
    selectedScreen: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const emailSelection = useEmailSelection()
    const numberSelected = computed(() => {
      return emailSelection.emails.size
    })
    const allAreSelected = computed(() => {
      return (
        props.emails.length === numberSelected.value &&
        numberSelected.value !== 0
      )
    })
    const partialSelection = computed(() => {
      return numberSelected.value > 0 && !allAreSelected.value
    })

    const bulkSelect = function () {
      if (allAreSelected.value) emailSelection.clear()
      else emailSelection.addMultiple(props.emails)
    }
    return {
      partialSelection,
      allAreSelected,
      bulkSelect,
      emailSelection,
      numberSelected,
    }
  },
}
</script>

<template>
  <div class="bulk-action-bar">
    <span class="checkbox">
      <input
        type="checkbox"
        :checked="allAreSelected"
        :class="[partialSelection ? 'partial-check' : '']"
        @click="bulkSelect"
      />
    </span>

    <span class="buttons">
      <button
        :disabled="Array.from(emailSelection.emails).every(e => e.read)"
        @click="emailSelection.markRead()"
      >
        Mark Read
      </button>
      <button
        :disabled="Array.from(emailSelection.emails).every(e => !e.read)"
        @click="emailSelection.markUnread()"
      >
        Mark Unread
      </button>
      <button
        v-if="selectedScreen == 'inbox'"
        :disabled="numberSelected == 0"
        @click="emailSelection.archive()"
      >
        Archive
      </button>
      <button
        v-else
        :disabled="numberSelected == 0"
        @click="emailSelection.moveToInbox()"
      >
        Move to Inbox
      </button>
    </span>
  </div>
</template>
