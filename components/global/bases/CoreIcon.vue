<template>
  <svg
    class="w-5 h-5 text-gray-400"
    :x-description="description"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <title>{{ title }}</title>

    <g v-if="icon == 'copy'">
      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
      <path
        d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"
      ></path>
    </g>

    <g v-if="icon == 'email'">
      <path
        d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
      ></path>
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
    </g>

    <path
      v-if="icon == 'exclamation-circle'"
      fill-rule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
      clip-rule="evenodd"
    ></path>

    <path
      v-if="icon == 'question-mark-circle'"
      fill-rule="evenodd"
      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
      clip-rule="evenodd"
    ></path>

    <path
      v-if="icon == 'users'"
      d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
    ></path>
    <g v-if="icon == 'vue'">
      <path
        d="M18.784 2.16309H23.3095L11.9958 21.8614L0.682129 2.16309H5.15103H9.33708L11.9958 6.73083L14.5979 2.16309H18.784Z"
        fill="#41B883"
      />
      <path
        d="M0.682129 2.16309L11.9958 21.8614L23.3095 2.16309H18.784L11.9958 13.9821L5.15103 2.16309H0.682129Z"
        fill="#41B883"
      />
      <path
        d="M5.15088 2.16309L11.9956 14.0392L18.7839 2.16309H14.5978L11.9956 6.73083L9.33694 2.16309H5.15088Z"
        fill="#35495E"
      />
    </g>
  </svg>
</template>

<script>
import {capitalize} from '@/utils'

export default {
  name: 'BaseIcon',
  props: {
    icon: {
      type: String,
      default: 'question-mark-circle',
      validator(value) {
        return [
          'copy',
          'email',
          'exclamation-circle',
          'question-mark-circle',
          'users',
        ].includes(value)
      },
    },
    label: {
      type: String,
      default: null,
    },
    library: {
      type: String,
      default: 'heroicon',
    },
  },
  computed: {
    title() {
      return this.label || capitalize(this.icon)
    },
    description() {
      return capitalize(`${this.library}: ${this.icon}`)
    },
  },
}
</script>
