<template>
  <div>
    <highcharts :constructor-type="'stockChart'" :options="chartOptions" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartOptions: {
        series: [
          {
            data: [1, 2, 3],
          },
        ],
      },
    }
  },
}
</script>
