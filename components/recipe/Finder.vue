<script>
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'RecipeFinder',
  mounted() {
    setTimeout(() => {
      this.isLoading = false
    }, 2500)
  },
  computed: {
    filteredRecipes() {
      switch (this.filter) {
        case 'featured':
          return this.$store.state.recipes.filter(recipe => {
            return recipe.isFeatured
          })
        case 'faster':
          return [...this.$store.state.recipes].sort((a, b) => a.time - b.time)
        default:
          return this.$store.state.recipes
      }
    },
  },
  data() {
    return {
      isOpen: -1,
      filter: 'all',
      isLoading: true,
    }
  },
})
</script>

<template>
  <div class="border-b border-gray-100 divide-y divide-gray-100">
    <div class="flex py-3 space-x-4">
      <ORadio
        v-model="filter"
        name="all"
        native-value="all"
        @click.native="isOpen = -1"
      >
        All
      </ORadio>
      <ORadio
        v-model="filter"
        name="featured"
        native-value="featured"
        @click.native="isOpen = -1"
      >
        Featured
      </ORadio>
      <ORadio
        v-model="filter"
        name="faster"
        native-value="faster"
        @click.native="isOpen = -1"
      >
        Faster
      </ORadio>
    </div>

    <article
      class="flex p-4 space-x-4"
      v-for="(recipe, index) of filteredRecipes"
      :class="{hidden: !isLoading}"
      :key="`loading-${index}`"
    >
      <div>
        <OSkeleton circle width="64px" height="64px" />
      </div>
      <div class="w-full">
        <OSkeleton width="100%" />
        <OSkeleton width="100%" />
        <OSkeleton width="100%" />
      </div>
    </article>

    <OCollapse
      animation="slide"
      v-for="(recipe, index) of filteredRecipes"
      :class="{hidden: isLoading}"
      :key="index"
      :open="isOpen == index"
      @open="isOpen = index"
    >
      <article
        slot="trigger"
        slot-scope="props"
        class="flex p-4 space-x-4 card-header text-main dark:text-main-dark"
      >
        <RecipeImage
          :src="recipe.image"
          :alt="`Image for recipe ${recipe.title}`"
        />

        <div class="relative flex-auto min-w-0 sm:pr-20 lg:pr-0 xl:pr-20">
          <h2 class="text-lg font-semibold mb-0.5">
            {{ recipe.title }}
          </h2>
          <dl class="flex flex-wrap text-sm font-medium whitespace-pre">
            <div>
              <dt class="sr-only">Time</dt>
              <dd>
                <abbr :title="`${recipe.time} minutes`"
                  >{{ recipe.time }}m</abbr
                >
              </dd>
            </div>
            <div>
              <dt class="sr-only">Difficulty</dt>
              <dd>· {{ recipe.difficulty | difficulty }}</dd>
            </div>
            <div>
              <dt class="sr-only">Servings</dt>
              <dd>· {{ recipe.servings }} servings</dd>
            </div>
            <div class="flex-none w-full mt-0.5 font-normal">
              <dt class="inline mr-1">By</dt>
              <dd class="inline">{{ recipe.author }}</dd>
            </div>
            <div
              class="absolute top-0 right-0 rounded-full px-2 py-0.5 hidden sm:flex lg:hidden xl:flex items-center space-x-1"
            >
              <dt class="text-gray-400">
                <BaseIconOutlined
                  :name="props.open ? 'chevron-up' : 'chevron-down'"
                />
              </dt>
            </div>
          </dl>
        </div>
      </article>
      <div class="text-main dark:text-main-dark">
        <div class="p-4">
          {{ recipe.procedure }}
        </div>
      </div>
    </OCollapse>
  </div>
</template>
