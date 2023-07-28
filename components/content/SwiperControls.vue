<script setup lang="ts">
const swiper = useSwiper()
</script>

<template>
  <div class="mt-4">
    <UContainer>
      <div class="flex items-center gap-4">
        <UButton icon="i-carbon-arrow-left" color="white" variant="ghost" @click="swiper.slidePrev()">
          Previous
        </UButton>

        <UButton trailing-icon="i-carbon-arrow-right" color="white" variant="ghost" @click="swiper.slideNext()">
          Next
        </UButton>
      </div>
    </UContainer>
  </div>
</template>
