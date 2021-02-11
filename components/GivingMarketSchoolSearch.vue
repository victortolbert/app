<template>
  <div class="montserrat">
    <h2 class="mb-4 text-30">{{ $t('school_search_header') }}</h2>
    <div class="mx-auto form-group">
      <input
        :placeholder="$t('placeholder_school_search')"
        type="text"
        class="mx-auto form-control text-16"
        name="school_search"
        required
        @input="search"
      />
      <ul v-show="schools.length" class="list-group">
        <li
          v-for="(school, index) in schools"
          :key="index"
          :class="{active: regCode === school.registration_code}"
          class="text-left radio text-16 list-group-item list-group-item-action"
          @click="selectSchool(school)"
          dusk="button"
        >
          <div class="font-weight-bold">{{ school.name }}</div>
          <div>{{ school.event_name }}</div>
          <div>{{ school.city }}, {{ school.state }}</div>
        </li>
      </ul>
    </div>

    <p class="text-12">
      {{ $t('search_help_1') }}
      <a
        class="text-primary font-weight-bold"
        href="#"
        data-target="#schoolSearchHelpModal"
        data-toggle="modal"
      >
        {{ $t('search_help_2') }}
      </a>
      {{ $t('search_help_3') }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      default: null,
    },
    searchUrl: {
      type: String,
      default: '',
    },
    schoolUrl: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      hideRegCode: true,
      regCode: '',
      schools: [],
    }
  },
  computed: {},
  methods: {
    search(event) {
      const searchTerm = event.target.value
      if (searchTerm.length >= 3) {
        this.$axios
          .get(this.searchUrl + '/' + searchTerm)
          .then(response => {
            this.schools = response.data
          })
          .catch()
      } else {
        this.schools = []
      }
    },
    selectSchool(school) {
      window.location.href = this.school_url + '/' + school.id
    },
  },
}
</script>

<style scoped>
ul {
  position: absolute;
  max-height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
}
ul li {
  position: relative;
}
</style>
