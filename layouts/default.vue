<script>
import {getColors} from 'theme-colors'
import {defineComponent, computed} from '@nuxtjs/composition-api'
import {css} from '@emotion/css'
import theme from '~/theme'

export default defineComponent({
  setup() {
    const colors = getColors('#090')
    const applyStyles = computed(() => {
      return css({})
    })

    return {
      applyStyles,
      colors,
      theme,
    }
  },
  mounted() {
    this.$jam('this.$jam plugin works in mounted...')
    // ctx.$icon(512)
  },
})
</script>

<template>
  <ThemeProvider :theme="theme">
    <div
      id="app"
      :class="applyStyles"
      class="relative flex flex-col min-h-screen"
    >
      <AppOfflineIndicator />

      <PromiseServesNavbar />

      <main class="flex-1" :class="[`body-${$store.state.class.bodyClass}`]">
        <!-- save fetch calls on pages already visited -->
        <!-- <nuxt keep-alive /> -->
        <nuxt />
      </main>

      <AppFooter />
      <AppToolbar />
      <!-- <AppCookieConsent button-text="I understand" /> -->
      <PortalTarget name="overlays" />
    </div>
  </ThemeProvider>
</template>
