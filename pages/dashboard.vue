<template>
  <div class="space-y-1 lg:mt-8 lg:space-y-8 lg:px-8">
    <!-- {{ $auth.user }} -->
    <!-- {{ $store.state.auth.user }} -->
    <!-- {{ $auth.loggedIn }} -->
    <!-- {{ $store.state.auth.loggedIn }} -->

    {{ $auth.loggedIn ? 'Logged In' : 'Guest' }}

    <template v-if="$auth.loggedIn">
      <OButton variant="info"> Secure </OButton>
      <OButton variant="danger" @click="$auth.logout()"> Logout </OButton>
    </template>
    <OButton v-else variant="primary"> Login </OButton>

    <div class="grid gap-8 lg:grid-cols-2">
      <section class="p-8 bg-white shadow lg:rounded-lg">
        <div class="text-primary-500 aspect-w-21 aspect-h-9">
          <UsaMap />
        </div>
      </section>

      <section class="p-8 bg-white shadow lg:rounded-lg">
        <Chart type="column" />
      </section>

      <section class="p-8 bg-white shadow lg:rounded-lg">
        <Chart type="line" />
      </section>

      <section class="p-8 bg-white shadow lg:rounded-lg">
        <Chart type="bar" />
      </section>

      <section class="p-8 bg-white shadow lg:rounded-lg">
        <Chart
          type="pie"
          :data="[
            ['Blueberry', 44],
            ['Strawberry', 23],
          ]"
        />
      </section>

      <section class="p-8 bg-white shadow lg:rounded-lg">
        <Chart
          type="bar"
          :data="[
            ['X-Small', 5],
            ['Small', 27],
          ]"
        />
      </section>

      <section class="p-8 bg-white shadow lg:rounded-lg">
        <Chart type="area" />
      </section>

      <section class="p-8 bg-white shadow lg:rounded-lg">
        <Chart
          type="area"
          :data="{
            '2017-01-01 00:00:00 -0800': 2,
            '2017-01-01 00:01:00 -0800': 5,
          }"
        />
      </section>
    </div>

    <section class="p-8 bg-white shadow lg:rounded-lg">
      <v-client-table
        :columns="countryColumns"
        v-model="countries"
        :options="countryOptions"
      >
        <a
          slot="uri"
          slot-scope="props"
          target="_blank"
          :href="props.row.uri"
          class="glyphicon glyphicon-eye-open"
        ></a>
        <div slot="child_row" slot-scope="props">
          The link to {{ props.row.name }}
          is
          <a :href="props.row.uri">{{ props.row.uri }}</a>
        </div>

        <div
          slot="name"
          slot-scope="{row, update, setEditing, isEditing, revertValue}"
        >
          <span @click="setEditing(true)" v-if="!isEditing()">
            <a>{{ row.name }}</a>
          </span>

          <span v-else>
            <input type="text" v-model="row.name" />
            <button
              type="button"
              class="btn btn-info btn-xs"
              @click="
                update(row.name)
                setEditing(false)
              "
            >
              Submit
            </button>
            <button
              type="button"
              class="btn btn-default btn-xs"
              @click="
                revertValue()
                setEditing(false)
              "
            >
              Cancel
            </button>
          </span>
        </div>
      </v-client-table>
    </section>

    <section class="p-8 bg-white shadow lg:rounded-lg">
      <PeopleTable />
    </section>

    <section class="p-8 bg-white shadow lg:rounded-lg">
      <div class="grid grid-cols-2 gap-8">
        <div>
          <button @click="fetchUsers">Fetch Data</button>
          <button @click="updateUsers">Update Data</button>

          <h2>Data</h2>
          <pre class="font-mono text-2xs">{{ $store.state.users }}</pre>
        </div>
      </div>
    </section>

    <section class="p-8 bg-white shadow lg:rounded-lg">
      <!-- <button @click="$sounds.you_have_a_mail_message.play">
        You have a mail message
      </button> -->
      <!-- <LineChart /> -->
      <!-- <BarChart :data="barChartData" :options="{maintainAspectRatio: true}" /> -->
    </section>
  </div>
</template>

<script>
import sourceData from '@/__mocks__/db'
import {defineComponent} from '@nuxtjs/composition-api'
import {theme} from '~tailwind.config'

// import moment from 'moment'
// import {useSound} from '@vueuse/sound'
// import buttonSfx from '../static/sound/button.wav'
// data.posts.filter(post => post.userId === 'u1')

export default defineComponent({
  setup() {
    // const {play} = useSound(buttonSfx)

    return {
      // play,
    }
  },
  asyncData({env, app}) {
    // const stats = await app.$axios.$get(
    //   'https://api.github.com/repos/nuxt/nuxt.js/stats/commit_activity',
    //   {
    //     headers: {
    //       Authorization: `token 42cdf9fd55abf41d24f34c0f8a4d9ada5f9e9b93`,
    //     },
    //   },
    // )
    return {
      theme,
      // barChartData: {
      //   labels: stats.map(stat =>
      //     moment(stat.week * 1000).format('GGGG[-W]WW'),
      //   ),
      //   datasets: [
      //     {
      //       label: 'Nuxt Commit Activity',
      //       backgroundColor: theme.colors.primary['500'],
      //       data: stats.map(stat => stat.total),
      //     },
      //   ],
      // },
    }
  },
  data() {
    return {
      threads: sourceData.threads,
      countries: sourceData.countries,
      countryColumns: ['name', 'code', 'uri'],
      countryOptions: {
        headings: {
          name: 'Country Name',
          code: 'Country Code',
          uri: 'View Record',
        },
        editableColumns: ['name'],
        sortable: ['name', 'code'],
        filterable: ['name', 'code'],
      },
      chartData: [
        ['Jan', [4, 6]],
        ['Feb', 2],
        ['Mar', 10],
        ['Apr', 5],
        ['May', 3],
      ],
      columns: ['id', 'name', 'age'],
      tableData: [
        {id: 1, name: 'John', age: '20'},
        {id: 2, name: 'Jane', age: '24'},
        {id: 3, name: 'Susan', age: '16'},
        {id: 4, name: 'Chris', age: '55'},
        {id: 5, name: 'Dan', age: '40'},
      ],
      options: {
        // see the options API
      },

      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }
  },
  mounted() {
    // this.showSuccessMsg({message: 'overrode....'})
    // this.showInfoMsg()
    // this.showWarnMsg()
    // this.showErrorMsg()
  },
  methods: {
    fetchUsers() {
      this.$store.dispatch('getUsers')
    },

    updateUsers() {
      this.$store.dispatch('updateUsers', this.$store.state.users)
    },
  },
  notifications: {
    showSuccessMsg: {
      type: 'success',
      title: 'Hello there',
      message: "That's the success!",
      messageColor: 'white',
      titleColor: 'white',
    },
    showInfoMsg: {
      type: 'info',
      title: 'Hey you',
      message: 'Here is some info for you',
    },
    showWarnMsg: {
      type: 'warn',
      title: 'Wow, man',
      message: "That's the kind of warning",
    },
    showErrorMsg: {
      type: 'error',
      title: 'Wow-wow',
      message: "That's the error",
      messageColor: 'white',
      titleColor: 'white',
    },
  },
})
</script>

<style>
:root {
  --color-primary: theme('colors.primary.500');
  --oruga-variant-primary: var(--color-primary);
  --oruga-button-background-color: var(--oruga-variant-primary);
}

.iziToast > .iziToast-body .iziToast-message,
.iziToast > .iziToast-body .iziToast-icon,
.iziToast > .iziToast-body .iziToast-title {
  color: #fff !important;
}
.iziToast.iziToast-color-red {
  background: var(--color-danger);
  border-color: var(--color-danger);
  color: var(--color-white);
}
.iziToast.iziToast-color-orange {
  background: var(--color-warning);
  border-color: var(--color-warning);
}
.iziToast.iziToast-color-yellow {
  background: var(--color-warning);
  border-color: var(--color-warning);
}
.iziToast.iziToast-color-blue {
  background: var(--color-info);
  border-color: var(--color-info);
}
.iziToast.iziToast-color-green {
  background: var(--color-success);
  border-color: var(--color-success);
}

.bar-chart {
  width: 80%;
  height: 80%;
  margin: auto;
  margin-top: 30px;
}

.VuePagination {
  text-align: center;
}

.vue-title {
  text-align: center;
  margin-bottom: 10px;
}

.vue-pagination-ad {
  text-align: center;
}

.glyphicon.glyphicon-eye-open {
  width: 16px;
  display: block;
  margin: 0 auto;
}

th:nth-child(3) {
  text-align: center;
}

.VueTables__child-row-toggler {
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: block;
  margin: auto;
  text-align: center;
}

.VueTables__child-row-toggler--closed::before {
  content: '+';
}

.VueTables__child-row-toggler--open::before {
  content: '-';
}

[v-cloak] {
  display: none;
}
</style>
