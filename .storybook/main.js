const {nuxifyStorybook} = require('../.nuxt-storybook/storybook/main.js')

module.exports = nuxifyStorybook({
  webpackFinal(config, options) {
    return config
  },
  stories: ['~/components/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-knobs',
    // '@storybook/addon-jest',
    '@whitespace/storybook-addon-html',
  ],
})
