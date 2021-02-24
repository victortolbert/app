<template>
  <main class="flex-1">
    <BasePageHeading>Clients</BasePageHeading>

    <section class="p-8 max-w-screen-6xl">
      <ClientsTable :data="data" />
    </section>
  </main>
</template>

<script>
const data = require('@/data/sample.json')

export default {
  name: 'ClientsView',

  data() {
    return {
      data,
    }
  },
}
</script>
