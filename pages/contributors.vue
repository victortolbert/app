<template>
  <div class="doughnut-chart">
    <DoughnutChart
      :data="doughnutChartData"
      :options="{legend: {display: false}, maintainAspectRatio: false}"
    />
  </div>
</template>

<script>
function isBot(username) {
  return username.includes('[bot]') || username.includes('-bot')
}
function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
export default {
  async asyncData({app, env}) {
    let contributors = await app.$axios.$get(
      'https://api.github.com/repos/nuxt/nuxt.js/contributors',
      {
        headers: {
          Authorization: `token 42cdf9fd55abf41d24f34c0f8a4d9ada5f9e9b93`,
        },
      },
    )
    contributors = contributors.filter(
      c => c.contributions >= 10 && !isBot(c.login),
    )
    return {
      doughnutChartData: {
        labels: contributors.map(c => c.login),
        datasets: [
          {
            label: 'Nuxt Contributors',
            backgroundColor: contributors.map(getRandomColor),
            data: contributors.map(c => c.contributions),
          },
        ],
      },
    }
  },
}
</script>

<style scoped>
.doughnut-chart {
  width: 80%;
  height: 80%;
  margin: auto;
  margin-top: 30px;
}
</style>
