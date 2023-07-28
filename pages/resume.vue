<script setup>
definePageMeta({
  title: 'Resume',
  breadcrumb: 'Resume',
  layout: false,
})

const { data: resume } = await useAsyncData(
  'home', () => queryContent('/resume').findOne(),
)
</script>

<template>
  <UArticle class="mt-8">
    <UContainer>
      <div class="max-w-3xl prose">
        <div>
          <span class="text-lg font-bold">{{ resume.basics.name }}</span><br>
          <NuxtLink :to="resume.basics.url">
            {{ resume.basics.url }}
          </NuxtLink>
        </div>
      </div>
    </UContainer>
  </UArticle>
</template>
