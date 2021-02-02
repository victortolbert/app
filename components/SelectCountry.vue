<template>
  <v-select
    class="style-chooser"
    placeholder="Choose a Styling Option"
    :components="{Deselect}"
    :options="['Canada', 'United States']"
  >
    <template #open-indicator="{attributes}">
      <span v-bind="attributes">
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </span>
    </template>
  </v-select>
</template>

<script>
export default {
  data() {
    return {
      OpenIndicator: {
        render: createElement => createElement('span', {class: {toggle: true}}),
      },
      Deselect: {
        render: createElement => createElement('span', '×'),
      },
    }
  },
}
</script>
