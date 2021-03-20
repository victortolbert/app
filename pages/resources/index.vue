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
    <SectionWrapper>
      <GaSpsResourcesTable v-if="false" :resources="resources" />

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
