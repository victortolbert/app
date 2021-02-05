<script>
import {defineComponent, inject} from '@vue/composition-api'

export default defineComponent({
  setup() {
    const userLocation = inject('location', 'The Universe')
    const userGeolocation = inject('geolocation')
    const updateUserLocation = inject('updateLocation')

    return {
      userLocation,
      userGeolocation,
      updateUserLocation,
    }
  },
})
</script>

<template>
  <div>
    <h1>My Marker</h1>
    <p>{{ userLocation }}</p>
    <p>{{ userGeolocation }}</p>
    <button @click="updateUserLocation">Update Location</button>
  </div>
</template>
