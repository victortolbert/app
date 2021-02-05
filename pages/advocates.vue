<template>
  <main class="flex-1 w-full bg-gray-100">
    <BasePageHeading> {{ $t('advocates') }} </BasePageHeading>

    <section style="height: 380px">
      <BaseDirectory />
    </section>
  </main>
</template>

<script>
export default {
  name: 'AdvocatesView',
  page() {
    return {
      title: 'Welcome',
    }
  },
}
</script>
