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
    <div class="whitespace-nowrap" slot="trigger">People</div>
    <ODropdownItem @click="show('advocates')" aria-role="listitem"
      >Advocates</ODropdownItem
    >
    <ODropdownItem @click="show('volunteers')" aria-role="listitem"
      >Volunteers</ODropdownItem
    >
    <ODropdownItem @click="show('families')" aria-role="listitem"
      >Families</ODropdownItem
    >
    <ODropdownItem @click="show('communities')" aria-role="listitem"
      >Communities</ODropdownItem
    >
    <ODropdownItem @click="show('map')" aria-role="listitem"
      >People Map</ODropdownItem
    >
  </ODropdown>
</template>
