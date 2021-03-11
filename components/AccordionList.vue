<template>
  <div class="accordion-list">
    <slot />
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AccordionList',
  provide() {
    return {
      accordionListState: this.sharedState,
    }
  },
  data() {
    return {
      sharedState: {
        activeItem: 1,
      },
    }
  },
})
</script>
