<template>
  <main class="flex-1 w-full bg-gray-100">
    <BasePageHeading> {{ $t('welcome') }}</BasePageHeading>

    <section class="flex">
      <div class="w-4 h-4 bg-temperture-01"></div>
      <div class="w-4 h-4 bg-temperture-02"></div>
      <div class="w-4 h-4 bg-temperture-03"></div>
      <div class="w-4 h-4 bg-temperture-04"></div>
      <div class="w-4 h-4 bg-temperture-05"></div>
      <div class="w-4 h-4 bg-temperture-06"></div>
      <div class="w-4 h-4 bg-temperture-07"></div>
      <div class="w-4 h-4 bg-temperture-08"></div>
      <div class="w-4 h-4 bg-temperture-09"></div>
      <div class="w-4 h-4 bg-temperture-10"></div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'AnnouncementsView',
  page() {
    return {
      title: 'Welcome',
    }
  },
}
</script>
