<template>
  <div class="flex pt-4 pb-4 border-b lg:px-8 dark:border-gray-800">
    <a
      :href="link"
      target="_blank"
      rel="noopener"
      class="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:underline"
    >
      {{ $t('article.github') }}
      <IconExternalLink class="w-4 h-4 ml-1" />
    </a>
  </div>
</template>

<script>
export default {
  props: {
    document: {
      type: Object,
      required: true,
    },
  },
  computed: {
    link() {
      return `https://github.com/VictorTolbert/app/tree/main/content${this.document.path}${this.document.extension}`
    },
  },
}
</script>
