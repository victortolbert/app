<template>
  <div></div>
</template>

<script>
import _ from 'lodash'
import {watch, reactive} from '@nuxtjs/composition-api'

export default {
  setup() {
    const secondLevel = reactive([5, 6, 7])
    const level = reactive([1, 2, 3, 4, secondLevel])
    const state = reactive({
      name: '',
      location: {
        country: '',
      },
    })

    // watch(
    //   () => state,
    //   (currentValue, oldValue) => {
    //     console.log(currentValue)
    //     console.log(oldValue)
    //   },
    //   {deep: true},
    // )

    watch(
      () => _.cloneDeep(state),
      (currentValue, oldValue) => {
        console.log(currentValue)
        console.log(oldValue)
      },
    )

    watch(
      () => _.cloneDeep(level),
      (currentValue, oldValue) => {
        console.log(currentValue)
        console.log(oldValue)
      },
    )

    const state2 = reactive({
      name: '',
    })
    watch(
      () => state2.name,
      (currentValue, oldValue) => {
        console.log(currentValue)
        console.log(oldValue)
      },
    )
  },
}
</script>
