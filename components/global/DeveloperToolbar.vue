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
    class="flex items-center justify-between p-1 px-8 text-xs leading-loose text-white uppercase bg-gray-800"
  >
    <b>Dev Tools</b>

    <div class="flex space-x-3">
      <b>env</b>
      <b>debug</b>
      <a
        :href="`https://${project}.vticonsulting.com?ref=developer-toolbar`"
        target="_app"
        class="text-gray-100 hover:text-white"
        v-for="project in projects"
        :key="project"
      >
        {{ project.toUpperCase() }}
      </a>
    </div>
  </nav>
</template>
