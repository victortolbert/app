<script>
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'RecipeUploader',

  data() {
    return {
      file: null,
      isLoading: false,
      recipe: {
        title: null,
        author: null,
        time: 5,
        image: null,
        servings: 1,
        difficulty: 'easy',
        procedure: '',
      },
      errors: {
        title: null,
        author: null,
        image: null,
        procedure: null,
        time: null,
        servings: null,
      },
    }
  },
  watch: {
    file(newFile) {
      this.recipe.image = window.URL.createObjectURL(newFile)
    },
  },
  methods: {
    _validateRecipe() {
      let isValid = true
      for (const key in this.errors) {
        this.errors[key] = null
        if (!this.recipe[key]) {
          this.errors[key] = 'This field cannot be empty'
          isValid = false
        }
        if ((key === 'servings' || key === 'time') && this.recipe[key] < 1) {
          this.errors[key] = 'This field should be at least 1'
          isValid = false
        }
      }
      return isValid
    },
    addRecipe() {
      this.isLoading = true
      if (this._validateRecipe()) {
        setTimeout(() => {
          this.$store.commit('ADD_RECIPE', this.recipe)
          this.recipe = {
            title: '',
            author: '',
            time: 5,
            image: null,
            servings: 1,
            difficulty: 'easy',
            procedure: '',
          }
          this.isLoading = false
        }, 2000)
      } else {
        this.isLoading = false
      }
    },
  },
})
</script>

<template>
  <form
    class="grid grid-cols-1 gap-4 pb-8 mb-4 md:grid-cols-2 sm:px-8 sm:pt-6 text-main"
  >
    <div class="col-start-1 mb-4 md:col-end-3">
      <OField
        label="Title"
        label-for="name"
        :variant="errors.title ? 'danger' : ''"
        :message="errors.title"
      >
        <OInput
          id="title"
          type="text"
          placeholder="Name of your recipe (e.g. Pizza)"
          v-model="recipe.title"
        />
      </OField>
    </div>

    <div class="col-start-1 mb-4 md:col-end-3">
      <OField
        label="Author"
        label-for="author"
        :variant="errors.author ? 'danger' : ''"
        :message="errors.author"
      >
        <OInput
          id="author"
          type="text"
          placeholder="Author name (e.g. Nick Cave)"
          v-model="recipe.author"
        />
      </OField>
    </div>

    <div class="col-start-1 mb-4">
      <OField
        label="Time (in minutes)"
        label-for="time"
        :variant="errors.time ? 'danger' : ''"
        :message="errors.time"
      >
        <OInput
          id="time"
          type="number"
          placeholder="Time"
          v-model.number="recipe.time"
          min="1"
        />
      </OField>
    </div>

    <div class="mb-4">
      <OField
        label="Servings"
        label-for="servings"
        :variant="errors.servings ? 'danger' : ''"
        :message="errors.servings"
      >
        <OInput
          id="servings"
          type="number"
          placeholder="Servings"
          v-model.number="recipe.servings"
          min="1"
        />
      </OField>
    </div>

    <div class="flex justify-between col-start-1 mb-4">
      <OField
        label="Image"
        label-for="image"
        :variant="errors.image ? 'danger' : ''"
        :message="errors.image"
      >
        <OUpload v-model="file">
          <OButton tag="a" variant="primary">
            <OIcon icon="upload" class="mr-4"></OIcon>
            <span>Click to upload</span>
          </OButton>
        </OUpload>
      </OField>
      <RecipeImage v-if="recipe.image" :src="recipe.image" />
    </div>

    <div class="mb-4">
      <OField label="Difficulty" class="">
        <div class="flex">
          <ODropdown
            placeholder="Difficulty"
            v-model="recipe.difficulty"
            aria-role="list"
          >
            <OButton
              variant="primary"
              type="button"
              slot="trigger"
              class="w-32"
            >
              <div class="flex justify-between">
                <span>{{ recipe.difficulty | difficulty }}</span>
                <OIcon icon="caret-down"></OIcon>
              </div>
            </OButton>
            <ODropdownItem value="easy">
              <span>Easy</span>
            </ODropdownItem>
            <ODropdownItem value="medium">
              <span>Medium</span>
            </ODropdownItem>
            <ODropdownItem value="hard">
              <span>Hard</span>
            </ODropdownItem>
          </ODropdown>
        </div>
      </OField>
    </div>
    <div class="col-start-1 mb-4 md:col-end-3">
      <OField
        label="Procedure"
        label-for="procedure"
        :variant="errors.procedure ? 'danger' : ''"
        :message="errors.procedure"
      >
        <OInput
          inputClass="h-48"
          id="procedure"
          type="textarea"
          placeholder="How to make your recipe step by step"
          v-model="recipe.procedure"
        />
      </OField>
    </div>
    <div class="flex justify-center col-start-1 md:col-end-3">
      <OButton label="Add recipe" @click="addRecipe" native-type="button" />
    </div>

    <p style="position: relative">
      <OLoading full-page :active.sync="isLoading">
        <OIcon
          class="text-main dark:text-main-dark"
          icon="sync-alt"
          size="large"
          spin
        >
        </OIcon>
      </OLoading>
    </p>
  </form>
</template>
