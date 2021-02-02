<template>
  <div class="px-8">
    <Slick
      ref="slick"
      :options="slickOptions"
      :key="slickRefreshKey"
      @beforeChange="slickBeforeChange()"
    >
      <div v-for="item in items" :key="item.id">
        <VideoIframe :video-id="item.videoId" />
      </div>
    </Slick>
  </div>
</template>

<script>
import {defineComponent} from '@nuxtjs/composition-api'

import Slick from 'vue-slick'
import VideoIframe from '@/components/VideoIframe'

export default defineComponent({
  components: {Slick, VideoIframe},
  props: {
    items: {
      type: Array,
      default: () => [
        {
          id: 1,
          videoId: '',
        },
      ],
    },
  },
  data() {
    return {
      slickOptions: {
        slidesToShow: 1,
        dots: true,
        autoplay: false,
        arrows: true,
        mobileFirst: true,
        prevArrow: `<button type="button" class="slick-prev"><i class='fas fa-chevron-left'></i></button>`,
        nextArrow: `<button type="button" class="slick-next"><i class='fas fa-chevron-right'></i></button>`,
      },
      slickRefreshKey: 0,
      slickWatcher: null,
    }
  },
  mounted() {
    // Force refresh Slick when going between pages
    this.$nextTick(() => {
      this.slickWatcher = this.$store.watch(
        (state, getters) => state.activeTab,
        (newVal, oldVal) => {
          this.slickRefreshKey += 1
        },
      )
    })
    window.addEventListener('reslicked', this.reSlick)
  },
  beforeDestroy() {
    // Prevent watcher memory leak
    if (this.slickWatcher !== null) {
      this.slickWatcher()
    }
    window.removeEventListener('reslicked', this.reSlick)
  },
  methods: {
    slickBeforeChange() {
      this.pauseAllJWPlayers()
    },
    pauseAllJWPlayers() {
      let playerIndex = 0
      while (window.jwplayer(playerIndex).play) {
        if (window.jwplayer(playerIndex).getState() === 'playing') {
          window.jwplayer(playerIndex).pause()
        }
        playerIndex++
      }
    },
    next() {
      this.$refs.slick.next()
    },
    prev() {
      this.$refs.slick.prev()
    },
    reSlick() {
      if (this.$refs.slick) {
        this.$refs.slick.reSlick()
      }
    },
  },
})
</script>
