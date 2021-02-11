<template>
  <main
    class="flex-1 w-full max-w-4xl px-6 py-0 mx-auto mt-40 mb-16 overflow-auto bg-white border-gray-200 rounded-lg"
  >
    <ProgramOverview
      :program="$store.state.program"
      :override-text="$t('overview_text_override')"
    />

    <PaymentForm />

    <AppFooter />
  </main>
</template>

<script>
export default {
  name: 'GiveView',
  page() {
    return {
      title: this.$store.state.program.event_name,
      script: [
        {
          src: 'https://cdn.jwplayer.com/libraries/eVFvXVIt.js',
          async: true,
          defer: true,
        },
      ],
    }
  },
}
</script>
