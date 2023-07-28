<script lang="ts" setup>
import { definePageMeta } from '#imports'

definePageMeta({
  middleware: ['guest'],
})
</script>

<template>
  <UArticle>
    <UContainer>
      <UBox>Welcome Guest</UBox>
    </UContainer>
  </UArticle>
</template>
