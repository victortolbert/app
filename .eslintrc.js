module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    // jest: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    'plugin:cypress/recommended',
    // '@nuxtjs/eslint-config-typescript',
    // 'plugin:testing-library/vue',
    // 'plugin:jest-dom/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'vue/no-lone-template': 'off',
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/attributes-order': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-default-props': 'off',
    'vue/order-in-components': 'off',
    'vue/no-v-html': 'off',
    'node/no-callback-literal': 'off',
  },
  globals: {
    $nuxt: true,
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true,
      },
    },
  ],
}
