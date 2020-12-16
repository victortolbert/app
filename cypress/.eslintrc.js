module.exports = {
  root: true,
  plugins: ['eslint-plugin-cypress'],
  extends: ['plugin:cypress/recommended', 'plugin:testing-library/vue'],
  env: {'cypress/globals': true},
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'testing-library/await-async-query': 'off', // Cypress chains don't use promises
    'testing-library/prefer-screen-queries': 'off', // screen queries don't make sense in the context of Cypress Testing Library

    // No Jest here
    'jest/valid-expect': 'off',
    'jest/valid-expect-in-promise': 'off',
    'jest/no-conditional-expect': 'off',
  },
}
