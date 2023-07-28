<script setup lang='ts'>
const { count, inc, dec } = useCount()
</script>

<template>
  <div class="my-3 inline-flex">
    <button class="rounded-full p-2 btn" @click="dec()">
      <u-icon name="i-carbon-subtract" />
    </button>
    <div class="m-auto inline-block w-15 font-mono">
      {{ count }}
    </div>
    <button class="rounded-full p-2 btn" @click="inc()">
      <u-icon name="i-carbon-add" />
    </button>
  </div>
</template>
