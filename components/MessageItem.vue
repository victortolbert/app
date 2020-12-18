<template>
  <tr>
    <td class="select">
      <slot name="left" />
    </td>

    <td class="sender">
      {{ message.sender }}
    </td>

    <td class="summary">
      <NuxtLink :to="`/${message.id}`">
        {{ message.subject }}
      </NuxtLink>
    </td>

    <td class="date">
      {{ new Date(message.date).toLocaleDateString() }}
    </td>

    <td class="actions">
      <slot name="right" />
    </td>
  </tr>
</template>

<script>
export default {
  name: 'MessageItem',
  props: {
    message: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    isChecked: true,
    data: 'Child please',
  }),
  computed: {
    isComputed() {
      return true
    },
  },
  methods: {
    hello() {
      window.alert('this is from the child')
    },
  },
}
</script>
