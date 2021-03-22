<script>
export default {
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
        {
          name: 'Jigsaws & Puzzles',
          sold: 88,
          available: 167,
          items: [
            {
              name: 'World Map',
              sold: 31,
              available: 38,
            },
            {
              name: 'London',
              sold: 23,
              available: 29,
            },
            {
              name: 'Sharks',
              sold: 20,
              available: 44,
            },
            {
              name: 'Disney',
              sold: 14,
              available: 56,
            },
          ],
        },
        {
          name: 'Books',
          sold: 434,
          available: 721,
          items: [
            {
              name: 'Hamlet',
              sold: 101,
              available: 187,
            },
            {
              name: 'The Lord Of The Rings',
              sold: 85,
              available: 156,
            },
            {
              name: 'To Kill a Mockingbird',
              sold: 78,
              available: 131,
            },
            {
              name: 'Catch-22',
              sold: 73,
              available: 98,
            },
            {
              name: 'Frankenstein',
              sold: 51,
              available: 81,
            },
            {
              name: "Alice's Adventures In Wonderland",
              sold: 46,
              available: 68,
            },
          ],
        },
      ],
      columnsVisible: {
        name: {title: 'Name', display: true},
        sold: {title: 'Stock Sold', display: true},
        available: {title: 'Stock Available', display: true},
        cleared: {title: 'Stock Cleared', display: true},
      },
      showDetailIcon: true,
      showDefaultDetail: true,
    }
  },
  methods: {
    toggle(row) {
      this.$refs.table.toggleDetails(row)
    },
  },
}
</script>
<template>
  <section>
    <OField grouped group-multiline>
      <OCheckbox v-model="showDetailIcon">Show detail chevron</OCheckbox>
      <OCheckbox v-model="showDefaultDetail">Custom detail column</OCheckbox>
      <div v-for="(column, index) in columnsVisible" :key="index">
        <OCheckbox v-model="column.display">
          {{ column.title }}
        </OCheckbox>
      </div>
    </OField>

    <OTable
      :data="data"
      ref="table"
      detailed
      hoverable
      :custom-detail-row="!showDefaultDetail"
      :opened-detailed="['Board Games']"
      :default-sort="['name', 'asc']"
      detail-key="name"
      :show-detail-icon="showDetailIcon"
    >
      <OTableColumn
        field="name"
        :visible="columnsVisible['name'].display"
        :label="columnsVisible['name'].title"
        width="300"
        sortable
        v-slot="props"
      >
        <template v-if="showDetailIcon">
          {{ props.row.name }}
        </template>
        <template v-else>
          <a @click="toggle(props.row)">
            {{ props.row.name }}
          </a>
        </template>
      </OTableColumn>

      <OTableColumn
        field="sold"
        :visible="columnsVisible['sold'].display"
        :label="columnsVisible['sold'].title"
        sortable
        position="centered"
        v-slot="props"
      >
        {{ props.row.sold }}
      </OTableColumn>

      <OTableColumn
        field="available"
        :visible="columnsVisible['available'].display"
        :label="columnsVisible['available'].title"
        sortable
        position="centered"
        v-slot="props"
      >
        {{ props.row.available }}
      </OTableColumn>

      <OTableColumn
        :visible="columnsVisible['cleared'].display"
        :label="columnsVisible['cleared'].title"
        position="centered"
        v-slot="props"
      >
        <span>
          {{ Math.round((props.row.sold / props.row.available) * 100) }}%
        </span>
      </OTableColumn>

      <template slot="detail" slot-scope="props">
        <tr v-for="item in props.row.items" :key="item.name">
          <td v-if="showDetailIcon"></td>
          <td v-show="columnsVisible['name'].display">
            &nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}
          </td>
          <td v-show="columnsVisible['sold'].display">{{ item.sold }}</td>
          <td v-show="columnsVisible['available'].display">
            {{ item.available }}
          </td>
          <td v-show="columnsVisible['cleared'].display">
            <span> {{ Math.round((item.sold / item.available) * 100) }}% </span>
          </td>
        </tr>
      </template>
    </OTable>
  </section>
</template>
