<script>
  // import {groupByAlphabet} from '~/helpers'

  export default {
    data() {
      return {
        employees: [
          { id: 1, firstName: 'Victor', lastName: 'Tolbert' },
          { id: 2, firstName: 'Reginald', lastName: 'Tolbert' },
          { id: 3, firstName: 'Victor', lastName: 'Rodriquez' },
          { id: 4, firstName: 'Ron', lastName: 'Johnson' },
        ],
      }
    },
    mounted() {
      console.log(this.employees)
      // const test = this.employees.sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }))
      // console.log(test)
    }
  }
</script>
<template>
  <div>
    <div
      class="sticky top-0 z-10 px-6 py-1 text-sm font-medium text-gray-500 border-t border-b border-gray-200 bg-gray-50"
    >
      <h3>Y</h3>
    </div>
    <slot />
  </div>
</template>
