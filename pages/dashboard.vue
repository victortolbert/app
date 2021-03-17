<script>
import Multiselect from 'vue-multiselect'
import CKEditor from '@ckeditor/ckeditor5-vue2'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import FullCalendar from '@fullcalendar/vue'
// import {Octokit} from '@octokit/rest'
// import {directive} from 'vue-awesome-swiper'

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
  // directives: {
  //   swiper: directive
  // },
  // beforeRouteLeave(to, from, next) {
  //   // if not vue router
  //   // window.onbeforeunload = () => 'Are you sure you want to leave?'
  //   // window.onbeforeunload = () => (this.unsavedChanges ? true : null)
  //   const answer = window.confirm(
  //     'Do you really want to leave? you have unsaved changes!',
  //   )
  //   if (answer) {
  //     next()
  //   } else {
  //     next(false)
  //   }
  // },
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
      swiperOptions: {
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
        },
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
    onSwiperRedied(swiper) {
      console.log('Swiper redied!', swiper)
    },
    onSwiperSlideChangeTransitionStart() {
      console.log('SwiperSlideChangeTransitionStart!')
    },
    onSwiperClickSlide(index, reallyIndex) {
      console.log('Swiper click slide!', reallyIndex)
    },
    getMoreAsyncData() {
      this.getAsyncData(this.name)
    },
  },
}
</script>
<template>
  <article>
    <!-- <BaseHero
      class="p-8"
      bg-cover
      title="Demo page"
      cover-url="https://cominex.net/assets/img/backgrounds/liquid_cheese.svg"
    >
    </BaseHero> -->

    <PageBreadcrumb class="py-2" />

    <!-- <div v-swiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          Render original HTML in server, render Swiper in browser (client)
        </div>
      </div>
    </div> -->

    <!-- Recent Activity

- Appropriate info for each user level

eg. Affiliate Staff

- New Churches Added
- New Advocates (Completed advocate training)
- New Volunteers (Completed Volunteer Orientation)
- New Families (Same as Awaiting Families, would replace existing)
- New / Upcoming Needs
- New / Upcoming Events


So sorry Victor. I just can't seem to stay out of the frying pan right now! Here are the end points for you to try:
GET a specific user: https://demo.promiseserves.org/api/v1/people/101/?auth_key=1234ltp
GET User List: https://demo.promiseserves.org/api/v1/people/?auth_key=1234ltp
PATCH user: https://demo.promiseserves.org/api/v1/people/101/?auth_key=1234ltp&name_first=Jeremy2&name_last=Doublestein2
2:47
These are just examples with an obvious week auth key. So I'll tighten that all up before we go live with it. -->

    <SectionWrapper class="mt-4">
      <div class="lg:grid-cols-2 lg:gap-4 lg:grid">
        <CalendarMonthly />

        <div class="swipper-example">
          <!-- directive: render origin html on server & render Swiper on browser -->
          <!-- You can get the swiper instance object in current component context by the name: "mySwiper"  -->
          <div
            class="swiper"
            v-swiper:myDirectiveSwiper="swiperOptions"
            @ready="onSwiperRedied"
            @click-slide="onSwiperClickSlide"
            @slide-change-transition-start="onSwiperSlideChangeTransitionStart"
          >
            <div class="mt-4 lg:mt-0 swiper-wrapper">
              <div class="swiper-slide" v-for="index in 6" :key="index">
                <span>Slide {{ index }}</span>
              </div>
            </div>
            <div class="swiper-pagination swiper-pagination-bullets"></div>
          </div>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper class="mt-4">
      <StatsDisplay />
      <StatsPanels />
    </SectionWrapper>

    <SectionWrapper class="mt-4">
      <CurrentNews />
    </SectionWrapper>

    <SectionWrapper class="mt-4">
      <OField label="Description">
        <CKEditor
          :editor="editor"
          v-model="editorData"
          :config="editorConfig"
        />
      </OField>
    </SectionWrapper>

    <SectionWrapper class="mt-4">
      <KeyboardShortcut />
      <BaseDirectory />
    </SectionWrapper>

    <SectionWrapper class="mt-4">
      <button @click="increment">Increment</button>
      <p>Counter : {{ counter }}</p>
      <button @click="decrement">Decrement</button>
    </SectionWrapper>

    <SectionWrapper>
      <FormLabel>
        <input type="text" placeholder="First name" />
      </FormLabel>
    </SectionWrapper>
  </article>
</template>

<style lang="scss" scoped>
.swipper-example {
  height: auto;
  .swiper {
    height: 300px;
    width: 100%;
    .swiper-slide {
      text-align: center;
      font-size: 38px;
      font-weight: 700;
      background-color: #eee;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .swiper-pagination {
      > .swiper-pagination-bullet {
        background-color: red;
      }
    }
  }
}
</style>
