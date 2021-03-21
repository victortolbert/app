<script>
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
}
</script>
<template>
  <PageWrapper>
    <SectionWrapper :padded="false" class="p-8">
      <ResourceSearchField />

      <nav
        class="grid gap-2 mt-4 text-sm capitalize sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
      >
        <button
          class="flex items-center justify-center flex-none w-full text-xs font-medium leading-6 tracking-widest uppercase transition-colors duration-200 border border-transparent rounded shadow text-primary-700 bg-primary-100 hover:bg-primary-200 sm:w-auto focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary-500 focus:outline-none h-11"
          outlined
        >
          2021
        </button>
        <button
          class="flex items-center justify-center flex-none w-full text-xs font-medium leading-6 tracking-widest uppercase transition-colors duration-200 border border-transparent rounded shadow text-primary-700 bg-primary-100 hover:bg-primary-200 sm:w-auto focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary-500 focus:outline-none h-11"
          outlined
        >
          Featured
        </button>
        <button
          class="flex items-center justify-center flex-none w-full text-xs font-medium leading-6 tracking-widest uppercase transition-colors duration-200 border border-transparent rounded shadow text-primary-700 bg-primary-100 hover:bg-primary-200 sm:w-auto focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary-500 focus:outline-none h-11"
          outlined
        >
          Popular
        </button>
        <button
          class="flex items-center justify-center flex-none w-full text-xs font-medium leading-6 tracking-widest uppercase transition-colors duration-200 border border-transparent rounded shadow text-primary-700 bg-primary-100 hover:bg-primary-200 sm:w-auto focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary-500 focus:outline-none h-11"
          outlined
        >
          Essentials
        </button>
        <button
          class="flex items-center justify-center flex-none w-full text-xs font-medium leading-6 tracking-widest uppercase transition-colors duration-200 border border-transparent rounded shadow text-primary-700 bg-primary-100 hover:bg-primary-200 sm:w-auto focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary-500 focus:outline-none h-11"
          outlined
        >
          Evaluation
        </button>
        <button
          class="flex items-center justify-center flex-none w-full text-xs font-medium leading-6 tracking-widest uppercase transition-colors duration-200 border border-transparent rounded shadow text-primary-700 bg-primary-100 hover:bg-primary-200 sm:w-auto focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary-500 focus:outline-none h-11"
          outlined
        >
          How To
        </button>
        <button
          class="flex items-center justify-center flex-none w-full text-xs font-medium leading-6 tracking-widest uppercase transition-colors duration-200 border border-transparent rounded shadow text-primary-700 bg-primary-100 hover:bg-primary-200 sm:w-auto focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary-500 focus:outline-none h-11"
          outlined
        >
          Capacity
        </button>
        <button
          class="flex items-center justify-center flex-none w-full text-xs font-medium leading-6 tracking-widest uppercase transition-colors duration-200 border border-transparent rounded shadow text-primary-700 bg-primary-100 hover:bg-primary-200 sm:w-auto focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary-500 focus:outline-none h-11"
          outlined
        >
          Needs Assessment
        </button>
        <button
          class="flex items-center justify-center flex-none w-full text-xs font-medium leading-6 tracking-widest uppercase transition-colors duration-200 border border-transparent rounded shadow text-primary-700 bg-primary-100 hover:bg-primary-200 sm:w-auto focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary-500 focus:outline-none h-11"
          outlined
        >
          Environmental Strategies
        </button>
        <button
          class="flex items-center justify-center flex-none w-full text-xs font-medium leading-6 tracking-widest uppercase transition-colors duration-200 border border-transparent rounded shadow text-primary-700 bg-primary-100 hover:bg-primary-200 sm:w-auto focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary-500 focus:outline-none h-11"
          outlined
        >
          Literature Review
        </button>
        <button
          class="flex items-center justify-center flex-none w-full text-xs font-medium leading-6 tracking-widest uppercase transition-colors duration-200 border border-transparent rounded shadow text-primary-700 bg-primary-100 hover:bg-primary-200 sm:w-auto focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary-500 focus:outline-none h-11"
          outlined
        >
          Tool
        </button>
        <button
          class="flex items-center justify-center flex-none w-full text-xs font-medium leading-6 tracking-widest uppercase transition-colors duration-200 border border-transparent rounded shadow text-primary-700 bg-primary-100 hover:bg-primary-200 sm:w-auto focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary-500 focus:outline-none h-11"
          outlined
        >
          Report
        </button>
        <button
          class="flex items-center justify-center flex-none w-full text-xs font-medium leading-6 tracking-widest uppercase transition-colors duration-200 border border-transparent rounded shadow text-primary-700 bg-primary-100 hover:bg-primary-200 sm:w-auto focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary-500 focus:outline-none h-11"
          outlined
        >
          ECCO
        </button>
        <button
          class="flex items-center justify-center flex-none w-full text-xs font-medium leading-6 tracking-widest uppercase transition-colors duration-200 border border-transparent rounded shadow text-primary-700 bg-primary-100 hover:bg-primary-200 sm:w-auto focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary-500 focus:outline-none h-11"
          outlined
        >
          SPF
        </button>
        <button
          class="flex items-center justify-center flex-none w-full text-xs font-medium leading-6 tracking-widest uppercase transition-colors duration-200 border border-transparent rounded shadow text-primary-700 bg-primary-100 hover:bg-primary-200 sm:w-auto focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary-500 focus:outline-none h-11"
          outlined
        >
          Video
        </button>
        <button
          class="flex items-center justify-center flex-none w-full text-xs font-medium leading-6 tracking-widest uppercase transition-colors duration-200 border border-transparent rounded shadow text-primary-700 bg-primary-100 hover:bg-primary-200 sm:w-auto focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary-500 focus:outline-none h-11"
          outlined
        >
          Webinar
        </button>
        <button
          class="flex items-center justify-center flex-none w-full text-xs font-medium leading-6 tracking-widest uppercase transition-colors duration-200 border border-transparent rounded shadow text-primary-700 bg-primary-100 hover:bg-primary-200 sm:w-auto focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary-500 focus:outline-none h-11"
          outlined
        >
          Substance Abuse Prevention
        </button>
        <button
          class="flex items-center justify-center flex-none w-full text-xs font-medium leading-6 tracking-widest uppercase transition-colors duration-200 border border-transparent rounded shadow text-primary-700 bg-primary-100 hover:bg-primary-200 sm:w-auto focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary-500 focus:outline-none h-11"
          outlined
        >
          Recommended Resources
        </button>
      </nav>

      <SectionWrapper>
        <GaSpsResourcesTable v-if="false" :resources="resources" />
      </SectionWrapper>

      <OField>
        <div v-for="(column, index) in columnsVisible" :key="index">
          <OCheckbox v-model="column.display">
            {{ column.title }}
          </OCheckbox>
        </div>
      </OField>

      <OTable :data="data" ref="resources-table">
        <OTableColumn
          field="name"
          :visible="columnsVisible['name'].display"
          :label="columnsVisible['name'].title"
          width="300"
          v-slot="props"
        >
          {{ props.row.name }}
        </OTableColumn>

        <OTableColumn
          field="sold"
          :visible="columnsVisible['sold'].display"
          :label="columnsVisible['sold'].title"
          v-slot="props"
        >
          {{ props.row.sold }}
        </OTableColumn>

        <OTableColumn
          field="available"
          :visible="columnsVisible['available'].display"
          :label="columnsVisible['available'].title"
          v-slot="props"
        >
          {{ props.row.available }}
        </OTableColumn>

        <OTableColumn
          :visible="columnsVisible['cleared'].display"
          :label="columnsVisible['cleared'].title"
          v-slot="props"
        >
          <span>
            {{ Math.round((props.row.sold / props.row.available) * 100) }}%
          </span>
        </OTableColumn>
      </OTable>

      <pre class="text-2xs">
        {{ resources }}
      </pre>
    </SectionWrapper>
  </PageWrapper>
</template>
