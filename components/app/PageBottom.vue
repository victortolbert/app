<script>
import {mapGetters} from 'vuex'

export default {
  props: {
    document: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['settings', 'githubUrls']),
    link() {
      if (!this.settings.github) {
        return
      }

      return [
        this.githubUrls.repo,
        'edit',
        this.settings.defaultBranch,
        this.settings.defaultDir,
        `content${this.document.path}${this.document.extension}`,
      ]
        .filter(path => !!path)
        .join('/')
    },
  },
}
</script>

<template>
  <div
    v-if="link"
    class="flex flex-col justify-between pt-4 pb-4 lg:px-8 sm:flex-row"
  >
    <a
      :href="link"
      target="_blank"
      rel="noopener"
      class="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:underline"
    >
      GitHub
      <IconExternalLink class="w-4 h-4 ml-1" />
    </a>
    <span
      class="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400"
    >
      Updated At
      {{ $d(Date.parse(document.updatedAt), 'long') }}
    </span>
  </div>
</template>
