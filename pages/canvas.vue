<script>
export default {
  mounted() {
    const teams = [
      {id: 'atl', name: 'Atlanta Hawks', wins: 18, losses: 20},
      {id: 'bos', name: 'Boston Celtics', wins: 19, losses: 18},
      {id: 'bkn', name: 'Brooklyn Nets', wins: 26, losses: 13},
      {id: 'cha', name: 'Charlotte Hornets', wins: 19, losses: 18},
      {id: 'chi', name: 'Chicago Bulls', wins: 16, losses: 20},
      // ...remaining 25 teams
    ]

    // const teamLookup = teams.reduce(
    //   (runningLookup, team) => ({
    //     ...runningLookup,
    //     [team.id]: team,
    //   }),
    //   {},
    // )

    // const teamLookup = teams.reduce((runningLookup, team) => {
    //   runningLookup[team.id] = team

    //   return runningLookup
    // }, {})

    const teamLookup = Object.fromEntries(teams.map(team => [team.id, team]))
  },
}
</script>
<template>
  <canvas> </canvas>
</template>

<style scoped>
/* https://remysharp.com/til/css/perfect-fullscreen-43-aspect-ratio */
canvas {
  max-width: calc(100vh / 3 * 4);
  width: 100%;
  image-rendering: pixelated; /* for blink */
  image-rendering: crisp-edges; /* for all others */
}
</style>
