<script setup>
const passed = ref(false)

function celebrate() {
  passed.value = true
  setTimeout(() => {
    passed.value = false
  }, 2000)
}
</script>

<template>
  <ConfettiComponent :passed="celebrate" />
  <UButton @click="celebrate ">
    Celebrate
  </UButton>
</template>
