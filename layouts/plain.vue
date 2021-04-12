<script>
import { getColors } from 'theme-colors'
const { generate, presetPalettes } = require('@ant-design/colors')
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { css } from '@emotion/css'
import theme from '~/config/theme'

export default defineComponent({
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
    const upperleveldomain = parts.join('.')
    const secondleveldomain = parts.slice(-2).join('.')

    this.$store.commit('SET_SUBDOMAIN', subdomain)
  },
  mounted() {
    console.dir(this.$store.state.affiliate)
  },
})
</script>

<template>
  <div :class="['bg-gray-100', $store.state.theme]">
    <Nuxt />
  </div>
</template>
