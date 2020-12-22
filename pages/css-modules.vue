<template>
  <section class="p-8">
    <p>Grid Padding: {{ $style.gridPadding }}</p>

    <iframe
      allowtransparency="true"
      title="Wistia video player"
      allowFullscreen
      frameborder="0"
      scrolling="no"
      class="wistia_embed"
      name="wistia_embed"
      src="https://fast.wistia.net/embed/iframe/g630i8kd4b"
      width="400"
      height="225"
    ></iframe>
  </section>
</template>

<style module>
:export {
  gridPadding: 1.5rem;
}
</style>
