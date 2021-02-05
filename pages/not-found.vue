<template>
  <main class="flex-1">
    <BasePageHeading>{{ $t('not_found') }}</BasePageHeading>

    <section class="p-8 prose">
      <h1>Oops!</h1>

      <h3>The {{ resource }} you're looking for is not here.</h3>

      <RouterLink :to="{name: 'home'}">{{ $t('back_home') }}</RouterLink>
    </section>
  </main>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true,
    },
  },
}
</script>
