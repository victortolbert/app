<template>
  <div v-if="!$ackee.details.unknown && !$ackee.details.preference">
    Allow website to gather data for improvement? (language, browser, screen
    width, etc.)
    <button @click="$ackee.details.optIn">Sure!</button>
    <button @click="$ackee.details.optOut">No thank you!</button>
  </div>
</template>
