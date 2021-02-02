<template>
  <section>
    {{
      'i don’t have to worry about the title casing here, because i have method to fix it. -- what do you think?'.toTitleCase()
    }}

    <button
      type="button"
      class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <svg
        class="w-5 h-5 mr-2 -ml-1"
        x-description="Heroicon name: mail"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
        ></path>
        <path
          d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
        ></path>
      </svg>
      Button text
    </button>

    <b-table
      :data="data"
      ref="table"
      detailed
      detail-key="id"
      :show-detail-icon="showDetailIcon"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
      <b-table-column
        field="user.first_name"
        label="First Name"
        sortable
        v-slot="props"
      >
        <template v-if="showDetailIcon">
          {{ props.row.user.first_name }}
        </template>
        <template v-else>
          <a @click="props.toggleDetails(props.row)">
            {{ props.row.user.first_name }}
          </a>
        </template>
      </b-table-column>

      <b-table-column
        field="user.last_name"
        label="Last Name"
        sortable
        v-slot="props"
      >
        {{ props.row.user.last_name }}
      </b-table-column>

      <b-table-column
        field="date"
        label="Date"
        sortable
        centered
        v-slot="props"
      >
        <span class="tag is-success">
          {{ new Date(props.row.date).toLocaleDateString() }}
        </span>
      </b-table-column>

      <b-table-column label="Gender" v-slot="props">
        <span>
          <b-icon
            pack="fas"
            :icon="props.row.gender === 'Male' ? 'mars' : 'venus'"
          >
          </b-icon>
          {{ props.row.gender }}
        </span>
      </b-table-column>

      <template slot="detail" slot-scope="props">
        <article class="media">
          <figure class="media-left">
            <p class="image is-64x64">
              <img src="/static/img/placeholder-128x128.png" />
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong
                  >{{ props.row.user.first_name }}
                  {{ props.row.user.last_name }}</strong
                >
                <small>@{{ props.row.user.first_name }}</small>
                <small>31m</small>
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                ornare magna eros, eu pellentesque tortor vestibulum ut.
                Maecenas non massa sem. Etiam finibus odio quis feugiat
                facilisis.
              </p>
            </div>
          </div>
        </article>
      </template>
    </b-table>
  </section>
</template>

<script>
const data = require('@/data/sample.json')

export default {
  data() {
    return {
      data,
      showDetailIcon: false,
    }
  },
}
</script>
