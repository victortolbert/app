import '~~/.nuxt-storybook/storybook/preview.js'
import {addParameters, addDecorator} from '@storybook/vue'
import {withKnobs} from '@storybook/addon-knobs' // Hack from https://github.com/storybookjs/storybook/issues/6219#issuecomment-482478962

// import { themes } from '@storybook/theming';
import theme from './theme'

import Vue from 'vue'
import Vuex from 'vuex'

import {withA11y} from '@storybook/addon-a11y'
// import {withTests} from '@storybook/addon-jest'
// import results from '../.jest-test-results.json'

Vue.use(Vuex)

addParameters({
  options: {
    theme: theme,
  },
  docs: {
    inlineStories: true,
    iframeHeight: '60px',
  },
  html: {
    // root: '#my-custom-wrapper', // default: #root
    // removeEmptyComments: true, // default: false
    prettier: {
      tabWidth: 4,
      useTabs: false,
      htmlWhitespaceSensitivity: 'strict',
    },

    // highlighter: {
    //   showLineNumbers: true, // default: false
    //   wrapLines: false, // default: true
    // },
  },
})

addDecorator(withA11y)
addDecorator(withKnobs)
addDecorator()
// withTests({
//   results,
// }),
