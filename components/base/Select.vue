<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Make a selection'
    }
  },
  data() {
    return {
      key: ''
    }
  },
})
</script>

<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <select
      v-bind="$attrs"
      v-on="$listeners"
      class="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
      :value="value"
      @change="$emit('change', $event.target.value)"
    >
      <option :value="undefined">
        <slot>{{ placeholder }}</slot>
      </option>
      <option
        v-for="option in options"
        :value="option"
        :key="option"
        :selected="option === value"
      >{{ option }}</option>
    </select>

    <!-- <select name="LeaveType" @change="onChange($event)" class="form-control" v-model="key">
      <option value="1">Annual Leave/ Off-Day</option>
      <option value="2">On Demand Leave</option>
    </select>-->
  </div>
</template>
