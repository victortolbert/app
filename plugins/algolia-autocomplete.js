// https://autocomplete.algolia.com/docs/getting-started/#defining-where-to-put-your-autocomplete

import algoliasearch from 'algoliasearch/lite'
import {autocomplete, getAlgoliaHits} from '@algolia/autocomplete-js'

import '@algolia/autocomplete-theme-classic'

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76',
)

autocomplete({
  container: '#autocomplete',
  placeholder: 'Search for products',
  getSources({query}) {
    return [
      {
        sourceId: 'products',
        getItems() {
          return getAlgoliaHits({
            searchClient,
            queries: [
              {
                indexName: 'instant_search',
                query,
                params: {
                  hitsPerPage: 5,
                },
              },
            ],
          })
        },
        // ...
      },
    ]
  },
})
