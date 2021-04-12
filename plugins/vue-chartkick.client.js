import Vue from 'vue'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

// const defaultColors = require('windicss/colors')
// const customColors = require('../colors')
// const colors = { ...defaultColors, ...customColors }

// Chartkick.options = {
//   colors: [
//     colors.flamePea['500'],
//     colors.pomegranate['500'],
//   ],
// }

Vue.use(Chartkick.use(Chart))
