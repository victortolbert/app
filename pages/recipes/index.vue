<script>
export default {
  async asyncData({$axios}) {
    return {
      recipes: await $axios.$get('https://api.victortolbert.com/recipes'),
    }
  },
}
</script>
<template>
  <PageWrapper>
    <SectionWrapper>
      <div class="lg:grid lg:grid-cols-2 lg:gap-4">
        <RecipeFinder />

        <div class="p-8 mt-8 lg:mt-0">
          <h2>Add your recipe</h2>
          <RecipeUploader />
        </div>
      </div>
    </SectionWrapper>
  </PageWrapper>
</template>
