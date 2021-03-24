<script>
import {kebabCase} from 'lodash'

export default {
  props: {
    paths: {
      type: Array,
      default() {
        return ['dashboard']
      },
    },
  },
  methods: {
    show(path) {
      // .push({ path: 'register', query: { plan: 'private' } })
      this.$router.push(`/${kebabCase(path)}/`)
    },
  },
}
</script>
<template>
  <ODropdown aria-role="list">
    <div class="whitespace-nowrap" slot="trigger">
      <slot />
    </div>
    <ODropdownItem
      v-for="path in paths"
      :key="path"
      @click="show(path)"
      aria-role="listitem"
    >
      {{ $t(path) }}
    </ODropdownItem>
  </ODropdown>
</template>
