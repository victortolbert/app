<script>
import {getColors} from 'theme-colors'
const {generate, presetPalettes} = require('@ant-design/colors')
import {defineComponent, computed} from '@nuxtjs/composition-api'
import {css} from '@emotion/css'
import theme from '~/theme'
// console.log(Object.values(theme.colors.oliveGreen))

// get variable from inline style
// element.style.getPropertyValue("--my-var");

// get variable from wherever
// getComputedStyle(element).getPropertyValue("--my-var");

// set variable on inline style
// element.style.setProperty("--my-var", jsVar + 4);

// const elm = document.documentElement;
// elm.style.setProperty('--USER-THEME-COLOR', 'tomato');
// const elm = document.querySelector('#note-uid');
// elm.style.setProperty('--note-color', 'yellow');

// :root {
//   --lightness: 50;
// }
// body {
//   background: hsl(25, 80%, calc(var(--lightness) * 1%));
// }
// body {
//   --lightness: calc(var(--lightness * 0.8));
//   background: hsl(25, 80%, calc(var(--lightness) * 1%));
// }

export default defineComponent({
  setup() {
    // const colors = getColors('#da5d3f')
    // const colors = generate('#1890ff')
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

      <AppNavbar :person="$auth.user" />

      <main class="flex-1" :class="[`body-${$store.state.class.bodyClass}`]">
        <!-- save fetch calls on pages already visited -->
        <!-- <nuxt keep-alive /> -->
        <nuxt :nuxt-child-key="$route.fullPath" />
      </main>

      <!-- <AppFooter /> -->
      <AppToolbar />
      <AppCookieConsent button-text="I understand" />
      <PortalTarget name="overlays" />
    </div>
  </ThemeProvider>
</template>
