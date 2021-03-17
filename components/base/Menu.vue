<script>
export default {
  props: {
    items: {
      type: Array,
      default() {
        return ['dashboard']
      },
    },
  },
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
      <slot />
    </div>
    <ODropdownItem
      v-for="item in items"
      :key="item"
      @click="show(item)"
      aria-role="listitem"
    >
      {{ $t(item) }}
    </ODropdownItem>
  </ODropdown>
</template>
