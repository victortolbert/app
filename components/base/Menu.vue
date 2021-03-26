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
    <div class="whitespace-nowrap" slot="trigger" slot-scope="{active}">
      <slot />
      <FontAwesomeIcon
        :icon="['fas', active ? 'caret-up' : 'caret-down']"
        class="inline-block ml-1 text-gray-400"
      />
      <!-- <OIcon :icon="active ? 'caret-up' : 'caret-down'" class="text-gray-400" /> -->
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
