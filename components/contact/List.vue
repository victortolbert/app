<template>
  <div class="card">
    <h1 class="mb-6 text-2xl font-bold">Your Contacts</h1>
    <div>
      <div
        v-for="contact in contacts"
        :key="contact.id"
        class="flex items-center py-2"
      >
        <img
          :src="contact.picture.medium"
          class="block w-12 h-12 mr-2 rounded-full"
          alt=""
        />
        <div>
          <div class="font-bold">
            {{ contact.name.first }} {{ contact.name.last }}
          </div>
          <div class="text-gray-600">
            {{ contact.email }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactList',
  props: {
    contacts: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
