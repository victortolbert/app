<template>
  <v-select
    class="style-chooser"
    placeholder="Active Care Communities Assigned to Me"
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
import homes from '~/data/homes'

export default {
  data() {
    return {
      homes: homes.slice(0, 3),
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

<style>
/* .style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  background: #dfe5fb;
  border: none;
  color: #394066;
  text-transform: lowercase;
  font-variant: small-caps;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #394066;
} */
</style>
