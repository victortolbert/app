<script>
import {getColors} from 'theme-colors'
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const colors = getColors('#090')
    return {
      colors,
    }
  },
  mounted() {
    this.$jam('this.$jam plugin works in mounted...')
    // ctx.$icon(512)
  },
})
</script>

<template>
  <div id="app" class="relative flex flex-col min-h-screen">
    <!-- <div class="fixed w-full h-full overflow-hidden">
        <div class="scroll-bg" style="
            width: 100%;
            height: 400%;
            background-image: url('/assets/img/bg.png');
            will-change: transform;
            background-repeat: repeat-y;
            background-position: center;
          "></div>
      </div> -->
    <AppOfflineIndicator />

    <AppNavbar />

    <main class="flex-1">
      <!-- save fetch calls on pages already visited -->
      <!-- <nuxt keep-alive /> -->
      <nuxt />
    </main>

    <!-- <AppFooter /> -->
    <!-- <AppToolbar /> -->
    <!-- <AppCookieConsent button-text="I understand" /> -->
    <PortalTarget name="overlays" />
  </div>
</template>
