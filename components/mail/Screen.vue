<script>
import axios from 'axios'
import {useEmailSelection} from '~/composables/useEmailSelection'

export default {
  async setup() {
    const response = await axios.get('https://api.victortolbert.com/emails')
    const emails = response.data
    const selectedScreen = 'inbox'
    return {
      emails,
      selectedScreen,
      emailSelection: useEmailSelection(),
    }
  },
  computed: {
    sortedEmails() {
      return this.emails.sort((e1, e2) => {
        return e1.sentAt < e2.sentAt ? 1 : -1
      })
    },
    unarchivedEmails() {
      return this.sortedEmails.filter(e => !e.archived)
    },
    archivedEmails() {
      return this.sortedEmails.filter(e => e.archived)
    },
    filteredEmails() {
      const filters = {
        inbox: this.unarchivedEmails,
        archive: this.archivedEmails,
      }
      return filters[this.selectedScreen]
    },
  },
  methods: {
    selectScreen(newScreen) {
      this.selectedScreen = newScreen
      this.emailSelection.clear()
    },
    capitalize(word) {
      if (!word || !word.length) return
      return word[0].toUpperCase() + word.slice(1)
    },
  },
}
</script>

<template>
  <div>
    <button
      :class="[selectedScreen == 'inbox' ? 'selected' : '']"
      @click="selectScreen('inbox')"
    >
      Inbox View
    </button>
    <button
      :class="[selectedScreen == 'archive' ? 'selected' : '']"
      @click="selectScreen('archive')"
    >
      Archived View
    </button>

    <h1>VMail {{ capitalize(selectedScreen) }}</h1>

    <BulkActionBar :emails="filteredEmails" :selected-screen="selectedScreen" />

    <MailTable :emails="filteredEmails" />
  </div>
</template>
