<script lang="ts" setup>
definePageMeta({
  layout: 'plain',
  middleware: ['auth'],
})

const online = useOnline()
</script>

<template>
  <UArticle>
    <UContainer>
      <Suspense>
        <ClientOnly>
          <PageView v-if="online" />
          <div v-else class="text-gray-500/80">
            You're offline
          </div>
        </ClientOnly>
        <template #fallback>
          <div class="italic opacity-50">
            <span class="animate-pulse">Loading...</span>
          </div>
        </template>
      </Suspense>

      <ExampleInput />
    </UContainer>
  </UArticle>
</template>
