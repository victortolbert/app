<template>
  <Dropdown v-if="availableLocales.length" class="flex">
    <template #trigger="{open, toggle}">
      <button
        class="rounded-md hover:text-green-500 focus:outline-none"
        :class="{'text-green-500': open}"
        @touchstart.stop.prevent="toggle"
      >
        <IconTranslate class="w-6 h-6" />
      </button>
    </template>

    <ul class="py-2">
      <li v-for="locale in availableLocales" :key="locale.code">
        <NuxtLink
          v-if="$i18n.locale !== locale.code"
          :to="switchLocalePath(locale.code)"
          class="flex items-center px-4 leading-7 hover:text-green-500"
        >
          {{ $t(locale.name) }}
        </NuxtLink>
      </li>
    </ul>
  </Dropdown>
</template>

<script>
export default {
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
  },
}
</script>
