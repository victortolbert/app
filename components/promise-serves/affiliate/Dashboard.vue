<script>
import {useContext, defineComponent} from '@nuxtjs/composition-api'
import CKEditor from '@ckeditor/ckeditor5-vue2'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Multiselect from 'vue-multiselect'
import FullCalendar from '@fullcalendar/vue'
// import {Octokit} from '@octokit/rest'
// import {directive} from 'vue-awesome-swiper'

export default defineComponent({
  setup() {
    const {$config} = useContext()

    return {
      assetsUrl: $config.assetsUrl,
    }
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
      img: 'https://images.pexels.com/photos/226746/pexels-photo-226746.jpeg',
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
    change({coordinates, canvas}) {
      console.log(coordinates, canvas)
    },
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
})
</script>
<template>
  <article>
    <PageBreadcrumb class="py-2 border-b" />
    <!-- <SectionWrapper class="grid grid-cols-4 gap-8">
      <cropper
        class="cropper"
        :src="img"
        :stencil-props="{
          aspectRatio: 10 / 12,
        }"
        @change="change"
      />
    </SectionWrapper> -->

    <!--
    <div v-swiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          Render original HTML in server, render Swiper in browser (client)
        </div>
      </div>
    </div> -->

    <!-- Recent Activity

- Appropriate info for each user level



GET a specific user: https://demo.promiseserves.org/api/v1/people/101/?auth_key=1234ltp
GET User List: https://demo.promiseserves.org/api/v1/people/?auth_key=1234ltp
PATCH user: https://demo.promiseserves.org/api/v1/people/101/?auth_key=1234ltp&name_first=Jeremy2&name_last=Doublestein2
2:47
These are just examples with an obvious week auth key. So I'll tighten that all up before we go live with it. -->

    <!-- <SectionWrapper>
      <ReadMore />
    </SectionWrapper> -->

    <SectionWrapper :padded="false" class="px-8 mt-8">
      <div class="lg:grid-cols-2 lg:gap-8 lg:grid">
        <div>
          <CurrentNews />
        </div>

        <div>
          <PromiseServesFamiliesAwaitingCommunities />
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper :padded="false" class="px-8 mt-8">
      <div class="lg:grid-cols-2 lg:gap-8 lg:grid">
        <CalendarWeekly />

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
      <OField label="Description">
        <ClientOnly>
          <CKEditor
            :editor="editor"
            v-model="editorData"
            :config="editorConfig"
          />
        </ClientOnly>
      </OField>
    </SectionWrapper>

    <SectionWrapper class="mt-4">
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

<style lang="scss">
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
.fc .fc-header-toolbar.fc-toolbar {
  display: none;
}

/*
  Maybe you need to set the limits for the cropper sizes or its container sizes
  otherwise a cropping image will try to fill all available space
*/
.cropper {
  height: 600px;
  background: #ddd;
}
</style>
