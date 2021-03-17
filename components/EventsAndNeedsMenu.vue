<script>
export default {
  methods: {
    show(path) {
      // .push({ path: 'register', query: { plan: 'private' } })
      this.$router.push(this.localePath(`/${path}/`))
    },
  },
}
</script>

<template>
  <ODropdown :triggers="['hover']" aria-role="list">
    <div class="whitespace-nowrap" slot="trigger">Events & Needs</div>
    <ODropdownItem @click="show('calendar')" aria-role="listitem"
      >Calendar</ODropdownItem
    >
    <ODropdownItem @click="show('events')" aria-role="listitem"
      >FAM Events</ODropdownItem
    >
    <ODropdownItem @click="show('requests')" aria-role="listitem"
      >Care Requests</ODropdownItem
    >
  </ODropdown>
</template>
