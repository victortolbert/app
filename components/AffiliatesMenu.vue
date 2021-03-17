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
    <div class="whitespace-nowrap" slot="trigger">
      {{ $t('all_affiliates') }}
    </div>
    <ODropdownItem @click="show('affiliates')" aria-role="listitem"
      >List Affiliates</ODropdownItem
    >
    <ODropdownItem @click="show('regions')" aria-role="listitem"
      >Regions</ODropdownItem
    >
    <ODropdownItem @click="show('staff')" aria-role="listitem"
      >Staff</ODropdownItem
    >
    <ODropdownItem @click="show('agencies')" aria-role="listitem"
      >Agencies</ODropdownItem
    >
    <ODropdownItem @click="show('churches')" aria-role="listitem"
      >Churches</ODropdownItem
    >
    <ODropdownItem @click="show('import')" aria-role="listitem"
      >Import Data</ODropdownItem
    >
  </ODropdown>
</template>
