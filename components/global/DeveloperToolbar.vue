<script>
export default {
  data() {
    return {
      projects: ['app', 'cms', 'lab', 'psv1', 'tdx'],
    }
  },
}
</script>

<template>
  <nav
    class="flex items-center justify-between p-1 px-8 text-xs leading-loose text-white uppercase bg-gray-800 dark:text-primary-800 dark:bg-gray-100"
  >
    <div class="flex items-center space-x-4">
      <b>Dev Tools</b>
      <b>debug</b>
      <b>component explorer</b>
      <b>css utility reference</b>

      <a href="http://promise-lab.test/resumes/1"> Résumé </a>
    </div>

    <div class="flex space-x-4">
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
