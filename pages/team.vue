<template>
  <main class="flex-1">
    <BasePageHeading>{{ $t('team') }}</BasePageHeading>

    <section class="max-w-xl p-8 mx-8 mt-8 bg-white">
      <h2 class="text-xl font-bold">{{ $t('people') }}</h2>

      <!--  -->
      <OField
        :label="$t('description')"
        label-for="description"
        :message="errors.procedure"
        :variant="errors.procedure ? 'danger' : ''"
      >
        <OInput
          id="description"
          type="textarea"
          input-class="block w-full h-48 max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          :placeholder="$t('how_to_make_steps')"
          v-model="recipe.procedure"
        />
      </OField>

      <OField :label="$t('find_a_name')">
        <OAutocomplete
          v-model="name"
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          placeholder="e.g. Anne"
          :keep-first="keepFirst"
          :open-on-focus="openOnFocus"
          :data="filteredDataObj"
          field="user.first_name"
          @select="option => (selected = option)"
        />
      </OField>

      <div class="flex justify-center col-start-1 md:col-end-3">
        <OButton
          :label="$t('add_recipe')"
          @click="addRecipe"
          native-type="button"
        />
      </div>
      <p style="position: relative">
        <OLoading full-page :active.sync="isLoading">
          <OIcon
            class="text-main dark:text-main-dark"
            icon="sync-alt"
            size="large"
            spin
          />
        </OLoading>
      </p>

      <OField class="file">
        <OUpload v-model="file">
          <OButton tag="a" variant="primary">
            <OIcon icon="upload" />
            <span>{{ $t('click_to_upload') }}</span>
          </OButton>
        </OUpload>

        <span class="file-name" v-if="file">
          {{ file.name }}
        </span>
      </OField>

      <section>
        <OField>
          <OUpload v-model="dropFiles" multiple drag-drop>
            <section class="ex-center">
              <p>
                <OIcon icon="upload" size="is-large" />
              </p>
              <p>{{ $t('drop_files_or_click_to_upload') }}</p>
            </section>
          </OUpload>
        </OField>

        <div class="tags">
          <span v-for="(dropFile, index) in dropFiles" :key="index">
            {{ dropFile.name }}
            <OButton
              icon-left="times"
              size="small"
              native-type="button"
              @click="deleteDropFile(index)"
            />
          </span>
        </div>
      </section>

      <section>
        <OTooltip position="bottom" multiline>
          <OButton>{{ $t('html_content') }} </OButton>
          <template #content>
            <b>Lorem ipsum dolor sit amet</b>, consectetur warning elit.
            <i>Fusce id fermentum quam</i>.
          </template>
        </OTooltip>

        <OTooltip
          variant="primary"
          :triggers="['click']"
          :auto-close="['outside', 'escape']"
        >
          <template #content>
            <OIcon icon="heart" variant="danger" />
            <OIcon icon="thumbs-up" variant="info" />
            <OIcon icon="thumbs-down" variant="warning" />
            <OIcon icon="smile-beam" />
          </template>
          <OButton>{{ $t('action') }}</OButton>
        </OTooltip>
      </section>

      <OField :label="$t('find_a_name')">
        <OAutocomplete
          v-model="name"
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          placeholder="e.g. Anne"
          :keep-first="keepFirst"
          :open-on-focus="openOnFocus"
          :data="filteredDataObj"
          field="user.first_name"
          @select="option => (selected = option)"
        >
        </OAutocomplete>
      </OField>

      <OField :label="$t('select_time')">
        <OTimepicker
          :placeholder="$t('click_to_select')"
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          icon="clock"
          :increment-minutes="minutesGranularity"
          :increment-hours="hoursGranularity"
        >
        </OTimepicker>
      </OField>

      <div class="space-y-1 text-center">
        <svg
          class="w-12 h-12 mx-auto text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div class="flex text-sm text-gray-600">
          <label
            for="file-upload"
            class="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <span>{{ $t('upload_file') }}</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              class="sr-only"
            />
          </label>
          <p class="pl-1">{{ $t('or_drag_and_drop') }}</p>
        </div>
        <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
      </div>
    </section>
  </main>
</template>

<script>
import {data2} from '@/__mocks__'

export default {
  middleware: 'guest',
  data() {
    return {
      data2,
      data: [],
      keepFirst: false,
      openOnFocus: false,
      name: '',
      selected: null,
      minutesGranularity: 15,
      hoursGranularity: 2,
      file: null,
      dropFiles: [],
      isLoading: false,
      isFetching: false,
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
      page: 1,
      totalPages: 1,
    }
  },
  computed: {
    filteredDataObj() {
      return this.data2.filter(option => {
        return option.user.first_name
          .toString()
          .toLowerCase()
          .includes(this.name.toLowerCase())
      })
    },
  },
  watch: {
    file(newFile) {
      this.recipe.image = window.URL.createObjectURL(newFile)
    },
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1)
    },
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
          this.$store.commit('addRecipe', this.recipe)
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
    handleIconClick() {
      // console.log('handleIconClick')
    },
    handleIconRightClick() {
      // console.log('handleIconRightClick')
    },
    getAsyncData(name) {
      // String update
      if (this.name !== name) {
        this.name = name
        this.data = []
        this.page = 1
        this.totalPages = 1
      }
      // String cleared
      if (!name.length) {
        this.data = []
        this.page = 1
        this.totalPages = 1
        return
      }
      // Reached last page
      if (this.page > this.totalPages) {
        return
      }
      this.isFetching = true
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=bb6f51bef07465653c3e553d6ab161a8&query=${name}&page=${this.page}`,
      )
        .then(response => response.json())
        .then(data => {
          data.results.forEach(item => this.data.push(item))

          this.page++
          this.totalPages = data.total_pages
        })
        .catch(error => {
          throw error
        })
        .finally(() => {
          this.isFetching = false
        })
    },
    getMoreAsyncData() {
      this.getAsyncData(this.name)
    },
  },
}
</script>

<style>
.ex-center {
  text-align: center;
}
.o-autocomplete .o-autocomplete-menu .o-autocomplete-item {
  @apply whitespace-normal;
}
</style>
