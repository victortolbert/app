<script>
const { generate, presetPalettes } = require('@ant-design/colors')
import { defineComponent } from '@nuxtjs/composition-api'
import { css } from '@emotion/css'
import theme from '~/config/theme'

export default defineComponent({
  name: 'DefaultLayout',
  setup() {
    const colors = generate(Object.values(theme.colors.paprika)[5])
    const applyStyles = computed(() => {
      return css({})
    })

    return {
      applyStyles,
      colors,
      theme,
      presetPalettes,
    }
  },
  created() {
    const parts = location.hostname.split('.')
    const subdomain = parts.shift()
    console.log({ subdomain })
    this.$store.commit('SET_THEME', subdomain)
  },

})
</script>

<template>
  <ThemeProvider :theme="theme">
    <div
      id="app"
      :class="[
        $store.state.affiliate.name.toLowerCase(),
        applyStyles
      ]"
      class="relative flex flex-col min-h-screen"
    >
      <AppOfflineIndicator />

      <AppNavbar :person="$auth.user" />

      <main class="flex-1">
        <nuxt :nuxt-child-key="$route.fullPath" />
      </main>

      <AppFooter />
      <AppCookieConsent button-text="I understand" />
      <PortalTarget name="overlays" />
    </div>
  </ThemeProvider>
</template>
