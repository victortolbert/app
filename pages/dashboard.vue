<template>
  <section
    class="flex flex-col items-center justify-center flex-1 min-h-screen bg-gray-100"
  >
    <div class="flex items-center justify-center w-full min-h-screen">
      <div class="flex-1 p-8">
        <!-- class="grid grid-flow-row-dense grid-cols-2 grid-rows-3 gap-4 auto-cols-min" -->
        <div class="grid grid-cols-3 gap-4">
          <!-- Dashboard Panel -->
          <div
            class="col-span-2 p-4 pr-6 space-y-2 bg-white border-l-8 border-transparent rounded-md shadow-md dark:text-white dark:bg-gray-800"
          >
            <header class="flex items-center justify-between">
              <h2 class="text-xl font-bold">{{ $t('calendar') }}</h2>
              <ButtonGroupDateRange />
            </header>

            <MediaObject>
              <div
                class="flex flex-col w-20 h-20 overflow-hidden border rounded shadow"
              >
                <span
                  class="flex items-center justify-center py-1 text-xs font-semibold tracking-wide uppercase bg-red-500 text-primary-50"
                >
                  Jan
                </span>
                <span
                  class="flex items-center justify-center flex-1 text-2xl font-semibold text-gray-700"
                >
                  12
                </span>
              </div>
            </MediaObject>

            <VueSlickCarousel v-bind="slickOptions">
              <div v-for="i in 5" :key="i" class="img-wrapper">
                <img :src="`/img/photos/promise_serves/${i}.jpeg`" />
              </div>
            </VueSlickCarousel>

            <article class="prose-sm prose">
              <h3 class="font-bold">Roles</h3>
              <ul>
                <li>{{ $t('affiliate') }}</li>
                <li>{{ $t('staff') }}</li>
                <li>{{ $t('advocate') }}</li>
                <li>{{ $t('admin') }}</li>
                <li>{{ $t('community_volunteer') }}</li>
                <li>{{ $t('prospect') }}</li>
                <li>{{ $t('church') }}</li>
                <li>{{ $t('community') }}</li>
                <li>{{ $t('super_admin') }}</li>
              </ul>
            </article>
          </div>

          <div
            class="p-4 bg-white border-transparent rounded-md shadow-md dark:text-white dark:bg-gray-800"
          >
            <ProgressMeter :first-meter="42" />
          </div>

          <div
            class="p-4 pr-6 space-y-2 bg-white border-l-8 border-transparent rounded-md shadow-md"
          >
            <h2 class="text-lg font-semibold leading-6">{{ $t('cases') }}</h2>

            <p>
              {{ $t('about_cases') }}
            </p>

            <SectionGettingStarted />
            <CardPoster />
            <SelectCountry />
            <TimelineTraining />
            <MediaObject />

            <div>
              <ButtonAction />
            </div>
          </div>

          <div
            class="p-4 pr-6 space-y-2 bg-white border-l-8 border-teal-400 rounded-md shadow-md"
          >
            <h2 class="text-lg font-bold leading-6">
              {{ $t('next_action_steps') }}
            </h2>

            <p>{{ $t('no_upcoming_items') }}</p>

            <ExampleSummaryDetail />
          </div>

          <div
            class="p-4 pr-6 space-y-2 bg-white border-l-8 border-teal-400 rounded-md shadow-md"
          >
            <h2 class="text-lg font-bold leading-6">
              {{ $t('upcoming_items') }}
            </h2>
            <p>{{ $t('no_upcoming_items') }}</p>
          </div>
          <div
            class="p-4 pr-6 space-y-2 bg-white border-l-8 border-transparent rounded-md shadow-md"
          >
            <SteppedProgress />
          </div>
        </div>
      </div>
    </div>
    <div class="grid gap-8 px-8 lg:grid-cols-1">
      <!--  3u_vIdnJYLc
            CruddyByDesign: MF0jFKvS4SI
      -->
      <figure class="aspect-w-16 aspect-h-9">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/?controls=0&amp;start=30"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </figure>
    </div>
  </section>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  // layout: 'plain',
  components: {VueSlickCarousel},
  data() {
    return {
      slickOptions: {
        initialSlide: 0,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
        dots: true,
        dotsClass: 'slick-dots custom-dot-class',
        edgeFriction: 0.35,
        fade: true,
        focusOnSelect: true,
        infinite: true,
        speed: 500,
        touchThreshold: 5,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: 'linear',
        pauseOnDotsHover: true,
        pauseOnFocus: true,
        pauseOnHover: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
    }
  },
  computed: {
    username() {
      // We will see what `params` is shortly
      return this.$route.params.username
    },
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
  },
}
</script>
