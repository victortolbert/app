<template>
  <main class="flex-1">
    <BasePageHeading>{{ $t('team') }}</BasePageHeading>

    <section class="max-w-xl p-8 mx-8 mt-8 bg-white">
      <h2 class="text-xl font-bold">{{ $t('people') }}</h2>

      <p>
        {{ $t('edit_volunteer') }} | {{ $t('edit_family_members') }} |
        {{ $t('edit_advocate') }}
      </p>

      <h3 class="text-lg font-medium">{{ $t('contact_info') }}</h3>

      <OButton>{{ $t('change_profile_picture') }}</OButton>

      <OField :label="$t('find_movie')">
        <OAutocomplete
          :data="data"
          :placeholder="$t('enter_movie_name')"
          field="title"
          clearable
          size="medium"
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          open-on-focus
          :loading="isFetching"
          check-infinite-scroll
          :debounce-typing="500"
          @typing="getAsyncData"
          @select="option => (selected = option)"
          @infinite-scroll="getMoreAsyncData"
        >
          <template #default="{option}">
            <div class="flex">
              <div class="flex-shrink-0 mr-4">
                <div class="">
                  <img
                    width="120"
                    :src="`https://image.tmdb.org/t/p/w500/${option.poster_path}`"
                  />
                </div>
              </div>
              <div>
                <h4 class="text-lg font-bold">{{ option.title }}</h4>
                <p class="mt-1">
                  {{ option.overview }}
                </p>
                <small>
                  {{ $t('released_at') }} {{ option.release_date }},
                  {{ $t('rated') }}
                  <b>{{ option.vote_average }}</b>
                </small>
              </div>
            </div>
          </template>
          <template #footer>
            <span v-show="page > totalPages" class="has-text-grey">
              {{ $t('no_movies_found') }}
            </span>
          </template>
        </OAutocomplete>

        <div v-if="selected" class="mt-4">
          <span
            class="text-xs font-semibold tracking-widest uppercase border-b"
          >
            {{ $t('selected') }}
          </span>
          <p class="mt-1 font-mono text-xs">{{ selected }}</p>
        </div>
      </OField>

      <OField :label="$t('first_name')">
        <OInput
          value=""
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </OField>

      <OField :label="$t('last_name')">
        <OInput
          value=""
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </OField>

      <OField :label="$t('status')">
        <OSelect :placeholder="$t('select_status')" expanded>
          <option value="1">Serving</option>
          <option value="2">Option 2</option>
        </OSelect>
      </OField>

      <OField :label="$t('home_church')">
        <OInput
          value=""
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </OField>

      <OField :label="$t('assigned_church')">
        <OSelect :placeholder="$t('select_assigned_church')" expanded>
          <option value="1">
            12Stone - Snellville - Snellvill, GA - Active
          </option>
          <option value="2">Option 2</option>
        </OSelect>
      </OField>

      <OField :label="$t('primary_email')">
        <OInput
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          type="email"
          value="john@"
          maxlength="30"
        />
      </OField>

      <OField :label="$t('secondary_email')">
        <OInput
          type="email"
          value="john@"
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          :placeholder="$t('enter_secondary_email')"
          maxlength="30"
        />
      </OField>

      <OField :label="$t('mobile_phone')">
        <OInput
          value=""
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </OField>

      <OField :label="$t('home_phone')">
        <OInput
          value=""
          :placeholder="$t('enter_home_phone')"
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </OField>

      <OField :label="$t('work_phone')">
        <OInput
          value=""
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </OField>

      <OField :label="$t('occupation')">
        <OInput
          value=""
          :placeholder="$t('occupation')"
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </OField>

      <OField :label="$t('address')">
        <OInput
          value=""
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </OField>

      <OField :label="$t('apartment_or_unit_number')">
        <OInput
          value=""
          placeholder="Suite, apartment number, or unit"
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </OField>

      <OField :label="$t('city')">
        <OInput
          value=""
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </OField>

      <OField :label="$t('state')">
        <OInput
          value=""
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </OField>

      <OField :label="$t('zip_code')">
        <OInput
          value=""
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </OField>

      <OField :label="$t('country')">
        <OInput
          value=""
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </OField>

      <h3 class="text-lg font-medium">{{ $t('family_section') }}</h3>

      <!--
- Basic Info
- Assignments
- Members
- Notes
- Agreements (List of agreement types -- supported family, care volunteer)
- Staff Roles
- Church Roles
- Care community Volunteer roles
- Care Communities
- History / Timeline
- Contact Log
- Family Photo
-->

      <h3 class="text-lg font-medium">{{ $t('family_info') }}</h3>

      <OField :label="$t('family_name')">
        <OInput
          value=""
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </OField>

      <OField :label="$t('family_status')">
        <OSelect :placeholder="$t('select_family_status')" expanded>
          <option value="1">Closed</option>
          <option value="2">Option 2</option>
        </OSelect>
      </OField>

      <OField :label="$t('home_type')">
        <OSelect :placeholder="$t('select_home_type')" expanded>
          <option value="1">Traditional Home - Foster</option>
          <option value="2">Option 2</option>
        </OSelect>
      </OField>

      <OField :label="$t('family_structure')">
        <OSelect :placeholder="$t('select_family_structure')" expanded>
          <option value="1">Single Mother</option>
          <option value="2">Option 2</option>
        </OSelect>
      </OField>

      <OField :label="$t('agency')">
        <OSelect :placeholder="$t('select_agency')" expanded>
          <option value="1">Gwinett County DFCS (Lawrenceville, GA)</option>
          <option value="2">Option 2</option>
        </OSelect>
      </OField>

      <OField :label="$t('family_language')">
        <OSelect :placeholder="$t('select_language')" expanded>
          <option value="1">English Only</option>
          <option value="2">Option 2</option>
        </OSelect>
      </OField>

      <h3 class="text-lg font-medium">{{ $t('family_address') }}</h3>

      <OField :label="$t('address')">
        <OInput
          value=""
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </OField>

      <OField :label="$t('apartment_or_unit_number')">
        <OInput
          value=""
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </OField>

      <OField :label="$t('city')">
        <OInput
          value=""
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </OField>

      <h3 class="text-lg font-medium">{{ $t('volunteer_eligibility') }}</h3>

      - {{ $t('signed_agreement_on') }}:

      <button>{{ $t('view_print_agreement') }}</button>

      <OField>
        <OSwitch>{{ $t('has_church_volunteer_approval') }}</OSwitch>
      </OField>

      <button>{{ $t('cancel') }}</button> <button>{{ $t('save') }}</button>

      <h3 class="text-lg font-medium">{{ $t('roles_and_assignments') }}</h3>

      <h4>{{ $t('staff_roles') }}</h4>

      <!--
- Actions
- Affiliate
- Role
- Status
-->

      <h4>{{ $t('church_roles') }}</h4>

      <!--
- Actions
- Church
- Role
- Status
-->

      <h4>{{ $t('care_community_volunteer_roles') }}</h4>

      <!--
- Actions
- Care Community
- Iteration
- Role
- Status
-->

      <h4>{{ $t('family_roles') }}</h4>

      <!--
- Family
- Role
- Status
-->

      <h4>{{ $t('events') }}</h4>

      <!--
- Event
- Event Date
- Status
-->

      <h4>{{ $t('groups') }}</h4>

      <!--
- Group
- Role
- Status
-->

      <h3 class="text-lg font-medium">{{ $t('interests') }}</h3>

      <OField>
        <OSwitch>{{ $t('has_church_volunteer_approval') }}</OSwitch>
      </OField>

      <OField>
        <OSwitch>{{ $t('helping_in_a_care_community') }}</OSwitch>
      </OField>

      <OField>
        <OSwitch>{{ $t('care_community_team_leader') }}</OSwitch>
      </OField>

      <OField>
        <OSwitch>{{ $t('care_community_family_helper') }}</OSwitch>
      </OField>

      <OField>
        <OSwitch>{{ $t('care_community_child_mentor') }}</OSwitch>
      </OField>

      <OField>
        <OSwitch>{{ $t('interim_care_giver') }}</OSwitch>
      </OField>

      <OField>
        <OSwitch>{{ $t('becoming_a_foster_family') }} </OSwitch>
      </OField>

      <OField>
        <OSwitch>{{ $t('becoming_a_respite_foster_family') }}</OSwitch>
      </OField>

      <OField>
        <OSwitch>{{ $t('joining_the_advocate_team') }}</OSwitch>
      </OField>

      <OField>
        <OSwitch>CarePortal</OSwitch>
      </OField>

      <OField>
        <OSwitch>Loaves and Fishes (12Stone Church Central)</OSwitch>
      </OField>

      <h3 class="text-lg font-medium">
        {{ $t('volunteer_compliance') }}
      </h3>

      <OField :label="$t('affiliate_training_completed')">
        <ODatepicker
          icon="calendar"
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </OField>

      <OField :label="$t('agency_training_completed')">
        <ODatepicker
          icon="calendar"
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </OField>

      <OField :label="$t('church_training_completed')">
        <ODatepicker
          icon="calendar"
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </OField>

      <OField :label="$t('agency_background_check_completed')">
        <ODatepicker
          icon="calendar"
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </OField>

      <OField :label="$t('church_background_check_completed')">
        <ODatepicker
          icon="calendar"
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </OField>

      <OField :label="$t('fingerprints_completed')">
        <ODatepicker
          icon="calendar"
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </OField>

      <OField :label="$t('cpr_expiration')">
        <ODatepicker
          icon="calendar"
          input-class="block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </OField>

      <OField>
        <OSwitch>{{ $t('approved_to_babysit') }}</OSwitch>
      </OField>

      <OField :label="$t('which_agency')">
        <OSelect :placeholder="$t('select_an_agency')" expanded>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </OSelect>
      </OField>

      <h3 class="text-lg font-medium">{{ $t('agreements') }}</h3>

      <h4>{{ $t('family_agreements') }}</h4>

      - {{ $t('no_agreements_found') }}

      <OButton>{{ $t('cancel') }}</OButton> <OButton>{{ $t('save') }}</OButton>

      <h3 class="text-lg font-medium">
        {{ $t('notes') }} ({{ $t('only_advocates_and_staff_can_view') }})
      </h3>

      <OButton>{{ $t('add') }}</OButton>

      <!--
- From
- Note
- Status
-->

      <p>{{ $t('no_matching_results') }}</p>

      <OField :label="$t('who_can_view_this_note')">
        <OSelect :placeholder="$t('select_an_agency')" expanded>
          <option value="1">Staff Only</option>
          <option value="2">Option 2</option>
        </OSelect>
      </OField>

      <!--
- Author
- Note
- Date
-->

      <OButton>{{ $t('cancel') }}</OButton> <OButton>{{ $t('save') }}</OButton>

      <h3 class="text-lg font-medium">{{ $t('contact_log') }}</h3>

      <!--
- Type
- Staff Member
- Contact(s)
- Note
- Date
-->

      <OButton>{{ $t('add_log_entry') }}</OButton>

      <OField :label="$t('church')">
        <OSelect :placeholder="$t('select_church')" expanded>
          <option value="1">Staff Only</option>
          <option value="2">Option 2</option>
        </OSelect>
      </OField>

      <OField :label="$t('role')">
        <OSelect :placeholder="$t('select_role')" expanded>
          <option value="1">Staff Only</option>
          <option value="2">Option 2</option>
        </OSelect>
      </OField>

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
