<script>
import {
  computed,
  reactive,
  toRefs,
  defineComponent,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const state = reactive({
      dispenser: [
        {id: 100, name: 'Coke Part 1'},
        {id: 101, name: 'Coke Part 2'},
        {id: 102, name: 'Diet Coke Part 1'},
        {id: 103, name: 'Diet Coke Part 2'},
        {id: 104, name: 'Fanta'},
        {id: 105, name: 'Sprite'},
        {id: 106, name: 'Powerade'},
        {id: 107, name: 'Lemon'},
      ],
      slots: [1, 2, 3, 4, 5, 6, 7, 8],
    })

    return {
      ...toRefs(state),
    }
  },
})
</script>
<template>
  <PageWrapper class="mx-auto max-w-7xl">
    <VButton />

    <SectionWrapper class="grid grid-cols-2 gap-8">
      <div>
        <div class="grid grid-cols-2 gap-4">
          <button
            v-for="item in dispenser"
            :key="item.id"
            class="flex items-center justify-center text-white transition-colors duration-200 transform bg-gray-500 rounded-full shadow active:ring-blue-500 w-36 h-36 hover:scale-105 ring-2 ring-gray-500 hover:bg-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none"
          >
            {{ item.name }}
          </button>
        </div>
      </div>
      <div>
        <ul class="flex flex-col space-y-4">
          <li
            class="flex items-center justify-between p-8 bg-gray-100 rounded shadow"
          >
            <span>S10</span>
            <span>Vanilla</span>
          </li>
          <li
            class="flex items-center justify-between p-8 bg-gray-100 rounded shadow"
          >
            <span>S9</span>
            <span>Fuze Tea C2</span>
          </li>
          <li
            class="flex items-center justify-between p-8 bg-gray-100 rounded shadow"
          >
            <span>S8</span>
            <span>Orange</span>
          </li>
          <li
            class="flex items-center justify-between p-8 bg-gray-100 rounded shadow"
          >
            <span>S7</span>
            <OButton>Assign</OButton>
          </li>
          <li
            class="flex items-center justify-between p-8 bg-gray-100 rounded shadow"
          >
            <span>S6</span>
            <OButton>Assign</OButton>
          </li>
          <li
            class="flex items-center justify-between p-8 bg-gray-100 rounded shadow"
          >
            <span>S5</span>
            <OButton>Assign</OButton>
          </li>
          <li
            class="flex items-center justify-between p-8 bg-gray-100 rounded shadow"
          >
            <span>S4</span>
            <OButton>Assign</OButton>
          </li>
          <li
            class="flex items-center justify-between p-8 bg-gray-100 rounded shadow"
          >
            <span>S3</span>
            <OButton>Assign</OButton>
          </li>
          <li
            class="flex items-center justify-between p-8 bg-gray-100 rounded shadow"
          >
            <span>S2</span>
            <OButton>Assign</OButton>
          </li>
          <li
            class="flex items-center justify-between p-8 bg-gray-100 rounded shadow"
          >
            <span>S1</span>
            <OButton>Assign</OButton>
          </li>
        </ul>
      </div>
    </SectionWrapper>
  </PageWrapper>
</template>
