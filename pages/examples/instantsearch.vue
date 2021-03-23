<script>
import {defineComponent} from '@nuxtjs/composition-api'
import {history as historyRouter} from 'instantsearch.js/es/lib/routers'
import {singleIndex as singleIndexMapping} from 'instantsearch.js/es/lib/stateMappings'
import algoliasearch from 'algoliasearch/lite'
import 'instantsearch.css/themes/satellite-min.css'
// Include only the reset
// import 'instantsearch.css/themes/reset.css';
// or include the full Satellite theme
// import 'instantsearch.css/themes/satellite.css';

// const indexName = 'instant_search'

export default defineComponent({
  data() {
    return {
      searchClient: algoliasearch(
        this.$config.algolia.appId,
        this.$config.algolia.key,
      ),
      initialUiState: {
        indexName: {
          query: 'phone',
          page: 5,
        },
      },
      insightsClient: window.aa,
      routing: {
        router: historyRouter(),
        stateMapping: singleIndexMapping('instant_search'),
      },
      // routing: {
      //   stateMapping: {
      //     stateToRoute(uiState) {
      //       // ...
      //     },
      //     routeToState(routeState) {
      //       // ...
      //     },
      //   },
      // },
      // routing: {
      //   stateMapping: {
      //     stateToRoute(uiState) {
      //       const indexUiState = uiState[indexName]
      //       return {
      //         q: indexUiState.query,
      //         categories: indexUiState.menu && indexUiState.menu.categories,
      //         brand:
      //           indexUiState.refinementList &&
      //           indexUiState.refinementList.brand,
      //         page: indexUiState.page,
      //       }
      //     },
      //     routeToState(routeState) {
      //       return {
      //         [indexName]: {
      //           query: routeState.q,
      //           menu: {
      //             categories: routeState.categories,
      //           },
      //           refinementList: {
      //             brand: routeState.brand,
      //           },
      //           page: routeState.page,
      //         },
      //       }
      //     },
      //   },
      // },
      searchFunction(helper) {
        if (helper.state.query) {
          helper.search()
        }
      },
      // Example which avoids the page to be reset to 0
      searchFunction(helper) {
        const page = helper.getPage() // Retrieve the current page
        helper
          .setQuery('Hello') // this call resets the page
          .setPage(page) // we re-apply the previous page
          .search()
      },
    }
  },
  methods: {
    transformItems(items) {
      return items.map(item => ({
        ...item,
        name: item.name.toUpperCase(),
      }))
    },
  },
})
</script>
<template>
  <ais-instant-search
    :search-client="searchClient"
    index-name="dev_resource_index"
    :insights-client="insightsClient"
    :routing="routing"
    :class-names="{'ais-InstantSearch': 'MyCustomInstantSearch'}"
  >
    <!--
      <ais-instant-search
        index-name="string"
        :search-client="object"
        // Optional parameters
        :search-function: function
        :stalled-search-delay="number"
        :routing="object"
        :initial-ui-state="object"
        :class-names="object"
        :insights-client: function
      />
    -->
    <ais-search-box />
    <!--
      <ais-search-box
        // Optional parameters
        placeholder="Search for resources..."
        submit-title="string"
        reset-title="string"
        :autofocus="boolean"
        :show-loading-indicator="boolean"
        :class-names="object"
      />
    <ais-search-box>
      <div slot="submit-icon">🔎</div>
      <div slot="reset-icon">🚫</div>
      <div slot="loading-indicator">⏳</div>
    </ais-search-box>

    -->
    <ais-hits>
      <!--
        <ais-hits
          // Optional parameters
          :escapeHTML="boolean"
          :class-names="{
            'ais-Hits': 'MyCustomHits',
            'ais-Hits-list': 'MyCustomHitsList',
            // ...
          }"
          :transform-items="transformItems"
        />

        <ais-hits>
          <ul slot-scope="{ items }">
            <li v-for="item in items" :key="item.objectID">
              {{ item.name }}
            </li>
          </ul>
          <div slot="item" slot-scope="{ item, index }">
            {{ index }} - {{ item.name }}
          </div>
        </ais-hits>

        <ais-hits :escape-HTML="true">
          <div slot="item" slot-scope="{ item }">
            <h2>
              <ais-highlight
                attribute="name"
                :hit="item"
                highlightedTagName="mark"
              />
            </h2>
            <p>
              <ais-snippet
                attribute="description"
                :hit="item"
                highlightedTagName="mark"
              />
            </p>
          </div>
        </ais-hits>
       -->
      <div slot="item" slot-scope="{item}">
        <h2>{{ item.name }}</h2>
      </div>
    </ais-hits>

    <ais-refinement-list attribute="categories" :sortBy="['name']" />

    <ais-refinement-list
      attribute="categories"
      transformItems="items => items.sort((a,b) => a.value.localeCompare(b.value))"
    />

    <ais-refinement-list
      attribute="categories"
      transformItems="items => items.filter(item => item.count >= 150)"
    />

    <!--
      <ais-pagination>
        <span slot="first">first</span>
        <span slot="previous">prev</span>
        <span slot="item" slot-scope="{value, active}" :style="{color: active ? 'red' : 'green'}">
          {{value.toLocaleString()}}
        </span>
        <span slot="next">next</span>
        <span slot="last">last</span>
      </ais-pagination>

      <ais-pagination>
        <span slot="first">first</span>
        <span slot="previous">prev</span>
        <span slot="item" slot-scope="{value, active}" :style="{color: active ? 'red' : 'green'}">
          {{value.toLocaleString()}}
        </span>
        <span slot="next">next</span>
        <span slot="last">last</span>
      </ais-pagination>
    -->
  </ais-instant-search>
</template>

<style>
body {
  font-family: sans-serif;
  padding: 1em;
}
</style>
