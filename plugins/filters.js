import Vue from 'vue'

Vue.filter('difficulty', difficulty => {
  let difficulties = {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
  }
  return difficulties[difficulty]
})
