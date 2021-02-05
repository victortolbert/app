<template>
  <div></div>
</template>

<script>
import _ from 'lodash'
import {watch, ref} from '@nuxtjs/composition-api'

export default {
  setup() {
    const name = ref('Jay')
    const firstName = ref('Jay')
    const lastName = ref('Pritchett')
    const secondLevel = ref([5, 6, 7])
    const level = ref([1, 2, 3, 4, secondLevel.value])

    //     const state = ref({
    //   name: "",
    // });

    const state = ref({
      name: '',
      location: {
        country: '',
      },
    })

    watch(name, (currentValue, oldValue) => {
      console.log(currentValue)
      console.log(oldValue)
    })

    watch(
      () => [...level.value],
      (currentValue, oldValue) => {
        console.log(currentValue)
        console.log(oldValue)
      },
    )

    //     watch(state.value, (currentValue, oldValue) => {
    //   console.log(currentValue);
    //   console.log(oldValue);
    // });

    watch(
      () => _.cloneDeep(level.value),
      (currentValue, oldValue) => {
        console.log(currentValue)
        console.log(oldValue)
      },
    )

    watch(
      () => _.cloneDeep(state.value),
      (currentValue, oldValue) => {
        console.log(currentValue)
        console.log(oldValue)
      },
    )

    watch([firstName, lastName], (currentValue, oldValue) => {
      console.log(currentValue)
      console.log(oldValue)
    })
  },
}
</script>
