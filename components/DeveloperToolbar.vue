<script>
export default {
  data() {
    return {
      projects: ['app', 'cms', 'lab', 'psv1', 'tdx'],
    }
  },
  computed: {
    environment() {
      return process.env.NODE_ENV
    },
  },
}
</script>

<template>
  <nav
    class="flex items-center justify-between p-1 px-8 text-xs leading-loose text-white uppercase bg-gray-800 dark:text-primary-800 dark:bg-gray-100"
  >
    <div class="flex items-center space-x-4">
      <!-- <b>debug</b> -->
      <!-- <b>{{ $t('component_explorer') }} v</b> -->
      <!-- <b>Dev {{ $t('toolbar') }}</b> -->
      <!-- <span>css {{ $t('utilities_reference') }}</span> -->
      <b>{{ environment }}</b>
      <a href="http://promise-lab.test/resumes/1"> {{ $t('resume') }}</a>
    </div>

    <div class="flex space-x-4">
      <b>Previews</b>
      <a
        :href="`https://${project}.vticonsulting.com?ref=developer-toolbar`"
        target="_app"
        class=""
        v-for="project in projects"
        :key="project"
      >
        {{ project.toUpperCase() }}
      </a>
    </div>
  </nav>
</template>
