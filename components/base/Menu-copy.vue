<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
})
</script>
<template>
  <ODropdown aria-role="list">
    <div slot="trigger">
      <div class="flex items-center space-x-1">
        <span>
          <slot>Custom</slot>
        </span>
        <BaseIconSolid name="chevron-down" class="text-gray-400" />
      </div>
    </div>

    <ODropdownItem v-for="option in options" :key="option.id" aria-role="listitem">{{ option }}</ODropdownItem>
  </ODropdown>
</template>
