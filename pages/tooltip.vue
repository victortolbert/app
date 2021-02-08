<template>
  <main class="flex-1">
    <section class="flex items-center justify-center h-full p-8">
      <OButton @click="active = !active"> Toggle </OButton>

      <hr />

      <OTooltip label="I'm never closing" :active="active" always>
        <OButton> Always </OButton>
      </OTooltip>

      <OTooltip label="Tooltip right" position="right" :active="active">
        <OButton> Right </OButton>
      </OTooltip>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      active: true,
    }
  },
}
</script>
