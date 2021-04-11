const {nuxifyStorybook} = require('../.nuxt-storybook/storybook/main.js')

module.exports = nuxifyStorybook({
  webpackFinal(config, options) {
    return config
  },
  stories: [],
  addons: [],
})
