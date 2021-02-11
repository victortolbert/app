<template>
  <section>
    <div class="px-4 pb-4 contacts-table">
      <div class="pb-1 pl-3 border border-transparent">
        <div v-if="allSelected" class="pb-5">
          <div class="text-center">
            <button
              :disabled="noSponsorsSelected"
              class="w-64 px-10 font-semibold shadow button is-rounded is-secondary"
              @click="emailPreviousSponsors"
            >
              {{ $t('email_previous_sponsors') }}
            </button>
          </div>
        </div>
        <BCheckbox
          v-if="contacts.length"
          :value="allSponsorsSelected"
          type="is-secondary"
          @change.native="toggleSelectAll"
        >
          <span class="inline-block pl-2 sm:pl-3">
            {{ allSponsorsSelected ? $t('unselect_all') : $t('select_all') }}
          </span>
        </BCheckbox>
      </div>

      <table class="table border is-fullwidth">
        <!-- Show contacts header, if there are any -->
        <thead v-if="contacts.length">
          <tr class="text-white bg-secondary">
            <th colspan="2">{{ $t('contact') }}</th>
            <th>{{ $t('status') }}</th>
            <th>
              <FontAwesomeIcon
                v-if="!isEditing"
                :icon="['far', 'user-edit']"
                class="cursor-pointer"
                @click="isEditing = true"
              />
              <button
                v-else
                class="button is-secondary is-inverted is-small"
                @click="isEditing = false"
              >
                <span>Close</span>
                <span class="icon">
                  <FontAwesomeIcon :icon="['fas', 'times']" />
                </span>
              </button>
            </th>
          </tr>
        </thead>

        <!-- Show the contacts, if we have them  -->
        <tbody v-if="contacts.length">
          <tr v-for="(contact, index) in getContactsSorted" :key="index">
            <td class="align-middle">
              <BCheckbox
                v-if="contact.isSelectable"
                :value="contact.isSelected"
                type="is-secondary"
                class="custom"
                @change.native="selectContact(contact.id)"
              />
            </td>
            <td class="w-full">
              <div class="items-center justify-between flex-1 sm:flex">
                <div class="flex-1">
                  {{ contact.first_name }} {{ contact.last_name }}
                  <br />
                  {{ contact.email }}
                </div>
                <div
                  v-if="contact.isPreviousSponsor"
                  class="italic font-semibold has-text-secondary sm:pr-10"
                >
                  {{ $t('previous_sponsor') }}
                </div>
              </div>
            </td>
            <td>{{ translateStatus(contact.status) }}</td>
            <td class="text-center align-middle">
              <FontAwesomeIcon
                v-if="isEditing"
                :icon="['fas', 'trash-alt']"
                @click="showRemoveContactModal(contact)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import {PledgingStatus} from '@/helpers'

export default {
  name: 'ContactsTable',
  props: {
    allSelected: {
      type: Boolean,
      default: true,
    },
    contacts: {
      type: Array,
      default: null,
    },
    participantUserId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      isEditing: false,
      myContacts: [],
    }
  },
  computed: {
    previousSponsors() {
      return this.myContacts.filter(contact => contact.isPreviousSponsor)
    },
    previousSelectedSponsors() {
      return this.previousSponsors.filter(contact => contact.isSelected)
    },
    noSponsorsSelected() {
      return (
        this.previousSponsors.filter(contact => contact.isSelected).length === 0
      )
    },
    allSponsorsSelected() {
      const numOfPreviousSponsors = this.previousSponsors.filter(
        contact => contact.isSelectable,
      ).length
      return (
        this.previousSponsors.filter(contact => contact.isSelected).length ===
        numOfPreviousSponsors
      )
    },
    getContactsSorted() {
      const sortedContacts = []

      this.myContacts.forEach(function (contact, index) {
        sortedContacts.push(Object.assign({}, contact))
      })

      return sortedContacts.sort(this.sortContact)
    },
  },
  watch: {
    contacts(newVal, oldVal) {
      this.myContacts = newVal
    },
  },
  mounted() {
    this.myContacts = this.contacts
  },
  methods: {
    sortContact(contactA, contactB) {
      const statusSortResult = this.sortStatusCompare(
        contactA.status,
        contactB.status,
      )

      if (statusSortResult !== 0) {
        return statusSortResult
      }

      if (contactA.first_name && contactB.first_name) {
        const firstNameSortResult = this.sortStringCompare(
          contactA.first_name,
          contactB.first_name,
        )

        if (firstNameSortResult !== 0) {
          return firstNameSortResult
        }
      }

      if (contactA.last_name && contactB.last_name) {
        const lastNameSortResult = this.sortStringCompare(
          contactA.last_name,
          contactB.last_name,
        )

        if (lastNameSortResult !== 0) {
          return lastNameSortResult
        }
      }

      const emailSortResult = this.sortStringCompare(
        contactA.email,
        contactB.email,
      )

      if (emailSortResult !== 0) {
        return emailSortResult
      }

      return -1
    },
    sortStringCompare(stringOne, stringTwo) {
      const firstNameA = stringOne.toLowerCase().trim()
      const firstNameB = stringTwo.toLowerCase().trim()

      if (firstNameA > firstNameB) {
        return 1
      } else if (firstNameA < firstNameB) {
        return -1
      } else {
        return 0
      }
    },
    sortStatusCompare(statusOne, statusTwo) {
      statusOne = statusOne.toLowerCase().trim()
      statusTwo = statusTwo.toLowerCase().trim()

      if (statusOne === statusTwo) {
        return 0
      }

      const statusOrder = Object.keys(PledgingStatus).map(function (key) {
        return PledgingStatus[key].toLowerCase()
      })

      return statusOrder.indexOf(statusOne) - statusOrder.indexOf(statusTwo)
    },
    addContact(contact) {
      this.myContacts.push(contact)
    },
    selectContact(contactId) {
      const contact = this.myContacts.find(contact => contact.id === contactId)
      contact.isSelected = !contact.isSelected
    },
    toggleSelectAll() {
      const isSelected = !this.allSponsorsSelected
      this.myContacts
        .filter(contact => contact.isSelectable)
        .forEach(contact => {
          contact.isSelected = isSelected
        })
    },
    showRemoveContactModal(contact) {
      // this.$modal.open({
      //   parent: this,
      //   component: RemoveContactModal,
      //   hasModalCard: true,
      //   width: 320,
      //   onCancel: this.unBlur,
      //   props: {
      //     contact,
      //   },
      //   events: {
      //     'remove-contact': contact => {
      //       this.removeContact(contact)
      //     },
      //   },
      // })
      // this.blur()
      this.isEditing = false
    },
    removeContact(contactToRemove) {
      let indexToRemove = null

      this.myContacts.forEach(function (contact, index) {
        if (contact.email === contactToRemove.email) {
          indexToRemove = index
        }
      })

      if (indexToRemove !== null) {
        this.myContacts.splice(indexToRemove, 1)
      }
    },
    translateStatus(statusText) {
      return this.$t('easy_emailer_status[statusText.toLowerCase()]')
    },
    convertPreviousToPotentialSponsors(sponsorIds, status) {
      this.myContacts.forEach(contact => {
        if (sponsorIds.includes(contact.id) && contact.isPreviousSponsor) {
          contact.status = status
          contact.isSelectable = false
          contact.isSelected = false
        }
      })
    },
    emailPreviousSponsors() {
      // this.$modal.open({
      //   parent: this,
      //   component: EmailPreviousSponsorsModal,
      //   hasModalCard: true,
      //   onCancel: this.unBlur,
      //   props: {
      //     previousSponsors: this.previousSelectedSponsors,
      //     participantUserId: this.participantUserId,
      //   },
      //   events: {
      //     previousSponsorsEmailed: (emailedSponsorIds, skippedSponsorIds) => {
      //       this.convertPreviousToPotentialSponsors(
      //         emailedSponsorIds,
      //         PledgingStatus.ACTIVE,
      //       )
      //       this.convertPreviousToPotentialSponsors(
      //         skippedSponsorIds,
      //         PledgingStatus.UNSUBSCRIBED,
      //       )
      //     },
      //   },
      // })
      // this.blur()
    },
  },
}
</script>

<style>
.table thead td,
.table thead th {
  color: #ffffff;
}
.table td,
.table th {
  vertical-align: middle;
}
.table thead th {
  height: 4em;
}
.b-checkbox.checkbox.custom .control-label {
  padding-left: 0;
}
td.checkbox-cell label.is-disabled {
  display: none;
}
</style>
