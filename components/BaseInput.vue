<template>
  <div :class="{hasError: v && v.$error}" class="mb-4 field">
    <label
      v-if="label"
      for="textInput"
      class="inline-block pl-2 mb-1 text-sm text-gray-700"
    >
      {{ label }}
      <span v-if="required && showAsterisk">*</span>
    </label>
    <div class="control">
      <TheMask
        v-if="mask"
        :mask="mask"
        v-model.number="model"
        :type="type"
        :placeholder="placeholder"
        :class="{
          'is-danger border-red-600': v && v.$error && v.$dirty,
          'text-right': type === 'number',
        }"
        name="textInput"
        class="w-full mb-1 border border-gray-400 rounded-lg input form-input focus:shadow-outline focus:bg-blue-100"
      />
      <input
        v-else
        v-model="model"
        :type="type"
        :placeholder="placeholder"
        :class="{
          'is-danger border-red-600': v && v.$error && v.$dirty,
          'text-right': type === 'number',
        }"
        :maxlength="maxlength"
        name="textInput"
        class="w-full mb-1 border border-gray-400 rounded-lg input form-input focus:shadow-outline focus:bg-blue-100"
      />
    </div>
    <p
      v-if="required && v && !v.required && v.$dirty"
      class="pl-2 text-xs text-red-500 help is-danger"
    >
      {{ label }} {{ $t('is_required') }}
    </p>
    <p
      v-if="type == 'email' && v && !v.email && v.$dirty"
      class="pl-2 text-xs text-red-500 help is-danger"
    >
      {{ label }} {{ $t('is_invalid') }}
    </p>
    <p
      v-if="type == 'tel' && v && !v.isPhone && v.$dirty"
      class="pl-2 text-xs text-red-500 help is-danger"
    >
      {{ label }} {{ $t('is_invalid') }}
    </p>
    <p
      v-if="type == 'email' && v && !v.notBooster && v.$dirty"
      class="pl-2 text-xs text-red-500 help is-danger"
    >
      {{ label }} {{ $t('not_booster') }}
    </p>
    <p
      v-if="type == 'password' && v && !v.sameAsPassword && v.$dirty"
      class="pl-2 text-xs text-red-500 help is-danger"
    >
      {{ label }} {{ $t('must_be_identical') }}
    </p>
    <p
      v-if="type == 'password' && v && v.minLength && v.$dirty"
      class="pl-2 text-xs text-red-500 help is-danger"
    >
      {{ $t('at_least') }} {{ v.$params.minLength.min }} {{ $t('characters') }}
    </p>

    <p
      v-if="type == 'password' && v && v.hasNumber && v.$dirty"
      class="pl-2 text-xs text-red-500 help is-danger"
    >
      {{ $t('at_least') }} {{ $t('number') }}
    </p>
    <p
      v-if="type == 'password' && v && v.hasLowercase && v.$dirty"
      class="pl-2 text-xs text-red-500 help is-danger"
    >
      {{ $t('at_least') }} {{ $t('lowercase') }}
    </p>
    <p
      v-if="type == 'password' && v && v.hasUppercase && v.$dirty"
      class="pl-2 text-xs text-red-500 help is-danger"
    >
      {{ $t('at_least') }} {{ $t('uppercase') }}
    </p>
    <p
      v-if="type == 'password' && v && v.hasSpecialCharacter && v.$dirty"
      class="pl-2 text-xs text-red-500 help is-danger"
    >
      {{ $t('at_least') }} {{ $t('symbol') }}
    </p>
    <p v-if="helpText" class="pl-2 text-xs help">
      {{ helpText }}
    </p>
  </div>
</template>

<script>
import {TheMask} from 'vue-the-mask'

export default {
  name: 'BaseInput',
  components: {TheMask},
  props: {
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    v: {
      type: Object,
      default: null,
    },
    mask: {
      type: String,
      default: '',
    },
    helpText: {
      type: String,
      default: '',
    },
    maxlength: {
      type: [String, Number],
      default: null,
    },
    showAsterisk: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.v.$touch()
        this.$emit('input', value)
      },
    },
  },
  watch: {
    model(val) {
      this.$emit('input', val)
    },
  },
}
</script>
