<!-- @vue-ignore -->
<script>
import {defineComponent} from '@nuxtjs/composition-api'
import {getColors} from 'theme-colors'
import namer from 'color-namer'

export default defineComponent({
  head: {},
  async asyncData({app, params, error}) {
    try {
      const affiliate = await app.$axios.$get(
        `https://api.victortolbert.com/affiliates/${params.id}`,
      )
      return {affiliate}
    } catch (e) {
      error(e) // Show the nuxt error page with the thrown error
    }
  },
  computed: {
    theme() {
      return JSON.parse(this.affiliate.affiliate_style_settings)
    },
    colors() {
      return {
        primary: getColors(this.theme.color_primary),
        secondary: getColors(this.theme.color_secondary),
        name: namer(this.theme.color_primary).basic[0].name,
      }
    },
  },
})
</script>

<template>
  <PageWrapper>
    <SectionWrapper>
      <BaseLogo
        :name="
          affiliate.affiliate_name_short ||
          affiliate.affiliate_name.toLowerCase()
        "
      />
    </SectionWrapper>

    <div class="space-y-4">
      <SectionWrapper>
        <h2 class="font-medium">Primary</h2>
        <div class="grid grid-cols-10">
          <div class="flex">
            <div
              class="flex flex-col items-center justify-center"
              v-for="(color, key) in colors.primary"
              :key="key"
            >
              <p class="h-11 w-11" :style="{backgroundColor: color}" />
              <p>{{ key }}</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <h2 class="font-medium">Secondary</h2>
        <div class="grid grid-cols-10">
          <div class="flex">
            <div
              class="flex flex-col items-center justify-center"
              v-for="(color, key) in colors.secondary"
              :key="key"
            >
              <p class="h-11 w-11" :style="{backgroundColor: color}" />
              <p>{{ key }}</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <img
          :src="`https://cominex.net/assets/img/affiliates/${affiliate.id}/logo_large.png`"
          :alt="affiliate.affiliate_name"
        />
      </SectionWrapper>
    </div>

    <SectionWrapper v-if="false" class="mt-4">
      id: {{ affiliate.id }}<br />
      affiliate_name_short: {{ affiliate.affiliate_name_short }}<br />
      affiliate_name: {{ affiliate.affiliate_name }}<br />
      affiliate_address_street: {{ affiliate.affiliate_address_street }}<br />
      affiliate_address_city: {{ affiliate.affiliate_address_city }}<br />
      affiliate_address_state: {{ affiliate.affiliate_address_state }}<br />
      affiliate_address_zip: {{ affiliate.affiliate_address_zip }}<br />
      affiliate_address_country: {{ affiliate.affiliate_address_country }}<br />
      affiliate_enable_regions: {{ affiliate.affiliate_enable_regions }}<br />
      affiliate_website: {{ affiliate.affiliate_website }}<br />
      affiliate_timezone: {{ affiliate.affiliate_timezone }}
    </SectionWrapper>

    <SectionWrapper v-if="false" class="mt-4">
      <pre class="text-2xs">{{ colors }}</pre>
    </SectionWrapper>
  </PageWrapper>
</template>
