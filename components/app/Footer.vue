<script>
// import { useI18n } from 'vue-i18n'
// import { isDark, toggleDark } from '~/logics'
// const { t, availableLocales, locale } = useI18n()
export default {
  setup() {
    const toggleLocales = () => {
      // change to some real logic
      // const locales = availableLocales
      // locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
    }
    return {
      toggleLocales,
    }
  },
  computed: {
    currentYear() {
      const today = new Date()
      return today.getFullYear()
    },
  },
}
</script>

<template>
  <footer class="footer">
    <SocialMediaBar />
    <p>© Victor Tolbert {{ currentYear }}</p>
    Terms
    <NewsletterSignupForm />

    <PrivacyPolicyButton />
    <nav class="mt-6 text-xl">
      <!-- <a
        class="mx-2 icon-btn"
        :title="t('button.toggle_dark')"
        @click="toggleDark"
        >
        <carbon-moon v-if="isDark" />
        <carbon-sun v-else />
      </a> -->

      <!-- <a
        class="mx-2 icon-btn"
        :title="t('button.toggle_langs')"
        @click="toggleLocales"
        >
        <carbon-language />
      </a> -->

      <!-- <router-link class="mx-2 icon-btn" to="/about" :title="t('button.about')">
        <carbon-dicom-overlay />
      </router-link> -->

      <!-- <a
        class="mx-2 icon-btn"
        rel="noreferrer"
        href="https://github.com/antfu/vitesse"
        target="_blank"
        title="GitHub"
        >
        <carbon-logo-github />
      </a> -->
    </nav>
  </footer>
</template>
