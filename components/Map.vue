<template>
  <MyMarker />
</template>

<script>
import {provide, ref} from '@nuxtjs/composition-api'
import MyMarker from './MyMarker'

export default {
  components: {
    MyMarker,
  },
  setup() {
    const location = ref('North Pole')

    const updateLocation = () => {
      location.value = 'South Pole'
    }

    provide('location', location)
    provide('updateLocation', updateLocation)

    return {
      location,
    }
  },
}
</script>
