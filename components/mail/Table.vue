<script>
import axios from 'axios'
import {format} from 'date-fns'
import {useEmailSelection} from '~/composables/useEmailSelection'

export default {
  props: {
    emails: {
      type: Array,
      required: true,
    },
  },
  async setup() {
    return {
      format,
      openedEmail: null,
      emailSelection: useEmailSelection(),
    }
  },
  methods: {
    openEmail(email) {
      this.openedEmail = email
      if (email) {
        email.read = true
        axios.put(`https://api.victortolbert.com/emails/${email.id}`, email)
      }
    },
    archiveEmail(email) {
      email.archived = true
      axios.put(`https://api.victortolbert.com/emails/${email.id}`, email)
    },
    changeEmail(
      email,
      {indexChange, toggleArchive, toggleRead, save, closeModal},
    ) {
      if (toggleArchive) email.archived = !email.archived
      if (toggleRead) email.read = !email.read
      if (save)
        axios.put(`https://api.victortolbert.com/emails/${email.id}`, email)
      if (closeModal) {
        this.openedEmail = null
        return null
      }
      if (indexChange) {
        const index = this.emails.findIndex(e => e == email)
        this.openEmail(this.emails[index + indexChange])
      }
    },
  },
}
</script>

<template>
  <div>
    <table class="mail-table">
      <tbody>
        <tr
          v-for="email in emails"
          :key="email.id"
          :class="[email.read ? 'read' : '', 'clickable']"
          @click="openEmail(email)"
        >
          <td>
            <input
              type="checkbox"
              :checked="emailSelection.emails.has(email)"
              @click="emailSelection.toggle(email)"
            />
          </td>
          <td>{{ email.from }}</td>
          <td>
            <p>
              <strong>{{ email.subject }}</strong> - {{ email.body }}
            </p>
          </td>
          <td class="date">
            {{ format(new Date(email.sentAt), 'MMM do yyyy') }}
          </td>
          <td>
            <button @click="archiveEmail(email)">Archive</button>
          </td>
        </tr>
      </tbody>
    </table>
    <ModalView
      v-if="openedEmail"
      :close-modal="
        () => {
          openedEmail = null
        }
      "
    >
      <MailView
        :email="openedEmail"
        :change-email="args => changeEmail(openedEmail, args)"
      />
    </ModalView>
  </div>
</template>
