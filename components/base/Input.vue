<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners: function() {
      var vm = this
      // `Object.assign` merges objects together forming a new object
      return Object.assign({},
        // All the listeners are added from the parents
        this.$listeners,
        // We can then add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component will work with v-model
          input: function(event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
})
</script>

<template>
  <label>
    {{ label }}
    <input v-bind="$attrs" v-bind:value="value" v-on="inputListeners" />
  </label>
</template>
