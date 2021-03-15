<template>
  <main class="flex-1">
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </main>
</template>

<script>
export default {
  props: ['event'],
}
</script>
