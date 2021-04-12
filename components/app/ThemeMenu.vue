<template>
  <select
    class="block w-full rounded-md border-transparent bg-transparent focus:ring-transparent active:outline-none focus:border-transparent focus:outline-none sm:text-sm"
    v-model="$colorMode.preference"
  >
    <option value="system">System</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
    <option value="sepia">Sepia</option>
  </select>
</template>
