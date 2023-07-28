<script setup>
import { GoogleMap, Marker as GoogleMarker } from 'vue3-google-map'

const center = reactive({
  lat: 40.689247,
  lng: -74.044502,
})
</script>

<template>
  <GoogleMap
    api-key="AIzaSyAC93FnPRqmvipFZZUenONKIbKHqPlbu6s"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="15"
  >
    <GoogleMarker :options="{ position: center }" />
  </GoogleMap>
</template>
