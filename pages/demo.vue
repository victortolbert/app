<script>
import Multiselect from 'vue-multiselect'
import CKEditor from '@ckeditor/ckeditor5-vue2'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import FullCalendar from '@fullcalendar/vue'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
// import {Octokit} from '@octokit/rest'

export default {
  setup() {
    // const octokit = new Octokit({
    //   auth: 'secret123',
    //   userAgent: 'App v0.1.0', // TODO: Automate and update versioning
    //   timeZone: 'Europe/Amsterdam',
    //   baseUrl: 'https://api.github.com',
    //   log: {
    //     debug: () => {},
    //     info: () => {},
    //     warn: console.warn,
    //     error: console.error
    //   },
    //   request: {
    //     agent: undefined,
    //     fetch: undefined,
    //     timeout: 0
    //   }
    // })
    // (async () => {
    //   // For example to retrieve a pull request, use octokit.pulls.get()
    //   const { data: pullRequest } = await octokit.pulls.get({
    //   owner: "octokit",
    //   repo: "rest.js",
    //   pull_number: 123,
    // });
    // Compare: https://docs.github.com/en/rest/reference/repos/#list-organization-repositories
    // octokit.repos
    //   .listForOrg({ org: 'octokit', type: "public"})
    //   .then(({ data }) => { // handle data })
  },
  components: {
    // Use the <ckeditor> component in this view.
    CKEditor: CKEditor.component,
    FullCalendar,
    Multiselect,
  },
  beforeRouteLeave (to, from , next) {
    // if not vue router
    // window.onbeforeunload = () => 'Are you sure you want to leave?'
    // window.onbeforeunload = () => (this.unsavedChanges ? true : null)
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    if (answer) {
      next()
    } else {
      next(false)
    }
  },
  data() {
    return {
      autocompleteOptions: [],
      selectedAutocompleteOption: null,
      isFetching: false,
      name: '',
      page: 1,
      totalPages: 1,
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {},
      counter: 0,
      selectOptions: [],
      selectedOption: null,
      calendarOptions: {
        plugins: [interactionPlugin, timeGridPlugin],
        initialView: 'timeGridWeek',
        nowIndicator: true,
        editable: true,
        initialEvents: [{title: 'nice event', start: new Date()}],
      },
    }
  },
  methods: {
    increment() {
      this.counter++
    },
    decrement() {
      this.counter--
    },
    getAsyncData(name) {
      // String update
      if (this.name !== name) {
        this.name = name
        this.autocompleteOptions = []
        this.page = 1
        this.totalPages = 1
      }

      // String cleared
      if (!name.length) {
        this.autocompleteOptions = []
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
          data.results.forEach(item => this.autocompleteOptions.push(item))

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

<template>
  <article>
    <BaseHero
      class="p-8"
      bg-cover
      title="Demo page"
      cover-url="https://cominex.net/assets/img/backgrounds/liquid_cheese.svg"
    >
    </BaseHero>

    <KeyboardShortcut />

    <section class="mt-4 px-8 max-w-3xl">
      <Multiselect v-model="selectedOption" :options="selectOptions" />
    </section>

    <section class="mt-4 px-8 max-w-3xl">
      <OField label="Description">
        <CKEditor
          :editor="editor"
          v-model="editorData"
          :config="editorConfig"
        />
      </OField>
    </section>

    <section class="mt-4 px-8 max-w-3xl">
      <button @click="increment">Increment</button>
      <p>Counter : {{ counter }}</p>
      <button @click="decrement">Decrement</button>
    </section>

    <section class="mt-4 px-8 max-w-3xl">
      <FormLabel>
        <input type="text" placeholder="First name" />
      </FormLabel>
    </section>

    <section class="mt-4 px-8 max-w-3xl">🍝🍔🍟</section>

    <form @submit.prevent="" class="px-8 flex-col space-y-4">
      <OField label="Color">
        <input type="color" />
      </OField>

      <OField label="Date">
        <input type="date" />
      </OField>

      <OField label="Datetime Local">
        <input type="datetime-local" />
      </OField>

      <OField label="File">
        <input type="file" />
      </OField>

      <OField label="Hidden">
        <input type="hidden" />
      </OField>

      <OField label="Image">
        <input type="image" />
      </OField>

      <OField label="Month">
        <input type="month" />
      </OField>

      <OField label="Number">
        <input type="number" />
      </OField>

      <OField label="Range">
        <input type="range" />
      </OField>

      <OField label="Search">
        <input type="search" />
      </OField>

      <OField label="Tel">
        <input type="tel" />
      </OField>

      <OField label="Time">
        <input type="time" />
      </OField>

      <OField label="URL">
        <input type="url" />
      </OField>

      <OField label="Week">
        <input type="week" />
      </OField>

      <input type="reset" />
    </form>

    <section class="mt-4 px-8 max-w-3xl">
      <p class="content"><b>Selected:</b> {{ selectedAutocompleteOption }}</p>
      <OField label="Find a movie">
        <OAutocomplete
          :data="data"
          placeholder="e.g. Fight Club"
          field="title"
          :loading="isFetching"
          check-infinite-scroll
          :debounce-typing="500"
          @typing="getAsyncData"
          @select="option => (selectedAutocompleteOption = option)"
          @infinite-scroll="getMoreAsyncData"
        >
          <template slot-scope="props">
            <div class="media">
              <div class="media-left">
                <img
                  width="32"
                  :src="`https://image.tmdb.org/t/p/w500/${props.option.poster_path}`"
                />
              </div>
              <div class="media-content">
                {{ props.option.title }}
                <br />
                <small>
                  Released at {{ props.option.release_date }}, rated
                  <b>{{ props.option.vote_average }}</b>
                </small>
              </div>
            </div>
          </template>
          <template slot="footer">
            <span v-show="page > totalPages" class="has-text-grey">
              Thats it! No more movies found.
            </span>
          </template>
        </OAutocomplete>
      </OField>
    </section>

    <section class="mt-4 px-8 max-w-3xl">
      <FullCalendar :options="calendarOptions" />
    </section>
  </article>
</template>
