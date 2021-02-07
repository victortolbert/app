<template>
  <div class="flex items-center flex-1 bg-transparent">
    <img
      v-if="hasSchoolImage"
      :src="imgSrc"
      :alt="program.microsite.school_image_name"
      class="w-16 h-16 mb-0 mr-8 rounded-full shadow-md lg:w-24 lg:h-24"
    />
    <div class="text-white lg:w-2/3">
      <!-- Display longer header text when screen is larger than mobile -->
      <span
        :title="program.event_name"
        class="text-xl font-medium leading-tight sm:text-2xl lg:text-4xl is-hidden-mobile"
      >
        {{ displayProgramEventNameDesktop }}
      </span>

      <!-- Display shorter header text for mobile -->
      <span
        :title="program.event_name"
        class="text-xl font-medium leading-tight sm:text-2xl lg:text-4xl is-hidden-tablet"
      >
        {{ displayProgramEventNameMobile }}
      </span>
      <EventInfo :fun-run="program.fun_run" class="hidden lg:flex" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgramHeader',
  props: {
    program: {
      type: Object,
      default: null,
    },
  },
  computed: {
    hasSchoolImage() {
      return !!this.program.microsite.school_image_name
    },
    imgSrc() {
      return `/assets/img/${this.program.microsite.school_image_name}`
    },
    displayProgramEventNameDesktop() {
      if (this.program.event_name && this.program.event_name.length > 70) {
        return this.program.event_name.substring(0, 70) + '...'
      }

      return this.program.event_name
    },
    displayProgramEventNameMobile() {
      if (this.program.event_name && this.program.event_name.length > 50) {
        return this.program.event_name.substring(0, 50) + '...'
      }

      return this.program.event_name
    },
  },
}
</script>
