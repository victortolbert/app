<template>
  <div>
    <label :for="uuid" v-if="label">{{ label }}</label>
    <input
      v-bind="$attrs"
      :value="modelValue"
      :placeholder="label"
      @input="$emit('update:modelValue', $event.target.value)"
      class="field"
      :id="uuid"
      :aria-describedby="error ? `-error` : null"
      :aria-invalid="error ? true : null"
    />
    <p v-if="error" class="errorMessage" :id="`-error`" aria-live="assertive">
      {{ error }}
    </p>
  </div>
</template>

<script>
import UniqueID from '~/features/UniqueID'

export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
  },
  setup() {
    const uuid = UniqueID().getID()
    return {
      uuid,
    }
  },
}
</script>
