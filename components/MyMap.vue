<template>
  <MyMarker />
</template>

<script>
import {provide, reactive, readonly, ref} from '@vue/composition-api'

import MyMarker from './MyMarker.vue'

export default {
  components: {
    MyMarker,
  },
  setup() {
    const location = ref('North Pole')
    const geolocation = reactive({
      longitude: 90,
      latitude: 135,
    })

    const updateLocation = () => {
      location.value = 'South Pole'
    }

    provide('location', readonly(location))
    provide('geolocation', readonly(geolocation))
    provide('updateLocation', updateLocation)
  },
}
</script>
