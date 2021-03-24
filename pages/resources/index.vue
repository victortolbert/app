<script>
import {launchConfetti} from '~/helpers/confetti'

export default {
  async asyncData({$axios}) {
    return {
      resources: await $axios.$get('https://api.victortolbert.com/resources'),
    }
  },
  data() {
    return {
      data: [
        {
          name: 'Board Games',
          sold: 131,
          available: 301,
          items: [
            {
              name: 'Monopoly',
              sold: 57,
              available: 100,
            },
            {
              name: 'Scrabble',
              sold: 23,
              available: 84,
            },
            {
              name: 'Chess',
              sold: 37,
              available: 61,
            },
            {
              name: 'Battleships',
              sold: 14,
              available: 56,
            },
          ],
        },
      ],
      columnsVisible: {
        name: {
          title: 'Name',
          display: true,
        },
        sold: {
          title: 'Stock Sold',
          display: true,
        },
        available: {
          title: 'Stock Available',
          display: true,
        },
        cleared: {
          title: 'Stock Cleared',
          display: true,
        },
      },
    }
  },
  methods: {
    handleCelebration() {
      launchConfetti()
    },
  },
}
</script>
<template>
  <PageWrapper> </PageWrapper>
</template>
