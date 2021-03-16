<script>
import {TheMask} from 'vue-the-mask'

export default {
  name: 'CoreInput',
  components: {TheMask},
  props: {
    config: {
      type: Object,
      default: () => ({
        id: null,
        name: null,
        value: null,
        label: 'Text input',
        placeholder: null,
        required: false,
        validate: null,
        mask: null,
        helpText: null,
        maxLength: 40,
        showAsterisk: false,
        hint: null,
        leadingIcon: null,
        trailingIcon: null,
      }),
    },
    type: {
      type: String,
      default: 'text',
      // validators
    },
    value: {
      type: [String, Number],
      default: '',
    },
    name: {
      type: String,
      default: null,
    },
    id: {
      type: String,
      default: null,
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
    validate: {
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
    hint: {
      type: String,
      default: '',
    },
    leadingIcon: {
      type: String,
      default: null,
    },
    trailingIcon: {
      type: String,
      default: 'question-mark-circle',
    },
    prepended: {
      type: String,
      default: null,
    },
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.validate && this.validate.$touch()
        this.$emit('input', value)
      },
    },
  },
  watch: {
    model(val) {
      this.$emit('input', val)
    },
  },
  methods: {
    onFileSelected(event) {
      // console.log(event)
      this.$emit('change', event)
      // this.selectedFile = event.target.files[0]
      // this.form.fileName = this.selectedFile.name
    },
  },
}
</script>


<template>
  <div>
    <input
      v-if="type == 'file'"
      style="display: none"
      type="file"
      ref="fileInput"
      @change="onFileSelected"
    />

    <div class="flex justify-between" :class="{hidden: type === 'file'}">
      <label
        :for="id"
        class="block text-xs font-medium tracking-wider text-gray-700 uppercase"
      >
        {{ label }}
      </label>
      <span>
        <span v-if="hint" class="text-sm text-gray-500" id="email-optional">
          {{ hint }}
        </span>
        <span v-if="required && showAsterisk" class="text-sm text-red-500">
          *
        </span>
      </span>
    </div>

    <!-- Input Element (Not shown when type is `file`)  -->
    <div
      class="relative mt-1 rounded-md shadow-sm"
      :class="{hidden: type === 'file'}"
    >
      <div
        v-if="leadingIcon && !prepended"
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <CoreIcon :icon="leadingIcon" />
      </div>

      <div class="flex mt-1 rounded-md shadow-sm">
        <span
          v-if="prepended"
          class="inline-flex items-center px-3 text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 sm:text-sm"
        >
          {{ prepended }}
        </span>
        <TheMask
          v-if="mask"
          :id="id"
          :mask="mask"
          v-model.number="model"
          :type="type"
          :placeholder="placeholder"
          :class="{
            'is-danger border-red-600':
              validate && validate.$error && validate.$dirty,
            'text-right': type === 'number',
            'rounded-r-md flex-1': prepended,
            'pl-10': leadingIcon,
          }"
          :name="name"
          class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
        <input
          :id="id"
          v-else
          v-model="model"
          :type="type"
          :placeholder="placeholder"
          :class="{
            'is-danger border-red-600':
              validate && validate.$error && validate.$dirty,
            'text-right': type === 'number',
            'rounded-r-md flex-1': prepended,
          }"
          :maxlength="maxlength"
          :name="name"
          aria-describedby="email-optional"
          class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          :ref="`${type}Input`"
          @change="onFileSelected"
        />
      </div>

      <div
        v-if="trailingIcon"
        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
      >
        <CoreIcon :icon="trailingIcon" />
      </div>
    </div>

    <!-- File Input (Shown with type is `file`) -->
    <button
      v-if="type === 'file'"
      @click="$refs.fileInput.click()"
      type="button"
      class="inline-flex items-center px-6 py-3 text-base font-medium border border-transparent rounded-md shadow-sm text-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
    >
      {{ label }}
    </button>

    <p
      v-if="required && validate && !validate.required && validate.$dirty"
      class="pl-2 text-xs text-red-500 help is-danger"
    >
      {{ label }} {{ $t('is_required') }}
    </p>
    <p
      v-if="type == 'email' && validate && !validate.email && validate.$dirty"
      class="pl-2 text-xs text-red-500 help is-danger"
    >
      {{ label }} {{ $t('is_invalid') }}
    </p>
    <p
      v-if="type == 'tel' && validate && !validate.isPhone && validate.$dirty"
      class="pl-2 text-xs text-red-500 help is-danger"
    >
      {{ label }} {{ $t('is_invalid') }}
    </p>
    <p
      v-if="
        type == 'email' && validate && !validate.notBooster && validate.$dirty
      "
      class="pl-2 text-xs text-red-500 help is-danger"
    >
      {{ label }} {{ $t('not_booster') }}
    </p>
    <p
      v-if="
        type == 'password' &&
        validate &&
        !validate.sameAsPassword &&
        validate.$dirty
      "
      class="pl-2 text-xs text-red-500 help is-danger"
    >
      {{ label }} {{ $t('must_be_identical') }}
    </p>
    <p
      v-if="
        type == 'password' && validate && validate.minLength && validate.$dirty
      "
      class="pl-2 text-xs text-red-500 help is-danger"
    >
      {{ $t('at_least') }} {{ validate.$params.minLength.min }}
      {{ $t('characters') }}
    </p>

    <p
      v-if="
        type == 'password' && validate && validate.hasNumber && validate.$dirty
      "
      class="pl-2 text-xs text-red-500 help is-danger"
    >
      {{ $t('at_least') }} {{ $t('number') }}
    </p>
    <p
      v-if="
        type == 'password' &&
        validate &&
        validate.hasLowercase &&
        validate.$dirty
      "
      class="pl-2 text-xs text-red-500 help is-danger"
    >
      {{ $t('at_least') }} {{ $t('lowercase') }}
    </p>
    <p
      v-if="
        type == 'password' &&
        validate &&
        validate.hasUppercase &&
        validate.$dirty
      "
      class="pl-2 text-xs text-red-500 help is-danger"
    >
      {{ $t('at_least') }} {{ $t('uppercase') }}
    </p>
    <p
      v-if="
        type == 'password' &&
        validate &&
        validate.hasSpecialCharacter &&
        validate.$dirty
      "
      class="pl-2 text-xs text-red-500 help is-danger"
    >
      {{ $t('at_least') }} {{ $t('symbol') }}
    </p>
    <p v-if="helpText" class="pl-2 text-xs help">
      {{ helpText }}
    </p>
  </div>
</template>

<style>
label {
  margin-bottom: 0.25rem !important;
}
</style>
