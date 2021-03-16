<script>
export default {
  layout: 'plain',
}
</script>

<template>
  <PageWrapper>
    <SectionWrapper class="max-w-md p-2 bg-gray-500 border">
      <!-- <div class="aspect-w-4 aspect-h-4"> -->
      <div class="aspect-w-205 aspect-h-78">
        <!-- <div class="border border-red-600 aspect-w-16 aspect-h-9"> -->
        <!-- <img class="object-contain w-full" src="http://designcoder.test/assets/img/booster/default_video_thumbnail.jpg"> -->
        <img
          class="object-cover w-full"
          src="http://designcoder.test/assets/img/booster/default_video_thumbnail.jpg"
        />
      </div>
    </SectionWrapper>
  </PageWrapper>
</template>

<style class="postcss">
.banner {
  @apply w-full overflow-hidden mb-6 border-b-4 dark:border-white dark:border-opacity-5 bg-white bg-opacity-5;
  height: 80vh;
  max-height: 80vh;
  filter: brightness(0.5) blur(2px);
}
</style>
